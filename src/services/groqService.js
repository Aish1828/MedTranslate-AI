import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function translateMedicalReport(
  reportText,
  targetLanguage
) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are a professional medical translator.

Rules:
1. Translate accurately.
2. Keep medical terms understandable.
3. Maintain report formatting.
4. Do not add extra information.
          `,
        },
        {
          role: "user",
          content: `
Translate the following medical report into ${targetLanguage}:

${reportText}
          `,
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
export async function askMedicalAssistant(question) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful medical assistant. Explain medical terms in simple language. Do not diagnose diseases.",
      },
      {
        role: "user",
        content: question,
      },
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
}
export async function analyzeMedicalReport(
  reportText
) {
  try {
    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
Analyze the medical report and provide:

SUMMARY:
Short patient summary.

CONDITIONS:
List detected conditions.

RISK_LEVEL:
Low, Medium, or High.
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
