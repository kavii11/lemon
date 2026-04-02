"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStore1";
import BlockRenderer1 from "./BlockRenderer1";

export default function Canvas2() {
  const { sections, addBlock } = useBuilder();

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
            {section.blocks.map((block) => (
              <div key={block.id} className="mb-3">
                <BlockRenderer1 block={block} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </DndContext>
  );
}
