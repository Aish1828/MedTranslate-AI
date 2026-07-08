import jsPDF from "jspdf";

export const downloadTranslatedPDF = (
  translatedText
) => {
  const pdf = new jsPDF();

  pdf.text(translatedText, 10, 10);

  pdf.save("translated-report.pdf");
};