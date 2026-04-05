"use client";

import { Layout, PanelTop, SquareStack, PanelsTopLeft, Rows3, X } from "lucide-react";

const SECTION_TYPES = [
  { label: "Section", value: "section", icon: Layout },
  { label: "Hero", value: "hero", icon: PanelsTopLeft },
  { label: "Navbar", value: "navbar", icon: PanelTop },
  { label: "Features", value: "features", icon: Rows3 },
  { label: "Footer", value: "footer", icon: SquareStack },
];

export default function BlockPicker({
  mode = "section",
  onPick,
  onClose,
}: {
  mode?: "section";
  onPick: (value: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="block-picker">
      <div className="block-picker-header">
        <h3>Add {mode}</h3>
        <button type="button" className="block-picker-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="block-picker-grid">
        {SECTION_TYPES.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.value}
              type="button"
              className="block-picker-card"
              onClick={() => onPick(item.value)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}