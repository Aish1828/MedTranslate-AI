import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

import UploadReport from "./pages/UploadReport";
import TranslatePage from "./pages/TranslatePage";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";   
import AnalyticsPage from "./pages/Chatbot"; 
import AIChatCard from "./components/AIChatCard";
import BookAppointment from "./pages/Appointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

<Route
  path="/patient-dashboard"
  element={<PatientDashboard />}
/>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

        <Route path="/upload-report" element={<UploadReport />} />
        <Route path="/translator" element={<TranslatePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/profile" element={<Profile />} />
       <Route path="/Ask_ai" element={<AIChatCard/>} />
       <Route path="/reports" element={<Reports />} />
       <Route path="/analytics" element={<Chatbot />}/>
       <Route path="/book-appointment" element={<BookAppointment />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;