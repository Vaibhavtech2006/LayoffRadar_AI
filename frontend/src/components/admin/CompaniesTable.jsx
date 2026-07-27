const companies = [
  {
    id: 1,
    company: "Microsoft",
    industry: "Technology",
    risk: "Low",
    trend: "Stable",
  },
  {
    id: 2,
    company: "Amazon",
    industry: "E-Commerce",
    risk: "Medium",
    trend: "Watch",
  },
  {
    id: 3,
    company: "Intel",
    industry: "Semiconductors",
    risk: "High",
    trend: "Declining",
  },
  {
    id: 4,
    company: "Google",
    industry: "Technology",
    risk: "Low",
    trend: "Growing",
  },
];

const CompaniesTable = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Tracked Companies
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-3">Company</th>
              <th>Industry</th>
              <th>Risk</th>
              <th>Trend</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >
                <td className="py-3">{company.company}</td>
                <td>{company.industry}</td>
                <td>{company.risk}</td>
                <td>{company.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesTable;
