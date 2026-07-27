import { motion } from "framer-motion";
import Logo from "./Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-slate-950">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-900">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-10"
        >

          <div className="flex justify-center">
            <Logo />
          </div>

          <p className="text-slate-300 mt-6 text-lg">
            Predict layoffs before they happen.
          </p>

          <img
            src="/hero.png"
            alt="LayoffRadar AI"
            className="w-96 mx-auto mt-10"
          />

        </motion.div>

      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;