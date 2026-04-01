"use client";

import { useBuilder } from "@/app/lib/useBuilder";
import { useState } from "react";
import { Trash } from "lucide-react";

export default function BlockRenderer({
  block,
  sectionId,
}: {
  block: any;
  sectionId: string;
}) {
  const updateBlock = useBuilder((s) => s.updateBlock);

  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative group border border-transparent hover:border-blue-400 rounded transition"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 🔵 Hover Toolbar (Webflow style) */}
      {hover && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          {block.type}
        </div>
      )}

      {/* BLOCK TYPES */}
      {block.type === "text" && (
        <div
          contentEditable
          suppressContentEditableWarning
          className="p-3 bg-white outline-none"
          onBlur={(e) =>
            updateBlock(sectionId, block.id, {
              content: e.currentTarget.innerText,
            })
          }
        >
          {block.props.content || "Edit text"}
        </div>
      )}

      {block.type === "image" && (
        <div className="h-32 bg-gray-200 flex items-center justify-center rounded">
          Image
        </div>
      )}

      {block.type === "button" && (
        <button className="px-4 py-2 bg-yellow-400 rounded">
          {block.props.label || "Click"}
        </button>
      )}
    </div>
  );
}