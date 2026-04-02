"use client";

import { useDraggable } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStore";

// 🔹 Templates with preview text
const templates = [
  {
    name: "Landing Page",
    preview: "Hero + Navbar + Footer",
    blocks: ["navbar", "hero", "text", "footer"],
  },
  {
    name: "Startup Page",
    preview: "Hero + Features + CTA",
    blocks: ["navbar", "hero", "text", "button", "footer"],
  },
  {
    name: "Minimal Page",
    preview: "Simple Text Layout",
    blocks: ["text"],
  },
];

// 🔹 Blocks
const blocks = [
  { type: "navbar", label: "Navbar" },
  { type: "hero", label: "Hero" },
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "footer", label: "Footer" },
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

export default function SidebarTemplates() {
  const { addSection, addBlock, sections } = useBuilder();

  const applyTemplate = (tpl: string[]) => {
    addSection(0);

    const sectionId = sections[0]?.id;
    if (!sectionId) return;

    tpl.forEach((type, i) => {
      addBlock(sectionId, type, i);
    });
  };

  return (
    <div className="h-full bg-black text-white p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Templates</h2>

      {/* 🔥 Template Cards */}
      <div className="space-y-3 mb-6">
        {templates.map((tpl) => (
          <div
            key={tpl.name}
            onClick={() => applyTemplate(tpl.blocks)}
            className="p-3 bg-zinc-900 rounded cursor-pointer hover:bg-yellow-500 hover:text-black transition"
          >
            <p className="font-medium">{tpl.name}</p>
            <p className="text-xs opacity-70">{tpl.preview}</p>
          </div>
        ))}
      </div>

      {/* ➕ Add Section */}
      <button
        onClick={() => addSection()}
        className="w-full mb-4 p-2 bg-yellow-500 text-black rounded"
      >
        + Add Section
      </button>

      {/* 🔹 Blocks */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Blocks</p>
        {blocks.map((item) => (
          <DragItem key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
}
