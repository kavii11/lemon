"use client";

import React from "react";
import { DndContext, DragEndEvent, DragOverEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useBuilder, Section, Block } from "@/app/lib/builderStore";
import BlockRendererNew from "./BlockRendererNew";

function SortableBlock({ block }: { block: Block }) {
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

function SectionView({ section, dropIndex }: { section: Section; dropIndex: number | null }) {
  return (
    <div className="border-2 border-dashed p-6 bg-gray-50 rounded">
      <SortableContext items={section.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        {section.blocks.map((block, index) => (
          <React.Fragment key={block.id}>
            {dropIndex === index && (
              <div className="h-1 bg-blue-500 mb-2 rounded" />
            )}
            <SortableBlock block={block} />
          </React.Fragment>
        ))}

        {dropIndex === section.blocks.length && (
          <div className="h-1 bg-blue-500 mt-2 rounded" />
        )}
      </SortableContext>
    </div>
  );
}

export default function CanvasPro() {
  const { sections, addBlock, moveBlock } = useBuilder();

  const [dropInfo, setDropInfo] = React.useState<{
    sectionId: string;
    index: number;
  } | null>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) return;

    for (const section of sections) {
      const index = section.blocks.findIndex((b) => b.id === over.id);

      if (index !== -1) {
        setDropInfo({ sectionId: section.id, index });
        return;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    const data = active.data?.current as { source?: string; type?: string } | undefined;

    if (!dropInfo) return;

    if (data?.source === "sidebar" && data.type) {
      addBlock(dropInfo.sectionId, data.type, dropInfo.index);
      setDropInfo(null);
      return;
    }

    moveBlock(dropInfo.sectionId, active.id as string, sections[0].blocks[dropInfo.index]?.id || "");
    setDropInfo(null);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <div className="flex-1 p-6 space-y-6 bg-white">
        {sections.map((section) => (
          <SectionView
            key={section.id}
            section={section}
            dropIndex={dropInfo?.sectionId === section.id ? dropInfo.index : null}
          />
        ))}
      </div>
    </DndContext>
  );
}
