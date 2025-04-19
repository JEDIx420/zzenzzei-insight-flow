
import { useEffect, useState } from "react";

const Settings = () => {
  // Settings UI: Show email, maybe some profile/settings if desired
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#9b87f5] mb-4">Settings</h1>
      <div className="w-full max-w-lg">
        {/* Populate settings content as needed */}
        <div className="text-gray-500 py-10 text-center">
          User preferences and application settings will be available here soon.
        </div>
      </div>
    </div>
  );
};

export default Settings;

