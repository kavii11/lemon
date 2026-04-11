"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical, Plus, Sparkles } from "lucide-react";

function PreviewMiniature({ variant }: { variant: any }) {
  const tone = variant?.preview?.tone ?? "default";
  const frame = variant?.preview?.frame ?? "stack";
  const density = variant?.preview?.density ?? "balanced";
  const highlights = variant?.preview?.highlights ?? [];

  const toneMap: Record<string, string> = {
    classic: "from-slate-100 via-white to-slate-50",
    minimal: "from-zinc-50 via-white to-zinc-100",
    modern: "from-blue-50 via-white to-indigo-50",
    visual: "from-fuchsia-50 via-white to-rose-50",
    editorial: "from-stone-100 via-white to-amber-50",
    premium: "from-neutral-100 via-white to-yellow-50",
    conversion: "from-lime-50 via-white to-emerald-50",
    catalog: "from-sky-50 via-white to-slate-50",
    "featured-catalog": "from-violet-50 via-white to-slate-50",
    "editorial-catalog": "from-orange-50 via-white to-stone-50",
    supportive: "from-cyan-50 via-white to-slate-50",
    "trust-led": "from-emerald-50 via-white to-zinc-50",
    "content-led": "from-stone-50 via-white to-zinc-100",
    immersive: "from-slate-200 via-slate-50 to-white",
    "offer-led": "from-amber-50 via-white to-lime-50",
    utility: "from-slate-100 via-zinc-50 to-white",
    informative: "from-indigo-50 via-white to-sky-50",
    educational: "from-teal-50 via-white to-cyan-50",
  };

  const densityClass =
    density === "compact"
      ? "gap-1.5"
      : density === "airy"
      ? "gap-3"
      : "gap-2";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br ${
        toneMap[tone] ?? "from-zinc-50 via-white to-zinc-100"
      } p-3`}
    >
      <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/70 bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 shadow-sm">
        {frame.replace(/-/g, " ")}
      </div>

      <div className={`flex min-h-[148px] flex-col ${densityClass}`}>
        {frame.includes("split") || frame.includes("checkout") ? (
          <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-2">
            <div className="rounded-xl bg-zinc-900/90 shadow-sm" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 rounded bg-zinc-300" />
              <div className="h-5 w-24 rounded bg-zinc-800" />
              <div className="h-2.5 w-full rounded bg-zinc-200" />
              <div className="h-2.5 w-4/5 rounded bg-zinc-200" />
              <div className="mt-auto h-8 rounded-lg bg-lime-300" />
            </div>
          </div>
        ) : frame.includes("grid") || frame.includes("masonry") ? (
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="h-20 rounded-xl bg-zinc-900/90" />
            <div className="h-20 rounded-xl bg-white shadow-sm ring-1 ring-zinc-200" />
            <div className="h-14 rounded-xl bg-white shadow-sm ring-1 ring-zinc-200" />
            <div className="h-14 rounded-xl bg-zinc-100 ring-1 ring-zinc-200" />
          </div>
        ) : frame.includes("story") ||
          frame.includes("magazine") ||
          frame.includes("editorial") ? (
          <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-2">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 rounded bg-zinc-300" />
              <div className="h-5 w-20 rounded bg-zinc-900" />
              <div className="h-2.5 w-full rounded bg-zinc-200" />
              <div className="h-2.5 w-5/6 rounded bg-zinc-200" />
              <div className="h-8 w-24 rounded-lg bg-zinc-900 text-transparent" />
            </div>
            <div className="rounded-2xl bg-[linear-gradient(135deg,#111827,#6b7280)] shadow-sm" />
          </div>
        ) : frame.includes("gallery") || frame.includes("full-bleed") ? (
          <div className="flex h-full flex-col gap-2">
            <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#0f172a,#334155)]" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 rounded-lg bg-white shadow-sm ring-1 ring-zinc-200" />
              <div className="h-10 rounded-lg bg-zinc-100 ring-1 ring-zinc-200" />
              <div className="h-10 rounded-lg bg-zinc-200 ring-1 ring-zinc-200" />
            </div>
            <div className="h-8 rounded-lg bg-lime-300" />
          </div>
        ) : (
          <div className="flex h-full flex-col gap-2">
            <div className="h-20 rounded-2xl bg-zinc-900/90" />
            <div className="h-3 w-14 rounded bg-zinc-300" />
            <div className="h-5 w-24 rounded bg-zinc-800" />
            <div className="h-2.5 w-full rounded bg-zinc-200" />
            <div className="h-8 rounded-lg bg-lime-300" />
          </div>
        )}
      </div>

      {highlights?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {highlights.slice(0, 3).map((highlight: string) => (
            <span
              key={highlight}
              className="rounded-full border border-zinc-200 bg-white/85 px-2 py-1 text-[10px] font-medium text-zinc-600 shadow-sm"
            >
              {highlight.replace(/-/g, " ")}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ComponentVariantCard({
  type,
  variant,
  onInsert,
}: {
  type: string;
  variant: any;
  onInsert: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `variant-${type}-${variant.id}`,
    data: {
      source: "sidebar-variant",
      type,
      variantId: variant.id,
      variant,
      kind: variant.kind,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`group rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-200 ${
        isDragging
          ? "scale-[0.985] opacity-50"
          : "hover:-translate-y-0.5 hover:shadow-xl"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-zinc-900">
              {variant.name}
            </h4>
            {variant.preview?.tone ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                <Sparkles className="h-3 w-3" />
                {variant.preview.tone}
              </span>
            ) : null}
          </div>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
            {variant.description}
          </p>
        </div>

        <button
          type="button"
          {...listeners}
          {...attributes}
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900"
          title="Drag layout"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <PreviewMiniature variant={variant} />

      {!!variant.tags?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {variant.tags.slice(0, 4).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-[11px] text-zinc-400">
          {variant.kind === "multi-section" ? "Multi-section layout" : "Variant"}
        </div>

        <button
          type="button"
          onClick={onInsert}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Add layout
        </button>
      </div>
    </div>
  );
}