"use client";

import { X } from "lucide-react";

const groups = [
  {
    title: "Sections",
    items: ["hero", "navbar", "features", "pricing", "testimonials", "cta", "footer"],
  },
  {
    title: "Layout",
    items: ["section", "container", "grid", "2-columns", "3-columns", "stack"],
  },
  {
    title: "Content",
    items: ["heading", "text", "paragraph", "image", "video", "list"],
  },
  {
    title: "Commerce",
    items: ["product", "product-list", "cart", "checkout"],
  },
  {
    title: "Blog",
    items: ["blog-list", "blog-post", "image-block"],
  },
];

function pretty(value: string) {
  return value.replace(/-/g, " ");
}

export default function BlockPicker({
  sectionId,
  onPick,
  onClose,
}: {
  sectionId: string;
  onPick: (sectionId: string, type: string) => void;
  onClose: () => void;
}){
  return (
    <div className="block-picker">
      <div className="block-picker-header">
        <h3>Add section</h3>
        <button
          type="button"
          className="block-picker-close"
          onClick={onClose}
          aria-label="Close block picker"
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {groups.map((group) => (
          <div key={group.title}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#64748b",
                marginBottom: 10,
              }}
            >
              {group.title}
            </div>
            <div className="block-picker-grid">
              {group.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="block-picker-card"
onClick={() => onPick(sectionId, item)}                >
                  <strong style={{ textTransform: "capitalize" }}>{pretty(item)}</strong>
                  <span style={{ fontSize: 13, color: "#64748b", textAlign: "left" }}>
                    Add a {pretty(item)} block to the page.
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}