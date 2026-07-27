import {
  Activity,
  Bell,
  Eye,
  Bot,
} from "lucide-react";

const stats = [
  {
    title: "AI Analyses",
    value: 27,
    icon: Bot,
  },
  {
    title: "Watchlist",
    value: 12,
    icon: Eye,
  },
  {
    title: "Alerts",
    value: 9,
    icon: Bell,
  },
  {
    title: "Reports",
    value: 18,
    icon: Activity,
  },
];

const AccountStats = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <Icon
              className="text-cyan-400"
              size={24}
            />

            <h2 className="mt-4 text-3xl font-bold">
              {item.value}
            </h2>

            <p className="mt-2 text-slate-400">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AccountStats;