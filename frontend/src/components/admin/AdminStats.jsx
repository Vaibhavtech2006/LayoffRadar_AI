import {
  Users,
  Building2,
  Bell,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Registered Users",
    value: "1,248",
    icon: Users,
    color: "text-cyan-400",
  },
  {
    title: "Tracked Companies",
    value: "387",
    icon: Building2,
    color: "text-green-400",
  },
  {
    title: "Active Alerts",
    value: "124",
    icon: Bell,
    color: "text-yellow-400",
  },
  {
    title: "AI Predictions",
    value: "5,432",
    icon: Activity,
    color: "text-red-400",
  },
];

const AdminStats = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-slate-400">
                {item.title}
              </h3>

              <Icon
                size={22}
                className={item.color}
              />
            </div>

            <h2 className="mt-4 text-3xl font-bold">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;