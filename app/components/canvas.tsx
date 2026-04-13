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
import ComponentLibraryModal from "@/app/lib/ComponentLibraryModal";
import { productLibrary } from "./productLibrary";

type BlockType = {
  id: string;
  type?: string;
  props?: any;
};

type RegionType = {
  id: string;
  name: string;
  blocks: BlockType[];
};

type SectionType = {
  id: string;
  type?: string;
  layout?: string;
  regions?: RegionType[];
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    data: {
      source: "canvas",
      blockId: block.id,
      sectionId,
    },
  });

  const currentDevice = useBuilder((state: any) => state.currentDevice);
const deviceStyle = block?.props?.style?.[currentDevice] || {};

const compactTypes = [
  "button",
  "price",
  "title",
  "heading",
  "text",
  "badge",
  "rating",
  "sku",
  "stock",
  "label",
  "chip",
  "icon",
];

const isCompactBlock = compactTypes.includes(block?.type || "");

const width = deviceStyle.width || (isCompactBlock ? "auto" : "100%");
const minHeight = deviceStyle.minHeight || (isCompactBlock ? "auto" : "120px");

const style: React.CSSProperties = {
  transform: CSS.Transform.toString(transform),
  transition,
  width,
  minHeight,
  opacity: isDragging ? 0.55 : 1,
  flexShrink: 0,
  alignSelf: isCompactBlock ? "flex-start" : "stretch",
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
  onRemoveSection,
  canAddBlock,
}: {
  section: any;  // Updated to handle regions/layout
  onAddBlock: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
  canAddBlock: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `section-drop-${section.id}`,
    data: {
      sectionId: section.id,
      source: "section-drop",
    },
  });

  const sectionClassName = useMemo(() => {
    const base =
      "rounded-2xl border-2 border-dashed bg-white p-4 md:p-6 shadow-sm transition-all";
    const tone = isOver
      ? "border-blue-400 ring-2 ring-blue-100"
      : "border-zinc-300";
    return `${base} ${tone}`;
  }, [isOver]);

  // NEW: Render by layout with regions
  const renderRegionBlocks = (blocks: BlockType[] = []) => {
  if (!blocks.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-500">
        Drop blocks here
      </div>
    );
  }

  return (
    <SortableContext
      items={blocks.map((block: any) => block.id)}
      strategy={rectSortingStrategy}
    >
      <div className="flex flex-col gap-3">
        {blocks.map((block: any) => (
          <SortableBlock
            key={block.id}
            block={block}
            sectionId={section.id}
          />
        ))}
      </div>
    </SortableContext>
  );
};

