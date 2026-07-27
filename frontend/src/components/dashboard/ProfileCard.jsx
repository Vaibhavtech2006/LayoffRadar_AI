import { Building2, Briefcase, CalendarDays, User } from "lucide-react";

const ProfileCard = () => {
  const profile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600">
          <User size={30} className="text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {profile.fullName || "Employee"}
          </h2>

          <p className="text-slate-400">
            {profile.email || "employee@email.com"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Building2 className="text-cyan-400" size={20} />

          <div>
            <p className="text-sm text-slate-400">
              Company
            </p>

            <p className="font-medium text-white">
              {profile.companyName || "Not Available"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="text-cyan-400" size={20} />

          <div>
            <p className="text-sm text-slate-400">
              Current Role
            </p>

            <p className="font-medium text-white">
              {profile.currentRole || "Not Available"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays className="text-cyan-400" size={20} />

          <div>
            <p className="text-sm text-slate-400">
              Working Since
            </p>

            <p className="font-medium text-white">
              {profile.workingSince || "Not Available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;