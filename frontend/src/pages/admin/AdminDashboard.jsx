import Sidebar from "../../components/dashboard/Sidebar";

import AdminStats from "../../components/admin/AdminStats";
import UsersTable from "../../components/admin/UsersTable";
import CompaniesTable from "../../components/admin/CompaniesTable";
import SystemLogs from "../../components/admin/SystemLogs";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Manage users, companies and monitor system activities.
        </p>

        <div className="mt-8">
          <AdminStats />
        </div>

        <div className="mt-8">
          <UsersTable />
        </div>

        <div className="mt-8">
          <CompaniesTable />
        </div>

        <div className="mt-8">
          <SystemLogs />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;