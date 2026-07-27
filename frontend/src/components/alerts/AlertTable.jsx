import {
  AlertTriangle,
  ShieldAlert,
  TrendingDown,
  Calendar,
  Eye,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    company: "Intel",
    category: "Layoff Risk",
    level: "High",
    date: "12 Jun 2025",
    status: "Active",
  },
  {
    id: 2,
    company: "Amazon",
    category: "Revenue Decline",
    level: "Medium",
    date: "10 Jun 2025",
    status: "Monitoring",
  },
  {
    id: 3,
    company: "Microsoft",
    category: "Hiring Growth",
    level: "Low",
    date: "08 Jun 2025",
    status: "Resolved",
  },
  {
    id: 4,
    company: "Meta",
    category: "AI Investment",
    level: "Low",
    date: "06 Jun 2025",
    status: "Resolved",
  },
  {
    id: 5,
    company: "Google",
    category: "Financial Risk",
    level: "Medium",
    date: "03 Jun 2025",
    status: "Monitoring",
  },
  {
    id: 6,
    company: "Tesla",
    category: "Workforce Reduction",
    level: "High",
    date: "01 Jun 2025",
    status: "Active",
  },
];

const riskClasses = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Low: "bg-green-500/20 text-green-400",
};

const statusClasses = {
  Active: "bg-red-500/20 text-red-400",
  Monitoring: "bg-cyan-500/20 text-cyan-400",
  Resolved: "bg-green-500/20 text-green-400",
};

const AlertTable = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

      <div className="border-b border-slate-800 px-6 py-5">

        <h2 className="text-xl font-semibold">
          Recent Alerts
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left">
                Company
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Risk Level
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert) => (

              <tr
                key={alert.id}
                className="border-t border-slate-800 transition hover:bg-slate-800"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <ShieldAlert
                      size={20}
                      className="text-cyan-400"
                    />

                    {alert.company}

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <AlertTriangle
                      size={16}
                      className="text-yellow-400"
                    />

                    {alert.category}

                  </div>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${riskClasses[alert.level]}`}
                  >
                    {alert.level}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <Calendar
                      size={16}
                      className="text-slate-400"
                    />

                    {alert.date}

                  </div>

                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${statusClasses[alert.status]}`}
                  >
                    {alert.status}
                  </span>

                </td>

                <td className="px-6 py-5 text-center">

                  <button className="rounded-lg bg-cyan-600 p-2 transition hover:bg-cyan-700">

                    <Eye size={18} />

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="border-t border-slate-800 bg-slate-900 px-6 py-4">

        <div className="flex items-center justify-between text-sm text-slate-400">

          <span>
            Showing {alerts.length} alerts
          </span>

          <div className="flex items-center gap-2">

            <TrendingDown
              size={16}
              className="text-red-400"
            />

            AI continuously monitors companies for financial distress.

          </div>

        </div>

      </div>

    </div>
  );
};

export default AlertTable;