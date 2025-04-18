
import { ArrowRight, LogIn } from "lucide-react";

const LandingHero = ({
  onWaitlist,
  onLogin,
}: {
  onWaitlist: () => void;
  onLogin: () => void;
}) => {
  return (
    <header className="w-full px-4 pt-20 pb-2 relative z-20 flex flex-col items-center">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto pt-10 pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-bold bg-gradient-to-r from-[#9b87f5] via-[#1EAEDB] to-[#7E69AB] text-transparent bg-clip-text mb-5 animate-fade-in">
          The Modern AI CRM<br className="hidden sm:block" /> for Top Sales Teams
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-[600px] mx-auto font-medium mb-8 animate-fade-in">
          Supercharge your sales process with Zzenzzei: <span className="font-semibold text-[#9b87f5]">AI-driven insights, automation,</span> and seamless integrations. Focus on closing deals, not chasing manual tasks.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 animate-fade-in">
          <button
            className="bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] hover:from-[#1EAEDB] hover:to-[#9b87f5] px-7 py-3 rounded-full text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1EAEDB]"
            onClick={onWaitlist}
          >
            Join the Waitlist <ArrowRight className="inline ml-2 -mt-1" size={22} />
          </button>
          <button
            className="flex gap-2 items-center bg-white/80 border border-[#ebeaf5] hover:bg-[#F1F0FB] transition px-7 py-3 rounded-full text-[#9b87f5] font-bold text-lg shadow hover:scale-105"
            onClick={onLogin}
          >
            <LogIn size={22} /> Login
          </button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <div>⚡ Smart Pipelines</div>
          <div>🔗 n8n automation</div>
          <div>🧠 AI scoring & NLG</div>
          <div>📊 Real-time analytics</div>
          <div>🛡️ GDPR-ready</div>
        </div>
      </div>
    </header>
  );
};

export default LandingHero;
