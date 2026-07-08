import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { askMedicalAssistant } from "../services/groqService";

export default function AIChatCard() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const result = await askMedicalAssistant(question);
      setAnswer(result);
    } catch (error) {
      console.error(error);
      setAnswer("Unable to generate response.");
    }

    setLoading(false);
  };

  return (
    <div className="rounded-[30px] p-8 backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl">

      <div className="flex items-center gap-3 mb-4">
        <Bot className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold">
          Ask MedTranslate AI
        </h2>
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What does HbA1c mean?"
        className="w-full rounded-xl border p-4 outline-none"
      />

      <button
        onClick={handleAsk}
        className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
      >
        <Send size={18} />
        Ask AI
      </button>

      {loading && (
        <div className="mt-4 text-slate-500">
          Thinking...
        </div>
      )}

      {answer && (
        <div className="mt-6 bg-blue-50 p-4 rounded-xl">
          <p className="font-medium text-slate-700">
            {answer}
          </p>
        </div>
      )}

      <div className="mt-8 space-y-3 text-slate-500">

        <p
          className="cursor-pointer hover:text-blue-600"
          onClick={() =>
            setQuestion("What is LDL Cholesterol?")
          }
        >
          What is LDL Cholesterol?
        </p>

        <p
          className="cursor-pointer hover:text-blue-600"
          onClick={() =>
            setQuestion(
              "Explain my blood report in simple language."
            )
          }
        >
          Explain my blood report.
        </p>

        <p
          className="cursor-pointer hover:text-blue-600"
          onClick={() =>
            setQuestion(
              "What does high blood sugar indicate?"
            )
          }
        >
          What does high blood sugar indicate?
        </p>

      </div>

    </div>
  );
}