import { Link } from "react-router-dom";
import AuthLayout from "../../components/common/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md">

        <h1 className="text-3xl font-bold text-white">
          Forgot Password?
        </h1>

        <p className="mt-2 text-slate-400">
          Enter your email and we'll send you a password reset link.
        </p>

        <form className="mt-8 space-y-5">

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="font-semibold text-violet-400 hover:text-violet-300"
            >
              Back to Login
            </Link>
          </div>

        </form>

      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;