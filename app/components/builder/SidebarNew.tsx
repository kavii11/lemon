"use client";

import { useDraggable } from "@dnd-kit/core";

type Item = {
  type: string;
  label: string;
};

const items: Item[] = [
  { type: "navbar", label: "Navbar" },
  { type: "hero", label: "Hero" },
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "footer", label: "Footer" },
];

function DragItem({ item }: { item: Item }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${item.type}`,
    data: {
      source: "sidebar",
      type: item.type,
    },
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

export default function SidebarNew() {
  return (
    <div className="w-64 bg-black p-4 h-screen">
      <h2 className="text-white mb-4 font-semibold">Blocks</h2>

      {items.map((item) => (
        <DragItem key={item.type} item={item} />
      ))}
    </div>
  );
}
