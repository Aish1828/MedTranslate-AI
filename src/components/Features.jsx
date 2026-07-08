import { motion } from "framer-motion";
import {
  FaRobot,
  FaLanguage,
  FaFileMedical,
  FaUserMd
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Medical Assistant",
    desc: "Ask health questions instantly."
  },
  {
    icon: <FaLanguage />,
    title: "Medical Translation",
    desc: "Translate reports into local languages."
  },
  {
    icon: <FaFileMedical />,
    title: "Report Analysis",
    desc: "AI explains medical reports simply."
  },
  {
    icon: <FaUserMd />,
    title: "Doctor Review",
    desc: "Doctors can verify AI summaries."
  }
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 px-8"
    >
      <h2 className="text-5xl font-bold text-center">
        Powerful Features
      </h2>

      <div className="grid md:grid-cols-4 gap-8 mt-16 max-w-7xl mx-auto">

        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -10
            }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <div className="text-4xl text-blue-600 mb-4">
              {feature.icon}
            </div>

            <h3 className="font-bold text-xl">
              {feature.title}
            </h3>

            <p className="text-slate-500 mt-3">
              {feature.desc}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}