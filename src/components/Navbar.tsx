
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
        <span
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-xl font-bold text-[#9b87f5] cursor-pointer"
        >
          <img src="/lovable-uploads/8ae5233c-cc59-40e1-8e14-ae788063e95e.png" alt="company logo" className="w-8 h-8 rounded-full bg-[#1EAEDB]" />
          zzenzzei
        </span>
        <div className="hidden md:flex gap-4 items-center">
          <button className={`hover:text-[#9b87f5] transition-colors font-medium ${location.pathname === "/dashboard" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/contacts" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/contacts")}>
            Contacts
          </button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/opportunities" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/opportunities")}>
            Opportunities
          </button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/campaigns" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/campaigns")}>
            Campaigns
          </button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/teams" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/teams")}>
            Teams
          </button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/reports" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/reports")}>
            Reports
          </button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/settings" ? "text-[#9b87f5]" : ""}`}
            onClick={() => navigate("/settings")}>
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
