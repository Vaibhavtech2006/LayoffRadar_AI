import { User, Mail } from "lucide-react";

const UserProfileCard = () => {
  const user =
    JSON.parse(localStorage.getItem("userAccount")) || {};

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600 text-3xl font-bold">
          {user.fullName?.charAt(0) || "U"}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {user.fullName || "User"}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-slate-400">
            <Mail size={16} />
            {user.email || "example@email.com"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;