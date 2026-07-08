import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FileText, Trash2, Eye } from "lucide-react";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setReports(data);
    }
  }

  async function deleteReport(id) {
    await supabase
      .from("reports")
      .delete()
      .eq("id", id);

    fetchReports();
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-bold mb-8">
        My Reports
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <FileText
              size={40}
              className="text-blue-600"
            />

            <h2 className="mt-4 font-semibold text-lg">
              {report.file_name}
            </h2>

            <p className="text-slate-500 mt-2">
              {report.status}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-xl"
              >
                <Eye size={18} />
                View
              </button>

              <button
                onClick={() => deleteReport(report.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-xl"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
<button
  onClick={() => shareReport(report)}
  className="px-4 py-2 rounded-xl bg-cyan-100 text-cyan-700"
>
  Share
</button>