"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStore2";
import BlockRenderer1 from "./BlockRenderer1";

export default function Canvas3() {
  const { sections, addBlock, selectBlock, selected } = useBuilder();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    const data = active.data?.current as any;

    if (data?.source === "sidebar") {
      const firstSection = sections[0];
      if (!firstSection) return;

      addBlock(firstSection.id, data.type);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 space-y-4 bg-white h-full overflow-auto">
        {sections.map((section) => (
          <div key={section.id} className="border p-4 rounded">
            {section.blocks.map((block) => {
              const isSelected =
                selected?.blockId === block.id &&
                selected?.sectionId === section.id;

              return (
                <div
                  key={block.id}
                  onClick={() => selectBlock(section.id, block.id)}
                  className={`mb-3 p-1 rounded cursor-pointer transition ${
                    isSelected ? "border-2 border-yellow-500" : "border"
                  }`}
                >
                  <BlockRenderer1 block={block} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </DndContext>
  );
}
