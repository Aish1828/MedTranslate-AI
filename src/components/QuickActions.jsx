import {
  FaFileMedical,
  FaLanguage,
  FaRobot,
  FaChartLine
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <FaFileMedical />,
      title: "Upload Report",
      color: "bg-blue-50",
      action: () => navigate("/upload-report"),
    },
    {
      icon: <FaLanguage />,
      title: "Translate Report",
      color: "bg-green-50",
      action: () => navigate("/translator"),
    },
    {
      icon: <FaRobot />,
      title: "AI Assistant",
      color: "bg-purple-50",
      action: () => navigate("/Ask_ai"),
    },
    {
      icon: <FaChartLine />,
      title: "Health Insights",
      color: "bg-orange-50",
      action: () => navigate("/analytics"),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

      {actions.map((action, index) => (
        <div
          key={index}
          onClick={action.action}
          className={`
            ${action.color}
            rounded-[24px]
            p-6
            shadow-lg
            hover:-translate-y-2
            hover:shadow-2xl
            transition-all
            cursor-pointer
            border border-white
          `}
        >
          <div className="text-3xl text-blue-600">
            {action.icon}
          </div>

          <h3 className="mt-4 font-semibold text-lg">
            {action.title}
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Open feature
          </p>
        </div>
      ))}

    </div>
  );
}