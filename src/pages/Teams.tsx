import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";

const Teams = () => {
  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center w-full max-w-2xl mb-8">
        <h1 className="text-4xl font-extrabold text-[#9b87f5] mb-2">Teams</h1>
      </div>
      <div className="text-gray-400 text-center mt-14">
        <p>No teams created yet.</p>
        <p className="text-xs mt-2">Teams help organize users, assign deals and track results together.</p>
      </div>
    </div>
  );
};

export default Teams;
