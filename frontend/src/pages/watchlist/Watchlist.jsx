import Sidebar from "../../components/dashboard/Sidebar";

import WatchlistCard from "../../components/watchlist/WatchlistCard";
import WatchlistTable from "../../components/watchlist/WatchlistTable";

const Watchlist = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <h1 className="text-3xl font-bold">
          Watchlist
        </h1>

        <p className="mt-2 text-slate-400">
          Track companies and monitor financial health, layoffs and AI risk
          predictions.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <WatchlistCard />

          <WatchlistCard />

          <WatchlistCard />

        </div>

        <div className="mt-8">

          <WatchlistTable />

        </div>

      </main>
    </div>
  );
};

export default Watchlist;