"use client";

import { useDraggable } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStore";

// 🔹 DRAG BLOCKS
const blocks = [
  { type: "navbar", label: "Navbar" },
  { type: "hero", label: "Hero" },
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "footer", label: "Footer" },
];

// 🔹 TEMPLATES (PRESET LAYOUTS)
const templates = [
  {
    name: "Landing Page",
    blocks: ["navbar", "hero", "text", "footer"],
  },
  {
    name: "Simple Page",
    blocks: ["navbar", "text", "footer"],
  },
  {
    name: "Hero Only",
    blocks: ["hero"],
  },
];

function DragItem({ item }: { item: { type: string; label: string } }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${item.type}`,
    data: { source: "sidebar", type: item.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 mb-2 bg-zinc-800 text-white rounded cursor-grab active:cursor-grabbing hover:bg-yellow-500 transition"
    >
      {item.label}
    </div>
  );
}

export default function SidebarPro() {
  const { addSection, addBlock, sections } = useBuilder();

  const addTemplate = (tpl: string[]) => {
    // create new section
    addSection(0);

    const sectionId = sections[0]?.id;
    if (!sectionId) return;

    tpl.forEach((type, i) => {
      addBlock(sectionId, type, i);
    });
  };

  return (
    <div className="h-full bg-black text-white p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Builder</h2>

      {/* ➕ SECTION */}
      <button
        onClick={() => addSection()}
        className="w-full mb-4 p-2 bg-yellow-500 text-black rounded"
      >
        + Add Section
      </button>

      {/* 🔥 TEMPLATES */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">Templates</p>

        {templates.map((tpl) => (
          <button
            key={tpl.name}
            onClick={() => addTemplate(tpl.blocks)}
            className="w-full text-left p-2 mb-2 bg-zinc-900 hover:bg-yellow-500 hover:text-black rounded transition"
          >
            {tpl.name}
          </button>
        ))}
      </div>

      {/* 🔥 BLOCKS */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Blocks</p>

        {blocks.map((item) => (
          <DragItem key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
}
