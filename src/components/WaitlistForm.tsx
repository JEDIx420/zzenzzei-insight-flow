
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      toast({ title: "Please enter a valid email." });
      return;
    }
    setSubmitted(true);
    toast({ title: "Welcome to the waitlist!", description: "We'll notify you when Zzenzzei is ready to onboard new users.", icon: <CheckCircle className="text-green-500" /> });
    setTimeout(() => {
      setEmail("");
      setName("");
      setSubmitted(false);
      onOpenChange(false);
    }, 1700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl px-6 py-7">
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
            disabled={submitted}
          />
          <Input
            type="email"
            placeholder="Your email"
            autoComplete="email"
            className="bg-gray-50"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={submitted}
          />
          <DialogFooter>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white font-semibold py-2 hover:scale-[1.02] transition-transform disabled:opacity-60"
              disabled={submitted}
            >
              {submitted ? "Submitted!" : "Join Waitlist"}
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

export default WaitlistForm;
