import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/common/AuthLayout";
import InputField from "../../components/common/InputField";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + email);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-bold text-white">Forgot Password</h1>

        <p className="mt-2 text-slate-400">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <Link to="/login" className="text-violet-400 hover:text-violet-300">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;