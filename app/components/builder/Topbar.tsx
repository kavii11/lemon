"use client";

import { useBuilderPro } from "@/app/lib/builderStorePro";

export default function Topbar() {
  const { undo, redo } = useBuilderPro();

  return (
    <div className="w-full h-14 bg-white border-b flex items-center justify-between px-4">
      <h1 className="font-semibold">Lemon Builder</h1>

      <div className="flex gap-2">
        <button
          onClick={undo}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Undo
        </button>

        <button
          onClick={redo}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Redo
        </button>

        <button
          onClick={() => {
            const data = JSON.stringify(localStorage.getItem("builder") || "");
            console.log(data);
          }}
          className="px-3 py-1 bg-yellow-400 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
