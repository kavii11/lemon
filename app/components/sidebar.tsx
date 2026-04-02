"use client";

import { useDraggable } from "@dnd-kit/core";

function DraggableItem({ type }: { type: "text" | "image" }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${type}`,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 mb-2 bg-zinc-800 rounded cursor-grab text-white"
    >
      Drag {type}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="w-[250px] bg-zinc-900 p-4 h-screen fixed left-0 top-0">
      <h2 className="text-white mb-4 font-bold">Blocks</h2>
      <DraggableItem type="text" />
      <DraggableItem type="image" />
    </div>
  );
}
