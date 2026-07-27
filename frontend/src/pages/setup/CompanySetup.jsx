import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanySetup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    industry: "",
    companySize: "",
    role: "",
    department: "",
    workingSince: "",
    employmentType: "",
  });

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("userAccount"));

    if (account) {
      setFormData((prev) => ({
        ...prev,
        fullName: account.fullName,
        email: account.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.industry ||
      !formData.companySize ||
      !formData.role ||
      !formData.department ||
      !formData.workingSince ||
      !formData.employmentType
    ) {
      alert("Please fill all required fields.");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(formData));

    alert("Profile Setup Completed!");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-white">
          Complete Your Company Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Provide your company and employment details to personalize your dashboard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Industry
            </label>

            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="">Select Industry</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Manufacturing</option>
              <option>Retail</option>
              <option>Education</option>
              <option>Telecommunication</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Company Size
            </label>

            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="">Select Company Size</option>
              <option>1 - 50 Employees</option>
              <option>51 - 200 Employees</option>
              <option>201 - 1000 Employees</option>
              <option>1000 - 5000 Employees</option>
              <option>5000+ Employees</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Current Role
            </label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Department
            </label>

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Engineering"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Working Since
            </label>

            <input
              type="date"
              name="workingSince"
              value={formData.workingSince}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Employment Type
            </label>

            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="">Select Employment Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-violet-600 py-3 text-white font-semibold hover:bg-violet-700 transition"
            >
              Continue to Dashboard
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompanySetup;