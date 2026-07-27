import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

const logs = [
  {
    id: 1,
    type: "Login",
    message: "Admin logged into the dashboard.",
    time: "2 mins ago",
    status: "Success",
  },
  {
    id: 2,
    type: "AI Analysis",
    message: "Microsoft risk analysis completed.",
    time: "8 mins ago",
    status: "Success",
  },
  {
    id: 3,
    type: "Alert",
    message: "High layoff risk detected for Intel.",
    time: "15 mins ago",
    status: "Warning",
  },
  {
    id: 4,
    type: "Watchlist",
    message: "Amazon added to watchlist.",
    time: "25 mins ago",
    status: "Success",
  },
  {
    id: 5,
    type: "System",
    message: "Database synchronization completed.",
    time: "1 hour ago",
    status: "Success",
  },
];

const statusIcon = {
  Success: (
    <CheckCircle
      size={18}
      className="text-green-400"
    />
  ),
  Warning: (
    <AlertTriangle
      size={18}
      className="text-yellow-400"
    />
  ),
};

const statusColor = {
  Success: "bg-green-500/20 text-green-400",
  Warning: "bg-yellow-500/20 text-yellow-400",
};

const SystemLogs = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

      <div className="border-b border-slate-800 p-5">

        <div className="flex items-center gap-3">
          <Activity
            size={22}
            className="text-cyan-400"
          />

          <h2 className="text-xl font-semibold">
            System Logs
          </h2>
        </div>

      </div>

      <div className="divide-y divide-slate-800">

        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-5 hover:bg-slate-800 transition"
          >
            <div className="flex items-start gap-4">

              {statusIcon[log.status]}

              <div>

                <h3 className="font-medium">
                  {log.type}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {log.message}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock size={16} />
                {log.time}
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs ${statusColor[log.status]}`}
              >
                {log.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SystemLogs;