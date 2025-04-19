
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { BarChart2 } from "lucide-react";
const sampleReports = [
  {
    title: "Top Opportunities (Demo Data)",
    stats: [
      { label: "Open", value: 8 },
      { label: "Closed Won", value: 3 },
      { label: "Lost", value: 2 },
    ],
  }
];

const Reports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching, could use supabase to fetch real reports
    setTimeout(() => setLoading(false), 600);
  }, []);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center justify-start">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-[#9b87f5] mb-4 mt-6">Reports</h1>
      <div className="w-full max-w-2xl space-y-6 bg-white/80 rounded-xl shadow border px-6 py-6 mt-4">
        {loading ? (
          <div className="text-gray-500 py-10 text-center">Loading report...</div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <BarChart2 size={40} className="mb-2 text-[#7E69AB]" />
              <span className="font-semibold text-lg mb-1">{sampleReports[0].title}</span>
              <div className="flex gap-6 mt-2">
                {sampleReports[0].stats.map(s => (
                  <div key={s.label} className="flex flex-col items-center px-4">
                    <span className="text-lg font-bold">{s.value}</span>
                    <span className="text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-400 text-center">
              Coming soon: Fully dynamic analytics from your Supabase data.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
