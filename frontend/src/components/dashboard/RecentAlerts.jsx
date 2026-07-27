import {
  AlertTriangle,
  Info,
  CheckCircle2,
} from "lucide-react";

const alerts = [
  {
    title: "Hiring slowdown detected",
    type: "Warning",
    icon: <AlertTriangle size={18} />,
    color: "text-yellow-400",
  },
  {
    title: "Quarterly earnings announced",
    type: "Information",
    icon: <Info size={18} />,
    color: "text-blue-400",
  },
  {
    title: "Market sentiment improved",
    type: "Positive",
    icon: <CheckCircle2 size={18} />,
    color: "text-green-400",
  },
];

const RecentAlerts = () => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-semibold text-white">
        Recent Alerts
      </h2>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg bg-slate-800 p-4"
          >
            <div className={alert.color}>
              {alert.icon}
            </div>

            <div>
              <h3 className="font-medium text-white">
                {alert.title}
              </h3>

              <p className={`text-sm ${alert.color}`}>
                {alert.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlerts;