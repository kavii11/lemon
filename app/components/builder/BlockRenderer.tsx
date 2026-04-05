"use client";

import { MouseEvent } from "react";
import { Copy, GripVertical, Trash2 } from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";

export default function BlockRenderer({
  block,
  sectionId,
  dragHandleProps,
}: any) {
  const {
    setSelectedBlock,
    selectedBlock,
    currentDevice,
    resizeBlock,
    duplicateBlock,
    removeBlock,
  } = useBuilder();

  const props = block?.props || {};
  const style = props?.style?.[currentDevice] || {};
  const content = props?.content || block?.type || "Block";
  const isSelected =
    selectedBlock?.sectionId === sectionId &&
    selectedBlock?.blockId === block.id;

  const startResize = (
    e: MouseEvent,
    direction: "left" | "right" | "top" | "bottom"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    let raf = 0;

    const onMove = (moveEvent: MouseEvent | globalThis.MouseEvent) => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
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
      });
    };

    const onUp = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove as any);
    window.addEventListener("mouseup", onUp);
  };

  if (block.isSpacer) {
    return (
      <div className="builder-block-box spacer-block">
        <div className="builder-block-content">{content}</div>
      </div>
    );
  }

  const commonStyle = {
    padding: style.padding,
    margin: style.margin,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeight,
    color: style.color,
    backgroundColor: style.backgroundColor,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,
    justifyContent: style.justifyContent,
    alignItems: style.alignItems,
    textAlign: style.textAlign,
    minHeight: style.minHeight || "120px",
  } as React.CSSProperties;

  return (
    <div
      className={`builder-block-box ${isSelected ? "is-selected" : ""}`}
      onClick={() => setSelectedBlock(sectionId, block.id)}
    >
      <button
        type="button"
        className="builder-drag-handle"
        aria-label="Drag block"
        {...dragHandleProps}
      >
        {dragHandleProps?.icon || <GripVertical size={16} />}
      </button>

      <div className="builder-block-toolbar">
        <button
          type="button"
          className="builder-mini-action"
          aria-label="Duplicate block"
          onClick={(e) => {
            e.stopPropagation();
            duplicateBlock(sectionId, block.id);
          }}
        >
          <Copy size={14} />
        </button>

        <button
          type="button"
          className="builder-mini-action danger"
          aria-label="Delete block"
          onClick={(e) => {
            e.stopPropagation();
            removeBlock(sectionId, block.id);
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="builder-block-content" style={commonStyle}>
        {block.type === "heading" && <h2>{content}</h2>}

        {["text", "paragraph"].includes(block.type) && <p>{content}</p>}

        {["button", "submit"].includes(block.type) && (
          <button
            type="button"
            style={{
              background: style.backgroundColor || "#111827",
              color: style.color || "#fff",
              borderRadius: style.borderRadius || "12px",
              padding: "12px 20px",
              fontWeight: Number(style.fontWeight || 600),
            }}
          >
            {content}
          </button>
        )}

        {["image", "image-block"].includes(block.type) && (
          <img
            src={props.src || "https://placehold.co/1200x700"}
            alt={props.alt || "Builder image"}
            style={{
              width: "100%",
              height: "100%",
              minHeight: style.minHeight || "220px",
              borderRadius: style.borderRadius || "12px",
              objectFit: style.objectFit || "cover",
            }}
          />
        )}

        {block.type === "video" && (
          <iframe
            title={content}
            src={props.src || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
            style={{
              width: "100%",
              minHeight: style.minHeight || "260px",
              border: "0",
              borderRadius: style.borderRadius || "12px",
            }}
            allowFullScreen
          />
        )}

        {block.type === "list" && (
          <ul style={{ paddingLeft: "18px", margin: 0 }}>
            {(props.items || []).map((item: string, index: number) => (
              <li key={`${block.id}-item-${index}`}>{item}</li>
            ))}
          </ul>
        )}

        {block.type === "input" && (
          <label className="builder-form-field">
            <span>{props.label || "Input label"}</span>
            <input placeholder={props.placeholder || "Type here"} />
          </label>
        )}

        {block.type === "textarea" && (
          <label className="builder-form-field">
            <span>{props.label || "Textarea label"}</span>
            <textarea placeholder={props.placeholder || "Write here"} />
          </label>
        )}

        {block.type === "select" && (
          <label className="builder-form-field">
            <span>{props.label || "Select label"}</span>
            <select defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              {(props.options || []).map((option: string, index: number) => (
                <option key={`${block.id}-option-${index}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        )}

        {block.type === "checkbox" && (
          <label className="builder-checkbox">
            <input type="checkbox" />
            <span>{props.label || "Checkbox label"}</span>
          </label>
        )}

        {![
          "heading",
          "text",
          "paragraph",
          "button",
          "submit",
          "image",
          "image-block",
          "video",
          "list",
          "input",
          "textarea",
          "select",
          "checkbox",
        ].includes(block.type) && (
          <div className="builder-generic-block">{content}</div>
        )}
      </div>

      {isSelected && (
        <>
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
        </>
      )}
    </div>
  );
}