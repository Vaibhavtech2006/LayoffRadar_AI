import { useState } from "react";
import { Search } from "lucide-react";

const CompanySearch = () => {
  const [company, setCompany] = useState("");

  const handleSearch = () => {
    if (!company.trim()) {
      alert("Please enter a company name.");
      return;
    }

    alert(`Searching for ${company}...`);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">
        Search Company
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
};

export default CompanySearch;