import { Lock } from "lucide-react";
import { useState } from "react";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password updated successfully.");

    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-3">

        <Lock className="text-cyan-400" />

        <h2 className="text-xl font-semibold">
          Security Settings
        </h2>

      </div>

      <div className="space-y-5">

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Current Password
          </label>

          <input
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-cyan-500"
          />

        </div>

      </div>

      <button
        onClick={handleSave}
        className="mt-6 rounded-lg bg-cyan-600 px-6 py-3 font-medium transition hover:bg-cyan-700"
      >
        Update Password
      </button>

    </div>
  );
};

export default SecuritySettings;