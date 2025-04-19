
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = ({ user }: { user?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-full bg-white/90 border-b shadow-sm flex items-center justify-between px-8 py-2 md:py-3 z-50">
      <div className="flex items-center gap-6">
        <span
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-2xl font-extrabold text-[#7E69AB] cursor-pointer select-none leading-none"
          style={{ lineHeight: 1 }}
        >
          <img
            src="/lovable-uploads/77fcc44d-40f0-47b1-87d4-675d2c5dea92.png"
            alt="company logo"
            className="w-10 h-10 rounded-full object-cover bg-white"
            style={{ border: "2px solid #9b87f5" }}
          />
          <span style={{ fontWeight: 800, color: "#7e69ab" }}>zzenzzei</span>
        </span>
        <div className="hidden md:flex gap-4 items-center ml-2">
          <button className={`hover:text-[#9b87f5] font-medium transition-all ${location.pathname === "/dashboard" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/contacts" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/contacts")}>Contacts</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/opportunities" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/opportunities")}>Opportunities</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/campaigns" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/campaigns")}>Campaigns</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/teams" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/teams")}>Teams</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/reports" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/reports")}>Reports</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/settings" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/settings")}>Settings</button>
          <button className={`hover:text-[#9b87f5] font-medium ${location.pathname === "/uploads" ? "text-[#9b87f5]" : ""}`} onClick={() => navigate("/uploads")}>Data Upload</button>
        </div>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm hidden sm:block">{user.email}</span>
            <Button variant="outline" size="sm" onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>Log Out</Button>
          </div>
        ) : (
          <Button variant="default" size="sm" onClick={() => navigate("/auth")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
