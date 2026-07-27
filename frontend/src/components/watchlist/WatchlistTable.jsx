const companies = [
  {
    id: 1,
    company: "Microsoft",
    risk: "Low",
    status: "Stable",
  },
  {
    id: 2,
    company: "Amazon",
    risk: "Medium",
    status: "Watch",
  },
  {
    id: 3,
    company: "Intel",
    risk: "High",
    status: "Critical",
  },
  {
    id: 4,
    company: "Google",
    risk: "Low",
    status: "Growing",
  },
];

const WatchlistTable = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">
        Watchlist
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-3 text-left">Company</th>
              <th className="text-left">Risk</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-800"
              >
                <td className="py-3">{item.company}</td>
                <td>{item.risk}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WatchlistTable;