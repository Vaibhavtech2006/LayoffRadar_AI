import Sidebar from "../../components/dashboard/Sidebar";

import UserProfileCard from "../../components/profile/UserProfileCard";
import CompanyInfoCard from "../../components/profile/CompanyInfoCard";
import AccountStats from "../../components/profile/AccountStats";
import ActivityTimeline from "../../components/profile/ActivityTimeline";

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">

        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-slate-400">
          View your profile information and account activity.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <UserProfileCard />

          <CompanyInfoCard />

        </div>

        <div className="mt-8">

          <AccountStats />

        </div>

        <div className="mt-8">

          <ActivityTimeline />

        </div>

      </main>
    </div>
  );
};

export default Profile;