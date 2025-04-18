
import { useState } from "react";
import LandingHero from "../components/LandingHero";
import WaitlistForm from "../components/WaitlistForm";
import LoginModal from "../components/LoginModal";

const Index = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Only show the landing if not authed. For real app, use backend.
  if (authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center justify-center font-inter">
        <h1 className="text-[2.5rem] sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-transparent bg-clip-text mb-4 animate-fade-in">
          Welcome, Jay!
        </h1>
        <p className="text-lg text-gray-600 mb-8">You are authenticated. 🎉</p>
        <div className="rounded-md bg-white/90 px-6 py-4 border shadow-md">
          <div className="text-xl font-semibold mb-3">Dashboard Placeholder</div>
          <div className="text-gray-500">This is a quick preview for authenticated users. <br /> More actual dashboard content will appear here as we develop Zzenzzei!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-[#fff] to-[#D6BCFA] font-inter">
      <LandingHero
        onWaitlist={() => setWaitlistOpen(true)}
        onLogin={() => setLoginOpen(true)}
      />
      {/* Feature/Value Section */}
      <section className="max-w-5xl mx-auto mt-12 space-y-16 px-4">
        {/* 1. Powerful AI CRM */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="BrainCog"
            title="AI-Powered Insights"
            desc="Zzenzzei leverages advanced AI to give actionable sales intelligence, predictive opportunity scoring, and messaging support."
          />
          <FeatureCard
            icon="KanbanSquare"
            title="Kanban & Analytics"
            desc="Visualize pipelines, manage opportunities, and see team performance in beautiful dashboards and Kanban views."
          />
          <FeatureCard
            icon="Zap"
            title="Workflow Automation"
            desc="Seamless integration with n8n to automate tasks, campaigns, notifications and connect your favorite tools instantly."
          />
        </div>
        {/* 2. Integration banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 rounded-lg bg-white/30 backdrop-blur-sm border border-[#ebeaf5] shadow-sm animate-fade-in">
          <div className="flex-1 text-lg md:text-xl font-semibold text-gray-900">
            <span className="inline-block bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-transparent bg-clip-text font-bold">Instantly connect</span>
            &nbsp;with LinkedIn, HubSpot, Gmail, and more. Data stays in sync, opportunities are never missed.
          </div>
          <div className="flex gap-3 items-center text-gray-400 mt-4 md:mt-0">
            <IntegrationIcon name="Linkedin" />
            <IntegrationIcon name="Hubspot" />
            <IntegrationIcon name="Mail" />
            <IntegrationIcon name="Zap" />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-24 py-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Zzenzzei • Next-gen AI CRM
      </footer>
      <WaitlistForm open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} onAuthenticated={() => setAuthenticated(true)} />
    </div>
  );
};

export default Index;

// --- Reusable feature card and integration icon ---
import { BrainCog, KanbanSquare, Zap, Linkedin, Mail, Zap as ZapIcon } from "lucide-react";
function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  const icons: any = { BrainCog, KanbanSquare, Zap };
  const Icon = icons[icon];
  return (
    <div className="bg-white/70 rounded-xl p-6 shadow-lg border backdrop-blur flex flex-col items-center text-center animate-fade-in hover:scale-105 transition-transform duration-200">
      <div className="mb-3">
        <Icon size={36} className="text-[#9b87f5]" />
      </div>
      <div className="font-semibold text-lg mb-2">{title}</div>
      <div className="text-gray-500 text-sm">{desc}</div>
    </div>
  );
}

function IntegrationIcon({ name }: { name: string }) {
  const icons: any = { Linkedin, Hubspot: KanbanSquare, Mail, Zap: ZapIcon };
  const Icon = icons[name];
  return (
    <span className="inline-flex items-center justify-center p-2 rounded-full bg-white shadow border border-[#eee] mx-1">
      <Icon size={20} className="text-[#9b87f5]" />
    </span>
  );
}
