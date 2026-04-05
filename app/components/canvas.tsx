"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilder } from "@/app/lib/useBuilder";
import BlockRenderer from "./builder/BlockRenderer";
import BlockPicker from "./builder/BlockPicker";
import { Plus } from "lucide-react";
import { useState } from "react";

function SortableBlock({ block, sectionId }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: block.id,
      data: { source: "canvas", blockId: block.id, sectionId },
    });

  const currentDevice = useBuilder((s: any) => s.currentDevice);
  const width = block?.props?.style?.[currentDevice]?.width || "100%";
  const minHeight = block?.props?.style?.[currentDevice]?.minHeight || "120px";

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        width,
        minHeight,
        flex: `0 0 ${width}`,
      }}
      className={`builder-block-shell ${block.isSpacer ? "spacer-block" : ""}`}
    >
      <BlockRenderer
        block={block}
        sectionId={sectionId}
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
      />
    </div>
  );
}

function PageSection({ section }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: `section-drop-${section.id}`,
  });

  return (
    <section
      ref={setNodeRef}
      className={`page-section ${isOver ? "is-over" : ""}`}
    >
      <div className="page-section-label">{section.type}</div>

      <SortableContext
        items={(section.blocks || []).map((block: any) => block.id)}
        strategy={rectSortingStrategy}
      >
        <div className="builder-block-row">
          {(section.blocks || []).map((block: any) => (
            <SortableBlock
              key={block.id}
              block={block}
              sectionId={section.id}
            />
          ))}
        </div>
      </SortableContext>

      {(!section.blocks || section.blocks.length === 0) && (
        <div className="builder-section-empty">Drop blocks here</div>
      )}
    </section>
  );
}

function InsertSectionBar({
  afterIndex,
  onClick,
}: {
  afterIndex: number;
  onClick: (index: number) => void;
}) {
  return (
    <div className="insert-section-bar">
      <button
        type="button"
        className="insert-section-button"
        onClick={() => onClick(afterIndex)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default function Canvas() {
  const { sections, addSection } = useBuilder();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const openPicker = (index: number) => {
    setInsertIndex(index);
    setPickerOpen(true);
  };

  return (
    <main className="builder-canvas">
      <div className="builder-viewport">
        <div className="builder-viewport-scroll">
          {(sections || []).map((section: any, index: number) => (
            <div key={section.id}>
              <PageSection section={section} />

              {index < sections.length - 1 && (
                <InsertSectionBar afterIndex={index} onClick={openPicker} />
              )}
            </div>
          ))}

          <div className="insert-section-bottom">
            <button
              type="button"
              className="insert-section-bottom-button"
              onClick={() => openPicker(sections.length - 1)}
            >
              <Plus size={16} />
              <span>Add Section</span>
            </button>
          </div>
        </div>
      </div>

      {pickerOpen && (
        <BlockPicker
          onClose={() => {
            setPickerOpen(false);
            setInsertIndex(null);
          }}
          onPick={(type: string) => {
            addSection(type, insertIndex ?? sections.length - 1);
            setPickerOpen(false);
            setInsertIndex(null);
          }}
        />
      )}
    </main>
  );
}