
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result;
      if (authMode === "login") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      if (result.error) {
        toast({ title: "Authentication Failed", description: result.error.message, variant: "destructive" });
      } else {
        toast({ title: authMode === "signup" ? "Signup successful" : "Login successful" });
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Unexpected error", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F1F0FB] via-[#fff] to-[#D6BCFA]">
      <div className="w-full max-w-md bg-white/90 border p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">
          {authMode === "signup" ? "Create an Account" : "Sign In"}
        </h2>
        <form onSubmit={handleAuth} className="flex flex-col gap-4 mt-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            disabled={loading}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (authMode === "login" ? "Signing in..." : "Signing up...") : (authMode === "login" ? "Sign In" : "Sign Up")}
          </Button>
        </form>
        <div className="text-sm text-gray-600 text-center mt-4">
          {authMode === "login" ? (
            <>
              No account?{" "}
              <button className="text-blue-600 underline" type="button" onClick={() => setAuthMode("signup")}>
                Sign up here
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button className="text-blue-600 underline" type="button" onClick={() => setAuthMode("login")}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
