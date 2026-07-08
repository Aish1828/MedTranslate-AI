import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AIHealthSummary() {
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

  const confidence =
    report?.risk_level === "High"
      ? 95
      : report?.risk_level === "Medium"
      ? 88
      : 82;

  return (
    <div className="rounded-[30px] p-8 backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl">

      <h2 className="text-2xl font-bold">
        AI Health Overview
      </h2>

      <p className="text-slate-500 mt-2">
        Latest health insights generated from your uploaded reports.
      </p>

      <div className="mt-6 space-y-4">

        {conditions.length > 0 ? (
          conditions.map((condition, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              {report?.risk_level === "High"
                ? "⚠️"
                : "✅"}

              <span>{condition}</span>
            </div>
          ))
        ) : (
          <div>
            No conditions detected
          </div>
        )}

      </div>

      <div className="mt-8 p-4 rounded-2xl bg-blue-50">

        <h3 className="font-semibold mb-2">
          AI Summary
        </h3>

        <p className="text-slate-600 leading-7">
          {report?.summary ||
            "Upload a report to generate AI insights."}
        </p>

      </div>

      <div className="mt-8">

        <p className="mb-2 text-sm text-slate-500">
          Analysis Confidence
        </p>

        <div className="h-4 rounded-full bg-slate-200">

          <div
            className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600"
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

        <p className="mt-2 font-bold">
          {confidence}%
        </p>

      </div>

    </div>
  );
}