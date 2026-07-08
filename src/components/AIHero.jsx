import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AIHero() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 p-8 text-white shadow-2xl"
    >
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <h2 className="text-5xl font-bold">
       MedTranslate
       <br/>
       Understanding Healthcare Clearly
      </h2>

      <p className="mt-4 max-w-2xl text-lg text-blue-100">
        Upload reports, translate medical terms,
        understand prescriptions and get
        AI-powered healthcare insights.
      </p>
      

      
    </motion.div>
    
  );
}