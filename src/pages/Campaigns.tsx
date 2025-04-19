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
    <div className="min-h-screen py-8 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center w-full max-w-2xl mb-8">
        <h1 className="text-4xl font-extrabold text-[#9b87f5] mb-2">Campaigns</h1>
      </div>
      {loading ? (
        <div className="text-gray-500 py-10">Loading...</div>
      ) : campaigns.length === 0 ? (
        <div className="text-gray-400 text-center mt-14">
          <p>No campaigns found yet.</p>
          <p className="text-xs mt-2">Create your first campaign soon, or import your data via Data Upload.</p>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Campaigns;
