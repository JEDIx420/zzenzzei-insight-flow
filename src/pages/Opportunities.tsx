
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Opportunity = {
  id: string;
  name: string;
  created_at?: string;
  // Add fields as needed from your DB
};

const Opportunities = () => {
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Example: You may have an 'opportunities' table. Otherwise just show no data state.
    supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setOpps(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          No opportunities yet.
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-2">
          {/* List your opportunities here */}
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

