import Sidebar from "../../components/dashboard/Sidebar";
import TopBar from "../../components/dashboard/TopBar";
import StatsCard from "../../components/dashboard/StatsCard";
import ProfileCard from "../../components/dashboard/ProfileCard";
import RiskGauge from "../../components/dashboard/RiskGauge";
import FinancialHealth from "../../components/dashboard/FinancialHealth";
import LatestNews from "../../components/dashboard/LatestNews";
import RecentAlerts from "../../components/dashboard/RecentAlerts";
import AIRecommendation from "../../components/dashboard/AIRecommendation";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <TopBar />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FinancialHealth />
          </div>

          <ProfileCard />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <RiskGauge />
          <LatestNews />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <RecentAlerts />
          <AIRecommendation />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;