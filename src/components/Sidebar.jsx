import {
  FaHome,
  FaFileMedical,
  FaLanguage,
  FaRobot,
  FaUserMd,
 FaUserCircle 
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/patient-dashboard",
      icon: <FaHome />
    },
    {
      name: "Reports",
      path: "/upload-report",
      icon: <FaFileMedical />
    },
    {
      name: "AI Analysis",
      path: "/chatbot",
      icon: <FaRobot />
    },
    {
      name: "Translator",
      path: "/translator",
      icon: <FaLanguage />
    },
    {
      name: "Book Appointment",
      path: "/book-appointment",
      icon: <FaUserMd />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />
    }
  ];

  return (
    <div className="w-80 h-screen sticky top-0 p-5">

      <div className="h-full rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl flex flex-col">

        {/* Logo */}

        <div className="p-6 border-b border-slate-100">

          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            🏥 MedTranslate 
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Healthcare Without Barriers
          </p>

        </div>

        {/* User */}

        <div className="p-6">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <h3 className="font-semibold">
                Welcome Back
              </h3>

              <p className="text-sm text-slate-500">
                Patient Account
              </p>
            </div>

          </div>

        </div>

        {/* Menu */}

        <div className="flex-1 px-4">

          {menuItems.map((item) => {

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                {item.name}
              </Link>
            );
          })}

        </div>

        {/* Health Score */}

        <div className="p-5">

          <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-5">

            <p className="text-sm opacity-90">
               Health Score
            </p>

            <h2 className="text-4xl font-bold mt-2">
              92%
            </h2>

            <div className="h-2 bg-white/30 rounded-full mt-4">

              <div className="h-2 w-[92%] bg-white rounded-full" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}