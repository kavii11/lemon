"use client";

import { useDraggable } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStore1";

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

export default function Sidebar1() {
  const { addSection } = useBuilder();

  return (
    <div className="h-full bg-black text-white p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Blocks</h2>

      {/* Add Section */}
      <button
        onClick={addSection}
        className="w-full mb-4 p-2 bg-yellow-500 text-black rounded"
      >
        + Add Section
      </button>

      {/* Drag Blocks */}
      {blocks.map((item) => (
        <DragItem key={item.type} item={item} />
      ))}
    </div>
  );
}
