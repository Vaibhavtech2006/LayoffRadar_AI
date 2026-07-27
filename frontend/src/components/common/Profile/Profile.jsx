import { useState } from "react";
import {
  User,
  Mail,
  Building2,
 Briefcase,
  CalendarDays,
  Layers,
  Save,
} from "lucide-react";

const Profile = () => {
  const storedProfile =
    JSON.parse(localStorage.getItem("userProfile")) || {};

  const [profile, setProfile] = useState(storedProfile);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold">
          Employee Profile
        </h1>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-8">

          {/* Personal Information */}

          <h2 className="mb-5 text-xl font-semibold">
            Personal Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <InputField
              icon={<User size={18} />}
              label="Full Name"
              name="fullName"
              value={profile.fullName || ""}
              onChange={handleChange}
            />

            <InputField
              icon={<Mail size={18} />}
              label="Email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
            />

          </div>

          {/* Company Information */}

          <h2 className="mt-10 mb-5 text-xl font-semibold">
            Company Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <InputField
              icon={<Building2 size={18} />}
              label="Company Name"
              name="companyName"
              value={profile.companyName || ""}
              onChange={handleChange}
            />

            <InputField
              icon={<Layers size={18} />}
              label="Industry"
              name="industry"
              value={profile.industry || ""}
              onChange={handleChange}
            />

            <InputField
              icon={<Building2 size={18} />}
              label="Company Size"
              name="companySize"
              value={profile.companySize || ""}
              onChange={handleChange}
            />

          </div>

          {/* Employment */}

          <h2 className="mt-10 mb-5 text-xl font-semibold">
            Employment Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <InputField
              icon={<Briefcase size={18} />}
              label="Current Role"
              name="currentRole"
              value={profile.currentRole || ""}
              onChange={handleChange}
            />

            <InputField
              icon={<Briefcase size={18} />}
              label="Department"
              name="department"
              value={profile.department || ""}
              onChange={handleChange}
            />

            <InputField
              icon={<CalendarDays size={18} />}
              label="Working Since"
              name="workingSince"
              value={profile.workingSince || ""}
              onChange={handleChange}
            />

            <InputField
              icon={<Briefcase size={18} />}
              label="Employment Type"
              name="employmentType"
              value={profile.employmentType || ""}
              onChange={handleChange}
            />

          </div>

          <button
            onClick={handleSave}
            className="mt-10 flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-medium transition hover:bg-cyan-700"
          >
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
};

const InputField = ({
  label,
  value,
  name,
  onChange,
  icon,
}) => (
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
      {icon}
      {label}
    </label>

    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
    />
  </div>
);

export default Profile;