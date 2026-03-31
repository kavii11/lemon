"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Section = {
  id: number;
  type: "empty" | "text" | "image";
  bg: string;
  height: number;
};

export default function Canvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sections, setSections] = useState<Section[]>([
    { id: 1, type: "empty", bg: "#ffffff", height: 150 },
    { id: 2, type: "empty", bg: "#ffffff", height: 250 },
  ]);

  const [active, setActive] = useState<number | null>(null);

  // 👉 select type
  const setType = (id: number, type: Section["type"]) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, type } : s))
    );
    setActive(null);
  };

  // 👉 change bg
  const setBg = (id: number, color: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, bg: color } : s))
    );
  };

  // 👉 resize
  const startResize = (e: any, id: number) => {
    e.preventDefault();
    const startY = e.clientY;

    const move = (ev: any) => {
      const diff = ev.clientY - startY;

      setSections((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, height: Math.max(120, s.height + diff) }
            : s
        )
      );
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 space-y-6 overflow-auto">
      {sections.map((s) => (
        <div
          key={s.id}
          className="relative border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center"
          style={{ height: s.height, background: s.bg }}
        >
          {/* EMPTY */}
          {s.type === "empty" && (
            <div
              onClick={() => setActive(s.id)}
              className="flex flex-col items-center cursor-pointer"
            >
              <Plus className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Add Section</p>
            </div>
          )}

          {/* TEXT */}
          {s.type === "text" && (
            <div contentEditable className="outline-none text-lg">
              Edit text...
            </div>
          )}

          {/* IMAGE */}
          {s.type === "image" && (
            <div className="w-40 h-24 bg-gray-200 flex items-center justify-center">
              Image Block
            </div>
          )}

          {/* POPUP */}
          {active === s.id && (
            <div className="absolute top-10 bg-white border shadow-lg rounded-lg p-3 space-y-2 z-50">
              <button
                onClick={() => setType(s.id, "text")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              >
                Text
              </button>

              <button
                onClick={() => setType(s.id, "image")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              >
                Image
              </button>

              <input
                type="color"
                onChange={(e) => setBg(s.id, e.target.value)}
                className="w-full h-8"
              />
            </div>
          )}

          {/* RESIZE HANDLE */}
          <div
            onMouseDown={(e) => startResize(e, s.id)}
            className="absolute bottom-1 right-1 w-4 h-4 bg-yellow-400 cursor-se-resize"
          />
        </div>
      ))}
    </div>
  );
}
