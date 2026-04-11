"use client";

import { useMemo, useState, useCallback } from "react";
import { 
  X, 
  Plus, 
  Search, 
  LayoutTemplate, 
  Layers3, 
  Package, 
  Type, 
  Filter 
} from "lucide-react";
import { componentLibrary } from "../../lib/componentLibrary";
import { productLibrary } from "../productLibrary";
import { useBuilder } from "@/app/lib/useBuilder";

type PickerMode = "all" | "layoutOnly" | "fieldOnly";
type PickerContext = "product-setup" | "section-fill" | "empty-canvas";

type Props = {
  sectionId: string;
  onPick: (sectionId: string, type: string) => void;
  onClose: () => void;
  mode?: PickerMode;
  context?: PickerContext;
};

const FIELD_BLOCK_TYPES = new Set([
  "text", "heading", "paragraph", "button", "submit", "badge", "image",
  "image-block", "video", "list", "divider", "spacer", "quote", "card",
  "stats", "input", "textarea", "select", "checkbox", "product",
  "product-list", "cart", "checkout", "blog-list", "blog-post", "faq", "table"
]);

interface PreviewVariant {
  tone: string;
  density: string;
  frame: string;
  highlights: string[];
}

function getLayoutPreviewStyle(variant: any): PreviewVariant {
  const defaults: PreviewVariant = {
    tone: "balanced",
    density: "medium",
    frame: "stack",
    highlights: ["headline", "content", "cta"]
  };

  return variant?.preview || defaults;
}

