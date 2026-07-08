import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FaFileMedical, FaCheckCircle } from "react-icons/fa";
import { MdWarningAmber } from "react-icons/md";

export default function RecentReportCard() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchLatestReport();
  }, []);

  const fetchLatestReport = async () => {
    const { data, error } = await supabase
      .from("translations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!error) {
      setReport(data);
    }
  };

  const conditions =
    report?.conditions
      ?.split(",")
      .map((c) => c.trim())
      .filter(Boolean) || [];

  return (
    <div className="bg-white rounded-[30px] p-8 shadow-xl">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
          <FaFileMedical className="text-2xl text-blue-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Recent Report
          </h2>

          <p className="text-slate-500">
            AI Analyzed Medical Report
          </p>
        </div>

      </div>

      {report ? (
        <>
          <div className="mt-8 grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-slate-500 text-sm">
                Uploaded
              </p>

              <p className="font-semibold">
                {new Date(
                  report.created_at
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm">
                Risk Level
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  report.risk_level === "High"
                    ? "bg-red-100 text-red-700"
                    : report.risk_level === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {report.risk_level}
              </span>
            </div>

            <div>
              <p className="text-slate-500 text-sm">
                Language
              </p>

              <p className="font-semibold">
                English → {report.target_language}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-semibold text-lg mb-4">
              Detected Conditions
            </h3>

            <div className="space-y-3">

              {conditions.length > 0 ? (
                conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    {report.risk_level === "High" ? (
                      <MdWarningAmber className="text-red-500 text-xl" />
                    ) : (
                      <FaCheckCircle className="text-green-500" />
                    )}

                    {condition}
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No conditions detected
                </p>
              )}

            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-semibold text-lg mb-3">
              AI Summary
            </h3>

            <p className="text-slate-600 leading-7">
              {report.summary ||
                "No summary available."}
            </p>

          </div>

          <button className="mt-8 px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition">
            View Full Report
          </button>
        </>
      ) : (
        <div className="mt-8 text-slate-500">
          No reports uploaded yet.
        </div>
      )}

    </div>
  );
}