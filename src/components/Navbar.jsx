import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
            <FaHeartbeat className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              MedTranslate
            </h1>

            <p className="text-xs text-slate-500">
              AI Healthcare Assistant
            </p>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8 text-slate-600 font-medium">

          <a
            href="#features"
            className="hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#steps"
            className="hover:text-blue-600 transition"
          >
            How It Works
          </a>

          <a
            href="#testimonials"
            className="hover:text-blue-600 transition"
          >
            Testimonials
          </a>

          <a
            href="#contact"
            className="hover:text-blue-600 transition"
          >
            Contact
          </a>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link to="/login">
            <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg hover:scale-105 transition">
              Get Started
            </button>
          </Link>

        </div>

      </div>
    </motion.nav>
  );
}