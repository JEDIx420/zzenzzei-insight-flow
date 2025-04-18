
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = ({ user }: { user?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-6">
        <span onClick={() => navigate("/dashboard")} className="text-xl font-bold text-[#9b87f5] cursor-pointer">
          Zzenzzei
        </span>
        <div className="hidden md:flex gap-4 items-center">
          <button className={`hover:text-[#9b87f5] transition-colors font-medium ${location.pathname === "/dashboard" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          {/* More navigation links for Contacts, Opportunities, Campaigns, Teams, Reports, Settings */}
          <button className="hover:text-[#9b87f5] font-medium" onClick={() => alert("Coming soon!")}>
            Contacts
          </button>
          <button className="hover:text-[#9b87f5] font-medium" onClick={() => alert("Coming soon!")}>
            Opportunities
          </button>
          <button className="hover:text-[#9b87f5] font-medium" onClick={() => alert("Coming soon!")}>
            Campaigns
          </button>
          <button className="hover:text-[#9b87f5] font-medium" onClick={() => alert("Coming soon!")}>
            Teams
          </button>
          <button className="hover:text-[#9b87f5] font-medium" onClick={() => alert("Coming soon!")}>
            Reports
          </button>
          <button className="hover:text-[#9b87f5] font-medium" onClick={() => alert("Coming soon!")}>
            Settings
          </button>
        </div>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Log Out</Button>
          </div>
        ) : (
          <Button variant="default" size="sm" onClick={() => navigate("/auth")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
