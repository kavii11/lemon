"use client";

import { useMemo, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus } from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";
import BlockRenderer from "./builder/BlockRenderer";
import BlockPicker from "./builder/BlockPicker";
import CanvasTopbar from "./CanvasTopbar";

type BlockType = {
  id: string;
  type?: string;
  props?: any;
};

type SectionType = {
  id: string;
  type?: string;
  blocks: BlockType[];
};

function getSectionLayout(sectionType?: string) {
  switch (sectionType) {
    case "product-grid":
    case "product-centered":
    case "product-standard":
      return "grid grid-cols-1 gap-4";
    default:
      return "flex flex-wrap items-start gap-3";
  }
}

function getDeviceFrame(currentDevice: "desktop" | "tablet" | "mobile") {
  switch (currentDevice) {
    case "mobile":
      return {
        width: "390px",
        height: "844px",
      };
    case "tablet":
      return {
        width: "820px",
        height: "1180px",
      };
    case "desktop":
    default:
      return {
        width: "1280px",
        height: "800px",
      };
  }
}

function SortableBlock({
  block,
  sectionId,
}: {
  block: BlockType;
  sectionId: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: block.id,
      data: {
        source: "canvas",
        blockId: block.id,
        sectionId,
      },
    });

  const currentDevice = useBuilder((state: any) => state.currentDevice);
  const width = block?.props?.style?.[currentDevice]?.width || "100%";
  const minHeight = block?.props?.style?.[currentDevice]?.minHeight || "120px";

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width,
    minHeight,
    opacity: isDragging ? 0.55 : 1,
    flexShrink: 0,
  };

  return (
    <div ref={setNodeRef} className="builder-block-shell" style={style}>
      <BlockRenderer
        block={block}
        sectionId={sectionId}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

function SectionDropZone({
  section,
  onAddBlock,
  canAddBlock,
}: {
  section: SectionType;
  onAddBlock: (sectionId: string) => void;
  canAddBlock: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `section-drop-${section.id}`,
    data: {
      sectionId: section.id,
      source: "section-drop",
    },
  });

  const layoutClassName = getSectionLayout(section.type);

  const sectionClassName = useMemo(() => {
    const base =
      "rounded-2xl border-2 border-dashed bg-white p-4 md:p-6 shadow-sm transition-all";
    const tone = isOver
      ? "border-blue-400 ring-2 ring-blue-100"
      : "border-zinc-300";
    return `${base} ${tone}`;
  }, [isOver]);

  return (
    <section ref={setNodeRef} className={sectionClassName}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {section.type || "section"}
        </div>

        {canAddBlock && (
          <button
            type="button"
            onClick={() => onAddBlock(section.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            <Plus size={16} />
            Add block
          </button>
        )}
      </div>

      {section.blocks?.length ? (
        <SortableContext
          items={section.blocks.map((block) => block.id)}
          strategy={rectSortingStrategy}
        >
          <div className={layoutClassName}>
            {section.blocks.map((block) => (
              <SortableBlock key={block.id} block={block} sectionId={section.id} />
            ))}
          </div>
        </SortableContext>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-8 text-sm text-zinc-500">
          Drop blocks here
        </div>
      )}
    </section>
  );
}

export default function Canvas() {
  const sections = useBuilder((state: any) => state.sections as SectionType[]);
  const builderType = useBuilder((state: any) => state.builderType);
  const currentDevice = useBuilder((state: any) => state.currentDevice);
  const addBlock = useBuilder((state: any) => state.addBlock);

  const [pickerSectionId, setPickerSectionId] = useState<string | null>(null);

  const hasProductLayout =
    builderType === "product" &&
    sections.some((section) => Array.isArray(section.blocks) && section.blocks.length > 0);

  const emptyProductSectionId = sections?.[0]?.id ?? null;
  const deviceFrame = getDeviceFrame(currentDevice);

  return (
    <main className="flex h-full min-h-screen flex-1 flex-col bg-zinc-100">
      <CanvasTopbar />

      <div className="flex-1 overflow-auto">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 p-4 md:p-6">
          <div className="flex justify-center">
            <div
              className="w-full max-w-full rounded-[28px] bg-white p-3 shadow-sm transition-all"
              style={{
                width: `min(${deviceFrame.width}, 100%)`,
              }}
            >
              <div
                className="overflow-y-auto overflow-x-hidden rounded-[20px] border-2 border-dashed border-zinc-300 bg-zinc-50 p-4"
                style={{
                  height: deviceFrame.height,
                  maxHeight: "calc(100vh - 220px)",
                }}
              >
                {builderType === "product" && !hasProductLayout ? (
                  <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-10 text-center">
                    <h3 className="text-lg font-semibold text-zinc-900">
                      Empty product canvas
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                      Start by choosing one product layout.
                    </p>

                    {emptyProductSectionId && (
                      <div className="mt-6 flex justify-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
                          onClick={() => setPickerSectionId(emptyProductSectionId)}
                        >
                          <Plus size={16} />
                          Choose product layout
                        </button>
                      </div>
                    )}

                    {pickerSectionId && emptyProductSectionId === pickerSectionId && (
                      <div className="mt-4">
                        <BlockPicker
                          sectionId={pickerSectionId}
                          mode="layoutOnly"
                          onPick={(sectionId: string, type: string) => {
                            addBlock(sectionId, type);
                            setPickerSectionId(null);
                          }}
                          onClose={() => setPickerSectionId(null)}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {sections.map((section) => (
                      <div key={section.id}>
                        <SectionDropZone
                          section={section}
                          canAddBlock={!(builderType === "product" && !hasProductLayout)}
                          onAddBlock={(sectionId) => setPickerSectionId(sectionId)}
                        />

                        {pickerSectionId === section.id && (
                          <div className="mt-3">
                            <BlockPicker
                              sectionId={section.id}
                              mode={builderType === "product" ? "fieldOnly" : "all"}
                              onPick={(sectionId: string, type: string) => {
                                addBlock(sectionId, type);
                                setPickerSectionId(null);
                              }}
                              onClose={() => setPickerSectionId(null)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}