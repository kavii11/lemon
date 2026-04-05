"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, GripVertical } from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";
import BlockRenderer from "./builder/BlockRenderer";
import BlockPicker from "./builder/BlockPicker";
import CanvasTopbar from "./CanvasTopbar";

function SortableBlock({
  block,
  sectionId,
}: {
  block: any;
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

  const currentDevice = useBuilder((s) => s.currentDevice);
  const width = block?.props?.style?.[currentDevice]?.width || "100%";
  const minHeight = block?.props?.style?.[currentDevice]?.minHeight || "120px";

  return (
    <div
      ref={setNodeRef}
      className={`builder-block-shell ${block?.isSpacer ? "spacer-block" : ""}`}
      style={{
        width,
        minHeight,
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.75 : 1,
      }}
    >
      <BlockRenderer
        block={block}
        sectionId={sectionId}
        dragHandleProps={{
          ...attributes,
          ...listeners,
          icon: <GripVertical size={16} />,
        }}
      />
    </div>
  );
}

function DroppableSection({
  section,
}: {
  section: {
    id: string;
    type: string;
    blocks: any[];
  };
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `section-drop-${section.id}`,
  });

  const cleanBlocks = (section.blocks || []).filter((b) => !b?.isSpacer);

  return (
    <section
      ref={setNodeRef}
      className={`page-section ${isOver ? "is-over" : ""}`}
    >
      <div className="page-section-label">{section.type}</div>

      {cleanBlocks.length === 0 ? (
        <div className="builder-section-empty">Drop components here</div>
      ) : (
        <SortableContext
          items={cleanBlocks.map((block) => block.id)}
          strategy={rectSortingStrategy}
        >
          <div className="builder-block-row">
            {section.blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                sectionId={section.id}
              />
            ))}
          </div>
        </SortableContext>
      )}
    </section>
  );
}

export default function Canvas() {
  const sections = useBuilder((s) => s.sections);
  const addSection = useBuilder((s) => s.addSection);
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);

  return (
    <main className="builder-canvas">
      <CanvasTopbar
        onAddSection={() =>
          setPickerIndex(pickerIndex === sections.length ? null : sections.length)
        }
      />

      <div className="builder-viewport">
        {sections.map((section, index) => (
          <div key={section.id}>
            <div className="insert-section-bar">
              <button
                className="insert-section-button"
                type="button"
                onClick={() => setPickerIndex(pickerIndex === index ? null : index)}
                aria-label="Add section here"
              >
                <Plus size={16} />
              </button>
            </div>

            {pickerIndex === index && (
              <BlockPicker
                mode="section"
                onPick={(type) => {
                  addSection(type, index);
                  setPickerIndex(null);
                }}
                onClose={() => setPickerIndex(null)}
              />
            )}

            <DroppableSection section={section} />
          </div>
        ))}

        <div className="insert-section-bottom">
          <button
            className="insert-section-bottom-button"
            type="button"
            onClick={() =>
              setPickerIndex(pickerIndex === sections.length ? null : sections.length)
            }
          >
            <Plus size={18} />
            Add section
          </button>
        </div>

        {pickerIndex === sections.length && (
          <BlockPicker
            mode="section"
            onPick={(type) => {
              addSection(type);
              setPickerIndex(null);
            }}
            onClose={() => setPickerIndex(null)}
          />
        )}
      </div>
    </main>
  );
}