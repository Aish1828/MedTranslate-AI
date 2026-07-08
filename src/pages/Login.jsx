import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-cyan-500 text-white p-16">

        <h1 className="text-6xl font-bold">
          MedTranslate
        </h1>

        <p className="mt-6 text-xl opacity-90">
          Simplifying healthcare documents for patients and professionals.
        </p>

        <div className="mt-10 space-y-4">
          <p>✓ Secure Report Storage</p>
          <p>✓ Medical Document Management</p>
          <p>✓ Doctor Collaboration</p>
          <p>✓ Multi-Language Support</p>
        </div>

      </div>

      {/* Right Side */}
     <div className="relative flex items-center justify-center bg-slate-50 overflow-hidden">

  <img
    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"
    alt="Doctor"
    className="absolute top-10 right-10 w-64 h-64 object-cover rounded-3xl opacity-20 rotate-6 float-animation"
  />

  <img
    src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1200"
    alt="Patient"
    className="absolute bottom-10 left-10 w-64 h-64 object-cover rounded-3xl opacity-20 -rotate-6 float-animation"
  />

  <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10">

        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

          <h2 className="text-4xl font-bold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-slate-500 mt-2">
            Sign in to continue
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 border rounded-xl"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border rounded-xl"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
    </div>
  );
}