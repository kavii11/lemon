"use client";

import { useMemo, useState } from "react";
import { Layout, ChevronRight, Sparkles } from "lucide-react";
import { productLibrary } from "./productLibrary";
import ComponentLibraryModal from "../lib/ComponentLibraryModal";
import { useBuilder } from "@/app/lib/useBuilder";

export default function ProductSidebar() {
  const [activeItem, setActiveItem] = useState<any>(null);

  const addVariantSection = useBuilder((state: any) => state.addVariantSection);
  const sections = useBuilder((state: any) => state.sections);

  const hasLayout =
    Array.isArray(sections) &&
    sections.some((section: any) => Array.isArray(section.blocks) && section.blocks.length > 0);

  const totalCategories = productLibrary.length;
  const totalVariants = useMemo(
    () =>
      productLibrary.reduce((sum: number, item: any) => {
        return sum + (Array.isArray(item.variants) ? item.variants.length : 0);
      }, 0),
    []
  );

  const handleOpenLibrary = () => {
    if (hasLayout) return;
    setActiveItem({
      type: "product-library-root",
      label: "Product Layouts",
      category: "Product",
      description: "Choose from product layout categories and ready-made variants.",
      variants: productLibrary.flatMap((group: any) =>
        (group.variants || []).map((variant: any) => ({
          ...variant,
          groupId: group.type,
          groupLabel: group.label,
          groupDescription: group.description,
          groupCategory: group.category,
          libraryType: "product-layout",
        }))
      ),
    });
  };

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleOpenLibrary}
          disabled={hasLayout}
          className={`w-full rounded-2xl border p-4 text-left transition-all ${
            hasLayout
              ? "cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600"
              : "border-zinc-700 bg-zinc-900 text-white hover:border-zinc-500 hover:bg-zinc-800"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-3">
              <div
                className={`mt-0.5 rounded-xl border p-2 ${
                  hasLayout
                    ? "border-zinc-800 bg-zinc-900 text-zinc-600"
                    : "border-zinc-700 bg-zinc-950 text-zinc-200"
                }`}
              >
                <Layout className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold">Product Layouts</div>
                <div className="mt-1 text-xs leading-5 text-zinc-400">
                  {hasLayout
                    ? "A product layout is already on the canvas."
                    : "Open the product layout library and insert a ready-made design."}
                </div>
              </div>
            </div>

            {!hasLayout && <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
              {totalCategories} categories
            </span>
            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300">
              {totalVariants} variants
            </span>
            {!hasLayout && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/60 bg-emerald-950/60 px-2.5 py-1 text-[11px] text-emerald-300">
                <Sparkles className="h-3 w-3" />
                Ready to insert
              </span>
            )}
          </div>
        </button>

        {!hasLayout && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-[11px] leading-5 text-zinc-500">
              Choose one layout first, then customize blocks inside the canvas.
            </p>
          </div>
        )}
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
    </>
  );
}