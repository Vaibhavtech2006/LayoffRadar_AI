import Sidebar from "../../components/dashboard/Sidebar";

import AlertCard from "../../components/alerts/AlertCard";
import AlertFilter from "../../components/alerts/AlertFilter";
import AlertTable from "../../components/alerts/AlertTable";

const Alerts = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <h1 className="text-3xl font-bold">
          Alerts
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor important layoff, financial and AI generated alerts.
        </p>

        <div className="mt-8">
          <AlertFilter />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <AlertCard />

          <AlertCard />

          <AlertCard />

        </div>

        <div className="mt-8">

          <AlertTable />

        </div>

      </main>
    </div>
  );
};

export default Alerts;
