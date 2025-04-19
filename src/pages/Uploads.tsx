
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Upload, FileText, File } from "lucide-react"; // Fixed: use File instead of FileExcel/FileCsv

const sampleColumns = [
  { name: "name", desc: "Name or title" },
  { name: "email", desc: "Email address or Owner" },
  { name: "amount", desc: "Amount (for Opportunities table)" },
  { name: "status", desc: "Status field" },
  { name: "created_at", desc: "Date/time created" }
];

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
      setError("Please select a file!");
      return;
    }

    // Check file type
    const allowed = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];
    if (!allowed.includes(file.type) && !file.name.endsWith(".csv") && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setError("Only Excel (.xls/.xlsx) or CSV (.csv) files are allowed.");
      return;
    }

    setUploading(true);

    // Just saves metadata for now
    const fileName = file.name;
    const { error: metaErr } = await supabase
      .from("uploads")
      .insert([{ file_name: fileName, table_target: null, uploaded_by: null }]);

    setUploading(false);

    if (metaErr) {
      setError("Upload failed: " + metaErr.message);
    } else {
      setSuccess("File uploaded successfully! (Metadata saved)");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] to-[#D6BCFA] flex flex-col items-center py-8">
      <Navbar />
      <form className="bg-white/95 border shadow-lg rounded-xl p-8 w-full max-w-lg mt-10 flex flex-col items-center space-y-5">
        <h2 className="text-2xl font-bold text-[#9b87f5] mb-1 flex items-center gap-2">
          <Upload className="text-[#7e69ab]" size={28} /> Upload a Data File
        </h2>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv,.xls,.xlsx"
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <div className="text-xs text-gray-500 w-full text-left mb-2">
          <strong>Only Excel (.xls, .xlsx) or CSV (.csv) files are accepted.</strong><br />
          <span>Required columns: <span className="font-mono">name, email, amount, status, created_at</span></span>
        </div>
        <div className="bg-gray-50 p-2 rounded border w-full flex flex-col gap-1">
          <div className="text-xs font-semibold mb-1 flex items-center gap-1"><File className="inline-block text-[#7e69ab]" size={14}/>Sample column structure:</div>
          <ul className="text-xs list-disc list-inside ml-1 space-y-1">
            {sampleColumns.map(col => (
              <li key={col.name}>
                <span className="font-mono">{col.name}</span> <span className="text-gray-400">– {col.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" variant="default" disabled={uploading}>
          {uploading ? "Uploading..." : <><Upload size={18}/> Upload</>}
        </Button>
        {success && <div className="text-green-600 text-xs">{success}</div>}
        {error && <div className="text-red-500 text-xs">{error}</div>}
      </form>
    </div>
  );
};

export default Uploads;
