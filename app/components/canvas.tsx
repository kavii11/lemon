"use client";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useBuilderStore } from "../store/builderStore";
import BlockRenderer from "./BlockRenderer";
import BlockPicker from "./BlockPicker";

function SortableItem({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function Canvas() {
  const sections = useBuilderStore((s) => s.sections);
  const moveBlock = useBuilderStore((s) => s.moveBlock);
  const addBlock = useBuilderStore((s) => s.addBlock);

  return (
    <div className="p-6 bg-black min-h-screen text-white ml-[260px]">
      {sections.map((section) => (
        <div key={section.id} className="mb-8">
          <BlockPicker sectionId={section.id} />

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(event) => {
              const { active, over } = event;
              if (!over) return;

              // Sidebar drop
              if (active.id.toString().startsWith("sidebar-")) {
                const type = active.id
                  .toString()
                  .replace("sidebar-", "") as "text" | "image";

                addBlock(section.id, type);
                return;
              }

              // Reorder
              if (active.id !== over.id) {
                const oldIndex = section.blocks.findIndex(
                  (b) => b.id === active.id
                );
                const newIndex = section.blocks.findIndex(
                  (b) => b.id === over.id
                );

                moveBlock(section.id, oldIndex, newIndex);
              }
            }}
          >
            <SortableContext
              items={section.blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {section.blocks.map((block, i) => (
                <div key={block.id} className="mb-3">
                  <SortableItem id={block.id}>
                    <BlockRenderer block={block} />
                  </SortableItem>

                  <BlockPicker
                    sectionId={section.id}
                    index={i + 1}
                  />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
}
