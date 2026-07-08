import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  UploadCloud,
  FileText,
  CheckCircle,
} from "lucide-react";
import { extractTextFromPDF } from "../services/pdfService";
import { extractTextFromImage } from "../services/ocrService";

import {
  translateMedicalReport,
  analyzeMedicalReport,
} from "../services/groqService";
import {
  sendReportEmail,
} from "../services/emailService";


export default function UploadReport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [reports, setReports] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

const [modalTitle, setModalTitle] = useState("");

const [modalContent, setModalContent] =
  useState("");

  useEffect(() => {
    fetchReports();
  }, []);
  const handleSummary = async (report) => {
  try {
    setModalTitle("Generating Summary...");
    setModalOpen(true);

    const { data } = await supabase.storage
      .from("medical-reports")
      .createSignedUrl(
        report.file_url,
        3600
      );

    const response = await fetch(
      data.signedUrl
    );

    const blob = await response.blob();

    const file = new File(
      [blob],
      report.file_name
    );

    let extractedText = "";

    if (
      report.file_name
        .toLowerCase()
        .endsWith(".pdf")
    ) {
      extractedText =
        await extractTextFromPDF(file);
    } else {
      extractedText =
        await extractTextFromImage(file);
    }

    const result =
      await analyzeMedicalReport(
        extractedText
      );

    setModalTitle("AI Summary");
    setModalContent(result);
  } catch (error) {
    console.error(error);

    setModalContent(
      "Failed to generate summary."
    );
  }
};
const handleTranslate = async (
  report,language
) => {
  try {
    setModalTitle("Translating...");
    setModalOpen(true);

    const { data } = await supabase.storage
      .from("medical-reports")
      .createSignedUrl(
        report.file_url,
        3600
      );

    const response = await fetch(
      data.signedUrl
    );

    const blob = await response.blob();

    const file = new File(
      [blob],
      report.file_name
    );

    let extractedText = "";

    if (
      report.file_name
        .toLowerCase()
        .endsWith(".pdf")
    ) {
      extractedText =
        await extractTextFromPDF(file);
    } else {
      extractedText =
        await extractTextFromImage(file);
    }

    const result =
      await translateMedicalReport(
        extractedText,
        language
      );

    setModalTitle(
      "Translated Report"
    );

    setModalContent(result);
  } catch (error) {
    console.error(error);

    setModalContent(
      "Failed to translate report."
    );
  }
};

  async function fetchReports() {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setReports(data);
  }

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    const { data, error } = await supabase.storage
      .from("medical-reports")
      .upload(
        `${Date.now()}-${selectedFile.name}`,
        selectedFile
      );

    if (error) {
      console.error(error);
      setUploading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from("reports")
      .insert([
        {
          file_name: selectedFile.name,
          file_url: data.path,
          status: "Pending Review",
        },
      ]);

    if (dbError) {
      console.error(dbError);
      setUploading(false);
      return;
    }

    await fetchReports();

    alert("Report uploaded successfully!");

    setSelectedFile(null);
    setUploading(false);
  };
  const deleteReport = async (report) => {
  const confirmDelete = window.confirm(
    `Delete ${report.file_name}?`
  );

  if (!confirmDelete) return;

  // Delete file from storage
  await supabase.storage
    .from("medical-reports")
    .remove([report.file_url]);

  // Delete row from database
  await supabase
    .from("reports")
    .delete()
    .eq("id", report.id);

  fetchReports();
};
const viewReport = async (report) => {

  const { data } = await supabase.storage
    .from("medical-reports")
    .createSignedUrl(
      report.file_url,
      3600
    );

  if (data?.signedUrl) {
    window.open(
      data.signedUrl,
      "_blank"
    );
  }
};
const updateStatus = async (id) => {

  await supabase
    .from("reports")
    .update({
      status: "Reviewed"
    })
    .eq("id", id);

  fetchReports();
};

  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-800">
            Upload Medical Report
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Upload prescriptions, blood reports,
            scans and medical documents.
          </p>
        </div>

        {/* Upload Card */}

        <div className="bg-white rounded-[35px] shadow-xl p-10 border border-slate-100">

          <div className="border-2 border-dashed border-blue-300 rounded-3xl p-14 text-center hover:border-blue-500 transition-all">

            <UploadCloud
              size={70}
              className="mx-auto text-blue-600"
            />

            <h2 className="text-2xl font-bold mt-5">
              Upload Report
            </h2>

            <p className="text-slate-500 mt-2">
              PDF, JPG and PNG files supported
            </p>

            <label className="inline-block mt-6">

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setSelectedFile(
                    e.target.files[0]
                  )
                }
              />

              <span className="bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700 transition">
                Select File
              </span>

            </label>

          </div>

          {/* Selected File */}

          {selectedFile && (
            <div className="mt-8 bg-blue-50 rounded-2xl p-5 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <FileText className="text-blue-600" />

                <div>

                  <h3 className="font-semibold">
                    {selectedFile.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {(selectedFile.size / 1024).toFixed(
                      2
                    )}{" "}
                    KB
                  </p>

                </div>

              </div>

              <CheckCircle className="text-green-500" />

            </div>
          )}

          {/* Upload Button */}

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl text-lg font-semibold hover:scale-[1.01] transition-all"
            >
              {uploading
                ? "Uploading..."
                : "Upload Report"}
            </button>
          )}

        </div>

        {/* Recent Uploads */}

        <div className="mt-10">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold text-slate-800">
              Recent Uploads
            </h2>

            <span className="text-slate-500">
              {reports.length} Reports
            </span>

          </div>

          {reports.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 shadow-md text-center">

              <p className="text-slate-500">
                No reports uploaded yet.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">

              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="font-bold text-lg">
                        {report.file_name}
                      </h3>

                     <span
  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
    report.status === "Reviewed"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {report.status}
</span>

                      <p className="text-sm text-slate-400 mt-3">
                        {new Date(
                          report.uploaded_at
                        ).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2 mt-4 flex-wrap">

  <button
  onClick={() => viewReport(report)}
  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700"
>
  View
</button>

  <button
  onClick={() => deleteReport(report)}
  className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
>
  Delete
</button>

  <button
  onClick={() =>
    handleSummary(report)
  }
  className="px-4 py-2 rounded-xl bg-green-100 text-green-700"
>
  Summary
</button>
<button
  onClick={() => shareReport(report)}
  className="px-4 py-2 rounded-xl bg-cyan-100 text-cyan-700"
>
  Share To My Email
</button>


  <select
  onChange={(e) => {
    if (e.target.value) {
      handleTranslate(
        report,
        e.target.value
      );
    }
  }}
  className="px-4 py-2 rounded-xl bg-purple-100 text-purple-700 border-none cursor-pointer"
>
  <option value="">
    Translate 
  </option>

  <option value="Hindi">
    Hindi
  </option>

  <option value="Marathi">
    Marathi
  </option>

  <option value="Gujarati">
    Gujarati
  </option>

  <option value="Tamil">
    Tamil
  </option>

  <option value="Bengali">
    Bengali
  </option>
</select>
  <button
  onClick={() => updateStatus(report.id)}
  className="px-4 py-2 rounded-xl bg-green-100 text-green-700"
>
  Mark Reviewed
</button>

</div>

                    </div>

                    <FileText className="text-blue-600" />

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
      {modalOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white max-w-3xl w-full p-8 rounded-3xl shadow-xl">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          {modalTitle}
        </h2>

        <button
          onClick={() =>
            setModalOpen(false)
          }
          className="text-red-500"
        >
          Close
        </button>

      </div>

      <div className="max-h-[500px] overflow-auto whitespace-pre-wrap">

        {modalContent}

      </div>

    </div>

  </div>
)}

    </div>
  );
}
const shareReport = async (report) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    alert("User email not found");
    return;
  }

  const { data } = await supabase.storage
    .from("medical-reports")
    .createSignedUrl(
      report.file_url,
      86400
    );

  if (!data?.signedUrl) {
    alert("Unable to generate report link");
    return;
  }

  await sendReportEmail(
    user.email,
    report.file_name,
    data.signedUrl
  );

  alert(
    "Report sent to your registered email!"
  );
};