import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const Dashboard = () => {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Instant Live Company Audit Modal / Drawer state
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/dashboard`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || "Failed to load live dashboard");
      setDashData(json);
    } catch (err) {
      setError(
        "Backend Server Offline: Make sure `py main_server.py` is running on http://127.0.0.1:8000"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const runInstantAudit = async (companyName) => {
    setSelectedCompany(companyName);
    setAuditLoading(true);
    setAuditResult(null);
    try {
      const res = await fetch(
        `${API_BASE}/api/predict?company=${encodeURIComponent(companyName)}`
      );
      const json = await res.json();
      if (res.ok) {
        setAuditResult(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAuditLoading(false);
    }
  };

  const maxIndustryHeadcount =
    dashData?.top_industries?.reduce((max, i) => Math.max(max, i.laid_off), 1) || 1;

  return (
    <div className="flex min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-cyan-500/30">
      <Sidebar />

      <main className="relative flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-9">
        {/* Ambient 3D Glows */}
        <div className="pointer-events-none fixed top-[-8%] right-[8%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="pointer-events-none fixed bottom-[-8%] left-[20%] h-96 w-96 rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl space-y-8">
          {/* TOP COMMAND BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Live Telemetry · Yahoo Finance + Google News RSS + Calibrated XGBoost
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Global Layoff &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  Market Distress Command Center
                </span>
              </h1>
            </div>

            <button
              onClick={fetchDashboard}
              disabled={loading}
              className="self-start md:self-auto flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition shadow-lg"
            >
              <span className={loading ? "animate-spin" : ""}>↻</span>
              {loading ? "Syncing Live Feeds..." : "Refresh Live Data"}
            </button>
          </div>

          {/* ERROR BANNER */}
          {error && (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 text-sm text-rose-300">
              {error}
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-16 text-center space-y-4 backdrop-blur-xl">
              <div className="mx-auto h-12 w-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
              <p className="text-base font-semibold text-slate-200">
                Fetching Live Stock Market Tickers, Global Layoff Wire & Dataset Telemetry...
              </p>
            </div>
          )}

          {dashData && !loading && (
            <>
              {/* 4 FACTUAL KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Verified Layoff Events
                  </p>
                  <p className="mt-2 text-3xl font-black text-white">
                    {dashData.kpis.total_verified_events.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-cyan-400">
                    Historical Training Corpus
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Workforce Impacted
                  </p>
                  <p className="mt-2 text-3xl font-black text-rose-400">
                    {dashData.kpis.total_employees_impacted.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Cumulative Recorded Job Cuts
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Unique Indexed Companies
                  </p>
                  <p className="mt-2 text-3xl font-black text-indigo-400">
                    {dashData.kpis.tracked_corporations.toLocaleString()}+
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    + Unlimited Live Global Tickers
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    XGBoost Calibrated Engine
                  </p>
                  <p className="mt-2 text-3xl font-black text-emerald-400">
                    {dashData.kpis.active_ml_features} Features
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    High Threshold: {dashData.kpis.high_risk_threshold_pct}% · Extreme:{" "}
                    {dashData.kpis.extreme_risk_threshold_pct}%
                  </p>
                </div>
              </div>

              {/* LIVE MARKET WATCHLIST + INSTANT ML AUDIT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-slate-900/80 p-7 backdrop-blur-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Live Global Equity Distress Monitor (Yahoo Finance)
                      </h2>
                      <p className="text-xs text-slate-400">
                        Real-time 30-day stock momentum, 90-day drawdown & annualized volatility. Click any company to run full ML + FinBERT audit.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400">
                          <th className="py-3 px-3">Company</th>
                          <th className="py-3 px-3">Live Price</th>
                          <th className="py-3 px-3">30d Return</th>
                          <th className="py-3 px-3">90d Drawdown</th>
                          <th className="py-3 px-3">Volatility</th>
                          <th className="py-3 px-3">Market Signal</th>
                          <th className="py-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {dashData.live_market_watchlist.map((stock) => (
                          <tr
                            key={stock.ticker}
                            className="hover:bg-white/5 transition"
                          >
                            <td className="py-3.5 px-3">
                              <p className="font-bold text-white">{stock.name}</p>
                              <span className="text-xs font-mono text-cyan-400">
                                {stock.ticker} · {stock.sector}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-mono font-semibold text-slate-200">
                              ${stock.price}
                            </td>
                            <td
                              className={`py-3.5 px-3 font-mono font-bold ${
                                stock.return_30d >= 0
                                  ? "text-emerald-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {stock.return_30d >= 0 ? "+" : ""}
                              {stock.return_30d}%
                            </td>
                            <td className="py-3.5 px-3 font-mono text-amber-300">
                              {stock.drawdown_90d}%
                            </td>
                            <td className="py-3.5 px-3 font-mono text-slate-300">
                              {stock.volatility}%
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                                  stock.distress_signal === "ELEVATED"
                                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                                    : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                }`}
                              >
                                {stock.distress_signal}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <button
                                onClick={() => runInstantAudit(stock.name)}
                                className="rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-500/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition"
                              >
                                Run ML Audit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* INDUSTRY LAYOFF DISTRIBUTION (FROM ACTUAL DATASET) */}
                <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-slate-900/80 p-7 backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Sector Layoff Concentration
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5 mb-5">
                      Verified headcount reductions by industry from historical dataset
                    </p>

                    <div className="space-y-4">
                      {dashData.top_industries.map((ind, i) => {
                        const pct = Math.min(
                          100,
                          Math.max(10, (ind.laid_off / maxIndustryHeadcount) * 100)
                        );
                        return (
                          <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-slate-200">
                                {ind.industry}
                              </span>
                              <span className="font-mono text-slate-400">
                                {ind.laid_off.toLocaleString()} laid off ({ind.events} events)
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* TOP TRAINED XGBOOST FEATURES */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                      Top Trained Model Predictors
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dashData.top_model_features.map((f, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-slate-950/80 px-2.5 py-1 text-[11px] font-mono text-slate-300"
                        >
                          {f.feature}: {f.importance}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* INSTANT ML AUDIT DRAWER (APPEARS WHEN USER CLICKS 'RUN ML AUDIT') */}
              {(auditLoading || auditResult) && (
                <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-[#0b1329] to-slate-950 p-7 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <h3 className="text-lg font-bold text-white">
                      Live ML + FinBERT Audit:{" "}
                      <span className="text-cyan-400">{selectedCompany}</span>
                    </h3>
                    <button
                      onClick={() => {
                        setAuditResult(null);
                        setSelectedCompany(null);
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {auditLoading ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="mx-auto h-9 w-9 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
                      <p className="text-sm text-slate-300">
                        Running live FinBERT sentiment on 40 news articles + SHAP explainability for {selectedCompany}...
                      </p>
                    </div>
                  ) : (
                    auditResult && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-slate-400">
                              {auditResult.ticker} · {auditResult.industry}
                            </span>
                            <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-3 py-0.5 text-xs font-bold text-cyan-300">
                              {auditResult.risk} RISK
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-white">
                              {auditResult.risk_score}
                            </span>
                            <span className="text-xs text-slate-400">
                              / 100 Risk Index (Prob: {(auditResult.probability * 100).toFixed(2)}%)
                            </span>
                          </div>
                        </div>

                        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-xs md:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                          {auditResult.llm_summary}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* BOTTOM ROW: LIVE GLOBAL LAYOFF NEWS WIRE + VERIFIED HISTORICAL LOG */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LIVE GOOGLE NEWS RSS GLOBAL LAYOFF ALERTS */}
                <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-900/80 p-7 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Live Global Layoff & Restructuring Wire
                      </h2>
                      <p className="text-xs text-slate-400">
                        Real-time articles scraped from Google News RSS (Last 7 Days)
                      </p>
                    </div>
                    <span className="rounded-full bg-rose-500/15 border border-rose-500/30 px-3 py-1 text-[11px] font-semibold text-rose-300">
                      Live Feed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {dashData.live_global_alerts.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl border border-white/5 bg-slate-950/70 hover:border-cyan-500/40 p-4 transition"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-semibold text-cyan-400">
                            {item.source}
                          </span>
                          <span className="font-mono">{item.published_at}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-200 hover:text-white">
                          {item.title}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* VERIFIED HISTORICAL LAYOFF RECORDS FROM CSV */}
                <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-900/80 p-7 backdrop-blur-xl">
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-white">
                      Verified Dataset Layoff Log
                    </h2>
                    <p className="text-xs text-slate-400">
                      Recorded corporate workforce reductions from training database
                    </p>
                  </div>

                  <div className="space-y-3">
                    {dashData.recent_recorded_events.map((ev, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/70 p-4"
                      >
                        <div>
                          <p className="font-bold text-white text-sm">
                            {ev.company}
                          </p>
                          <p className="text-xs text-slate-400">
                            {ev.industry} · {ev.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="rounded-xl bg-rose-500/15 border border-rose-500/30 px-3 py-1 font-mono text-xs font-bold text-rose-300">
                            {ev.laid_off > 0
                              ? `-${ev.laid_off.toLocaleString()} jobs`
                              : "Reported"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;