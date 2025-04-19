
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { DataUploadDialog } from "@/components/DataUploadDialog";

type Account = {
  id: string;
  name: string;
  website?: string;
  domain?: string;
  industry?: string;
  phone?: string;
};

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    website: "",
    domain: "",
    industry: "",
    phone: "",
  });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    supabase
      .from("accounts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError("Unable to load accounts. Please check your network or backend setup!");
          setAccounts([]);
        } else {
          setAccounts(data || []);
          setError(""); // Reset error on successful fetch
        }
        setLoading(false);
      });
  }, []);

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    if (!newAccount.name.trim()) {
      setError("Name is required");
      setAdding(false);
      return;
    }
    const { data, error } = await supabase
      .from("accounts")
      .insert([{
        name: newAccount.name,
        website: newAccount.website || null,
        domain: newAccount.domain || null,
        industry: newAccount.industry || null,
        phone: newAccount.phone || null,
      }]).select();

    if (error) {
      setError("Error creating account");
    } else if (data && data.length > 0) {
      setAccounts(prev => [data[0], ...prev]);
      setShowAdd(false);
      setNewAccount({
        name: "",
        website: "",
        domain: "",
        industry: "",
        phone: "",
      });
    }
    setAdding(false);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <Navbar />
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-4xl font-bold text-[#9b87f5]">Accounts</h1>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => setShowAdd(v => !v)}>
            <Plus size={18} /> Add Account
          </Button>
          <Button variant="outline" onClick={() => setShowUpload(true)}>
            <Upload size={18} /> Bulk Upload
          </Button>
        </div>
      </div>
      <DataUploadDialog open={showUpload} onOpenChange={setShowUpload} defaultType="accounts" />
      {showAdd && (
        <form className="max-w-2xl w-full bg-white rounded-lg shadow p-4 mb-6 space-y-3" onSubmit={handleAddAccount}>
          <div className="flex flex-col gap-3">
            <input
              className="border px-2 py-1 rounded"
              placeholder="Name"
              value={newAccount.name}
              onChange={e => setNewAccount(c => ({ ...c, name: e.target.value }))}
              required
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Domain"
              value={newAccount.domain}
              onChange={e => setNewAccount(c => ({ ...c, domain: e.target.value }))}
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Website"
              value={newAccount.website}
              onChange={e => setNewAccount(c => ({ ...c, website: e.target.value }))}
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Industry"
              value={newAccount.industry}
              onChange={e => setNewAccount(c => ({ ...c, industry: e.target.value }))}
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="Phone"
              value={newAccount.phone}
              onChange={e => setNewAccount(c => ({ ...c, phone: e.target.value }))}
            />
          </div>
          <div className="flex gap-2 items-center mt-2">
            <Button type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add Account"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
            {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
          </div>
        </form>
      )}
      {loading ? (
        <div className="text-gray-500 py-10">Loading...</div>
      ) : accounts.length === 0 ? (
        <div className="text-gray-400 text-center mt-16">
          <Building2 className="mx-auto mb-2" size={48} />
          <div>No accounts yet.</div>
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-2">
          {accounts.map(account => (
            <div key={account.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center gap-2 justify-between">
              <div className="flex-1">
                <span className="font-semibold text-lg flex items-center gap-1">
                  <Building2 size={18} className="text-[#9b87f5]" />
                  {account.name}
                </span>
                <span className="block text-sm text-gray-500">{account.domain}</span>
                <span className="block text-xs text-gray-400">{account.website} {account.industry && `| ${account.industry}`}</span>
              </div>
              <div className="flex gap-4 text-gray-600 items-center text-xs">
                {account.phone && (
                  <span>
                    📞 {account.phone}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accounts;