const renderContent = () => {
  if (Array.isArray(section.regions) && section.regions.length > 0) {
    const regionMap = Object.fromEntries(
      section.regions.map((region: any) => [region.name, region])
    );

    if (section.layout === "split-hero") {
      const media = regionMap.media;
      const details = regionMap.details;
      const bottom = regionMap.bottom;

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3">{renderRegionBlocks(media?.blocks || [])}</div>
            <div className="space-y-3">{renderRegionBlocks(details?.blocks || [])}</div>
          </div>

          {(bottom?.blocks?.length ?? 0) > 0 && (
            <div className="w-full">{renderRegionBlocks(bottom.blocks)}</div>
          )}
        </div>
      );
    }

    if (section.layout === "two-column" || section.layout === "split") {
      const left = regionMap.left || regionMap.media || section.regions[0];
      const right = regionMap.right || regionMap.details || section.regions[1];

      return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">{renderRegionBlocks(left?.blocks || [])}</div>
          <div className="space-y-3">{renderRegionBlocks(right?.blocks || [])}</div>
        </div>
      );
    }

    if (section.layout === "three-column") {
      return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {section.regions.map((region: any) => (
            <div key={region.id} className="space-y-3">
              {renderRegionBlocks(region.blocks || [])}
            </div>
          ))}
        </div>
      );
    }

    if (section.layout === "stacked" || section.layout === "default") {
      return (
        <div className="space-y-6">
          {section.regions.map((region: any) => (
            <div key={region.id} className="w-full">
              {renderRegionBlocks(region.blocks || [])}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {section.regions.map((region: any) => (
          <div key={region.id} className="w-full">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              {region.name}
            </div>
            {renderRegionBlocks(region.blocks || [])}
          </div>
        ))}
      </div>
    );
  }

  const layoutClassName = getSectionLayout(section.type);

  return section.blocks?.length ? (
    <SortableContext
      items={section.blocks.map((block: any) => block.id)}
      strategy={rectSortingStrategy}
    >
      <div className={layoutClassName}>
        {section.blocks.map((block: any) => (
          <SortableBlock key={block.id} block={block} sectionId={section.id} />
        ))}
      </div>
    </SortableContext>
  ) : (
    <div className="rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-8 text-sm text-zinc-500">
      Drop blocks here
    </div>
  );
};

  return (
    <section ref={setNodeRef} className={sectionClassName}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {section.layout || section.type || "section"}
        </div>

        {canAddBlock && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onRemoveSection(section.id)}
              className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
            >
              Remove
            </button>

            <button
              type="button"
              onClick={() => onAddBlock(section.id)}
              className="inline-flex flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50"
            >
              <Plus size={16} />
              Add field
            </button>
          </div>
        )}
      </div>

      {renderContent()}
    </section>
  );
}
export default function Canvas() {
  const sections = useBuilder((state: any) => state.sections as SectionType[]);
  const builderType = useBuilder((state: any) => state.builderType);
  const currentDevice = useBuilder((state: any) => state.currentDevice);
  const addBlock = useBuilder((state: any) => state.addBlock);
  const addVariantSection = useBuilder((state: any) => state.addVariantSection);
  const removeSection = useBuilder((state: any) => state.removeSection);

  const [pickerSectionId, setPickerSectionId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);

  const hasProductLayout =
  builderType === "product" &&
  sections.some((section) => {
    const hasFlatBlocks =
      Array.isArray(section.blocks) && section.blocks.length > 0;

    const hasRegionBlocks =
      Array.isArray(section.regions) &&
      section.regions.some(
        (region) => Array.isArray(region.blocks) && region.blocks.length > 0
      );

    return hasFlatBlocks || hasRegionBlocks;
  });

  const emptyProductSectionId = sections?.[0]?.id ?? null;
  const deviceFrame = getDeviceFrame(currentDevice);

  const handleOpenLibrary = () => {
    if (hasProductLayout) return;

    setActiveItem({
      type: "product-library-root",
      label: "Product Layouts",
      category: "Product",
      description: "Choose from product layout categories and ready-made variants.",
      variants: productLibrary.flatMap((group: any) =>
        (group.variants || []).map((variant: any) => ({
          ...variant,
          groupId: group.type,
          groupLabel: group.label,
          groupDescription: group.description,
          groupCategory: group.category,
          libraryType: "product-layout",
        }))
      ),
    });
  };

  return (
    <main className="flex h-full min-h-screen flex-1 flex-col bg-zinc-100">
      <div className="canvas-topbar-wrap">
        <CanvasTopbar />
      </div>

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
                          onClick={handleOpenLibrary}
                          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 shadow-sm hover:bg-zinc-50"
                        >
                          <Plus size={16} />
                          Choose product layout
                        </button>
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
                          onRemoveSection={(sectionId) => {
                            removeSection(sectionId);
                            if (pickerSectionId === sectionId) {
                              setPickerSectionId(null);
                            }
                          }}
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

      {!!activeItem && (
  <ComponentLibraryModal
    item={activeItem}
    open={!!activeItem}
    onClose={() => setActiveItem(null)}
    onInsertVariant={(variant: any) => {
      if (!variant) return;
      addVariantSection(variant);
      setActiveItem(null);
    }}
  />
)}
    </main>
  );
}