function LayoutPreviewCard({
  title,
  description,
  variant,
  tags,
  onClick,
  index,
}: {
  title: string;
  description?: string;
  variant: any;
  tags?: string[];
  onClick: () => void;
  index: number;
}) {
  const preview = getLayoutPreviewStyle(variant);
  const tagColors = {
    classic: "from-blue-500 to-blue-600",
    minimal: "from-zinc-500 to-zinc-600", 
    modern: "from-emerald-500 to-teal-600",
    visual: "from-purple-500 to-pink-600",
    hero: "from-orange-500 to-red-600",
    conversion: "from-amber-500 to-orange-600"
  };

  return (
    <button
      type="button"
      className="group relative overflow-hidden rounded-3xl border-2 border-white/50 bg-gradient-to-br from-white to-zinc-50/50 backdrop-blur-xl text-left shadow-xl hover:shadow-2xl hover:border-white/80 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
      onClick={onClick}
    >
      {/* Dynamic Preview based on variant.preview */}
      <div className="relative aspect-[1.4/1] p-5">
        <div className={`absolute inset-0 bg-gradient-to-br ${tagColors[preview.tone as keyof typeof tagColors] || 'from-zinc-100 to-zinc-200'} opacity-20 rounded-2xl`} />
        
        <div className="relative h-full flex flex-col justify-between rounded-2xl border-2 border-white/60 bg-white/90 backdrop-blur-xl shadow-inner">
          {/* Dynamic frame preview */}
          {preview.frame === "split" && (
            <div className="grid grid-cols-2 h-full gap-3 p-4">
              <div className="w-full h-3/4 rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300" />
              <div className="space-y-3 p-3">
                <div className="h-5 w-4/5 rounded-lg bg-zinc-300" />
                <div className="h-4 w-full rounded-lg bg-zinc-200" />
                <div className="h-11 w-3/4 rounded-xl bg-emerald-400/80" />
              </div>
            </div>
          )}
          
          {preview.frame === "grid-3" && (
            <div className="grid grid-cols-3 gap-2 p-3 h-full">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300" />
              ))}
            </div>
          )}
          
          {preview.frame === "hero-split" && (
            <div className="flex flex-col h-full p-4 gap-4">
              <div className="h-2/3 rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded-xl bg-zinc-300" />
                <div className="h-4 w-1/2 rounded-lg bg-zinc-200" />
                <div className="h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500" />
              </div>
            </div>
          )}

          {/* Default stacked preview */}
          <div className="flex flex-col gap-4 p-4 h-full">
            <div className="h-1/2 rounded-2xl bg-gradient-to-r from-zinc-200 to-zinc-300" />
            <div className="space-y-3 flex-1">
              <div className="h-6 w-4/5 rounded-xl bg-zinc-300" />
              <div className="h-4 w-2/3 rounded-lg bg-zinc-200" />
              <div className="h-12 w-full rounded-2xl bg-gradient-to-r from-blue-400 to-emerald-500" />
            </div>
          </div>

          {/* Layout badge */}
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl text-[11px] font-semibold text-zinc-700 shadow-lg border border-white/50">
            <LayoutTemplate size={12} />
            {preview.frame.replace('-', ' ').toUpperCase()}
          </div>

          {/* Tag badges */}
          {tags?.slice(0,2).map((tag, i) => (
            <div 
              key={tag} 
              className={`absolute left-3 bottom-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-white shadow-lg ${
                tagColors[tag as keyof typeof tagColors] || 'from-zinc-500 to-zinc-600'
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-2">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-white/50 shadow-lg group-hover:scale-105 transition-transform">
            <Plus className="w-6 h-6 text-blue-600 group-hover:text-emerald-600 transition-colors" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h4 className="text-base font-bold text-zinc-900 leading-tight group-hover:text-zinc-950">{title}</h4>
            <p className="mt-1 text-sm text-zinc-600 leading-relaxed line-clamp-2">{description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {tags?.slice(0,3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function FieldCard({
  title,
  description,
  icon: Icon,
  onClick,
}: {
  title: string;
  description?: string;
  icon?: React.ElementType;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="group flex items-start gap-4 rounded-2xl border-2 border-white/30 bg-gradient-to-br from-white to-zinc-50/50 backdrop-blur-xl p-5 text-left shadow-lg hover:shadow-xl hover:border-white/60 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-white/50 shadow-md group-hover:scale-105 transition-all">
        {Icon ? <Icon className="w-7 h-7 text-blue-600 group-hover:text-emerald-600" /> : <Plus className="w-7 h-7 text-blue-600" />}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-base font-semibold text-zinc-900 leading-tight">{title}</h4>
        <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{description}</p>
      </div>
    </button>
  );
}

function LayoutCategoryHeader({ 
  category, 
  count, 
  icon: Icon, 
  onFilter 
}: { 
  category: string; 
  count: number; 
  icon?: React.ElementType; 
  onFilter?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
      <div className="flex items-center gap-3">
        {Icon && <div className="p-2 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl"><Icon size={20} className="text-blue-600" /></div>}
        <div>
          <h3 className="text-lg font-bold text-zinc-900">{category}</h3>
          <span className="text-sm text-zinc-500">{count} layouts</span>
        </div>
      </div>
      {onFilter && (
        <button 
          onClick={onFilter}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors p-2 -m-2 rounded-xl hover:bg-zinc-100"
        >
          <Filter size={16} />
        </button>
      )}
    </div>
  );
}

export default function BlockPicker({
  sectionId,
  onPick,
  onClose,
  mode = "all",
  context = "section-fill",
}: Props) {
  const builderType = useBuilder((s: any) => s.builderType);
  const sections = useBuilder((s: any) => s.sections as any[]);

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"layouts" | "fields">(
    mode === "layoutOnly" ? "layouts" : "fields"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const hasProductLayout = builderType === "product" &&
    sections.some((section: any) => 
      Array.isArray(section.blocks) && 
      section.blocks.some((block: any) => 
        block?.type?.includes("product-") && 
        !block.type.includes("product-list")
      )
    );

  const productLayoutGroups = Array.isArray(productLibrary) ? productLibrary : [];
  const fieldGroups = componentLibrary?.filter((group: any) =>
    (group.variants || []).some((variant: any) => 
      variant.kind === "block" && FIELD_BLOCK_TYPES.has(group.type)
    )
  ) || [];

  // Enhanced filtering with category support
  const filteredLayoutGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    return productLayoutGroups
      .map((group: any) => ({
        ...group,
        variants: (group.variants || []).filter((variant: any) => {
          if (selectedCategory && group.category !== selectedCategory) return false;
          
          const haystack = [
            group.label, group.category,
            variant.name, variant.description, variant.id,
            ...(variant.tags || [])
          ].filter(Boolean).join(" ").toLowerCase();
          
          return !q || haystack.includes(q);
        }),
      }))
      .filter((group: any) => group.variants.length > 0);
  }, [productLibrary, query, selectedCategory]);

  const filteredFieldGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return fieldGroups
      .map((group: any) => ({
        ...group,
        variants: (group.variants || [])
          .filter((variant: any) => variant.kind === "block")
          .filter((variant: any) => {
            const haystack = [
              group.label, group.type,
              variant.name, variant.description, variant.id
            ].filter(Boolean).join(" ").toLowerCase();
            return !q || haystack.includes(q);
          }),
      }))
      .filter((group: any) => group.variants.length > 0);
  }, [fieldGroups, query]);

  const showLayouts = builderType === "product" && 
    (mode === "layoutOnly" || mode === "all" || activeTab === "layouts") &&
    (!hasProductLayout || context === "product-setup");

  const showFields = mode !== "layoutOnly" || activeTab === "fields";

  const contextTitle = {
    "product-setup": "Build your first product page",
    "section-fill": "Add to this section",
    "empty-canvas": "Start building"
  }[context] || "Insert component";

  return (
    <div className="block-picker relative z-50 mx-auto w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/20 bg-gradient-to-br from-white via-white to-zinc-50/80 backdrop-blur-3xl shadow-2xl">
      {/* Header */}
      <div className="block-picker-head sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/30 bg-white/90 backdrop-blur-xl px-6 py-6 rounded-t-3xl">
        <div className="min-w-0">
          <div className="block-picker-kicker text-xs font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full inline-block">
            {context === "product-setup" ? "Product Setup" : "Quick Insert"}
          </div>
          
          <h2 className="block-picker-title mt-3 text-2xl font-black text-zinc-950 bg-gradient-to-r from-zinc-950 to-zinc-800 bg-clip-text">
            {mode === "layoutOnly" ? "Choose Product Layout" : "Component Library"}
          </h2>
          
          <p className="mt-2 text-base text-zinc-600 leading-relaxed max-w-md">
            {contextTitle}
          </p>
        </div>

        <button
          type="button"
          className="group/close inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-zinc-200/50 bg-white/80 backdrop-blur-sm text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={onClose}
          aria-label="Close picker"
        >
          <X className="w-5 h-5 transition-transform group-hover/close:scale-110" />
        </button>
      </div>

      {/* Controls */}
      <div className="sticky top-[120px] z-10 border-b border-zinc-100/50 bg-white/80 backdrop-blur-xl px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 lg:max-w-md">
            <Search 
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" 
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                mode === "layoutOnly" 
                  ? "Search layouts (grid, hero, gallery...)" 
                  : "Search blocks, layouts, fields..."
              }
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-5 text-base placeholder-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 transition-all shadow-sm"
            />
          </div>

          {mode === "all" && showLayouts && (
            <div className="flex gap-2">
              <button
                onClick={() => {setActiveTab("layouts"); setSelectedCategory(null);}}
                className={`group flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeTab === "layouts"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl"
                    : "border border-zinc-200 bg-white/50 hover:bg-white shadow-sm"
                }`}
              >
                <Layers3 size={16} />
                {filteredLayoutGroups.length} Layouts
              </button>
              <button
                onClick={() => {setActiveTab("fields"); setSelectedCategory(null);}}
                className={`group flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeTab === "fields"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl"
                    : "border border-zinc-200 bg-white/50 hover:bg-white shadow-sm"
                }`}
              >
                <Type size={16} />
                {filteredFieldGroups.length} Fields
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="block-picker-body max-h-[calc(90vh-200px)] overflow-y-auto px-6 py-8">
        {showLayouts && activeTab === "layouts" && (
          <div className="space-y-8">
            {/* Category Filter */}
            {selectedCategory === null && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {[...new Set(productLayoutGroups.map((g: any) => g.category))].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all hover:shadow-md h-full"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center group-hover:from-emerald-200 group-hover:to-teal-200 shadow-sm">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-900 text-center leading-tight">{cat}</span>
                    <div className="text-[10px] text-zinc-500">{productLayoutGroups.find((g: any) => g.category === cat)?.variants?.length || 0}</div>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="col-span-full md:col-span-1 group flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all h-full"
                >
                  <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center group-hover:bg-zinc-200">
                    <Filter className="w-6 h-6 text-zinc-500" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-900">All Categories</span>
                </button>
              </div>
            )}

            {/* Layouts */}
            {filteredLayoutGroups.length ? (
              filteredLayoutGroups.map((group: any, groupIndex: number) => (
                <section key={group.label} className="block-picker-group">
                  <LayoutCategoryHeader 
                    category={group.label} 
                    count={group.variants.length}
                    icon={Package}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {group.variants.map((variant: any, variantIndex: number) => (
                      <LayoutPreviewCard
                        key={variant.id}
                        title={variant.name}
                        description={variant.description}
                        variant={variant}
                        tags={variant.tags}
                        onClick={() => onPick(sectionId, variant.id)}
                        index={variantIndex}
                      />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="grid place-items-center rounded-3xl border-2 border-dashed border-zinc-200/50 bg-gradient-to-br from-zinc-50/80 to-white/60 backdrop-blur-xl p-16 text-center shadow-inner">
                <div className="w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-zinc-300/50 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Search className="w-10 h-10 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">No layouts match</h3>
                <p className="text-zinc-600 max-w-md mb-6">Try a different keyword or browse all categories above</p>
              </div>
            )}
          </div>
        )}

        {showFields && activeTab === "fields" && (
          <div className="space-y-8">
            {filteredFieldGroups.length ? (
              filteredFieldGroups.map((group: any) => (
                <section key={group.type} className="block-picker-group">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100">
                      <Type size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900">{group.label}</h4>
                      <span className="text-sm text-zinc-500">
                        {group.variants.filter((v: any) => v.kind === "block").length} blocks
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {group.variants
                      .filter((variant: any) => variant.kind === "block")
                      .map((variant: any) => (
                        <FieldCard
                          key={variant.id}
                          title={variant.name}
                          description={variant.description}
                          icon={Type}
                          onClick={() => onPick(sectionId, group.type)}
                        />
                      ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="grid place-items-center rounded-3xl border-2 border-dashed border-zinc-200/50 bg-gradient-to-br from-zinc-50/80 to-white/60 backdrop-blur-xl p-16 text-center shadow-inner">
                <div className="w-20 h-20 bg-gradient-to-br from-zinc-200/50 to-zinc-300/50 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Type className="w-10 h-10 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">No fields found</h3>
                <p className="text-zinc-600 max-w-md">Try searching for text, image, button, or other blocks</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}