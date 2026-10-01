import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const BENTO_PROMPTS = [
  {
    tag: "LAYOFF RECOVERY",
    title: "I got laid off recently",
    desc: "Analyze my resume, match me with low-layoff-risk companies & rewrite my bullets.",
    prompt:
      "I got laid off recently. Analyze my resume, suggest low-layoff-risk companies, and tailor my resume bullets.",
    accent: "from-rose-500/20 to-orange-500/5 border-rose-500/30 text-rose-300",
  },
  {
    tag: "EARLY WARNING PIVOT",
    title: "Fear layoffs at my current job",
    desc: "Audit my current company's live layoff risk and find safer roles for my skillset.",
    prompt:
      "Mujhe dar lag raha hai meri current company me layoff hone wala hai. Check my risk & suggest safer jobs.",
    accent: "from-amber-500/20 to-yellow-500/5 border-amber-500/30 text-amber-300",
  },
  {
    tag: "ATS RESUME TAILOR",
    title: "Tailor resume for AI & Full-Stack",
    desc: "Generate high-impact ATS bullet points using TF-IDF keywords for stable tech giants.",
    prompt:
      "Rewrite my resume summary and project bullets for financially stable AI & Full-Stack roles.",
    accent: "from-cyan-500/20 to-blue-500/5 border-cyan-500/30 text-cyan-300",
  },
  {
    tag: "FINANCIAL IMMUNITY",
    title: "Top layoff-safe companies right now",
    desc: "Rank global employers with >80% financial safety score and positive 90d momentum.",
    prompt:
      "Which tech companies currently have the highest financial safety score and lowest layoff probability?",
    accent:
      "from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-300",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [resumeText, setResumeText] = useState(() => {
    return localStorage.getItem("layoff_user_resume") || "";
  });
  const [resumeFileName, setResumeFileName] = useState("");
  const [vaultOpen, setVaultOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const raw = String(event.target?.result || "");
      const cleaned = raw
        .replace(/[^\x20-\x7E\n\r]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      setResumeText(cleaned.slice(0, 6000));
      localStorage.setItem("layoff_user_resume", cleaned.slice(0, 6000));
    };
    reader.readAsText(file);
  };

  const extractDetectedSkills = (text) => {
    if (!text) return [];
    const skillBank = [
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Java",
      "C++",
      "SQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Kubernetes",
      "Machine Learning",
      "XGBoost",
      "LangChain",
      "FastAPI",
      "Django",
      "Tailwind",
      "Git",
      "Linux",
      "NLP",
      "FinBERT",
      "TensorFlow",
      "PyTorch",
    ];
    return skillBank.filter((s) =>
      text.toLowerCase().includes(s.toLowerCase())
    );
  };

  const detectedSkills = extractDetectedSkills(resumeText);

  const sendMessage = async (customPrompt) => {
    const textToSend = (customPrompt ?? input).trim();
    if (!textToSend || loading) return;

    const userMsg = {
      role: "user",
      text: textToSend,
      companyTag: currentCompany,
      hasResume: Boolean(resumeText.trim()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/career-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          resume_text: resumeText,
          current_company: currentCompany,
        }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.detail || "Failed to run Career Copilot");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.ai_reply,
          companyAudit: data.current_company_audit,
          safeCompanies: data.safe_companies || [],
          matchedJobs: data.matched_jobs || [],
          algorithms: data.algorithms_used || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Backend Server Offline or Not Restarted: Make sure `/api/career-chat` is added in `main_server.py` and `py main_server.py` is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#040711] text-slate-100 font-sans text-xs overflow-hidden selection:bg-cyan-500/30">
      <Sidebar />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* DEEP AMBIENT NEURAL GLOWS */}
        <div className="pointer-events-none absolute top-[-12%] left-[35%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[15%] h-96 w-96 rounded-full bg-indigo-600/10 blur-[150px]" />

        {/* TOP MINIMALIST GLASS NAVBAR */}
        <header className="relative z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/60 px-6 py-3.5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <span className="text-sm font-black text-slate-950">AI</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold tracking-tight text-white">
                  LayoffRadar{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                    Career Copilot
                  </span>
                </h1>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-300">
                  TF-IDF + RAG v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Zero-Hallucination Layoff Recovery · Live Job Matching · ATS
                Resume Architect
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition"
              >
                + New Session
              </button>
            )}
            <button
              onClick={() => setVaultOpen(!vaultOpen)}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition shadow-lg ${
                resumeText
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                  : "border-cyan-500/40 bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25"
              }`}
            >
              <span>📄</span>
              <span>
                {resumeText
                  ? `Resume Active (${detectedSkills.length} Skills)`
                  : "Upload Resume Vault"}
              </span>
            </button>
          </div>
        </header>

        {/* SLIDE-OVER RESUME & SKILL VAULT DRAWER */}
        {vaultOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="h-full w-full max-w-md border-l border-white/15 bg-[#080d1a] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-base font-extrabold text-white">
                      Resume & Skill RAG Vault
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Used by TF-IDF Cosine Similarity to match low-layoff-risk
                      jobs
                    </p>
                  </div>
                  <button
                    onClick={() => setVaultOpen(false)}
                    className="rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* File Upload Dropzone */}
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 p-5 text-center transition">
                  <span className="text-sm font-bold text-cyan-300">
                    📤 {resumeFileName || "Click to Upload Resume (.txt / .md / .pdf)"}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Or paste your full resume text directly below
                  </span>
                  <input
                    type="file"
                    accept=".txt,.md,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-slate-300">
                      Resume Content
                    </label>
                    {resumeText && (
                      <button
                        onClick={() => {
                          setResumeText("");
                          setResumeFileName("");
                          localStorage.removeItem("layoff_user_resume");
                        }}
                        className="text-[11px] text-rose-400 hover:underline"
                      >
                        Clear Resume
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={10}
                    value={resumeText}
                    onChange={(e) => {
                      setResumeText(e.target.value);
                      localStorage.setItem("layoff_user_resume", e.target.value);
                    }}
                    placeholder="Paste your skills, projects, and work experience here..."
                    className="w-full rounded-xl border border-white/15 bg-slate-950 p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                </div>

                {detectedSkills.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-slate-950 p-3.5 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      Auto-Extracted Skills ({detectedSkills.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {detectedSkills.map((sk) => (
                        <span
                          key={sk}
                          className="rounded-md bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 font-mono text-[10px] text-cyan-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setVaultOpen(false)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-xs font-extrabold text-slate-950 shadow-lg"
              >
                Save & Return to Copilot
              </button>
            </div>
          </div>
        )}

        {/* MAIN CENTER SCROLLABLE CANVAS */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            {/* EMPTY STATE: CENTER 3D HOLOGRAPHIC CHATBOT + BENTO GRID */}
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                {/* 3D HOLOGRAPHIC AI BOT CENTERPIECE */}
                <div className="relative flex h-60 w-60 items-center justify-center">
                  {/* Outer 3D Orbital Rings */}
                  <div className="absolute inset-2 rounded-full border border-cyan-500/25 animate-[spin_16s_linear_infinite]" />
                  <div className="absolute inset-6 rounded-full border border-dashed border-indigo-400/35 animate-[spin_22s_linear_infinite_reverse]" />
                  <div className="absolute inset-12 rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-500/25 to-emerald-500/10 blur-2xl animate-pulse" />

                  {/* Floating 3D Badges around the Bot */}
                  <div className="absolute top-4 -left-4 rounded-xl border border-cyan-500/30 bg-slate-900/90 px-2.5 py-1 font-mono text-[10px] text-cyan-300 shadow-lg backdrop-blur-md">
                    TF-IDF Cosine Match
                  </div>
                  <div className="absolute top-6 -right-6 rounded-xl border border-emerald-500/30 bg-slate-900/90 px-2.5 py-1 font-mono text-[10px] text-emerald-300 shadow-lg backdrop-blur-md">
                    &gt;75% Safety Filter
                  </div>
                  <div className="absolute bottom-6 -left-6 rounded-xl border border-indigo-500/30 bg-slate-900/90 px-2.5 py-1 font-mono text-[10px] text-indigo-300 shadow-lg backdrop-blur-md">
                    Live Remotive API
                  </div>

                  {/* 3D RENDERED AI ROBOT HEAD / CORE SVG */}
                  <svg
                    viewBox="0 0 240 240"
                    className="relative z-10 h-48 w-48 drop-shadow-[0_25px_35px_rgba(6,182,212,0.45)]"
                  >
                    <defs>
                      {/* 3D Metallic / Glossy Sphere Gradients */}
                      <radialGradient
                        id="botHeadGrad"
                        cx="35%"
                        cy="25%"
                        r="70%"
                      >
                        <stop offset="0%" stopColor="#e0f2fe" />
                        <stop offset="35%" stopColor="#38bdf8" />
                        <stop offset="75%" stopColor="#1e1b4b" />
                        <stop offset="100%" stopColor="#090d16" />
                      </radialGradient>

                      <linearGradient
                        id="visorGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="50%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#1e1b4b" />
                      </linearGradient>

                      <linearGradient
                        id="eyeGlow"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>

                      <radialGradient
                        id="floorShadow"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#06b6d4"
                          stopOpacity="0.45"
                        />
                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>

                    {/* Levitating 3D Floor Shadow */}
                    <ellipse
                      cx="120"
                      cy="212"
                      rx="55"
                      ry="10"
                      fill="url(#floorShadow)"
                    />

                    {/* Antenna / Neural Crown */}
                    <line
                      x1="120"
                      y1="26"
                      x2="120"
                      y2="52"
                      stroke="#38bdf8"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="120"
                      cy="22"
                      r="7"
                      fill="#22d3ee"
                      className="animate-ping"
                       style={{ animationDuration: "2.5s" }}
                    />
                    <circle cx="120" cy="22" r="6" fill="#ffffff" />

                    {/* Side 3D Acoustic / Neural Pods */}
                    <rect
                      x="34"
                      y="98"
                      width="16"
                      height="38"
                      rx="8"
                      fill="url(#botHeadGrad)"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="190"
                      y="98"
                      width="16"
                      height="38"
                      rx="8"
                      fill="url(#botHeadGrad)"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />

                    {/* Main 3D Glossy Bot Head */}
                    <rect
                      x="46"
                      y="50"
                      width="148"
                      height="126"
                      rx="52"
                      fill="url(#botHeadGrad)"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="2"
                    />

                    {/* 3D Specular Highlight on Forehead */}
                    <path
                      d="M 78 64 Q 120 54 162 64"
                      fill="none"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Recessed Glass Visor Faceplate */}
                    <rect
                      x="62"
                      y="78"
                      width="116"
                      height="70"
                      rx="30"
                      fill="url(#visorGrad)"
                      stroke="#22d3ee"
                      strokeWidth="1.8"
                    />

                    {/* Glowing Cybernetic Eyes */}
                    <rect
                      x="82"
                      y="102"
                      width="24"
                      height="14"
                      rx="7"
                      fill="url(#eyeGlow)"
                    />
                    <rect
                      x="134"
                      y="102"
                      width="24"
                      height="14"
                      rx="7"
                      fill="url(#eyeGlow)"
                    />

                    {/* Eye Specular Sparks */}
                    <circle cx="89" cy="107" r="2.5" fill="#ffffff" />
                    <circle cx="141" cy="107" r="2.5" fill="#ffffff" />

                    {/* Digital Voice / Smile Waveform inside Visor */}
                    <path
                      d="M 102 132 Q 120 140 138 132"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Floating 3D Neck / Core Ring */}
                    <ellipse
                      cx="120"
                      cy="188"
                      rx="32"
                      ry="8"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3"
                      opacity="0.8"
                    />
                  </svg>
                </div>

                {/* CENTER WELCOME HEADINGS */}
                <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-white">
                  How can I protect your{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                    career today?
                  </span>
                </h2>
                <p className="mt-2 max-w-xl text-xs md:text-sm text-slate-400 leading-relaxed">
                  Tell me if you were laid off or feel at risk. I use{" "}
                  <span className="text-slate-200 font-semibold">
                    TF-IDF Cosine Similarity
                  </span>{" "}
                  &{" "}
                  <span className="text-slate-200 font-semibold">
                    Yahoo Finance Stability Audits
                  </span>{" "}
                  to match your resume with layoff-resistant companies.
                </p>

                {/* 2x2 MODERN BENTO PROMPT CARDS */}
                <div className="mt-7 grid w-full grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                  {BENTO_PROMPTS.map((card, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(card.prompt)}
                      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${card.accent} bg-slate-900/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-xl`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-90">
                          {card.tag}
                        </span>
                        <span className="text-xs opacity-60 group-hover:translate-x-1 transition">
                          →
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-sm font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-400 leading-snug">
                        {card.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ACTIVE CONVERSATION STREAM */
              <div className="space-y-6 pb-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3.5 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Assistant 3D Mini Avatar */}
                    {msg.role === "assistant" && (
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                        <span className="text-[11px] font-black text-slate-950">
                          AI
                        </span>
                      </div>
                    )}

                    <div
                      className={`max-w-3xl rounded-2xl p-5 space-y-4 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-lg"
                          : "border border-white/10 bg-slate-900/85 text-slate-200 backdrop-blur-xl shadow-xl"
                      }`}
                    >
                      {msg.role === "user" &&
                        (msg.companyTag || msg.hasResume) && (
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                            {msg.companyTag && (
                              <span className="rounded-md bg-slate-950/20 px-2 py-0.5">
                                🏢 Company: {msg.companyTag}
                              </span>
                            )}
                            {msg.hasResume && (
                              <span className="rounded-md bg-slate-950/20 px-2 py-0.5">
                                📄 Resume Attached
                              </span>
                            )}
                          </div>
                        )}

                      {/* 1. Current Company Risk Audit Banner */}
                      {msg.companyAudit && (
                        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                              Live Layoff Risk Audit (Your Company)
                            </p>
                            <p className="text-sm font-extrabold text-white mt-0.5">
                              {msg.companyAudit.company} (
                              {msg.companyAudit.ticker})
                            </p>
                          </div>
                          <span className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-3 py-1 font-mono text-xs font-black text-amber-300">
                            {msg.companyAudit.risk} RISK (
                            {msg.companyAudit.risk_score}/100)
                          </span>
                        </div>
                      )}

                      {/* 2. Low-Layoff-Risk Recommended Employers */}
                      {msg.safeCompanies?.length > 0 && (
                        <div className="space-y-2.5">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                            🛡️ Financially Safe Employers Matched to Your Resume
                            (TF-IDF + Yahoo Finance)
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {msg.safeCompanies.map((comp, idx) => (
                              <div
                                key={idx}
                                className="rounded-xl border border-emerald-500/30 bg-slate-950/80 p-3.5 flex flex-col justify-between"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-bold text-white text-xs">
                                      {comp.company}{" "}
                                      <span className="font-mono text-[10px] text-cyan-400">
                                        ({comp.ticker})
                                      </span>
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                      90d Return:{" "}
                                      <span className="text-emerald-400 font-mono">
                                        {comp.return_90d >= 0 ? "+" : ""}
                                        {comp.return_90d}%
                                      </span>{" "}
                                      · Vol: {comp.volatility}%
                                    </p>
                                  </div>
                                  <span className="rounded-md bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                                    {comp.safety_score}% Safe
                                  </span>
                                </div>

                                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                                  <span className="font-mono text-[10px] text-cyan-300">
                                    TF-IDF Skill Match: {comp.skill_match_pct}%
                                  </span>
                                  <a
                                    href={comp.careers_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 transition"
                                  >
                                    Jobs ↗
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Live Open Jobs */}
                      {msg.matchedJobs?.length > 0 && (
                        <div className="space-y-2.5">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                            💼 Live Verified Open Roles (Remotive & TheMuse API)
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {msg.matchedJobs.map((job, jIdx) => (
                              <a
                                key={jIdx}
                                href={job.url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-white/10 bg-slate-950/70 hover:border-cyan-500/40 p-3.5 transition block"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="font-bold text-white text-xs line-clamp-1">
                                    {job.title}
                                  </p>
                                  <span className="shrink-0 rounded bg-cyan-500/15 border border-cyan-500/30 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                                    {job.match_score}% Match
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-300 mt-0.5">
                                  {job.company} ·{" "}
                                  <span className="text-slate-400">
                                    {job.location}
                                  </span>
                                </p>
                                <p className="text-[10px] font-mono text-emerald-400 mt-1">
                                  {job.source} · Apply Now ↗
                                </p>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 4. Grounded AI Reply */}
                      <div className="whitespace-pre-line leading-relaxed text-xs md:text-[13px]">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 max-w-md">
                    <div className="h-5 w-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    <p className="text-xs text-slate-300">
                      Computing TF-IDF Vector Similarity, Auditing Employer
                      Safety & Tailoring Resume...
                    </p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM FLOATING BIG-TECH COMMAND DOCK */}
        <div className="relative z-20 px-4 pb-5 pt-2 md:px-8 bg-gradient-to-t from-[#040711] via-[#040711]/95 to-transparent">
          <div className="mx-auto max-w-4xl rounded-2xl border border-white/15 bg-slate-900/90 p-2.5 shadow-[0_10px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Top Context Strip Inside Command Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 px-1">
              <div className="flex flex-wrap items-center gap-2">
                {/* Inline Company Context Pill */}
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-950/90 px-2.5 py-1">
                  <span className="text-[11px] text-slate-400">🏢 Company:</span>
                  <input
                    type="text"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    placeholder="e.g. Intel, Paytm, Meta..."
                    className="w-32 bg-transparent text-[11px] font-semibold text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                {/* Inline Resume Attachment Trigger */}
                <button
                  type="button"
                  onClick={() => setVaultOpen(true)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${
                    resumeText
                      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                      : "border-white/10 bg-slate-950/90 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300"
                  }`}
                >
                  <span>📎</span>
                  <span>
                    {resumeText
                      ? `Resume Attached (${detectedSkills.length} skills)`
                      : "Attach / Paste Resume"}
                  </span>
                </button>
              </div>

              <span className="hidden sm:inline font-mono text-[10px] text-slate-500">
                Zero-Hallucination RAG
              </span>
            </div>

            {/* Main Prompt Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Career Copilot to audit your company risk, match safe jobs, or tailor your resume..."
                className="flex-1 bg-transparent px-3 py-2 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition disabled:opacity-50"
              >
                <span>{loading ? "Thinking..." : "Send"}</span>
                <span>↗</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;