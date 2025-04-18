
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const VALID_EMAIL = "jay@zzenzzei.com";
const VALID_PASS = "Datasemantics@123";

const LoginModal = ({
  open,
  onOpenChange,
  onAuthenticated,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onAuthenticated: () => void;
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 600)); // simulate load

    if (
      email.toLowerCase().trim() === VALID_EMAIL.toLowerCase() &&
      password === VALID_PASS
    ) {
      toast({ title: "Login successful", icon: <LogIn className="text-green-500" /> });
      setTimeout(() => {
        setLoading(false);
        setEmail("");
        setPassword("");
        onOpenChange(false);
        onAuthenticated();
      }, 600);
    } else {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
      toast({ title: "Login failed", description: "Check your credentials.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl px-6 py-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-1 text-center">Sign In</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
          <Input
            type="email"
            placeholder="Email"
            required
            autoComplete="username"
            className="bg-gray-50"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(null); }}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="bg-gray-50"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(null); }}
            disabled={loading}
          />
          {error && <div className="text-red-500 text-xs px-1 py-1">{error}</div>}
          <DialogFooter>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white font-semibold py-2 hover:scale-[1.02] transition-transform disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            <DialogClose asChild>
              <button type="button" className="mt-2 text-gray-500 hover:underline w-full text-xs">Cancel</button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
