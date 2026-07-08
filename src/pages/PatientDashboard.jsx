import Sidebar from "../components/Sidebar";
import AIHero from "../components/AIHero";
import QuickActions from "../components/QuickActions";
import AIHealthSummary from "../components/AIHealthSummary";
import AIChatCard from "../components/AIChatCard";
import HealthChart from "../components/HealthChart";
import HealthTimeline from "../components/HealthTimeline";
import RecentReportCard from "../components/RecentReportCard";

export default function PatientDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Good Afternoon 👋
        </h1>

        <AIHero />

        <div className="mt-8">
          <QuickActions />

<div className="mt-8">
  <RecentReportCard />
</div>

<div className="grid lg:grid-cols-2 gap-6 mt-8">
  <AIHealthSummary />
  <AIChatCard />
</div>

<div className="mt-8">
  <HealthChart />
</div>

<div className="mt-8">
  <HealthTimeline />
</div>
        </div>

      </div>
    </div>
  );
}