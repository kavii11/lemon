"use client";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import BlockPicker from "./builder/BlockPicker";
import { useEffect } from "react";
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

// 🔥 BLOCK
function SortableBlock({ block, sectionId }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: block.id });

  const { setSelectedBlock, updateBlock, currentDevice } = useBuilder();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const blockStyle = block.props?.style?.[currentDevice] || {};

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} className="text-xs text-gray-400 cursor-move">
        Drag Block
      </div>

      {/* 🔥 BLOCK UI */}
      <div
        onClick={() => setSelectedBlock(sectionId, block.id)}
        className="relative border rounded p-3 bg-white hover:border-yellow-400 hover:shadow-md transition"
        style={blockStyle}
      >
        <BlockRenderer block={block} sectionId={sectionId} />

        {/* 🟡 RESIZE HANDLE */}
        <div
          className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-400 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation();

            const startX = e.clientX;

            const move = (ev: MouseEvent) => {
              const width = ev.clientX - startX + 150;

              updateBlock(sectionId, block.id, {
                width: width + "px",
              });
            };

            const up = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", up);
            };

            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
          }}
        />
      </div>
    </div>
  );
}

// 🔥 SECTION
function SortableSection({ section, index, dropInfo, setPicker }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const { addBlock, addSection } = useBuilder();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      {/* ➕ ABOVE */}
      <button
        onClick={() => addSection("section", Math.max(0, index - 1))}
        className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white border rounded-full p-2 shadow"
      >
        <Plus size={16} />
      </button>

      <div {...listeners} className="cursor-move text-xs text-gray-400 mb-2">
        Drag Section
      </div>

      <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50">
        {/* DROP LINE */}
        {dropInfo?.sectionId === section.id && (
          <div className="h-1 bg-blue-500 rounded mb-2" />
        )}

       <SortableContext
  items={(section.blocks || [])
    .filter((b: any) => b && b.id)
    .map((b: any) => b.id)}
  strategy={verticalListSortingStrategy}
>
  {(section.blocks || [])
    .filter((b: any) => b && b.id)
    .map((block: any) => (
      <SortableBlock
        key={block.id}
        block={block}
        sectionId={section.id}
      />
    ))}
</SortableContext>

        {/* ➕ ADD BLOCK */}
        <div className="flex justify-center mt-4">
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              setPicker({
  sectionId: section.id,
  index: (section.blocks || []).filter((b: any) => b && b.id).length,
  x: rect.left + 20,
  y: rect.top + 30,
});
            }}
            className="text-sm text-gray-500"
          >
            + Add Block
          </button>
        </div>
      </div>

      {/* ➕ BELOW */}
      <button
        onClick={() => addSection("section", index)}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border rounded-full p-2 shadow"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

// 🔥 CANVAS
export default function Canvas() {
  const { sections, moveBlock, addBlock } = useBuilder();
  const [picker, setPicker] = useState<{
    sectionId: string;
    index: number;
    x: number;
    y: number;
  } | null>(null);
  const [dropInfo, setDropInfo] = useState<any>(null);

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) return;

for (const section of sections || []) {
  if (!section || !section.blocks) continue;
      const index = (section.blocks || []).findIndex(
        (b: any) => b && b.id === over.id,
      );
      if (index !== -1) {
        setDropInfo({ sectionId: section.id, index });
        return;
      }

      if (section.id === over.id) {
        setDropInfo({
          sectionId: section.id,
          index: (section.blocks || []).filter((b: any) => b && b.id).length,
        });
        return;
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !dropInfo) return;

    const isSidebar = active.data.current?.from === "sidebar";
    const type = active.data.current?.type;

    // ✅ ADD FROM SIDEBAR
    if (isSidebar && type) {
      addBlock(dropInfo.sectionId, type);
      setDropInfo(null);
      return;
    }

    // ✅ MOVE BLOCK
    moveBlock(dropInfo.sectionId, active.id as string, over.id as string);

    setDropInfo(null);
  };

  useEffect(() => {
    const handleClick = () => setPicker(null);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <SortableContext
items={sections.filter(Boolean).map((s) => s.id)}        strategy={verticalListSortingStrategy}
      >
        <div className="w-full bg-white px-6 py-10 space-y-6">
          {sections
            .filter(Boolean) // ✅ REMOVE undefined
            .map((section, index) => (
              <SortableSection
                key={section.id}
                section={section}
                index={index}
                dropInfo={dropInfo}
                setPicker={setPicker}
              />
            ))}
        </div>
      </SortableContext>
      {picker && (
        <div
          style={{
            position: "fixed",
            top: picker.y,
            left: picker.x,
            zIndex: 999,
          }}
          onClick={(e) => e.stopPropagation()} // ✅ ADD THIS
        >
          <BlockPicker
            onSelect={(type: string) => {
              addBlock(picker.sectionId, type, picker.index); // ✅ FIX
              setPicker(null);
            }}
          />
        </div>
      )}
    </DndContext>
  );
}
