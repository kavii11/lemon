"use client";

import React from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useBuilder } from "@/app/lib/builderStore2";
import BlockRenderer1 from "./BlockRenderer1";

function SortableBlock({ block, sectionId, isSelected, onSelect, onDelete, onDuplicate, onStyle }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style} {...attributes}
      className={`mb-3 p-1 rounded ${isSelected ? "border-2 border-yellow-500" : "border"}`}>
      {/* actions */}
      {isSelected && (
        <div className="flex gap-2 text-xs mb-1">
          <button onClick={() => onDelete(sectionId, block.id)}>🗑</button>
          <button onClick={() => onDuplicate(sectionId, block.id)}>⧉</button>
        </div>
      )}

      <div {...listeners} onClick={() => onSelect(sectionId, block.id)} className="cursor-grab">
        <BlockRenderer1 block={block} />
      </div>

      {isSelected && (
        <div className="mt-2 p-2 bg-gray-100 rounded flex gap-2 text-xs flex-wrap">
          <input type="number" placeholder="Padding" className="border p-1 w-20"
            onChange={(e)=>onStyle(sectionId, block.id, { padding: Number(e.target.value) })} />
          <input type="color" onChange={(e)=>onStyle(sectionId, block.id, { background: e.target.value })} />
          <input type="color" onChange={(e)=>onStyle(sectionId, block.id, { color: e.target.value })} />
        </div>
      )}
    </div>
  );
}

export default function Canvas6() {
  const { sections, addBlock, selectBlock, selected, updateStyle, deleteBlock, duplicateBlock, moveBlock } = useBuilder() as any;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const data = active.data?.current as any;

    if (data?.source === "sidebar") {
      const first = sections[0];
      if (!first) return;
      addBlock(first.id, data.type);
      return;
    }

    if (!over) return;

    for (const s of sections) {
      const existsActive = s.blocks.find((b:any)=>b.id===active.id);
      const existsOver = s.blocks.find((b:any)=>b.id===over.id);
      if (existsActive && existsOver) {
        moveBlock(s.id, active.id as string, over.id as string);
        return;
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-6 space-y-4 bg-white h-full overflow-auto">
        {sections.map((section:any) => (
          <div key={section.id} className="border p-4 rounded">
            <SortableContext items={section.blocks.map((b:any)=>b.id)} strategy={verticalListSortingStrategy}>
              {section.blocks.map((block:any) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  sectionId={section.id}
                  isSelected={selected?.blockId===block.id && selected?.sectionId===section.id}
                  onSelect={selectBlock}
                  onDelete={deleteBlock}
                  onDuplicate={duplicateBlock}
                  onStyle={updateStyle}
                />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
