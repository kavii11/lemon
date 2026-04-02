"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useBuilder } from "@/app/lib/builderStore2";
import BlockRenderer1 from "./BlockRenderer1";

export default function Canvas5() {
  const {
    sections,
    addBlock,
    selectBlock,
    selected,
    updateStyle,
    deleteBlock,
    duplicateBlock,
  } = useBuilder() as any;

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
        {sections.map((section: any) => (
          <div key={section.id} className="border p-4 rounded">
            {section.blocks.map((block: any) => {
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
                  {/* actions */}
                  {isSelected && (
                    <div className="flex gap-2 text-xs mb-1">
                      <button onClick={() => deleteBlock(section.id, block.id)}>🗑</button>
                      <button onClick={() => duplicateBlock(section.id, block.id)}>⧉</button>
                    </div>
                  )}

                  <BlockRenderer1 block={block} />

                  {isSelected && (
                    <div className="mt-2 p-2 bg-gray-100 rounded flex gap-2 text-xs flex-wrap">
                      <input
                        type="number"
                        placeholder="Padding"
                        className="border p-1 w-20"
                        onChange={(e) =>
                          updateStyle(section.id, block.id, {
                            padding: Number(e.target.value),
                          })
                        }
                      />

                      <input
                        type="color"
                        onChange={(e) =>
                          updateStyle(section.id, block.id, {
                            background: e.target.value,
                          })
                        }
                      />

                      <input
                        type="color"
                        onChange={(e) =>
                          updateStyle(section.id, block.id, {
                            color: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </DndContext>
  );
}
