import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FileText, Activity, AlertCircle } from "lucide-react";

export default function HealthTimeline() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("translations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (!error) {
      setReports(data);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="font-bold text-2xl mb-6">
        Health Timeline
      </h2>

      <div className="space-y-6">

        {reports.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className="border-l-4 border-blue-500 pl-5 py-2"
            >
              <div className="flex items-center gap-3">

                <FileText
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-semibold">
                  Medical Report Uploaded
                </h3>

              </div>

              <p className="text-slate-500 mt-1">
                {new Date(
                  report.created_at
                ).toLocaleDateString()}
              </p>

              {report.conditions && (
                <div className="mt-3 flex items-center gap-2">
                  <Activity
                    size={16}
                    className="text-green-600"
                  />

                  <span>
                    {report.conditions}
                  </span>
                </div>
              )}

              {report.risk_level && (
                <div className="mt-2 flex items-center gap-2">

                  <AlertCircle
                    size={16}
                    className={
                      report.risk_level === "High"
                        ? "text-red-500"
                        : report.risk_level === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  />

                  <span>
                    Risk Level:
                    {" "}
                    {report.risk_level}
                  </span>

                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-slate-500">
            No reports uploaded yet.
          </p>
        )}

      </div>

    </div>
  );
}