"use client";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
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

function SortableSection({ section, index }: any) {
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
    <div ref={setNodeRef} style={style} {...attributes} className="relative group">

      {/* ➕ ADD SECTION ABOVE */}
      <button
        onClick={() => addSection("section", index - 1)}
        className="absolute -top-4 left-1/2 -translate-x-1/2 
        bg-white border rounded-full p-2 shadow opacity-0 group-hover:opacity-100"
      >
        <Plus size={16} />
      </button>

      {/* 🔥 DRAG HANDLE */}
      <div
        {...listeners}
        className="cursor-move text-xs text-gray-400 mb-2"
      >
        Drag Section
      </div>

      {/* SECTION */}
      <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50 min-h-[120px]">

        <div className="text-xs text-gray-400 mb-2 uppercase">
          {section.type}
        </div>

        {section.blocks.length === 0 && (
          <div className="text-gray-400 text-sm text-center py-6">
            Empty section
          </div>
        )}

        {section.blocks.map((block: any) => (
          <BlockRenderer
            key={block.id}
            block={block}
            sectionId={section.id}
          />
        ))}

        {/* ➕ ADD BLOCK */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => addBlock(section.id, "text")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
          >
            <Plus size={16} />
            Add Block
          </button>
        </div>
      </div>

      {/* ➕ ADD SECTION BELOW */}
      <button
        onClick={() => addSection("section", index)}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 
        bg-white border rounded-full p-2 shadow opacity-0 group-hover:opacity-100"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default function Canvas() {
  const { sections, moveSection, addBlock } = useBuilder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // 🔥 CASE 1: Sidebar → Canvas (ADD BLOCK)
    const type = active.data.current?.type;
    if (type) {
      addBlock(sections[0].id, type); // for now add to first section
      return;
    }

    // 🔥 CASE 2: Reorder Sections
    if (active.id !== over.id) {
      moveSection(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}