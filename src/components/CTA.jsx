import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 px-8"
    id="contact"
    >
      <h2 className="text-5xl font-bold text-center mb-12">
        Take the Next Step in Healthcare Communication
      </h2>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-[40px] p-16 text-center"
      >
        <h2 className="text-5xl font-bold">
          Ready To Transform Healthcare Communication?
        </h2>

        <p className="mt-6 text-lg">
          Join MedTranslate AI today.
        </p>

          <Link to="/signup">
            <button className="mt-8 px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold">
              Get Started
            </button>
          </Link>
        
      </motion.div>
    </section>
  );
}