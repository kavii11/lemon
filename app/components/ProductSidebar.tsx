"use client";

import { useState } from "react";
import { productLibrary } from "./productLibrary";
import ComponentLibraryModal from "../lib/ComponentLibraryModal";
import { useBuilder } from "@/app/lib/useBuilder";

export default function ProductSidebar() {
  const [activeItem, setActiveItem] = useState<any>(null);
  const addVariantSection = useBuilder((state: any) => state.addVariantSection);

  return (
    <aside className="flex h-full w-[320px] flex-col border-r border-zinc-800 bg-black text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Product builder
          </p>
          <h2 className="mt-2 text-lg font-semibold">Commerce layouts</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Insert ready-made product sections, then edit content visually.
          </p>
        </div>

        <button
          onClick={() => setActiveItem(productLibrary[0])}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-left transition hover:bg-zinc-800"
        >
          <h3 className="text-sm font-semibold text-white">Product layouts</h3>
          <p className="mt-1 text-xs text-zinc-400">
            Product hero, details, reviews, and related products.
          </p>
        </button>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Workflow
          </p>
          <div className="mt-3 space-y-2 text-sm text-zinc-400">
            <p>1. Insert a product preset.</p>
            <p>2. Drag blocks to reorder.</p>
            <p>3. Edit text, media, and styling.</p>
            <p>4. Add more sections only when needed.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 p-4 text-sm text-zinc-500">
        Product mode only.
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
    </aside>
  );
}