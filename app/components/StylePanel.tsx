"use client";

import { useBuilder } from "@/app/lib/useBuilder";

export default function StylePanel() {
  const {
    selectedBlock,
    sections,
    updateBlock,
    currentDevice,
    setDevice,
  } = useBuilder();

  if (!selectedBlock) return <div className="p-4">Select block</div>;

  const section = sections.find(s => s.id === selectedBlock.sectionId);
  if (!section) return null;

  const block = section.blocks.find(b => b.id === selectedBlock.blockId);
  if (!block) return null;

  const style = block.props.style?.[currentDevice] || {};

  return (
    <div className="p-4 space-y-5">

      {/* DEVICE */}
      <div className="flex gap-2">
        {["desktop", "tablet", "mobile"].map((d) => (
          <button
            key={d}
            onClick={() => setDevice(d as any)}
            className={`px-2 py-1 text-xs rounded ${
              currentDevice === d ? "bg-yellow-400" : "bg-gray-100"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* SPACING */}
      <input type="range" min="0" max="100"
        value={parseInt(style.padding || "0")}
        onChange={(e) =>
          updateBlock(section.id, block.id, { padding: e.target.value + "px" })
        }
      />

      {/* TYPOGRAPHY */}
      <input type="range" min="10" max="72"
        value={parseInt(style.fontSize || "16")}
        onChange={(e) =>
          updateBlock(section.id, block.id, { fontSize: e.target.value + "px" })
        }
      />

      {/* FLEX */}
      <select
        value={style.justifyContent || ""}
        onChange={(e) =>
          updateBlock(section.id, block.id, {
            display: "flex",
            justifyContent: e.target.value,
          })
        }
      >
        <option value="">Justify</option>
        <option value="center">Center</option>
        <option value="space-between">Space Between</option>
      </select>

      {/* SHADOW */}
      <select
        onChange={(e) =>
          updateBlock(section.id, block.id, {
            boxShadow: e.target.value,
          })
        }
      >
        <option value="">Shadow</option>
        <option value="0 2px 6px rgba(0,0,0,0.1)">Soft</option>
      </select>

    </div>
  );
}