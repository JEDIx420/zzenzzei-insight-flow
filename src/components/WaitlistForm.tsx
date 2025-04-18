
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";

const WaitlistForm = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      toast({ title: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    setSubmitted(true);
    // Insert into Supabase waitlist
    const { error } = await supabase.from("waitlist").insert([
      { name: name || null, email: email.trim() },
    ]);
    setLoading(false);

    if (error) {
      toast({ title: "Submission failed.", description: "Please try again in a moment." });
      setSubmitted(false);
      return;
    }

    setSuccess(true);
    setEmail("");
    setName("");
  };

  // Reset thank you screen when modal closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false);
        setSubmitted(false);
        setLoading(false);
      }, 350); // match dialog close animation
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl px-6 py-7">
        {success ? (
          <div className="flex flex-col items-center justify-center min-h-[210px] text-center animate-fade-in">
            <CheckCircle className="text-green-500 mb-2" size={48} />
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-1 text-center">Thank You!</DialogTitle>
              <p className="text-center text-sm text-gray-600 mb-1">
                You're on our waitlist. We'll notify you when Zzenzzei launches.<br />Stay tuned!
              </p>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <button type="button" className="mt-7 w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white font-semibold py-2 hover:scale-[1.02] transition-transform text-base">
                  Close
                </button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-1 text-center">Join the Waitlist</DialogTitle>
              <p className="text-center text-sm text-gray-500 mb-1">
                Be first in line! <span className="font-semibold text-[#9b87f5]">Get notified when Zzenzzei launches.</span>
              </p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              <Input
                type="text"
                placeholder="Name (optional)"
                autoComplete="name"
                className="bg-gray-50"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading || submitted}
              />
              <Input
                type="email"
                placeholder="Your email"
                autoComplete="email"
                className="bg-gray-50"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading || submitted}
              />
              <DialogFooter>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white font-semibold py-2 hover:scale-[1.02] transition-transform disabled:opacity-60"
                  disabled={loading || submitted}
                >
                  {loading ? "Sending..." : submitted ? "Submitted!" : "Join Waitlist"}
                </button>
                <DialogClose asChild>
                  <button type="button" className="mt-2 text-gray-500 hover:underline w-full text-xs">Cancel</button>
                </DialogClose>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistForm;
