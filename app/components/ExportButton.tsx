"use client";

import { Download } from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";

export default function ExportButton() {
  const exportData = useBuilder((s) => s.exportData);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "builder-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" className="export-button" onClick={handleExport}>
      <Download size={16} />
      Export JSON
    </button>
  );
}