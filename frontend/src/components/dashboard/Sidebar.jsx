import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Bot,
  Eye,
  Bell,
  User,
  Settings,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Company Analysis",
      path: "/company-analysis",
      icon: Building2,
    },
    {
      title: "AI Chat",
      path: "/chat",
      icon: Bot,
    },
    {
      title: "Watchlist",
      path: "/watchlist",
      icon: Eye,
    },
    {
      title: "Alerts",
      path: "/alerts",
      icon: Bell,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
    {
      title: "Admin Dashboard",
      path: "/admin",
      icon: ShieldCheck,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-cyan-400">
          LayoffRadar AI
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Early Warning System
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-cyan-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;