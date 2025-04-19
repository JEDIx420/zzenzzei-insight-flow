import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

type Team = {
  id: string;
  name: string;
  created_at?: string;
};

const Teams = () => {
  // This page can't show live data until the 'teams' table exists.
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <Navbar />
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-4xl font-bold text-[#9b87f5]">Teams</h1>
        <Button variant="default" disabled>
          <Plus size={18} /> Add Team
        </Button>
      </div>
      <div className="text-gray-400 text-center mt-16">
        No teams yet.<br />
        <span className="text-xs">Enable this page by adding a <strong>teams</strong> table to your Supabase project.</span>
      </div>
    </div>
  );
};

export default Teams;
