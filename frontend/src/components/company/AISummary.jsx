import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    color: "text-green-400",
    title: "Financial Position",
    description:
      "Revenue and profitability remain strong with stable cash reserves.",
  },
  {
    icon: TrendingUp,
    color: "text-cyan-400",
    title: "Growth Outlook",
    description:
      "Cloud services and AI products continue to drive long-term growth.",
  },
  {
    icon: AlertTriangle,
    color: "text-yellow-400",
    title: "Risk Factors",
    description:
      "Global economic uncertainty may slow hiring during future quarters.",
  },
];

const AISummary = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center gap-3">
        <BrainCircuit
          className="text-cyan-400"
          size={26}
        />

        <h2 className="text-xl font-bold">
          AI Executive Summary
        </h2>
      </div>

      <div className="space-y-5">
        {points.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-lg bg-slate-800 p-4"
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={item.color}
                  size={22}
                />

                <h3 className="font-semibold">
                  {item.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-5">
        <h3 className="font-semibold text-cyan-400">
          Overall AI Assessment
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          LayoffRadar AI estimates that the organization currently demonstrates
          strong financial health, consistent revenue growth, positive hiring
          momentum and a relatively low probability of large-scale workforce
          reductions over the next 6–12 months. Continued monitoring of market
          conditions and quarterly financial performance is recommended.
        </p>
      </div>
    </div>
  );
};

export default AISummary;