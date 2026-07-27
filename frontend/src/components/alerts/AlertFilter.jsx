import { Filter, Search } from "lucide-react";
import { useState } from "react";

const AlertFilter = () => {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState("All");
  const [status, setStatus] = useState("All");

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-2">

        <Filter
          size={22}
          className="text-cyan-400"
        />

        <h2 className="text-xl font-semibold">
          Filter Alerts
        </h2>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 outline-none focus:border-cyan-500"
          />

        </div>

        {/* Risk */}

        <select
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
        >
          <option>All</option>
          <option>Active</option>
          <option>Monitoring</option>
          <option>Resolved</option>
        </select>

      </div>

      <div className="mt-5 flex gap-3">

        <button className="rounded-lg bg-cyan-600 px-6 py-3 font-medium transition hover:bg-cyan-700">
          Apply Filters
        </button>

        <button
          onClick={() => {
            setSearch("");
            setRisk("All");
            setStatus("All");
          }}
          className="rounded-lg border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
        >
          Reset
        </button>

      </div>

    </div>
  );
};

export default AlertFilter;