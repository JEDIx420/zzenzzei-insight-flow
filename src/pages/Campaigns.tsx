
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Campaign = {
  id: string;
  name: string;
  created_at?: string;
  // Add fields according to your table
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // This assumes a table named 'campaigns'—update accordingly
    supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setCampaigns(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-4xl font-bold text-[#9b87f5]">Campaigns</h1>
        <Button variant="default" disabled>
          <Plus size={18} /> Add Campaign
        </Button>
      </div>
      {loading ? (
        <div className="text-gray-500 py-10">Loading...</div>
      ) : campaigns.length === 0 ? (
        <div className="text-gray-400 text-center mt-16">
          No campaigns yet.
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-2">
          {campaigns.map(camp => (
            <div key={camp.id} className="bg-white rounded shadow p-4">
              {camp.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;

