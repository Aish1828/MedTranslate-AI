import { motion } from "framer-motion";
import {
  FaRobot,
  FaFileMedical,
  FaArrowRight,
  FaLanguage,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AIHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-700 via-cyan-500 to-blue-600 p-10 shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Section */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-white mb-6">
            <FaRobot />
            <span>AI Powered Healthcare Assistant</span>
          </div>

          <h1 className="text-white text-5xl lg:text-6xl font-bold leading-tight">
            Understand Medical
            <br />
            Reports in Seconds
          </h1>

          <p className="text-blue-100 mt-6 text-lg max-w-xl leading-8">
            Upload prescriptions, blood reports and lab
            results. Get instant AI explanations,
            translations and healthcare insights in your
            preferred language.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">

            <div>
              <h3 className="text-3xl font-bold text-white">
                10+
              </h3>
              <p className="text-blue-100">
                Languages
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                AI
              </h3>
              <p className="text-blue-100">
                Powered Analysis
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                24/7
              </h3>
              <p className="text-blue-100">
                Accessibility
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <Link to="/signup">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:scale-105 transition">
                Get Started
                <FaArrowRight />
              </button>
            </Link>

            <Link to="/login">
              <button className="px-6 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition">
                Login
              </button>
            </Link>

          </div>

        </div>

        {/* Right Section */}
        <div>

          <div className="bg-white/15 backdrop-blur-xl rounded-[30px] p-6 border border-white/20">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-blue-600 text-xl">
                <FaFileMedical />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">
                  Blood Report
                </h3>

                <p className="text-blue-100 text-sm">
                  AI Analysis Complete
                </p>
              </div>

            </div>

            <div className="space-y-4">

              <div className="bg-white/10 p-4 rounded-xl text-white">
                ✅ Blood Sugar Normal
              </div>

              <div className="bg-white/10 p-4 rounded-xl text-white">
                ✅ Heart Rate Stable
              </div>

              <div className="bg-white/10 p-4 rounded-xl text-white">
                ⚠ Cholesterol Slightly Elevated
              </div>

              <div className="bg-white/10 p-4 rounded-xl text-white flex items-center gap-2">
                <FaLanguage />
                Report translated to Marathi
              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between text-white mb-2">
                <span>AI Confidence</span>
                <span>94%</span>
              </div>

              <div className="h-3 bg-white/20 rounded-full">
                <div className="h-3 w-[94%] rounded-full bg-white"></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}