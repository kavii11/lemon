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
    case "product-hero":
      return "flex flex-wrap items-start gap-4";
    case "product-details":
    case "product-reviews":
    case "related-products":
    case "product-grid":
    case "product-centered":
      return "grid grid-cols-1 gap-4";
    default:
      return "flex flex-wrap items-start gap-3";
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

  const currentDevice = useBuilder((state) => state.currentDevice);
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
}: {
  section: SectionType;
  onAddBlock: (sectionId: string) => void;
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
      "rounded-2xl border bg-white p-4 md:p-6 shadow-sm transition-all";
    const tone =
      section.type === "product-hero"
        ? "border-zinc-300"
        : "border-zinc-200";
    const over = isOver ? " ring-2 ring-zinc-900/10" : "";
    return `${base} ${tone}${over}`;
  }, [isOver, section.type]);

  return (
    <section ref={setNodeRef} className={sectionClassName}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {section.type || "section"}
        </div>

        <button
          type="button"
          onClick={() => onAddBlock(section.id)}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          <Plus size={16} />
          Add block
        </button>
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
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-sm text-zinc-500">
          Drop blocks here
        </div>
      )}
    </section>
  );
}

export default function Canvas() {
  const sections = useBuilder((state: any) => state.sections as SectionType[]);
  const builderType = useBuilder((state: any) => state.builderType);
  const addBlock = useBuilder((state: any) => state.addBlock);

  const [pickerSectionId, setPickerSectionId] = useState<string | null>(null);

  return (
    <main className="flex h-full min-h-screen flex-1 flex-col bg-zinc-100">
      <CanvasTopbar />

      <div className="flex-1 overflow-auto">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 md:p-6">
          {sections.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center">
              <h3 className="text-lg font-semibold text-zinc-900">
                Empty {builderType} canvas
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Start by adding a section or choosing a preset from the sidebar.
              </p>
            </div>
          ) : (
            sections.map((section) => (
              <div key={section.id}>
                <SectionDropZone
                  section={section}
                  onAddBlock={(sectionId) => setPickerSectionId(sectionId)}
                />

                {pickerSectionId === section.id && (
                  <div className="mt-3">
                    <BlockPicker
                      sectionId={section.id}
                      onPick={(sectionId: string, type: string) => {
                        addBlock(sectionId, type);
                        setPickerSectionId(null);
                      }}
                      onClose={() => setPickerSectionId(null)}
                    />
                  </div>
                )}
              </div>
            ))
          )}

          {sections.length > 0 && (
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
                onClick={() => setPickerSectionId(sections[sections.length - 1]?.id ?? null)}
              >
                <Plus size={16} />
                Add block
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}