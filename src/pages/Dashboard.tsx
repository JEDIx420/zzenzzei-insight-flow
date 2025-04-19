
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { DataUploadDialog } from "@/components/DataUploadDialog";
import { Upload } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    fetchUser();

    // Setup onAuthStateChange listener for session updates
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F0FB] via-[#fff] to-[#D6BCFA]">
      <div className="text-lg text-gray-700">Loading dashboard...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col font-inter">
      <Navbar user={user} />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-[2.5rem] sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-transparent bg-clip-text mb-4 animate-fade-in">
          Welcome, {user?.email}!
        </h1>
        <div className="rounded-md bg-white/90 px-6 py-4 border shadow-md w-full max-w-xl flex flex-col gap-3">
          <div className="text-xl font-semibold mb-2">Dashboard</div>
          <div className="text-gray-500 mb-2">You're now logged in to Zzenzzei. Use the navigation to access modules.</div>
          <Button variant="outline" className="flex gap-2 w-max" onClick={() => setShowUpload(true)}>
            <Upload size={18}/> Data Upload
          </Button>
        </div>
      </div>
      <DataUploadDialog open={showUpload} onOpenChange={setShowUpload} />
    </div>
  );
};

export default Dashboard;
