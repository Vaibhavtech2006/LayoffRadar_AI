import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block mb-2 text-sm text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none focus:border-violet-500"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordField;