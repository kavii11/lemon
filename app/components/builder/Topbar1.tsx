"use client";

import { useBuilder } from "@/app/lib/builderStore2";

export default function Topbar1() {
  const { undo, redo, sections } = useBuilder() as any;

  const save = () => {
    localStorage.setItem("builder", JSON.stringify(sections));
    alert("Saved");
  };

  const load = () => {
    const data = localStorage.getItem("builder");
    if (!data) return;
    location.reload();
  };

  const exportHTML = () => {
    const html = `
    <html>
      <body>
        ${sections
          .map(
            (s:any) =>
              `<section>${s.blocks
                .map((b:any) => `<div>${b.type}</div>`)
                .join("")}</section>`
          )
          .join("")}
      </body>
    </html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "page.html";
    a.click();
  };

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b bg-white">
      <div className="font-semibold">Lemon Builder</div>

      <div className="flex gap-2 text-sm">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={save}>Save</button>
        <button onClick={load}>Load</button>
        <button onClick={exportHTML}>Export</button>
      </div>
    </div>
  );
}
