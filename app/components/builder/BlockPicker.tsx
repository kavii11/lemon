"use client";

import { X, Plus } from "lucide-react";
import { componentLibrary } from "../../lib/componentLibrary";
import { productLibrary } from "../productLibrary";
import {useBuilder} from "@/app/lib/useBuilder";

type PickerMode = "all" | "layoutOnly" | "fieldOnly";

type Props = {
  sectionId: string;
  onPick: (sectionId: string, type: string) => void;
  onClose: () => void;
  mode?: PickerMode;
};

const FIELD_BLOCK_TYPES = new Set([
  "text",
  "heading",
  "paragraph",
  "button",
  "submit",
  "badge",
  "image",
  "image-block",
  "video",
  "list",
  "divider",
  "spacer",
  "quote",
  "card",
  "stats",
  "input",
  "textarea",
  "select",
  "checkbox",
  "product",
  "product-list",
  "cart",
  "checkout",
  "blog-list",
  "blog-post",
  "faq",
  "table",
]);

export default function BlockPicker({
  sectionId,
  onPick,
  onClose,
  mode = "all",
}: Props) {
  const builderType = useBuilder((s: any) => s.builderType);
  const sections = useBuilder((s: any) => s.sections as any[]);

  const hasProductLayout =
    builderType === "product" &&
    sections.some((section) => Array.isArray(section.blocks) && section.blocks.length > 0);

  const productLayoutGroup = productLibrary?.[0];

  const fieldGroups =
    componentLibrary?.filter((group: any) =>
      (group.variants || []).some(
        (variant: any) => variant.kind === "block" && FIELD_BLOCK_TYPES.has(group.type)
      )
    ) || [];

  return (
    <div className="block-picker">
      <div className="block-picker-head">
        <div>
          <div className="block-picker-kicker">
            {mode === "layoutOnly" ? "Choose layout" : "Add field"}
          </div>
          <h3 className="block-picker-title">
            {mode === "layoutOnly"
              ? "Select product layout"
              : mode === "fieldOnly"
              ? "Select field"
              : "Component library"}
          </h3>
        </div>

        <button
          type="button"
          className="block-picker-close"
          onClick={onClose}
          aria-label="Close picker"
        >
          <X size={18} />
        </button>
      </div>

      <div className="block-picker-body">
        {builderType === "product" &&
          mode === "layoutOnly" &&
          !hasProductLayout &&
          productLayoutGroup && (
            <div className="block-picker-group">
              <div className="block-picker-group-title">{productLayoutGroup.label}</div>

              <div className="block-picker-grid">
                {productLayoutGroup.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    type="button"
                    className="block-picker-card"
                    onClick={() => onPick(sectionId, variant.id)}
                  >
                    <div className="block-picker-card-icon">
                      <Plus size={16} />
                    </div>
                    <div className="block-picker-card-copy">
                      <strong>{variant.name}</strong>
                      <span>{variant.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        {mode !== "layoutOnly" &&
          fieldGroups.map((group: any) => (
            <div key={group.type} className="block-picker-group">
              <div className="block-picker-group-title">{group.label}</div>

              <div className="block-picker-grid">
                {group.variants
                  .filter((variant: any) => variant.kind === "block")
                  .map((variant: any) => (
                    <button
                      key={variant.id}
                      type="button"
                      className="block-picker-card"
                      onClick={() => onPick(sectionId, group.type)}
                    >
                      <div className="block-picker-card-icon">
                        <Plus size={16} />
                      </div>
                      <div className="block-picker-card-copy">
                        <strong>{variant.name}</strong>
                        <span>{variant.description}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}