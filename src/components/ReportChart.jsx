import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", reports: 2 },
  { month: "Feb", reports: 4 },
  { month: "Mar", reports: 7 },
  { month: "Apr", reports: 10 },
  { month: "May", reports: 14 },
];

export default function ReportChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold mb-4">
        Reports Uploaded
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="reports"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}