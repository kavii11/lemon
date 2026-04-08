"use client";

import { useMemo } from "react";
import { useBuilder } from "@/app/lib/useBuilder";

const textFields = ["content", "title", "subtitle", "description", "label", "placeholder", "href", "src", "alt", "price", "badge"];
const styleFields = [
  { key: "width", label: "Width" },
  { key: "minHeight", label: "Min height" },
  { key: "padding", label: "Padding" },
  { key: "margin", label: "Margin" },
  { key: "fontSize", label: "Font size" },
  { key: "fontWeight", label: "Font weight" },
  { key: "lineHeight", label: "Line height" },
  { key: "color", label: "Text color" },
  { key: "backgroundColor", label: "Background" },
  { key: "borderRadius", label: "Radius" },
  { key: "boxShadow", label: "Shadow" },
  { key: "textAlign", label: "Text align" },
  { key: "border", label: "Border" },
];

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
    const block = section?.blocks.find((b) => b.id === selectedBlock.blockId);
    return block ? { section, block } : null;
  }, [sections, selectedBlock]);

  if (!selectedBlock || !target) {
    return (
      <aside className="style-panel">
        <div className="style-panel-head">
          <div className="style-kicker">Inspector</div>
          <h3>No selection</h3>
        </div>
        <div className="style-panel-empty">
          Select a block on the canvas to edit content and styles.
        </div>
      </aside>
    );
  }

  const { section, block } = target;
  const props = block.props || {};
  const style = props?.style?.[currentDevice] || {};

  const onStyleChange = (key: string, value: string) => {
    updateBlock(section.id, block.id, { [key]: value });
  };

  const onPropsChange = (key: string, value: string) => {
    updateBlockProps(section.id, block.id, { [key]: value });
  };

  const onListChange = (key: string, value: string) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    updateBlockProps(section.id, block.id, { [key]: items });
  };

  return (
    <aside className="style-panel">
      <div className="style-panel-head">
        <div className="style-kicker">Inspector</div>
        <h3>{block.type.replace(/-/g, " ")}</h3>
      </div>

      <div className="style-panel-body">
        <div className="panel-field">
          <span>Device</span>
          <div className="device-tabs">
            {(["desktop", "tablet", "mobile"] as const).map((device) => (
              <button
                key={device}
                type="button"
                className={currentDevice === device ? "active" : ""}
                onClick={() => setDevice(device)}
              >
                {device}
              </button>
            ))}
          </div>
        </div>

        {textFields
          .filter((field) => typeof props[field] === "string")
          .map((field) => (
            <label key={field} className="panel-field">
              <span>{field.replace(/([A-Z])/g, " $1")}</span>
              {field === "content" || field === "description" || field === "subtitle" ? (
                <textarea
                  value={props[field] || ""}
                  onChange={(e) => onPropsChange(field, e.target.value)}
                />
              ) : (
                <input
                  value={props[field] || ""}
                  onChange={(e) => onPropsChange(field, e.target.value)}
                />
              )}
            </label>
          ))}

        {Array.isArray(props.items) && (
          <label className="panel-field">
            <span>Items</span>
            <textarea
              value={(props.items || []).join("\n")}
              onChange={(e) => onListChange("items", e.target.value)}
            />
          </label>
        )}

        {Array.isArray(props.options) && (
          <label className="panel-field">
            <span>Options</span>
            <textarea
              value={(props.options || []).join("\n")}
              onChange={(e) => onListChange("options", e.target.value)}
            />
          </label>
        )}

        {styleFields.map((field) => (
          <label key={field.key} className="panel-field">
            <span>{field.label}</span>
            <input
              value={(style as any)[field.key] || ""}
              onChange={(e) => onStyleChange(field.key, e.target.value)}
              placeholder={field.key === "width" ? "100%" : ""}
            />
          </label>
        ))}
      </div>
    </aside>
  );
}