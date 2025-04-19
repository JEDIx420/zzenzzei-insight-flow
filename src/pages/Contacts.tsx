import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, User, Mail, Phone, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { DataUploadDialog } from "@/components/DataUploadDialog";

type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  created_at?: string;
  position?: string;
};

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [newContact, setNewContact] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    position: "",
  });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setError("Unable to load contacts. Please check your network or backend setup!");
          setContacts([]);
        } else {
          setContacts(data || []);
          setError(""); // Reset error on successful fetch
        }
        setLoading(false);
      });
  }, []);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    if (!newContact.first_name.trim() || !newContact.last_name.trim()) {
      setError("First & Last name required");
      setAdding(false);
      return;
    }
    const { data, error } = await supabase
      .from("contacts")
      .insert([{
        first_name: newContact.first_name,
        last_name: newContact.last_name,
        email: newContact.email || null,
        phone: newContact.phone || null,
        position: newContact.position || null,
      }]).select();

    if (error) {
      setError("Error creating contact");
    } else if (data && data.length > 0) {
      setContacts(prev => [data[0], ...prev]);
      setShowAdd(false);
      setNewContact({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        position: "",
      });
    }
    setAdding(false);
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center">
      <Navbar />
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-4xl font-bold text-[#9b87f5]">Contacts</h1>
        <div className="flex items-center gap-3">
          <Button variant="default" onClick={() => setShowAdd(v => !v)}>
            <Plus size={18} /> Add Contact
          </Button>
          <Button variant="outline" onClick={() => setShowUpload(true)}>
            <Upload size={18}/> Bulk Upload
          </Button>
        </div>
      </div>
      <DataUploadDialog open={showUpload} onOpenChange={setShowUpload} defaultType="contacts" />
      {showAdd && (
        <form className="max-w-2xl w-full bg-white rounded-lg shadow p-4 mb-6 space-y-3" onSubmit={handleAddContact}>
          <div className="flex gap-3">
            <Input
              placeholder="First Name"
              value={newContact.first_name}
              onChange={e => setNewContact(c => ({ ...c, first_name: e.target.value }))}
              required
            />
            <Input
              placeholder="Last Name"
              value={newContact.last_name}
              onChange={e => setNewContact(c => ({ ...c, last_name: e.target.value }))}
              required
            />
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Email"
              type="email"
              value={newContact.email}
              onChange={e => setNewContact(c => ({ ...c, email: e.target.value }))}
            />
            <Input
              placeholder="Phone"
              value={newContact.phone}
              onChange={e => setNewContact(c => ({ ...c, phone: e.target.value }))}
            />
            <Input
              placeholder="Position"
              value={newContact.position}
              onChange={e => setNewContact(c => ({ ...c, position: e.target.value }))}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Button type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add Contact"}
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
      ) : contacts.length === 0 ? (
        <div className="text-gray-400 text-center mt-16">
          <User className="mx-auto mb-2" size={48} />
          <div>No contacts yet.</div>
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-2">
          {contacts.map(contact => (
            <div key={contact.id} className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center gap-2 justify-between">
              <div className="flex-1 flex flex-col">
                <span className="font-semibold text-lg flex items-center gap-1">
                  <User size={18} className="text-[#9b87f5]" />
                  {contact.first_name} {contact.last_name}
                </span>
                <span className="text-sm text-gray-500">{contact.position}</span>
              </div>
              <div className="flex gap-4 text-gray-600 items-center">
                {contact.email && (
                  <span className="flex gap-1 items-center text-xs">
                    <Mail size={16} /> {contact.email}
                  </span>
                )}
                {contact.phone && (
                  <span className="flex gap-1 items-center text-xs">
                    <Phone size={16} /> {contact.phone}
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

export default Contacts;
