"use client";

import { useDraggable } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStoreFinal";

const blocks = ["navbar","hero","footer"];

function Item({ type }: { type: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${type}`,
    data: { source: "sidebar", type }
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
      className="p-3 mb-2 bg-zinc-800 text-white rounded cursor-grab">
      {type}
    </div>
  );
}

export default function SidebarFinal() {
  const { addSection } = useBuilder();

  return (
    <div className="h-full bg-black text-white p-4">
      <button onClick={addSection} className="mb-4 bg-yellow-500 p-2 w-full">+ Section</button>
      {blocks.map(b => <Item key={b} type={b} />)}
    </div>
  );
}
