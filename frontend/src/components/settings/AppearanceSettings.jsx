import { useState } from "react";
import { Palette } from "lucide-react";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("Dark");
  const [accent, setAccent] = useState("Blue");

  const save = () => {
    alert("Preferences saved successfully!");
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">
          Appearance Settings
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-300 mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
          >
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 mb-2">Accent Color</label>
          <select
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
          >
            <option>Blue</option>
            <option>Green</option>
            <option>Purple</option>
            <option>Orange</option>
          </select>
        </div>

        <button
          onClick={save}
          className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg text-white"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;