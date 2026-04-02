"use client";

import { useDraggable } from "@dnd-kit/core";

const blocks = [
  { type: "text", label: "Text" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "hero", label: "Hero Section" },
  { type: "header", label: "Header" },
  { type: "footer", label: "Footer" },
];

function DraggableItem({ block }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${block.type}`,
    data: {
      source: "sidebar",
      type: block.type,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 mb-2 bg-zinc-800 text-white rounded cursor-grab active:cursor-grabbing hover:bg-yellow-500 transition"
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      {block.label}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-black p-4 h-screen overflow-y-auto">
      <h2 className="text-white font-semibold mb-4">Blocks</h2>

      {blocks.map((block) => (
        <DraggableItem key={block.type} block={block} />
      ))}
    </div>
  );
}
