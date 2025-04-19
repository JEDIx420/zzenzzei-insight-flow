
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
    <div className="min-h-screen py-8 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center justify-start">
      <Navbar user={user} />
      <h1 className="text-4xl font-extrabold text-[#9b87f5] mt-8 mb-4">Settings</h1>
      <div className="w-full max-w-lg flex flex-col gap-8">
        {loading ? (
          <div className="text-gray-500 py-10 text-center">Loading...</div>
        ) : !user ? (
          <div className="text-gray-400 py-10 text-center">Not logged in. Please login to manage settings.</div>
        ) : (
          <div className="rounded-2xl bg-white/95 px-8 py-6 border border-[#E5DEFF] shadow-md flex flex-col gap-2">
            <div className="font-semibold text-xl mb-3 text-[#7e69ab] flex items-center gap-2">
              <img src="/lovable-uploads/77fcc44d-40f0-47b1-87d4-675d2c5dea92.png" className="h-8 w-8 object-cover rounded-full" />
              Profile
            </div>
            <div className="mb-1 text-gray-700"><span className="font-medium">Email:</span> {user.email}</div>
            <div className="mb-0 text-gray-700"><span className="font-medium">User ID:</span> {user.id}</div>
            <div className="mt-2 text-xs text-gray-500">More personal settings coming soon.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
