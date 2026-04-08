"use client";

import { useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import ComponentVariantCard from "./ComponentVariantCard";

export default function ComponentLibraryModal({
  item,
  open,
  onClose,
  onInsertVariant,
}: {
  item: any;
  open: boolean;
  onClose: () => void;
  onInsertVariant: (variant: any) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!item) return [];
    return item.variants.filter((v: any) =>
      `${v.name} ${v.description}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [item, query]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm">
      <div className="absolute left-[22%] top-20 h-[calc(100vh-6rem)] w-[72%] overflow-hidden rounded-2xl border bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{item.label}</h2>
            <p className="text-sm text-zinc-500">{item.description}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-2 hover:bg-zinc-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b px-5 py-3">
          <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
            <Search className="h-4 w-4 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search variants..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid h-[calc(100%-9rem)] grid-cols-3 gap-4 overflow-y-auto p-5">
          {filtered.map((variant: any) => (
            <ComponentVariantCard
              key={variant.id}
              type={item.type}
              variant={variant}
              onInsert={() => onInsertVariant(variant)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}