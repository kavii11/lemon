"use client";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { useBuilder } from "@/app/lib/useBuilder";
import BlockRenderer from "./builder/BlockRenderer";
import { Plus } from "lucide-react";
import { useState } from "react";

// 🔥 Block
function SortableBlock({ block, sectionId }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} className="text-xs text-gray-400 cursor-move">
        Drag Block
      </div>

      <BlockRenderer block={block} sectionId={sectionId} />
    </div>
  );
}

// 🔥 Section
function SortableSection({ section, index, dropInfo }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { addBlock, addSection } = useBuilder();

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">

      {/* ➕ Add Section ABOVE */}
      <button
        onClick={() => addSection("section", index - 1)}
        className="absolute -top-4 left-1/2 -translate-x-1/2 
        bg-white border rounded-full p-2 shadow"
      >
        <Plus size={16} />
      </button>

      {/* Drag Section */}
      <div {...listeners} className="cursor-move text-xs text-gray-400 mb-2">
        Drag Section
      </div>

      <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50">

        {/* 🔵 DROP LINE */}
        {dropInfo?.sectionId === section.id && (
          <div
            className="h-1 bg-blue-500 rounded mb-2"
            style={{
              marginTop: dropInfo.index * 8,
            }}
          />
        )}

        <SortableContext
          items={(section.blocks || [])
            .filter((b: any) => b && b.id)
            .map((b: any) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {(section.blocks || [])
            .filter((block: any) => block && block.id)
            .map((block: any, i: number) => (
              <div key={block.id}>
                {/* 🔥 DROP BETWEEN BLOCKS */}
                {dropInfo?.sectionId === section.id &&
                  dropInfo.index === i && (
                    <div className="h-1 bg-blue-500 rounded my-2" />
                  )}

                <SortableBlock
                  block={block}
                  sectionId={section.id}
                />
              </div>
            ))}
        </SortableContext>

        {/* 🔥 DROP AT END */}
        {dropInfo?.sectionId === section.id &&
          dropInfo.index === section.blocks.length && (
            <div className="h-1 bg-blue-500 rounded mt-2" />
          )}

        {/* ➕ Add Block */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => addBlock(section.id, "text")}
            className="text-sm text-gray-500"
          >
            + Add Block
          </button>
        </div>
      </div>

      {/* ➕ Add Section BELOW */}
      <button
        onClick={() => addSection("section", index)}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 
        bg-white border rounded-full p-2 shadow"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default function Canvas() {
  const { sections, moveSection, moveBlock, addBlock } = useBuilder();

  const [dropInfo, setDropInfo] = useState<{
    sectionId: string;
    index: number;
  } | null>(null);

  // 🔥 Detect exact position
  const handleDragOver = (event: DragOverEvent) => {
    const { over, active } = event;
    if (!over) return;

    let foundSection = null;

    for (const section of sections) {
      const index = section.blocks.findIndex(
        (b) => b?.id === over.id
      );

      if (index !== -1) {
        foundSection = {
          sectionId: section.id,
          index,
        };
        break;
      }

      if (section.id === over.id) {
        foundSection = {
          sectionId: section.id,
          index: section.blocks.length,
        };
      }
    }

    setDropInfo(foundSection);
  };

  const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over || !dropInfo) return;

  const isSidebar = active.data.current?.from === "sidebar";
  const type = active.data.current?.type;

  // ✅ FROM SIDEBAR
  if (isSidebar && type) {
    addBlock(dropInfo.sectionId, type, dropInfo.index);
    setDropInfo(null);
    return;
  }

  // ✅ MOVE BLOCK
  moveBlock(
    dropInfo.sectionId,
    active.id as string,
    over.id as string
  );

  setDropInfo(null);
};

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="w-full bg-white px-6 py-10 space-y-6">
          {sections.map((section, index) => (
            <SortableSection
              key={section.id}
              section={section}
              index={index}
              dropInfo={dropInfo}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}