"use client";

import React from "react";
import { DndContext, DragEndEvent, DragOverEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useBuilder, Section, Block } from "@/app/lib/builderStore";
import BlockRendererNew from "./BlockRendererNew";

function SortableBlock({ block, sectionId }: { block: Block; sectionId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} className="cursor-grab text-xs text-gray-400">Drag</div>
      <div className="border p-3 bg-white rounded">
        <BlockRendererNew block={block} />
      </div>
    </div>
  );
}

function SectionView({ section }: { section: Section }) {
  return (
    <div className="border-2 border-dashed p-6 bg-gray-50 rounded">
      <SortableContext items={section.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        {section.blocks.map((block) => (
          <SortableBlock key={block.id} block={block} sectionId={section.id} />
        ))}
      </SortableContext>
    </div>
  );
}

export default function CanvasNew() {
  const { sections, addBlock, moveBlock } = useBuilder();
  const [dropInfo, setDropInfo] = React.useState<{ sectionId: string; overId: string } | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) return;

    for (const section of sections) {
      const found = section.blocks.find((b) => b.id === over.id);
      if (found) {
        setDropInfo({ sectionId: section.id, overId: found.id });
        return;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    const data = active.data?.current as { source?: string; type?: string } | undefined;

    if (!dropInfo) return;

    if (data?.source === "sidebar" && data.type) {
      addBlock(dropInfo.sectionId, data.type);
      setDropInfo(null);
      return;
    }

    moveBlock(dropInfo.sectionId, active.id as string, dropInfo.overId);
    setDropInfo(null);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div className="flex-1 p-6 space-y-6 bg-white">
        {sections.map((section) => (
          <SectionView key={section.id} section={section} />
        ))}
      </div>
    </DndContext>
  );
}
