"use client";

import { useBuilder } from "@/app/lib/useBuilder";

export default function BlockRenderer({ block, sectionId }: any) {
  const { updateBlock, setSelectedBlock } = useBuilder();

  // ✅ safety fallback (important for runtime crashes)
  const props = block?.props || {};

  return (
    <div
      onClick={() => setSelectedBlock(sectionId, block.id)}
      className="border p-3 bg-white rounded"
    >
      {block.type === "text" && (
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateBlock(sectionId, block.id, {
              content: e.currentTarget.innerText,
            })
          }
        >
          {props.content || "Text"}
        </div>
      )}

      {block.type === "heading" && (
        <h1 className="text-xl font-bold">
          {props.content || "Heading"}
        </h1>
      )}

      {block.type === "button" && (
        <button className="px-4 py-2 bg-yellow-400 rounded">
          {props.content || "Button"}
        </button>
      )}
    </div>
  );
}
