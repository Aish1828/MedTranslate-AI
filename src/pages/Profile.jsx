import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  User,
  Phone,
  Calendar,
  Save,
  Mail,
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setGender(data.gender || "");
      setDob(data.dob || "");
    }
  };

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .upsert({
        user_id: user.id,
        full_name: fullName,
        phone,
        gender,
        dob,
      });

    if (!error) {
      alert("Profile Updated Successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Hero */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[35px] p-10 text-white shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-blue-100">
            Manage your personal information
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Card */}

          <div className="bg-white rounded-[30px] shadow-xl p-8">

            <div className="flex flex-col items-center">

              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold">
                {fullName
                  ? fullName.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {fullName || "Patient"}
              </h2>

              <p className="text-slate-500">
                {user?.email}
              </p>

            </div>

            <div className="mt-8 space-y-4">

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-slate-500 text-sm">
                  Account Type
                </p>

                <p className="font-semibold">
                  Patient
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-slate-500 text-sm">
                  Status
                </p>

                <p className="font-semibold text-green-600">
                  Active
                </p>
              </div>

            </div>

          </div>

          {/* Right Form */}

          <div className="lg:col-span-2 bg-white rounded-[30px] shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    className="absolute left-4 top-4 text-slate-400"
                    size={18}
                  />

                  <input
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4 pl-11"
                    placeholder="Enter full name"
                  />

                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-4 text-slate-400"
                    size={18}
                  />

                  <input
                    value={user?.email || ""}
                    disabled
                    className="w-full border rounded-2xl p-4 pl-11 bg-slate-50"
                  />

                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Phone
                </label>

                <div className="relative">

                  <Phone
                    className="absolute left-4 top-4 text-slate-400"
                    size={18}
                  />

                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4 pl-11"
                    placeholder="Enter phone number"
                  />

                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Gender
                </label>

                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                  className="w-full border rounded-2xl p-4"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option>
                    Male
                  </option>

                  <option>
                    Female
                  </option>

                  <option>
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-2">
                  Date of Birth
                </label>

                <div className="relative">

                  <Calendar
                    className="absolute left-4 top-4 text-slate-400"
                    size={18}
                  />

                  <input
                    type="date"
                    value={dob}
                    onChange={(e) =>
                      setDob(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4 pl-11"
                  />

                </div>
              </div>

            </div>

            <button
              onClick={handleSave}
              className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition"
            >
              <Save size={18} />
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}