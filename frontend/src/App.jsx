import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Setup
import CompanySetup from "./pages/setup/CompanySetup";

// Main Pages
import Dashboard from "./pages/dashboard/Dashboard";
import CompanyAnalysis from "./pages/company/CompanyAnalysis";
import Chat from "./pages/chat/Chat";
import Watchlist from "./pages/watchlist/Watchlist";
import Alerts from "./pages/alerts/Alerts";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Setup */}
        <Route path="/company-setup" element={<CompanySetup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Company Analysis */}
        <Route path="/company-analysis" element={<CompanyAnalysis />} />

        {/* AI Chat */}
        <Route path="/chat" element={<Chat />} />

        {/* Watchlist */}
        <Route path="/watchlist" element={<Watchlist />} />

        {/* Alerts */}
        <Route path="/alerts" element={<Alerts />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
