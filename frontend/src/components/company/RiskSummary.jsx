import {
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const risks = [
  {
    title: "Financial Health",
    value: "Healthy",
    icon: ShieldCheck,
    color: "text-green-400",
  },
  {
    title: "Layoff Risk",
    value: "Low",
    icon: AlertTriangle,
    color: "text-yellow-400",
  },
  {
    title: "Hiring Trend",
    value: "Increasing",
    icon: TrendingUp,
    color: "text-cyan-400",
  },
  {
    title: "Market Stability",
    value: "Stable",
    icon: TrendingDown,
    color: "text-purple-400",
  },
];

const RiskSummary = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        AI Risk Summary
      </h2>

      <div className="space-y-4">
        {risks.map((risk) => {
          const Icon = risk.icon;

          return (
            <div
              key={risk.title}
              className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={22}
                  className={risk.color}
                />

                <div>
                  <h3 className="font-medium">
                    {risk.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {risk.value}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                Active
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
        <h3 className="font-semibold text-cyan-400">
          AI Prediction
        </h3>

        <p className="mt-2 text-sm text-slate-300 leading-6">
          Based on current financial indicators, hiring activity,
          revenue growth and recent market trends, the company
          has a low probability of large-scale layoffs over the
          next 6–12 months.
        </p>
      </div>
    </div>
  );
};

export default RiskSummary;