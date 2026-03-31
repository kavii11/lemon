"use client";

import { DndContext, useDroppable } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/useBuilder";
import BlockRenderer from "./builder/BlockRenderer";

function DropZone() {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const { blocks } = useBuilder();

  return (
    <div
      ref={setNodeRef}
      className="min-h-[600px] border-2 border-dashed rounded-lg p-4 bg-white space-y-4"
    >
      {blocks.length === 0 && (
        <div className="text-gray-400 text-center">
          Drag components here
        </div>
      )}

      {blocks.map((block: any) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

export default function Canvas() {
  const { addBlock } = useBuilder();

  return (
    <DndContext
      onDragEnd={(event) => {
        const type = event.active.data.current?.type;
        if (type) addBlock(type);
      }}
    >
      <DropZone />
    </DndContext>
  );
}
