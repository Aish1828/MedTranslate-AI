import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";


export default function Landing() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
    
  );
  
}
