import { useState } from "react";
import { Upload, Languages, FileText, Download } from "lucide-react";
import UploadArea from "../components/UploadArea";
import { extractTextFromImage } from "../services/ocrService";
import { extractTextFromPDF } from "../services/pdfService";
import { translateMedicalReport } from "../services/groqService";
import jsPDF from "jspdf";
import {supabase} from "../supabase";
import { analyzeMedicalReport } from "../services/healthAnalysisService";

export default function TranslatePage() {
  const [report, setReport] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    try {
      let extractedText = "";

      if (file.type.includes("image")) {
        extractedText = await extractTextFromImage(file);
      } else {
        extractedText = await extractTextFromPDF(file);
      }

      setReport(extractedText);
    } catch (error) {
      console.error("File Processing Error:", error);
      alert("Failed to extract text from file.");
    }
  };

  const handleTranslate = async () => {
    if (!report.trim()) {
      alert("Please upload or enter a medical report.");
      return;
    }

    try {
      setLoading(true);

      const result = await translateMedicalReport(
        report,
        language
      );

      setTranslated(result);

      const analysis = await analyzeMedicalReport(report);
      const summary =
  analysis.match(/SUMMARY:\s*([\s\S]*?)CONDITIONS:/)?.[1]?.trim() || "";

const conditions =
  analysis.match(/CONDITIONS:\s*([\s\S]*?)RISK_LEVEL:/)?.[1]?.trim() || "";

const riskLevel =
  analysis.match(/RISK_LEVEL:\s*(.*)/)?.[1]?.trim() || "";

console.log("Summary:", summary);
console.log("Conditions:", conditions);
console.log("Risk Level:", riskLevel);

      console.log(analysis);


      await supabase
  .from("translations")
  .insert([
    {
      original_text: report,
      translated_text: result,
      language: language,
      summary,
      conditions,
      risk_level: riskLevel,
      health_score: riskLevel === "High" ? 3 : riskLevel === "Medium" ? 2 : 1,
    },
  ]);
    } catch (error) {
      console.error("Translation Error:", error);
      alert("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTextFile = () => {
  if (!translated) {
    alert("No translated report available.");
    return;
  }

  const blob = new Blob(
    [translated],
    {
      type: "text/plain;charset=utf-8",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `translated-report-${language}.txt`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-blue-600">
            MedTranslate
          </h1>

          <p className="text-gray-500 mt-2">
            Translate medical reports into regional languages instantly.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h2 className="font-semibold text-xl mb-4">
            Upload Report
          </h2>

          <UploadArea onFileUpload={handleFileUpload} />

          <div className="mt-4 text-sm text-gray-500">
            Supported Formats: PDF, PNG, JPG, JPEG
          </div>
        </div>

        {/* Translator Section */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Original Report */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText />
              <h3 className="font-semibold text-lg">
                Original Report
              </h3>
            </div>

            <textarea
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Paste report here or upload a file..."
              className="w-full h-96 border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Translated Report */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Languages />
              <h3 className="font-semibold text-lg">
                Translated Report
              </h3>
            </div>

            <div className="h-96 border rounded-xl p-4 overflow-auto bg-gray-50 whitespace-pre-wrap">
              {translated ? (
                translated
              ) : (
                <p className="text-gray-400">
                  Translation will appear here...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6 flex flex-wrap gap-4 items-center">

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Tamil</option>
            <option>Gujarati</option>
            <option>Bengali</option>
          </select>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Translating..." : "Translate"}
          </button>

         <button
  onClick={downloadTextFile}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
>
  <Download size={18} />
  Download Report (.txt)
</button>
        </div>
      </div>
    </div>
  );
}