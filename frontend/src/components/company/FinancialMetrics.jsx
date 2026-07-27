import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

const metrics = [
  {
    title: "Revenue",
    value: "$211.9B",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Profit",
    value: "$88.1B",
    icon: TrendingUp,
    color: "text-cyan-400",
  },
  {
    title: "Debt",
    value: "$59.7B",
    icon: Wallet,
    color: "text-yellow-400",
  },
  {
    title: "Growth",
    value: "14.8%",
    icon: TrendingUp,
    color: "text-purple-400",
  },
  {
    title: "Layoff Probability",
    value: "18%",
    icon: TrendingDown,
    color: "text-red-400",
  },
  {
    title: "Hiring Trend",
    value: "Positive",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
];

const FinancialMetrics = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Financial Metrics
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-lg bg-slate-800 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-slate-400">
                  {metric.title}
                </h3>

                <Icon
                  size={20}
                  className={metric.color}
                />
              </div>

              <p className="mt-4 text-2xl font-bold">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialMetrics;