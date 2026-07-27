import { Building2, Globe, Briefcase } from "lucide-react";

const CompanyInfoCard = () => {
  const company =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-5 text-xl font-semibold">
        Company Information
      </h2>

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <Building2 className="text-cyan-400" size={20} />
          <span>{company.companyName || "N/A"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="text-cyan-400" size={20} />
          <span>{company.industry || "N/A"}</span>
        </div>

        <div className="flex items-center gap-3">
          <Globe className="text-cyan-400" size={20} />
          <span>{company.country || "N/A"}</span>
        </div>

      </div>
    </div>
  );
};

export default CompanyInfoCard;