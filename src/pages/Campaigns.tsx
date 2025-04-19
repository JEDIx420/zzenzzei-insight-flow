
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

type Campaign = {
  id: string;
  name: string;
  created_at?: string;
};

const Campaigns = () => {
  const [campaigns] = useState<Campaign[]>([]);
  const [loading] = useState(false);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <Navbar />
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-4xl font-bold text-[#9b87f5]">Campaigns</h1>
        <Button variant="default" disabled>
          <Plus size={18} /> Add Campaign
        </Button>
      </div>
      <div className="text-gray-400 text-center mt-16">
        No campaigns yet.
        <br />
        <span className="text-xs">
          Enable this page by adding a <strong>campaigns</strong> table to your Supabase project.
        </span>
      </div>
    </div>
  );
};

export default Campaigns;

