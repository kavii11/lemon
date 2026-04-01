"use client";

import { useBuilder } from "@/app/lib/useBuilder";

export default function ExportButton() {
  const exportData = useBuilder((s) => s.exportData);

  return (
    <button
      onClick={() => {
        console.log(exportData());
        alert("Exported to console");
      }}
      className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded"
    >
      Export JSON
    </button>
  );
}