import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const classifyAlert = (title = "") => {
  const t = title.toLowerCase();
  if (
    t.includes("layoff") ||
    t.includes("laid off") ||
    t.includes("job cut") ||
    t.includes("firing") ||
    t.includes("workforce reduction")
  ) {
    return {
      category: "LAYOFF",
      severity: "CRITICAL",
      badge: "bg-rose-500/15 text-rose-400 border-rose-500/40",
      dot: "bg-rose-500",
    };
  }
  if (
    t.includes("restructur") ||
    t.includes("hiring freeze") ||
    t.includes("cost cut") ||
    t.includes("reorg")
  ) {
    return {
      category: "RESTRUCTURING",
      severity: "HIGH",
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/40",
      dot: "bg-amber-400",
    };
  }
  return {
    category: "CORPORATE",
    severity: "MODERATE",
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40",
    dot: "bg-cyan-400",
  };
};

const extractCompanyTag = (title = "") => {
  const cleaned = title.split(" - ")[0];
  const words = cleaned.split(" ").slice(0, 2).join(" ").replace(/[:,]/g, "");
  return words || "Global Corp";
};

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [distressStocks, setDistressStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Custom Watchlist Alert Radar
  const [watchInput, setWatchInput] = useState("");
  const [watchedCompanies, setWatchedCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem("layoff_watched_companies");
      return saved ? JSON.parse(saved) : ["Intel", "Meta", "Boeing", "TCS"];
    } catch {
      return ["Intel", "Meta", "Boeing", "TCS"];
    }
  });

  // Notification States
  const [notifEnabled, setNotifEnabled] = useState(
    typeof Notification !== "undefined" && Notification.permission === "granted"
  );
  const [toastAlert, setToastAlert] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Instant ML Risk Check State
  const [scanningCompany, setScanningCompany] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const triggerNotification = useCallback(
    (alertItem) => {
      setToastAlert(alertItem);
      setTimeout(() => setToastAlert(null), 7000);

      if (
        notifEnabled &&
        typeof Notification !== "undefined" &&
        Notification.permission === "granted"
      ) {
        try {
          new Notification(`🚨 LayoffRadar Alert: ${alertItem.severity}`, {
            body: `${alertItem.title} (${alertItem.source})`,
          });
        } catch {
          // Ignore browser notification restrictions
        }
      }
    },
    [notifEnabled]
  );

  const requestBrowserNotifications = async () => {
    if (typeof Notification === "undefined") return;
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setNotifEnabled(true);
      setToastAlert({
        severity: "ACTIVE",
        source: "System",
        title:
          "Live Desktop & In-App Layoff Alerts enabled! You will be notified of new workforce reductions.",
      });
      setTimeout(() => setToastAlert(null), 5000);
    }
  };

  const fetchLiveAlerts = useCallback(async () => {
    setLoading(true);
    let combinedAlerts = [];
    let marketDistress = [];

    // 1. Fetch from local FastAPI /api/dashboard if running
    try {
      const res = await fetch(`${API_BASE}/api/dashboard`);
      if (res.ok) {
        const json = await res.json();
        const wire = json.live_global_alerts || [];
        wire.forEach((item, idx) => {
          const meta = classifyAlert(item.title);
          combinedAlerts.push({
            id: `wire-${idx}-${item.published_at}`,
            title: item.title,
            source: item.source || "Global Wire",
            time: item.published_at || "Recent",
            url: item.url || "#",
            company: extractCompanyTag(item.title),
            ...meta,
          });
        });

        // Convert distressed stocks from Yahoo Finance into Financial Alerts
        const stocks = json.live_market_watchlist || [];
        marketDistress = stocks;
        stocks.forEach((st) => {
          if (st.return_30d < -5 || st.drawdown_90d < -12) {
            combinedAlerts.push({
              id: `stock-${st.ticker}`,
              title: `${st.name} (${st.ticker}) equity down ${st.return_30d}% in 30d with ${st.drawdown_90d}% 90d drawdown (${st.volatility}% volatility)`,
              source: "Yahoo Finance Live Telemetry",
              time: "Live Market Pulse",
              url: `https://finance.yahoo.com/quote/${st.ticker}`,
              company: st.name,
              category: "FINANCIAL DISTRESS",
              severity: st.return_30d < -10 ? "CRITICAL" : "HIGH",
              badge:
                "bg-purple-500/15 text-purple-300 border-purple-500/40",
              dot: "bg-purple-400",
            });
          }
        });
      }
    } catch {
      // Fallback if backend is busy
    }

    // 2. Fetch targeted alerts for user's Custom Watched Companies via Google News RSS proxy
    try {
      const watchQuery = watchedCompanies
        .slice(0, 5)
        .map((c) => `"${c}"`)
        .join(" OR ");
      const rssQuery = `(${watchQuery}) AND (layoffs OR "job cuts" OR restructuring OR workforce) when:14d`;
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
        rssQuery
      )}&hl=en-US&gl=US&ceid=US:en`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        rssUrl
      )}`;

      const rssResp = await fetch(proxyUrl);
      if (rssResp.ok) {
        const xmlText = await rssResp.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).slice(0, 12);

        items.forEach((item, idx) => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "#";
          const pubDate = (
            item.querySelector("pubDate")?.textContent || ""
          ).slice(0, 22);
          const source =
            item.querySelector("source")?.textContent || "Google News Alert";

          const matchedWatch =
            watchedCompanies.find((w) =>
              title.toLowerCase().includes(w.toLowerCase())
            ) || extractCompanyTag(title);

          const meta = classifyAlert(title);
          combinedAlerts.push({
            id: `watch-${idx}-${pubDate}`,
            title,
            source,
            time: pubDate,
            url: link,
            company: matchedWatch,
            isWatched: true,
            ...meta,
          });
        });
      }
    } catch {
      // Ignore proxy timeout
    }

    // Deduplicate by title
    const seen = new Set();
    const uniqueAlerts = combinedAlerts.filter((a) => {
      const key = a.title.slice(0, 60).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setAlerts(uniqueAlerts);
    setDistressStocks(marketDistress);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);

    // Trigger live toast notification for the top critical alert
    const topCritical = uniqueAlerts.find((a) => a.severity === "CRITICAL");
    if (topCritical) {
      triggerNotification(topCritical);
    }
  }, [watchedCompanies, triggerNotification]);

  useEffect(() => {
    fetchLiveAlerts();
    // Auto-poll every 90 seconds for live alerts
    const interval = setInterval(fetchLiveAlerts, 90000);
    return () => clearInterval(interval);
  }, [fetchLiveAlerts]);

  const handleAddWatchCompany = (e) => {
    e.preventDefault();
    const clean = watchInput.trim();
    if (!clean) return;
    if (!watchedCompanies.includes(clean)) {
      const updated = [clean, ...watchedCompanies];
      setWatchedCompanies(updated);
      localStorage.setItem("layoff_watched_companies", JSON.stringify(updated));
    }
    setWatchInput("");
  };

  const handleRemoveWatchCompany = (comp) => {
    const updated = watchedCompanies.filter((c) => c !== comp);
    setWatchedCompanies(updated);
    localStorage.setItem("layoff_watched_companies", JSON.stringify(updated));
  };

  const runLiveMLCheck = async (companyName) => {
    setScanningCompany(companyName);
    setScanResult(null);
    try {
      const res = await fetch(
        `${API_BASE}/api/predict?company=${encodeURIComponent(companyName)}`
      );
      const json = await res.json();
      if (res.ok) setScanResult(json.data);
    } catch {
      setScanResult({
        error: "Ensure main_server.py is running on port 8000 for ML audit.",
      });
    }
  };

  // Filtered Alerts
  const filteredAlerts = alerts.filter((item) => {
    const matchesCategory =
      filterType === "ALL" ||
      (filterType === "CRITICAL" && item.severity === "CRITICAL") ||
      (filterType === "LAYOFF" && item.category === "LAYOFF") ||
      (filterType === "DISTRESS" && item.category === "FINANCIAL DISTRESS") ||
      (filterType === "WATCHLIST" && item.isWatched);

    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL").length;
  const layoffCount = alerts.filter((a) => a.category === "LAYOFF").length;
  const distressCount = alerts.filter(
    (a) => a.category === "FINANCIAL DISTRESS"
  ).length;

  return (
    <div className="flex min-h-screen bg-[#050811] text-slate-100 font-sans text-xs selection:bg-cyan-500/30">
      <Sidebar />

      <main className="relative flex-1 overflow-y-auto px-5 py-6 md:px-8">
        {/* LIVE FLOATING TOAST NOTIFICATION */}
        {toastAlert && (
          <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl border border-rose-500/50 bg-slate-900/95 p-4 shadow-[0_10px_40px_rgba(244,63,94,0.3)] backdrop-blur-xl animate-bounce">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-400">
                  Live {toastAlert.severity} Alert · {toastAlert.source}
                </span>
              </div>
              <button
                onClick={() => setToastAlert(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <p className="mt-1.5 text-xs font-medium text-white leading-snug">
              {toastAlert.title}
            </p>
          </div>
        )}

        <div className="mx-auto max-w-7xl space-y-5">
          {/* HEADER & NOTIFICATION CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-medium text-rose-300 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                Real-Time Global Layoff & Distress Notification Feed
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                Live Corporate{" "}
                <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                  Layoff & Risk Alerts
                </span>
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Auto-monitoring global news wires, Yahoo Finance equity drops &
                your custom company watchlist.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {lastUpdated && (
                <span className="text-[11px] font-mono text-slate-400">
                  Synced: {lastUpdated}
                </span>
              )}
              <button
                onClick={requestBrowserNotifications}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  notifEnabled
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    : "border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25"
                }`}
              >
                {notifEnabled
                  ? "🔔 Desktop Alerts Active"
                  : "🔕 Enable Desktop Alerts"}
              </button>
              <button
                onClick={fetchLiveAlerts}
                disabled={loading}
                className="rounded-lg border border-white/15 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition"
              >
                {loading ? "Scanning..." : "↻ Scan Now"}
              </button>
            </div>
          </div>

          {/* 3 SUMMARY ALERT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-slate-900/90 p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                  Critical Severity Alerts
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {criticalCount}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Immediate workforce cuts or sharp equity drops
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-lg">
                🚨
              </div>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-slate-900/90 p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Verified Layoff Reports
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {layoffCount}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Detected across live global news feeds
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg">
                📉
              </div>
            </div>

            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-slate-900/90 p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                  Stock Distress Signals
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {distressCount}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  30d negative momentum / high drawdown
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-lg">
                ⚡
              </div>
            </div>
          </div>

          {/* CUSTOM WATCHLIST RADAR BAR */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-white">
                Your Custom Company Alert Radar
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {watchedCompanies.map((comp) => (
                  <span
                    key={comp}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300"
                  >
                    {comp}
                    <button
                      onClick={() => handleRemoveWatchCompany(comp)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleAddWatchCompany}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={watchInput}
                onChange={(e) => setWatchInput(e.target.value)}
                placeholder="Add company to alert radar (e.g. Paytm, Wipro)..."
                className="w-64 rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition"
              >
                + Track Alerts
              </button>
            </form>
          </div>

          {/* FILTER TABS & SEARCH BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { key: "ALL", label: `All Alerts (${alerts.length})` },
                { key: "CRITICAL", label: `Critical (${criticalCount})` },
                { key: "LAYOFF", label: `Layoff News (${layoffCount})` },
                { key: "DISTRESS", label: `Stock Distress (${distressCount})` },
                { key: "WATCHLIST", label: "My Watchlist" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterType(tab.key)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                    filterType === tab.key
                      ? "bg-cyan-500 text-slate-950"
                      : "border border-white/10 bg-slate-900 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter alerts by company or keyword..."
              className="w-full sm:w-64 rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* INSTANT ML RISK MODAL / DRAWER */}
          {scanningCompany && (
            <div className="rounded-2xl border border-cyan-500/40 bg-slate-900/95 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <h3 className="text-sm font-bold text-white">
                  Live AI Risk Verification:{" "}
                  <span className="text-cyan-400">{scanningCompany}</span>
                </h3>
                <button
                  onClick={() => {
                    setScanningCompany(null);
                    setScanResult(null);
                  }}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕ Close
                </button>
              </div>

              {!scanResult ? (
                <div className="py-5 text-center space-y-2">
                  <div className="mx-auto h-7 w-7 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  <p className="text-xs text-slate-300">
                    Running FinBERT + Calibrated XGBoost on {scanningCompany}...
                  </p>
                </div>
              ) : scanResult.error ? (
                <p className="text-xs text-rose-400">{scanResult.error}</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  <div className="lg:col-span-4 rounded-xl border border-white/10 bg-slate-950 p-4 space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-400">
                      {scanResult.company} ({scanResult.ticker || "N/A"})
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">
                        {scanResult.risk_score}
                      </span>
                      <span className="text-xs text-slate-400">
                        / 100 ({scanResult.risk} RISK)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Calibrated Prob:{" "}
                      {(scanResult.probability * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div className="lg:col-span-8 rounded-xl border border-white/10 bg-slate-950 p-4 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                    {scanResult.llm_summary}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LIVE ALERTS TABLE */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center space-y-2">
                <div className="mx-auto h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                <p className="text-xs text-slate-300">
                  Scanning global layoff wires & watchlist feeds...
                </p>
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="p-10 text-center text-xs text-slate-400">
                No matching alerts found for the selected filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-950/60 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-4">Severity</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Company / Entity</th>
                      <th className="py-3 px-4">Live AlertHeadline & Signal</th>
                      <th className="py-3 px-4">Source & Time</th>
                      <th className="py-3 px-4 text-right">Verify Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs">
                    {filteredAlerts.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-white/5 transition"
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${item.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${item.dot}`}
                            />
                            {item.severity}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-300">
                          {item.category}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-bold text-white">
                          {item.company}
                          {item.isWatched && (
                            <span className="ml-1.5 rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono text-cyan-300">
                              WATCHED
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 max-w-md">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-slate-200 hover:text-cyan-300 transition line-clamp-2"
                          >
                            {item.title}
                          </a>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <p className="font-semibold text-cyan-400 text-[11px]">
                            {item.source}
                          </p>
                          <p className="font-mono text-[10px] text-slate-500">
                            {item.time}
                          </p>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => runLiveMLCheck(item.company)}
                            className="rounded-lg border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/30 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 transition"
                          >
                            AI Audit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alerts;