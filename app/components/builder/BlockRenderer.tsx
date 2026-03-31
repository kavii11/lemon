"use client";

import { useBuilder } from "@/app/lib/useBuilder";

export default function BlockRenderer({ block }: any) {
  const { updateBlock } = useBuilder();

  if (block.type === "text") {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        className="p-3 border rounded"
        onBlur={(e) =>
          updateBlock(block.id, {
            content: e.currentTarget.innerText,
          })
        }
      >
        {block.props.content || "Edit text"}
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <div className="h-32 bg-gray-200 flex items-center justify-center">
        Image Block
      </div>
    );
  }

  if (block.type === "button") {
    return (
      <button className="px-4 py-2 bg-yellow-400 rounded">
        {block.props.label || "Click"}
      </button>
    );
  }

  return null;
}
