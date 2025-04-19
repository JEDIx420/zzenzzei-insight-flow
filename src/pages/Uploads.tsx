
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Uploads = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);

    // For now, just store in Supabase uploads metadata (assuming file storage logic can be added later)
    const fileName = file.name;
    const { error: metaErr } = await supabase
      .from("uploads")
      .insert([{ file_name: fileName, table_target: null, uploaded_by: null }]);
    
    setUploading(false);

    if (metaErr) {
      setError("Upload failed: " + metaErr.message);
    } else {
      setSuccess("File uploaded info saved to database.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center py-12">
      <Navbar />
      <form className="bg-white/80 border shadow-lg rounded-lg p-8 w-full max-w-lg mt-8 flex flex-col items-center space-y-4" onSubmit={handleUpload}>
        <h2 className="text-2xl font-bold text-[#9b87f5] mb-2">Upload a Data File</h2>
        <input
          type="file"
          ref={fileInputRef}
          className="border px-3 py-2 rounded w-full"
        />
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Uploads;
