import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function analyzeMedicalReport(reportText) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are a medical report analyzer.

Analyze the report and return EXACTLY in this format:

SUMMARY:
<short patient-friendly summary>

CONDITIONS:
<comma separated conditions>

RISK_LEVEL:
<Low, Medium, or High>

Do not include anything else.
`,
        },
        {
          role: "user",
          content: reportText,
        },
      ],
      temperature: 0.2,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
}