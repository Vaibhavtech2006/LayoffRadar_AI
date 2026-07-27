import { useState } from "react";
import { Bell } from "lucide-react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    layoffs: true,
    financial: true,
    ai: true,
    email: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    { key: "layoffs", label: "Layoff Alerts" },
    { key: "financial", label: "Financial Alerts" },
    { key: "ai", label: "AI Prediction Alerts" },
    { key: "email", label: "Email Notifications" },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-semibold text-white">
          Notification Settings
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between border-b border-slate-700 pb-3"
          >
            <span className="text-slate-300">{item.label}</span>

            <button
              onClick={() => toggle(item.key)}
              className={`px-4 py-1 rounded-full text-sm ${
                settings[item.key]
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-gray-300"
              }`}
            >
              {settings[item.key] ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;