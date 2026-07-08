import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function HealthChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    const { data, error } = await supabase
      .from("translations")
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    if (!error && data) {
      const formatted = data.map((report) => ({
        date: new Date(
          report.created_at
        ).toLocaleDateString(),

        risk:
          report.risk_level === "High"
            ? 3
            : report.risk_level === "Medium"
            ? 2
            : 1,
      }));

      setChartData(formatted);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-xl font-bold mb-2">
        Health Risk Trend
      </h2>

      <p className="text-slate-500 mb-6">
        Track how your health risk changes over time.
      </p>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart data={chartData}>

          <XAxis dataKey="date" />

          <YAxis
            ticks={[1, 2, 3]}
            tickFormatter={(value) => {
              if (value === 1) return "Low";
              if (value === 2) return "Medium";
              return "High";
            }}
          />

          <Tooltip
            formatter={(value) => {
              if (value === 1) return "Low";
              if (value === 2) return "Medium";
              return "High";
            }}
          />

          <Area
            type="monotone"
            dataKey="risk"
            stroke="#2563eb"
            fill="#93c5fd"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}