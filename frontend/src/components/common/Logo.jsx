import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/common/AuthLayout";
import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
const Logo = () => {
const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
};
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg">
        LR
      </div>

      <div className="text-left">
        <h2 className="text-2xl font-bold text-white">
          LayoffRadar AI
        </h2>

        <p className="text-sm text-slate-400">
          Predict • Prepare • Protect
        </p>
      </div>

    </div>
  );
};

export default Logo;