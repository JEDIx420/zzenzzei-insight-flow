
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Can't fetch from a non-existing table. Instead, simply display empty state.
// Add informative message for how to enable data.

type Opportunity = {
  id: string;
  name: string;
  created_at?: string;
};

const Opportunities = () => {
  const [opps] = useState<Opportunity[]>([]);
  const [loading] = useState(false);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-4xl font-bold text-[#9b87f5]">Opportunities</h1>
        <Button variant="default" disabled>
          <Plus size={18} /> Add Opportunity
        </Button>
      </div>
      {loading ? (
        <div className="text-gray-500 py-10">Loading...</div>
      ) : opps.length === 0 ? (
        <div className="text-gray-400 text-center mt-16">
          No opportunities yet.<br/>
          <span className="text-xs">Enable this page by adding an <strong>opportunities</strong> table to your Supabase project.</span>
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-2">
          {opps.map(opp => (
            <div key={opp.id} className="bg-white rounded shadow p-4">
              {opp.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;
