"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Section = {
  id: number;
  type: string | null;
  width: number;
  height: number;
  bg: string;
};

export default function Canvas() {
  const [sections, setSections] = useState<Section[]>([
    { id: 1, type: null, width: 100, height: 150, bg: "#ffffff" },
    { id: 2, type: null, width: 100, height: 250, bg: "#ffffff" },
  ]);

  const [activePopup, setActivePopup] = useState<number | null>(null);

  // 👉 Add content type
  const handleSelect = (id: number, type: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, type } : s
      )
    );
    setActivePopup(null);
  };

  // 👉 Resize logic
  const handleResize = (e: any, id: number) => {
    e.preventDefault();

    const startY = e.clientY;

    const move = (ev: any) => {
      const diff = ev.clientY - startY;

      setSections((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, height: Math.max(100, s.height + diff) }
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

      {sections.map((section) => (
        <div
          key={section.id}
          className="relative border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center"
          style={{
            height: section.height,
            background: section.bg,
          }}
        >

          {/* ➕ Empty State */}
          {!section.type && (
            <div
              onClick={() => setActivePopup(section.id)}
              className="flex flex-col items-center cursor-pointer"
            >
              <Plus className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Add Section</p>
            </div>
          )}

          {/* 📦 Render Content */}
          {section.type === "text" && (
            <p className="text-lg font-medium">Editable Text</p>
          )}

          {section.type === "image" && (
            <div className="w-32 h-20 bg-gray-200 flex items-center justify-center">
              Image
            </div>
          )}

          {/* 🎛 Popup */}
          {activePopup === section.id && (
            <div className="absolute top-10 bg-white shadow-lg border rounded-lg p-3 space-y-2 z-50">

              <button
                onClick={() => handleSelect(section.id, "text")}
                className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
              >
                Text
              </button>

              <button
                onClick={() => handleSelect(section.id, "image")}
                className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
              >
                Image
              </button>

              <input
                type="color"
                onChange={(e) =>
                  setSections((prev) =>
                    prev.map((s) =>
                      s.id === section.id
                        ? { ...s, bg: e.target.value }
                        : s
                    )
                  )
                }
                className="w-full h-8"
              />

            </div>
          )}

          {/* 🔧 Resize Handle */}
          <div
            onMouseDown={(e) => handleResize(e, section.id)}
            className="absolute bottom-1 right-1 w-4 h-4 bg-yellow-400 cursor-se-resize rounded-sm"
          />

        </div>
      ))}

    </div>
  );
}
