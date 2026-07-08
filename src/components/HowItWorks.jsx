import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Upload Report",
    desc: "Upload medical reports or prescriptions securely."
  },
  {
    number: "02",
    title: "AI Analysis",
    desc: "Groq AI analyzes and simplifies complex medical terms."
  },
  {
    number: "03",
    title: "Get Insights",
    desc: "Understand your health in your preferred language."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-8 bg-white"
    id="steps"
    >
      <h2 className="text-5xl font-bold text-center">
        How It Works
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-16">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            whileHover={{ y: -8 }}
            className="p-8 rounded-3xl border border-slate-200 bg-slate-50"
          >
            <span className="text-5xl font-bold text-blue-600">
              {step.number}
            </span>

            <h3 className="text-2xl font-bold mt-4">
              {step.title}
            </h3>

            <p className="text-slate-500 mt-3">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}