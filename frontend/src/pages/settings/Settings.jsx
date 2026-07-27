import Sidebar from "../../components/dashboard/Sidebar";

import ProfileSettings from "../../components/settings/ProfileSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account preferences and application settings.
        </p>

        <div className="mt-8 space-y-6">
          <ProfileSettings />
          <NotificationSettings />
          <SecuritySettings />
          <AppearanceSettings />
        </div>
      </main>
    </div>
  );
};

export default Settings;