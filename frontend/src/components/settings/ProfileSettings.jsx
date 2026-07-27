import { User } from "lucide-react";
import { useEffect, useState } from "react";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    companyName: "",
    industry: "",
    email: "",
    country: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userProfile"));

    if (data) {
      setProfile({
        companyName: data.companyName || "",
        industry: data.industry || "",
        email: data.email || "",
        country: data.country || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify(profile)
    );

    alert("Profile updated successfully.");
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-3">

        <User className="text-cyan-400" />

        <h2 className="text-xl font-semibold">
          Profile Settings
        </h2>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Company Name
          </label>

          <input
            name="companyName"
            value={profile.companyName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Industry
          </label>

          <input
            name="industry"
            value={profile.industry}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Email
          </label>

          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Country
          </label>

          <input
            name="country"
            value={profile.country}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

      </div>

      <button
        onClick={saveProfile}
        className="mt-6 rounded-lg bg-cyan-600 px-6 py-3 font-medium hover:bg-cyan-700"
      >
        Save Changes
      </button>

    </div>
  );
};

export default ProfileSettings;