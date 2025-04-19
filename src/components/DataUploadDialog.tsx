
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, File } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";

const schemaMap = {
  contacts: {
    label: "Contacts",
    requiredCols: [
      {name: "first_name", desc: "First name"},
      {name: "last_name", desc: "Last name"},
      {name: "email", desc: "Email address (optional)"},
      {name: "phone", desc: "Phone number (optional)"},
      {name: "position", desc: "Position (optional)"}
    ]
  },
  accounts: {
    label: "Accounts",
    requiredCols: [
      {name: "name", desc: "Name (required)"},
      {name: "domain", desc: "Domain (optional)"},
      {name: "website", desc: "Website (optional)"},
      {name: "industry", desc: "Industry (optional)"},
      {name: "phone", desc: "Phone (optional)"}
    ]
  }
};

type UploadType = "contacts" | "accounts";

export function DataUploadDialog({ open, onOpenChange, defaultType }: {
  open: boolean,
  onOpenChange: (val: boolean) => void,
  defaultType?: UploadType
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadType, setUploadType] = useState<UploadType | undefined>(defaultType);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function resetState() {
    setUploading(false);
    setSuccess(null);
    setError(null);
    setUploadType(defaultType);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSuccess(null);
    setError(null);
    const file = e.target.files?.[0];
    if (!file || !uploadType) return;

    // File validation
    const allowed = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];
    if (!allowed.includes(file.type) &&
        !file.name.endsWith(".csv") && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      setError("Only Excel (.xls/.xlsx) or CSV (.csv) files are allowed.");
      return;
    }
    setUploading(true);
    let rows: any[] = [];
    try {
      if (file.name.endsWith(".csv")) {
        // Parse CSV
        await new Promise<void>((resolve, reject) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              rows = results.data;
              resolve();
            },
            error: err => reject(err)
          });
        });
      } else {
        // Parse XLS/XLSX
        const ab = await file.arrayBuffer();
        const workbook = XLSX.read(ab, {type: "array"});
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet);
      }
    } catch (err) {
      setUploading(false);
      setError("Failed to parse file: " + (err as Error).message);
      return;
    }

    // Validate columns
    const expected = schemaMap[uploadType].requiredCols.map(c => c.name);
    const missing = expected.filter(col => !Object.keys(rows[0] || {}).includes(col));
    if (missing.length > 0) {
      setUploading(false);
      setError("Missing required columns: " + missing.join(", "));
      return;
    }

    // Insert to correct table
    let insertData = rows.map(row => {
      // For contacts/accounts, only extract/insert allowed fields
      const allowedFields = expected.concat(
        uploadType === "contacts"
          ? ["account_id", "created_at", "id"]
          : ["created_at", "id"]
      );
      const data: any = {};
      for (const key of Object.keys(row)) {
        if (allowedFields.includes(key)) data[key] = row[key] || null;
      }
      return data;
    });

    const tableName = uploadType === "contacts" ? "contacts" : "accounts";
    const { error: supaErr } = await supabase.from(tableName).insert(insertData);
    setUploading(false);
    if (supaErr) {
      setError("Upload failed: " + supaErr.message);
    } else {
      setSuccess("Successfully uploaded " + insertData.length + " " + schemaMap[uploadType].label.toLowerCase() + "!");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <Dialog open={open} onOpenChange={v => v ? undefined : handleClose()}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center text-[#7e69ab]">
            <Upload size={20} /> Bulk Upload Data
          </DialogTitle>
        </DialogHeader>

        {!uploadType ? (
          <div className="space-y-3 py-2">
            <div className="text-gray-700">What kind of data do you want to upload?</div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setUploadType("contacts")}>Contacts</Button>
              <Button variant="outline" className="flex-1" onClick={() => setUploadType("accounts")}>Accounts</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={e => e.preventDefault()} className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <File size={18} className="text-[#7e69ab]" />
              <span className="text-sm font-semibold">
                File upload for <span className="capitalize">{uploadType}</span>
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv,.xls,.xlsx"
              className="border px-3 py-2 rounded w-full focus:outline-primary"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <div className="text-xs text-gray-500 mb-1">
              <strong>Only Excel (.xls, .xlsx) or CSV (.csv) files are accepted.</strong><br />
              <span>Required columns:</span>
              <span className="font-mono ml-1">
                {schemaMap[uploadType].requiredCols.map(col => col.name).join(", ")}
              </span>
            </div>
            <div className="bg-gray-50 p-2 rounded border w-full flex flex-col gap-1 mb-1">
              <div className="text-xs font-semibold mb-1 flex items-center gap-1">
                <File className="inline-block text-[#7e69ab]" size={14}/>
                Sample column structure:
              </div>
              <ul className="text-xs list-disc list-inside ml-1 space-y-1">
                {schemaMap[uploadType].requiredCols.map((col) => (
                  <li key={col.name}><span className="font-mono">{col.name}</span> <span className="text-gray-400">– {col.desc}</span></li>
                ))}
              </ul>
            </div>
            {success && <div className="text-green-600 text-xs">{success}</div>}
            {error && <div className="text-red-500 text-xs">{error}</div>}
            <DialogFooter className="flex gap-2 mt-2">
              <Button type="button" variant="outline" onClick={resetState} disabled={uploading}>
                {uploadType === defaultType ? "Change type" : "Back"}
              </Button>
              <Button type="button" variant="ghost" onClick={handleClose}>Close</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
