import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  Calendar,
  Clock,
  UserRound,
  Stethoscope,
} from "lucide-react";
import { sendAppointmentEmail } from "../services/emailService";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_email", user?.email)
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setAppointments(data);
    }
  };

  const handleBook = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_email: user?.email,
          doctor_name: doctorName,
          specialization,
          appointment_date: date,
          appointment_time: time,
          reason,
          status: "Booked",
        },
      ]);

  if (!error) {

  await sendAppointmentEmail(
    user.email,
    doctorName,
    specialization,
    date,
    time,
    reason
  );

  alert(
    "Appointment booked successfully!"
  );

  fetchAppointments();

  setDoctorName("");
  setSpecialization("");
  setDate("");
  setTime("");
  setReason("");
}
    fetchAppointments();
};

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 rounded-[35px] p-10 text-white shadow-2xl mb-8">
          <h1 className="text-5xl font-bold">
            Book Your Appointment
          </h1>

          <p className="mt-4 text-blue-100 text-lg">
            Connect with healthcare professionals
            and schedule consultations instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl border border-white">

            <h2 className="text-2xl font-bold mb-6">
              Appointment Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-2 font-medium">
                  Doctor Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    value={doctorName}
                    onChange={(e) =>
                      setDoctorName(
                        e.target.value
                      )
                    }
                    placeholder="Dr. Sharma"
                    className="w-full pl-11 p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Specialization
                </label>

                <div className="relative">
                  <Stethoscope
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    value={specialization}
                    onChange={(e) =>
                      setSpecialization(
                        e.target.value
                      )
                    }
                    placeholder="Cardiologist"
                    className="w-full pl-11 p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Appointment Date
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(
                        e.target.value
                      )
                    }
                    className="w-full pl-11 p-4 border rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Appointment Time
                </label>

                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-4 top-4 text-slate-400"
                  />

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(
                        e.target.value
                      )
                    }
                    className="w-full pl-11 p-4 border rounded-2xl"
                  />
                </div>
              </div>

            </div>

            <div className="mt-5">
              <label className="block mb-2 font-medium">
                Reason For Visit
              </label>

              <textarea
                rows="5"
                value={reason}
                onChange={(e) =>
                  setReason(
                    e.target.value
                  )
                }
                placeholder="Describe symptoms..."
                className="w-full border rounded-2xl p-4"
              />
            </div>

            <button
              onClick={handleBook}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition"
            >
              Book Appointment
            </button>

          </div>

          {/* Appointment History */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 shadow-xl border border-white">

            <h2 className="text-2xl font-bold mb-6">
              Appointment History
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">

              {appointments.length > 0 ? (
                appointments.map(
                  (appointment) => (
                    <div
                      key={appointment.id}
                      className="border rounded-2xl p-4 hover:bg-slate-50"
                    >
                      <h3 className="font-bold">
                        {
                          appointment.doctor_name
                        }
                      </h3>

                      <p className="text-slate-500">
                        {
                          appointment.specialization
                        }
                      </p>

                      <div className="mt-2 text-sm">
                        <p>
                          📅{" "}
                          {
                            appointment.appointment_date
                          }
                        </p>

                        <p>
                          ⏰{" "}
                          {
                            appointment.appointment_time
                          }
                        </p>
                      </div>

                      <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {
                          appointment.status
                        }
                      </span>

                      <p className="mt-3 text-sm text-slate-500">
                        {
                          appointment.reason
                        }
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-center text-slate-500">
                  No appointments booked yet.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}