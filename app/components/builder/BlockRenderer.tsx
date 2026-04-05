"use client";

import { useBuilder } from "@/app/lib/useBuilder";

export default function BlockRenderer({
  block,
  sectionId,
  dragHandleProps,
}: any) {
  const { setSelectedBlock, selectedBlock, currentDevice, resizeBlock } =
    useBuilder();

  const props = block?.props || {};
  const style = props?.style?.[currentDevice] || {};
  const content = props?.content || block?.type || "Block";
  const isSelected =
    selectedBlock?.sectionId === sectionId &&
    selectedBlock?.blockId === block.id;

  const startResize = (
    e: React.MouseEvent,
    direction: "left" | "right" | "top" | "bottom"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const onMove = (moveEvent: MouseEvent) => {
      let delta = 0;

      if (direction === "left") {
        delta = (startX - moveEvent.clientX) / 4;
      } else if (direction === "right") {
        delta = (moveEvent.clientX - startX) / 4;
      } else if (direction === "top") {
        delta = (startY - moveEvent.clientY) / 4;
      } else if (direction === "bottom") {
        delta = (moveEvent.clientY - startY) / 4;
      }

      resizeBlock(sectionId, block.id, direction, delta);
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  if (block.isSpacer) {
    return (
      <div className="builder-block-box spacer-block">
        <div className="builder-block-content">Blank space</div>
      </div>
    );
  }

  return (
    <div
      className={`builder-block-box ${isSelected ? "is-selected" : ""}`}
      onClick={() => setSelectedBlock(sectionId, block.id)}
    >
      <div className="builder-drag-handle" {...dragHandleProps}>
        Drag
      </div>

      <div
        className="resize-handle left"
        onMouseDown={(e) => startResize(e, "left")}
      />
      <div
        className="resize-handle right"
        onMouseDown={(e) => startResize(e, "right")}
      />
      <div
        className="resize-handle top"
        onMouseDown={(e) => startResize(e, "top")}
      />
      <div
        className="resize-handle bottom"
        onMouseDown={(e) => startResize(e, "bottom")}
      />

      <div className="builder-block-content" style={style}>
        {block.type === "heading" && (
          <h2 className="text-2xl font-semibold">{content}</h2>
        )}

        {block.type === "text" && (
          <p className="text-sm text-zinc-700">{content}</p>
        )}

        {block.type === "button" && (
          <button className="rounded-md bg-black px-4 py-2 text-sm text-white">
            {content}
          </button>
        )}

        {!["heading", "text", "button"].includes(block.type) && (
          <div className="text-sm text-zinc-800">
            <span className="font-medium">{block.type}</span>: {content}
          </div>
        )}
      </div>
    </div>
  );
}