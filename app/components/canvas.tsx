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

function SortableSection({ section, index, isOver }: any) {
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group"
    >
      {/* ➕ Add Section ABOVE */}
      <button
        onClick={() => addSection("section", index - 1)}
        className="absolute -top-4 left-1/2 -translate-x-1/2 
        bg-white border rounded-full p-2 shadow opacity-0 group-hover:opacity-100"
      >
        <Plus size={16} />
      </button>

      {/* Drag Handle */}
      <div
        {...listeners}
        className="cursor-move text-xs text-gray-400 mb-2"
      >
        Drag Section
      </div>

      {/* 🔥 SECTION BOX WITH HIGHLIGHT */}
      <div
        className={`border-2 rounded-xl p-6 min-h-[120px] transition
        ${
          isOver
            ? "border-blue-500 bg-blue-50"
            : "border-dashed bg-gray-50"
        }`}
      >
        <div className="text-xs text-gray-400 mb-2 uppercase">
          {section.type}
        </div>

        {section.blocks.length === 0 && (
          <div className="text-gray-400 text-sm text-center py-6">
            Drop here
          </div>
        )}

        {section.blocks.map((block: any) => (
          <BlockRenderer
            key={block.id}
            block={block}
            sectionId={section.id}
          />
        ))}

        {/* ➕ Add Block */}
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

      {/* ➕ Add Section BELOW */}
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
  const [overSection, setOverSection] = useState<string | null>(null);

  // 🔥 Detect hover section
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) return;

    setOverSection(over.id as string);
  };

  // 🔥 Handle drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const type = active.data.current?.type;

    // ✅ Sidebar → specific section
    if (type) {
      addBlock(over.id as string, type);
      setOverSection(null);
      return;
    }

    // ✅ Section reorder
    if (active.id !== over.id) {
      moveSection(active.id as string, over.id as string);
    }

    setOverSection(null);
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
              isOver={overSection === section.id}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}