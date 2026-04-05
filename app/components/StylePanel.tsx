"use client";

import { useMemo } from "react";
import { useBuilder } from "@/app/lib/useBuilder";

export default function StylePanel() {
  const {
    selectedBlock,
    sections,
    updateBlock,
    updateBlockProps,
    currentDevice,
    setDevice,
  } = useBuilder();

  const target = useMemo(() => {
    if (!selectedBlock) return null;

    const section = sections.find((s) => s.id === selectedBlock.sectionId);
    if (!section) return null;

    const block = section.blocks.find((b) => b.id === selectedBlock.blockId);
    if (!block) return null;

    return { section, block };
  }, [sections, selectedBlock]);

  if (!target) {
    return (
      <aside className="style-panel">
        <div className="style-panel-head">
          <div className="style-kicker">Inspector</div>
          <h3>No selection</h3>
        </div>
        <div className="style-panel-empty">
          Select a block from the canvas to edit content and styles.
        </div>
      </aside>
    );
  }

  const { section, block } = target;
  const style = block.props?.style?.[currentDevice] || {};

  const onStyleChange = (key: string, value: string) => {
    updateBlock(section.id, block.id, { [key]: value });
  };

  const onPropsChange = (key: string, value: string) => {
    updateBlockProps(section.id, block.id, { [key]: value });
  };

  return (
    <aside className="style-panel">
      <div className="style-panel-head">
        <div className="style-kicker">Inspector</div>
        <h3>{block.type}</h3>
      </div>

      <div className="style-panel-body">
        <div className="panel-field">
          <span>Device</span>
          <div className="device-tabs">
            <button
              type="button"
              className={currentDevice === "desktop" ? "active" : ""}
              onClick={() => setDevice("desktop")}
            >
              Desktop
            </button>
            <button
              type="button"
              className={currentDevice === "tablet" ? "active" : ""}
              onClick={() => setDevice("tablet")}
            >
              Tablet
            </button>
            <button
              type="button"
              className={currentDevice === "mobile" ? "active" : ""}
              onClick={() => setDevice("mobile")}
            >
              Mobile
            </button>
          </div>
        </div>

        {"content" in block.props && (
          <label className="panel-field">
            <span>Content</span>
            <textarea
              value={block.props.content || ""}
              onChange={(e) => onPropsChange("content", e.target.value)}
              placeholder="Write something..."
            />
          </label>
        )}

        {"label" in block.props && (
          <label className="panel-field">
            <span>Label</span>
            <input
              value={block.props.label || ""}
              onChange={(e) => onPropsChange("label", e.target.value)}
              placeholder="Label"
            />
          </label>
        )}

        {"href" in block.props && (
          <label className="panel-field">
            <span>Link</span>
            <input
              value={block.props.href || ""}
              onChange={(e) => onPropsChange("href", e.target.value)}
              placeholder="https://..."
            />
          </label>
        )}

        {"src" in block.props && (
          <label className="panel-field">
            <span>Image / Video URL</span>
            <input
              value={block.props.src || ""}
              onChange={(e) => onPropsChange("src", e.target.value)}
              placeholder="https://..."
            />
          </label>
        )}

        {"alt" in block.props && (
          <label className="panel-field">
            <span>Alt text</span>
            <input
              value={block.props.alt || ""}
              onChange={(e) => onPropsChange("alt", e.target.value)}
              placeholder="Describe the media"
            />
          </label>
        )}

        <label className="panel-field">
          <span>Padding</span>
          <input
            value={style.padding || ""}
            onChange={(e) => onStyleChange("padding", e.target.value)}
            placeholder="24px"
          />
        </label>

        <label className="panel-field">
          <span>Margin</span>
          <input
            value={style.margin || ""}
            onChange={(e) => onStyleChange("margin", e.target.value)}
            placeholder="0"
          />
        </label>

        <label className="panel-field">
          <span>Width</span>
          <input
            value={style.width || ""}
            onChange={(e) => onStyleChange("width", e.target.value)}
            placeholder="100%"
          />
        </label>

        <label className="panel-field">
          <span>Height</span>
          <input
            value={style.height || ""}
            onChange={(e) => onStyleChange("height", e.target.value)}
            placeholder="auto"
          />
        </label>

        <label className="panel-field">
          <span>Min height</span>
          <input
            value={style.minHeight || ""}
            onChange={(e) => onStyleChange("minHeight", e.target.value)}
            placeholder="120px"
          />
        </label>

        <label className="panel-field">
          <span>Font size</span>
          <input
            value={style.fontSize || ""}
            onChange={(e) => onStyleChange("fontSize", e.target.value)}
            placeholder="16px"
          />
        </label>

        <label className="panel-field">
          <span>Font weight</span>
          <input
            value={style.fontWeight || ""}
            onChange={(e) => onStyleChange("fontWeight", e.target.value)}
            placeholder="600"
          />
        </label>

        <label className="panel-field">
          <span>Line height</span>
          <input
            value={style.lineHeight || ""}
            onChange={(e) => onStyleChange("lineHeight", e.target.value)}
            placeholder="1.5"
          />
        </label>

        <label className="panel-field">
          <span>Text color</span>
          <input
            value={style.color || ""}
            onChange={(e) => onStyleChange("color", e.target.value)}
            placeholder="#172018"
          />
        </label>

        <label className="panel-field">
          <span>Background</span>
          <input
            value={style.backgroundColor || ""}
            onChange={(e) => onStyleChange("backgroundColor", e.target.value)}
            placeholder="#ffffff"
          />
        </label>

        <label className="panel-field">
          <span>Border radius</span>
          <input
            value={style.borderRadius || ""}
            onChange={(e) => onStyleChange("borderRadius", e.target.value)}
            placeholder="16px"
          />
        </label>

        <label className="panel-field">
          <span>Shadow</span>
          <input
            value={style.boxShadow || ""}
            onChange={(e) => onStyleChange("boxShadow", e.target.value)}
            placeholder="0 10px 30px rgba(0,0,0,0.08)"
          />
        </label>
      </div>
    </aside>
  );
}