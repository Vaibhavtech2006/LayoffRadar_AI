import { Bell, Search, UserCircle } from "lucide-react";

const TopBar = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-6 py-4">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center rounded-lg bg-slate-800 px-4 py-2">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search company..."
            className="ml-3 bg-transparent outline-none text-white placeholder:text-slate-500"
          />

        </div>

        <button className="rounded-lg bg-slate-800 p-3 hover:bg-slate-700">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">

          <UserCircle size={36} />

          <div>

            <p className="font-semibold">
              User
            </p>

            <p className="text-xs text-slate-400">
              Employee
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TopBar;