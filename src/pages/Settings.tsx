
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const Settings = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted && session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center justify-start">
      <Navbar user={user} />
      <h1 className="text-4xl font-bold text-[#9b87f5] mt-8 mb-4">Settings</h1>
      <div className="w-full max-w-lg">
        {loading ? (
          <div className="text-gray-500 py-10 text-center">Loading...</div>
        ) : !user ? (
          <div className="text-gray-400 py-10 text-center">You are not logged in. Please login to manage settings.</div>
        ) : (
          <div className="rounded bg-white/90 px-6 py-4 border shadow-md">
            <div className="font-semibold text-lg mb-4">Profile</div>
            <div className="mb-3"><span className="font-medium">Email:</span> {user.email}</div>
            {/* Add more profile fields here when extended */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
