import {
  TrendingUp,
  DollarSign,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";

const metrics = [
  {
    title: "Revenue Growth",
    value: "+12.4%",
    color: "text-green-400",
    icon: <TrendingUp size={20} />,
  },
  {
    title: "Profit Margin",
    value: "18.6%",
    color: "text-cyan-400",
    icon: <DollarSign size={20} />,
  },
  {
    title: "Stock Performance",
    value: "+6.8%",
    color: "text-green-400",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Cash Flow",
    value: "Healthy",
    color: "text-blue-400",
    icon: <CircleDollarSign size={20} />,
  },
];

const FinancialHealth = () => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Financial Health
        </h2>

        <TrendingUp className="text-green-400" size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-800 p-4"
          >
            <div className="flex items-center justify-between">
              <span className={item.color}>{item.icon}</span>

              <span className={`text-lg font-bold ${item.color}`}>
                {item.value}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-400">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialHealth;