import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white p-16">

        <div>
          <h1 className="text-6xl font-bold">
            Join MedTranslate
          </h1>

          <p className="mt-6 text-xl opacity-90">
            Create your account and securely manage
            medical reports, prescriptions, and health records.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <span>Secure Medical Report Storage</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <span>Multi-Language Report Support</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍⚕️</span>
              <span>Patient & Doctor Collaboration</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <span>Privacy Focused Platform</span>
            </div>

          </div>
        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center bg-slate-50 p-6">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold text-center text-slate-800">
            Create Account
          </h2>

          <p className="text-center text-slate-500 mt-2">
            Start managing your medical documents
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Patient</option>
              <option>Doctor</option>
            </select>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Create Account
            </button>

          </form>

          <p className="text-center mt-6 text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}