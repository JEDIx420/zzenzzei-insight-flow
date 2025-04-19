
import Navbar from "@/components/Navbar";
import { FeatureIcon, FeatureList } from "../components/FeatureShowcase";
import LandingHero from "../components/LandingHero";
import WaitlistForm from "../components/WaitlistForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Show key product features + Navbar at top
const features = [
  {
    icon: "zap",
    title: "AI-Powered Insights",
    desc: "Get actionable intelligence, predictive scoring, and automated AI coaching.",
  },
  {
    icon: "kanban",
    title: "Visual Pipelines",
    desc: "Manage pipelines using Kanban boards for sales, marketing, and hiring.",
  },
  {
    icon: "upload",
    title: "Easy Data Import",
    desc: "Upload your sales/marketing data directly to Supabase securely from the app.",
  },
  {
    icon: "team",
    title: "Teams & Collaboration",
    desc: "Organize users into teams, track performance, and promote collaboration.",
  },
  {
    icon: "bar-chart-2",
    title: "Analytics & Reporting",
    desc: "Get real-time dashboards to measure deals, campaigns, and team results.",
  }
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    import("@/integrations/supabase/client").then(({ supabase }) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate("/dashboard", { replace: true });
        }
      });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-[#fff] to-[#D6BCFA] font-inter">
      <Navbar />
      <LandingHero
        onWaitlist={() => document.getElementById("waitlist-form")?.scrollIntoView({behavior: "smooth"})}
        onLogin={() => navigate("/auth")}
      />
      {/* Feature Section */}
      <section className="max-w-5xl mx-auto mt-8 md:mt-12 space-y-12 px-4">
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map(f => (
            <FeatureIcon key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>
      <footer className="mt-24 py-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Zzenzzei • Next-gen AI CRM
      </footer>
      <WaitlistForm open={false} onOpenChange={() => {}} />
    </div>
  );
};

export default Index;
