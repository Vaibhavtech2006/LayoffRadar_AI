import {
  Building2,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";

const companies = [
  {
    company: "Microsoft",
    sector: "Technology",
    risk: "Low",
    score: 18,
    trend: "Up",
  },
  {
    company: "Amazon",
    sector: "E-Commerce",
    risk: "Medium",
    score: 45,
    trend: "Down",
  },
  {
    company: "Google",
    sector: "Technology",
    risk: "Low",
    score: 20,
    trend: "Up",
  },
  {
    company: "Intel",
    sector: "Semiconductor",
    risk: "High",
    score: 72,
    trend: "Down",
  },
  {
    company: "Meta",
    sector: "Technology",
    risk: "Medium",
    score: 41,
    trend: "Up",
  },
];

const riskColor = {
  Low: "bg-green-500/20 text-green-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  High: "bg-red-500/20 text-red-400",
};

const WatchlistTable = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

      <div className="border-b border-slate-800 p-5">

        <h2 className="text-xl font-semibold">
          Company Watchlist
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
                Sector
              </th>

              <th className="px-6 py-4 text-left">
                Risk
              </th>

              <th className="px-6 py-4 text-left">
                AI Score
              </th>

              <th className="px-6 py-4 text-left">
                Trend
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (

              <tr
                key={company.company}
                className="border-t border-slate-800 hover:bg-slate-800"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <Building2
                      size={20}
                      className="text-cyan-400"
                    />

                    {company.company}

                  </div>

                </td>

                <td className="px-6 py-5">
                  {company.sector}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${riskColor[company.risk]}`}
                  >
                    {company.risk}
                  </span>

                </td>

                <td className="px-6 py-5">
                  {company.score}%
                </td>

                <td className="px-6 py-5">

                  {company.trend === "Up" ? (
                    <TrendingUp className="text-green-400" />
                  ) : (
                    <TrendingDown className="text-red-400" />
                  )}

                </td>

                <td className="px-6 py-5 text-center">

                  <button className="rounded-lg bg-cyan-600 p-2 hover:bg-cyan-700">

                    <Eye size={18} />

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default WatchlistTable;