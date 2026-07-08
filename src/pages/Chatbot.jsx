import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  FileText,
  AlertTriangle,
  Activity,
  Calendar,
  Upload,
  Languages,
  History,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HealthDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("translations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setReports(data);
    }
  };

  const totalReports = reports.length;

  const latestReport = reports[0];

  const uniqueConditions = [
    ...new Set(
      reports.flatMap((r) =>
        r.conditions
          ? r.conditions.split(",").map((c) => c.trim())
          : []
      )
    ),
  ];

  const riskColor =
    latestReport?.risk_level === "High"
      ? "text-red-500"
      : latestReport?.risk_level === "Medium"
      ? "text-yellow-500"
      : "text-green-500";

  const riskBadge =
    latestReport?.risk_level === "High"
      ? "🔴 High"
      : latestReport?.risk_level === "Medium"
      ? "🟡 Medium"
      : "🟢 Low";

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-indigo-300/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white mb-8 shadow-xl">

          <div className="absolute right-6 top-0 text-[150px] opacity-10">
            🏥
          </div>

          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Your AI-powered health assistant is ready.
          </p>

          <div className="flex flex-wrap gap-6 mt-6">

            <div>
              <p className="text-blue-100">
                Reports Uploaded
              </p>
              <h2 className="text-3xl font-bold">
                {totalReports}
              </h2>
            </div>

            <div>
              <p className="text-blue-100">
                Conditions Tracked
              </p>
              <h2 className="text-3xl font-bold">
                {uniqueConditions.length}
              </h2>
            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:-translate-y-1 transition-all">
            <FileText className="text-blue-600 mb-3" size={32} />
            <p className="text-gray-500">Reports Uploaded</p>
            <h2 className="text-4xl font-bold">{totalReports}</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:-translate-y-1 transition-all">
            <Activity className="text-green-600 mb-3" size={32} />
            <p className="text-gray-500">Conditions Detected</p>
            <h2 className="text-4xl font-bold">
              {uniqueConditions.length}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:-translate-y-1 transition-all">
            <AlertTriangle className="text-red-500 mb-3" size={32} />
            <p className="text-gray-500">Current Risk</p>
            <h2 className={`text-3xl font-bold ${riskColor}`}>
              {riskBadge}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 hover:-translate-y-1 transition-all">
            <HeartPulse className="text-pink-500 mb-3" size={32} />
            <p className="text-gray-500">Health Status</p>
            <h2 className="text-3xl font-bold text-green-600">
              Stable
            </h2>
          </div>

        </div>

        {/* AI OVERVIEW + CONDITIONS */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              AI Health Overview
            </h2>

            <p className="text-gray-700 leading-8">
              {latestReport?.summary ||
                "No reports have been analyzed yet."}
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="font-medium text-blue-800">
                Recommendation
              </p>

              <p className="text-sm text-blue-700 mt-2">
                Continue monitoring your health reports
                regularly and consult your doctor if symptoms
                persist.
              </p>
            </div>

          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Detected Conditions
            </h2>

            <div className="flex flex-wrap gap-3">

              {uniqueConditions.length > 0 ? (
                uniqueConditions.map((condition) => (
                  <span
                    key={condition}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
                  >
                    🩺 {condition}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">
                  No conditions detected
                </p>
              )}

            </div>

          </div>

        </div>

        {/* LATEST REPORT + QUICK ACTIONS */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Latest Medical Report
            </h2>

            {latestReport ? (
              <>
                <p className="text-gray-500 mb-3">
                  {new Date(
                    latestReport.created_at
                  ).toLocaleDateString()}
                </p>

                <p className="text-gray-700 leading-7">
                  {latestReport.summary}
                </p>

                <div className="mt-4">
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                    {riskBadge} Risk
                  </span>
                </div>
              </>
            ) : (
              <p>No reports available.</p>
            )}

          </div>
<div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

  <h2 className="text-2xl font-bold mb-5">
    Quick Actions
  </h2>

  <div className="space-y-4">

    <Link to="/upload-report">
      <button className="w-full flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-2xl hover:scale-[1.02] transition-all">
        <Upload size={20} />
        Upload Report
      </button>
    </Link>

    <Link to="/translator">
      <button className="w-full flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl hover:scale-[1.02] transition-all">
        <Languages size={20} />
        Translate Report
      </button>
    </Link>

    <Link to="/book-appointment">
      <button className="w-full flex items-center gap-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white p-4 rounded-2xl hover:scale-[1.02] transition-all">
        <History size={20} />
        Book Appointment
      </button>
    </Link>

  </div>

</div>
        </div>

        {/* TIMELINE */}

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Medical History Timeline
          </h2>

          <div className="space-y-6">

            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="border-l-4 border-blue-500 pl-5"
                >
                  <p className="font-bold text-lg">
                    {new Date(
                      report.created_at
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 mt-1">
                    🩺 {report.conditions}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      report.risk_level === "High"
                        ? "bg-red-100 text-red-600"
                        : report.risk_level === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {report.risk_level} Risk
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No reports available.
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}