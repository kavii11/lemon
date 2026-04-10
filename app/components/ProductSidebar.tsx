"use client";

import { useState } from "react";
import { productLibrary } from "./productLibrary";
import ComponentLibraryModal from "../lib/ComponentLibraryModal";
import { useBuilder } from "@/app/lib/useBuilder";

export default function ProductSidebar() {
  const [activeItem, setActiveItem] = useState<any>(null);
  const addVariantSection = useBuilder((state: any) => state.addVariantSection);
  const sections = useBuilder((state: any) => state.sections);
  const hasLayout = Array.isArray(sections) && sections.some((section: any) => section.blocks?.length > 0);

  return (
    <div className="flex flex-col h-full bg-black w-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <button
          type="button"
          onClick={() => {
            if (!hasLayout) setActiveItem(productLibrary[0]);
          }}
          disabled={hasLayout}
          className={`w-full p-4 rounded-lg border text-left transition ${
            hasLayout
              ? "bg-zinc-950 border-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white"
          }`}
        >
          <h3 className="text-sm font-semibold">Product Layouts</h3>
          <p className="text-xs mt-1 text-zinc-400">
            {hasLayout
              ? "Layout already added"
              : "Choose ready-made product designs"}
          </p>
        </button>
      </div>

      <div className="w-full border-t border-zinc-800" />
      <div className="p-4 space-y-2 text-right">
        <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">Guide</p>
        <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">How to use?</p>
      </div>

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
    </div>
  );
}