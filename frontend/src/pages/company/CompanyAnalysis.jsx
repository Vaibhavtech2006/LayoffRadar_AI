import Sidebar from "../../components/dashboard/Sidebar";

import CompanySearch from "../../components/company/CompanySearch";
import CompanyOverview from "../../components/company/CompanyOverview";
import FinancialMetrics from "../../components/company/FinancialMetrics";
import RiskSummary from "../../components/company/RiskSummary";
import NewsTimeline from "../../components/company/NewsTimeline";
import AISummary from "../../components/company/AISummary";

const CompanyAnalysis = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold">
          Company Analysis
        </h1>

        <p className="mt-2 text-slate-400">
          Search any company and analyze its financial health,
          layoff risk, news sentiment and AI prediction.
        </p>

        <div className="mt-8">
          <CompanySearch />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <CompanyOverview />
          <FinancialMetrics />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <RiskSummary />
          <AISummary />
        </div>

        <div className="mt-8">
          <NewsTimeline />
        </div>
      </main>
    </div>
  );
};

export default CompanyAnalysis;