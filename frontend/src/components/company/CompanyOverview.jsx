import {
  Building2,
  Users,
  Briefcase,
  Globe,
} from "lucide-react";

const CompanyOverview = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Microsoft
          </h2>

          <p className="mt-1 text-slate-400">
            Technology Company
          </p>

        </div>

        <Building2
          size={42}
          className="text-cyan-400"
        />

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-lg bg-slate-800 p-5">

          <Users className="mb-3 text-cyan-400" />

          <p className="text-sm text-slate-400">
            Employees
          </p>

          <h3 className="mt-1 text-xl font-bold">
            221,000
          </h3>

        </div>

        <div className="rounded-lg bg-slate-800 p-5">

          <Briefcase className="mb-3 text-green-400" />

          <p className="text-sm text-slate-400">
            Industry
          </p>

          <h3 className="mt-1 text-xl font-bold">
            Technology
          </h3>

        </div>

        <div className="rounded-lg bg-slate-800 p-5">

          <Globe className="mb-3 text-purple-400" />

          <p className="text-sm text-slate-400">
            Headquarters
          </p>

          <h3 className="mt-1 text-xl font-bold">
            Redmond, USA
          </h3>

        </div>

        <div className="rounded-lg bg-slate-800 p-5">

          <Building2 className="mb-3 text-yellow-400" />

          <p className="text-sm text-slate-400">
            Founded
          </p>

          <h3 className="mt-1 text-xl font-bold">
            1975
          </h3>

        </div>

      </div>

    </div>
  );
};

export default CompanyOverview;