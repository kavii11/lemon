"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical, Plus } from "lucide-react";

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
      className={`rounded-xl border bg-white p-4 transition ${
        isDragging ? "opacity-50 scale-[0.98]" : "hover:shadow-md"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">{variant.name}</h4>
          <p className="mt-1 text-xs text-zinc-500">{variant.description}</p>
        </div>

        <button
          type="button"
          {...listeners}
          {...attributes}
          className="rounded-md border p-2 text-zinc-500 hover:bg-zinc-50"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4 min-h-[84px] rounded-lg border border-dashed bg-zinc-50 p-3 text-xs text-zinc-400">
        {variant.preview || "Variant preview"}
      </div>

      <button
        type="button"
        onClick={onInsert}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-3 py-2 text-sm font-medium text-black hover:bg-yellow-300"
      >
        <Plus className="h-4 w-4" />
        Add variant
      </button>
    </div>
  );
}