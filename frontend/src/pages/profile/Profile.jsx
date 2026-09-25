import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const API_BASE = "http://127.0.0.1:8000";

const DEFAULT_PROFILE = {
  name: "Vaibhav Khandelwal",
  role: "Lead AI & Full-Stack System Architect",
  organization: "LayoffRadar AI · Final Year Major Project",
  department: "B.Tech CSE (Artificial Intelligence)",
  email: "vaibhav.khandelwal@layoffradar.ai",
  location: "Delhi NCR, India",
  riskTolerance: "Conservative (Early Warning)",
  autoRefreshInterval: "90 Seconds",
};

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("layoff_user_profile");
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(profile);
  const [savedBanner, setSavedBanner] = useState(false);

  // Live Backend & Model Telemetry State
  const [telemetry, setTelemetry] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  // Synced Watchlist from Alerts Page
  const [watchedCompanies, setWatchedCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem("layoff_watched_companies");
      return saved ? JSON.parse(saved) : ["Intel", "Meta", "Boeing", "TCS"];
    } catch {
      return ["Intel", "Meta", "Boeing", "TCS"];
    }
  });
  const [newWatch, setNewWatch] = useState("");

  const fetchSystemTelemetry = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/dashboard`);
      if (res.ok) {
        const json = await res.json();
        setTelemetry(json);
        setServerOnline(true);
      } else {
        setServerOnline(false);
      }
    } catch {
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemTelemetry();
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(formState);
    localStorage.setItem("layoff_user_profile", JSON.stringify(formState));
    setIsEditing(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  const handleAddWatch = (e) => {
    e.preventDefault();
    const clean = newWatch.trim();
    if (!clean || watchedCompanies.includes(clean)) return;
    const updated = [clean, ...watchedCompanies];
    setWatchedCompanies(updated);
    localStorage.setItem("layoff_watched_companies", JSON.stringify(updated));
    setNewWatch("");
  };

  const handleRemoveWatch = (comp) => {
    const updated = watchedCompanies.filter((c) => c !== comp);
    setWatchedCompanies(updated);
    localStorage.setItem("layoff_watched_companies", JSON.stringify(updated));
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-[#050811] text-slate-100 font-sans text-xs selection:bg-cyan-500/30">
      <Sidebar />

      <main className="relative flex-1 overflow-y-auto px-5 py-6 md:px-8">
        {/* Ambient 3D Background Glows */}
        <div className="pointer-events-none fixed top-[-10%] right-[10%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="pointer-events-none fixed bottom-[-10%] left-[25%] h-80 w-80 rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-7xl space-y-5">
          {/* TOP HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300 mb-1">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    serverOnline ? "bg-emerald-400 animate-ping" : "bg-rose-500"
                  }`}
                />
                {serverOnline
                  ? "FastAPI Engine Connected · Port 8000"
                  : "FastAPI Engine Offline"}
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                Analyst Profile &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  AI Engine Telemetry
                </span>
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Manage your analyst credentials, watched corporate entities, and
                calibrated ML model configuration.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {savedBanner && (
                <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
                  ✓ Profile Saved
                </span>
              )}
              <button
                onClick={() => {
                  setFormState(profile);
                  setIsEditing(!isEditing);
                }}
                className="rounded-lg border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 transition"
              >
                {isEditing ? "Cancel Editing" : "✎ Edit Profile"}
              </button>
              <button
                onClick={fetchSystemTelemetry}
                className="rounded-lg border border-white/15 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition"
              >
                ↻ Sync Engine
              </button>
            </div>
          </div>

          {/* ROW 1: ANALYST PROFILE CARD + ML ARCHITECTURE TELEMETRY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LEFT: ANALYST IDENTITY CARD */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0b1224]/90 to-slate-950/90 p-5 backdrop-blur-xl flex flex-col justify-between">
              {!isEditing ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                      {/* 3D Glowing Avatar */}
                      <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-0.5 shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                        <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 text-xl font-black text-white">
                          {initials}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-extrabold text-white">
                            {profile.name}
                          </h2>
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                            ADMIN
                          </span>
                        </div>
                        <p className="text-xs font-medium text-cyan-400 mt-0.5">
                          {profile.role}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {profile.organization}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right font-mono text-[11px] text-slate-400">
                      <p>ID: LR-AI-2026</p>
                      <p className="text-emerald-400">Mode: Zero-Hallucination</p>
                    </div>
                  </div>

                  {/* PROFILE DETAILS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
                        Specialization / Dept
                      </p>
                      <p className="mt-0.5 font-semibold text-slate-200">
                        {profile.department}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
                        Contact / Workspace
                      </p>
                      <p className="mt-0.5 font-mono text-slate-200">
                        {profile.email}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
                        Location
                      </p>
                      <p className="mt-0.5 font-semibold text-slate-200">
                        {profile.location}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
                        Alert Sensitivity Mode
                      </p>
                      <p className="mt-0.5 font-semibold text-cyan-300">
                        {profile.riskTolerance}
                      </p>
                    </div>
                  </div>

                  {/* TECH STACK BADGES */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 mr-1">
                      Active Stack:
                    </span>
                    {[
                      "XGBoost Calibrated",
                      "ProsusAI/FinBERT",
                      "SHAP TreeExplainer",
                      "LangChain + Groq",
                      "Yahoo Finance v8",
                      "Google News RSS",
                      "FastAPI",
                      "React + Tailwind",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-slate-950 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                /* EDIT PROFILE FORM */
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <h3 className="text-sm font-bold text-cyan-400 border-b border-white/10 pb-2">
                    Update Analyst Profile
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">Role</label>
                      <input
                        type="text"
                        value={formState.role}
                        onChange={(e) =>
                          setFormState({ ...formState, role: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">
                        Organization / Project
                      </label>
                      <input
                        type="text"
                        value={formState.organization}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            organization: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">
                        Department / Specialization
                      </label>
                      <input
                        type="text"
                        value={formState.department}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            department: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">
                        Email
                      </label>
                      <input
                        type="text"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formState.location}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            location: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-4 py-1.5 text-xs font-bold text-slate-950 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT: LIVE AI MODEL & PIPELINE TELEMETRY CARD */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3.5">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Calibrated ML Pipeline Status
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Live parameters from xgboost_v2_calibrated.pkl
                    </p>
                  </div>
                  <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                    v2.0 Calibrated
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/70 px-3.5 py-2.5">
                    <span className="text-slate-400">Classifier & Imputer</span>
                    <span className="font-mono font-bold text-emerald-400">
                      XGBoost + SimpleImputer + Isotonic
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/70 px-3.5 py-2.5">
                    <span className="text-slate-400">NLP Sentiment Model</span>
                    <span className="font-mono font-bold text-cyan-300">
                      ProsusAI/finbert (Batch=16)
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/70 px-3.5 py-2.5">
                    <span className="text-slate-400">Grounded LLM Auditor</span>
                    <span className="font-mono font-bold text-indigo-300">
                      Groq (openai/gpt-oss-20b)
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/70 px-3.5 py-2.5">
                    <span className="text-slate-400">
                      Trained Feature Vector
                    </span>
                    <span className="font-mono font-bold text-white">
                      {telemetry?.kpis?.active_ml_features || 38} Active Features
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/70 px-3.5 py-2.5">
                    <span className="text-slate-400">
                      Calibrated Risk Thresholds
                    </span>
                    <span className="font-mono font-bold text-amber-300">
                      High: {telemetry?.kpis?.high_risk_threshold_pct ?? 8.9}% ·
                      Extreme:{" "}
                      {telemetry?.kpis?.extreme_risk_threshold_pct ?? 18.5}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Explainability: SHAP TreeExplainer</span>
                <span className="text-emerald-400 font-semibold">
                  ● Leakage Filter Active
                </span>
              </div>
            </div>
          </div>

          {/* ROW 2: LIVE DATASET METRICS (REPLACES DUMMY ACCOUNT STATS) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Historical Layoff Events
              </p>
              <p className="mt-1 text-xl font-black text-white">
                {telemetry?.kpis?.total_verified_events?.toLocaleString() ||
                  "3,200+"}
              </p>
              <p className="mt-0.5 text-[11px] text-cyan-400">
                Indexed in layoff_events.csv
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Total Impacted Headcount
              </p>
              <p className="mt-1 text-xl font-black text-rose-400">
                {telemetry?.kpis?.total_employees_impacted?.toLocaleString() ||
                  "610,000+"}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Verified Workforce Reductions
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Watched Radar Entities
              </p>
              <p className="mt-1 text-xl font-black text-amber-300">
                {watchedCompanies.length} Companies
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Synced with Live Alert Feed
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Global Equity Coverage
              </p>
              <p className="mt-1 text-xl font-black text-emerald-400">
                Unlimited
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Live NYSE, NASDAQ, NSE, BSE
              </p>
            </div>
          </div>

          {/* ROW 3: WATCHLIST MANAGER + LIVE SYSTEM ACTIVITY TIMELINE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* WATCHED COMPANIES & TOP MODEL FEATURES */}
            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/80 p-5 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Synced Alert Watchlist
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 mb-3">
                  Companies added here are automatically monitored on your
                  Alerts page.
                </p>

                <form onSubmit={handleAddWatch} className="flex gap-2 mb-3.5">
                  <input
                    type="text"
                    value={newWatch}
                    onChange={(e) => setNewWatch(e.target.value)}
                    placeholder="Add company (e.g. Infosys, Nvidia, Wipro)..."
                    className="w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-cyan-500 hover:bg-cyan-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition whitespace-nowrap"
                  >
                    + Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-2">
                  {watchedCompanies.map((comp) => (
                    <div
                      key={comp}
                      className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300"
                    >
                      <span>{comp}</span>
                      <button
                        onClick={() => handleRemoveWatch(comp)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOP XGBOOST FEATURE IMPORTANCE FROM CSV */}
              {telemetry?.top_model_features?.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
                    Top Trained XGBoost Feature Weights
                  </p>
                  <div className="space-y-2">
                    {telemetry.top_model_features.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-slate-950/70 px-3 py-1.5 text-xs"
                      >
                        <span className="font-mono text-slate-300">
                          {item.feature}
                        </span>
                        <span className="font-mono font-bold text-cyan-400">
                          {item.importance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LIVE ACTIVITY & VERIFIED LAYOFF TIMELINE */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Live Telemetry & Verified Layoff Timeline
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Real-time global layoff wire combined with verified
                    historical dataset records
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                  Live Sync
                </span>
              </div>

              {loading ? (
                <div className="py-10 text-center text-xs text-slate-400">
                  Loading live activity stream...
                </div>
              ) : (
                <div className="space-y-3">
                  {(telemetry?.live_global_alerts || [])
                    .slice(0, 4)
                    .map((alert, i) => (
                      <a
                        key={i}
                        href={alert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-950/70 hover:border-cyan-500/40 p-3 transition"
                      >
                        <div className="mt-1 h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                            <span className="font-semibold text-cyan-400">
                              LIVE WIRE · {alert.source}
                            </span>
                            <span className="font-mono">
                              {alert.published_at}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-200 truncate">
                            {alert.title}
                          </p>
                        </div>
                      </a>
                    ))}

                  {(telemetry?.recent_recorded_events || [])
                    .slice(0, 3)
                    .map((ev, idx) => (
                      <div
                        key={`ev-${idx}`}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-indigo-400" />
                          <div>
                            <p className="text-xs font-bold text-white">
                              {ev.company}{" "}
                              <span className="font-normal text-slate-400">
                                ({ev.industry})
                              </span>
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono">
                              Verified Dataset Entry · {ev.date}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-lg bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 font-mono text-[11px] font-bold text-rose-300">
                          {ev.laid_off > 0
                            ? `-${ev.laid_off.toLocaleString()} jobs`
                            : "Recorded"}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;