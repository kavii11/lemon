"use client";

import { useBuilder } from "@/app/lib/useBuilder";

export default function StylePanel() {
  const { selectedBlock, sections, updateBlock } = useBuilder();

  if (!selectedBlock) return <div className="p-4">Select block</div>;

  const section = sections.find(
    (s) => s.id === selectedBlock.sectionId
  );

  if (!section) return null; // ✅ FIX 1 (important)

  const block = section.blocks.find(
    (b) => b.id === selectedBlock.blockId
  );

  if (!block) return null;

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-semibold">Style</h2>

      {/* COLOR */}
      <input
        type="color"
        value={block.props.color || "#000000"} // ✅ controlled input (better)
        onChange={(e) =>
          updateBlock(section.id, block.id, {
            color: e.target.value,
          })
        }
      />

      {/* PADDING */}
      <input
        type="number"
        placeholder="Padding"
        value={parseInt(block.props.padding || "0")} // ✅ prevent uncontrolled warning
        onChange={(e) =>
          updateBlock(section.id, block.id, {
            padding: e.target.value + "px",
          })
        }
        className="border w-full p-1"
      />
    </div>
  );
}