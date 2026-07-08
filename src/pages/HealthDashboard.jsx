import { useEffect, useState } from "react";
import { supabase } from "../supabase";

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
      reports
        .flatMap((r) =>
          r.conditions
            ? r.conditions.split(",").map((c) => c.trim())
            : []
        )
    ),
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Health Insights Dashboard
        </h1>
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white mb-8 overflow-hidden">

  <div className="absolute right-0 top-0 opacity-10 text-[220px] font-bold">
    🏥
  </div>

  <h2 className="text-3xl font-bold mb-2">
    Welcome Back
  </h2>

  <p className="text-blue-100">
    Track your health reports, conditions and AI-powered insights.
  </p>

</div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl p-6">
            <h3 className="text-gray-500">
              Reports Uploaded
            </h3>
            <p className="text-3xl font-bold">
              {totalReports}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl p-6">
            <h3 className="text-gray-500">
              Conditions Detected
            </h3>
            <p className="text-3xl font-bold">
              {uniqueConditions.length}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl p-6">
            <h3 className="text-gray-500">
              Current Risk
            </h3>
            <p className="text-3xl font-bold">
              {latestReport?.risk_level || "N/A"}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl p-6">
            <h3 className="text-gray-500">
              Latest Report
            </h3>
            <p className="text-lg font-semibold">
              {latestReport
                ? new Date(
                    latestReport.created_at
                  ).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl shadow-xl p-6 mb-6">
  <h2 className="text-2xl font-semibold mb-4">
    Detected Conditions
  </h2>

  <div className="flex flex-wrap gap-3">
    {uniqueConditions.map((condition) => (
      <span
        key={condition}
        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
      >
        {condition}
      </span>
    ))}
  </div>
  <div className="bg-white rounded-2xl shadow p-6 mb-6">
  <h2 className="text-2xl font-semibold mb-4">
    Latest AI Summary
  </h2>

  <p className="text-gray-700">
    {latestReport?.summary ||
      "No reports analyzed yet."}
  </p>
</div>
<div className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-semibold mb-4">
    Report Timeline
  </h2>

  <div className="space-y-4">
    {reports.map((report) => (
      <div
        key={report.id}
        className="border-l-4 border-blue-500 pl-4"
      >
        <p className="font-semibold">
          {new Date(
            report.created_at
          ).toLocaleDateString()}
        </p>

        <p>{report.conditions}</p>

        <p className="text-sm text-gray-500">
          Risk: {report.risk_level}
        </p>
      </div>
      
    ))}
  </div>
  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-xl">

  <p className="text-green-100">
    Health Score
  </p>

  <h2 className="text-5xl font-bold">
    78
  </h2>

  <p className="mt-2">
    Stable Condition
  </p>

</div>
</div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

