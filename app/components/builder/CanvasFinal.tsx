"use client";

import { DndContext } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStoreFinal";
import BlockRendererFinal from "./BlockRendererFinal";

export default function CanvasFinal() {
  const { sections } = useBuilder();

  return (
    <DndContext>
      <div className="p-6 space-y-4">
        {sections.map((section: any) => (
          <div key={section.id} className="border p-4">
            {section.blocks.map((block: any) => (
              <BlockRendererFinal key={block.id} block={block} />
            ))}
          </div>
        ))}
      </div>
    </DndContext>
  );
}
