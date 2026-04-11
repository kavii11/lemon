"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import ComponentVariantCard from "./ComponentVariantCard";

type LibraryItem = {
  type: string;
  label: string;
  description?: string;
  category?: string;
  icon?: any;
  variants: any[];
};

export default function ComponentLibraryModal({
  item,
  open,
  onClose,
  onInsertVariant,
}: {
  item: LibraryItem | LibraryItem[] | null;
  open: boolean;
  onClose: () => void;
  onInsertVariant: (variant: any) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(0);

  const groups = useMemo(() => {
    if (!item) return [];
    return Array.isArray(item) ? item : [item];
  }, [item]);

  useEffect(() => {
    setActiveGroup(0);
    setQuery("");
  }, [item, open]);

  const currentGroup = groups[activeGroup] ?? null;

  const filteredVariants = useMemo(() => {
    if (!currentGroup) return [];

    const q = query.trim().toLowerCase();

    if (!q) return currentGroup.variants ?? [];

    return (currentGroup.variants ?? []).filter((variant: any) => {
      const haystack = [
        variant.name,
        variant.description,
        ...(variant.tags ?? []),
        variant.preview?.tone,
        variant.preview?.frame,
        ...(variant.preview?.highlights ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [currentGroup, query]);

  const allTags = useMemo(() => {
    if (!currentGroup?.variants) return [];
    const tagSet = new Set<string>();

    currentGroup.variants.forEach((variant: any) => {
      (variant.tags ?? []).forEach((tag: string) => tagSet.add(tag));
    });

    return Array.from(tagSet).slice(0, 10);
  }, [currentGroup]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 flex h-[88vh] w-[min(1200px,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
        <aside className="hidden w-[280px] shrink-0 border-r border-zinc-200 bg-zinc-50/80 md:flex md:flex-col">
          <div className="border-b border-zinc-200 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Layout Library
            </p>
            <h2 className="mt-2 text-lg font-semibold text-zinc-900">
              Product Layouts
            </h2>
            <p className="mt-1 text-sm leading-6 text-zinc-500">
              Browse layout groups and insert a ready-made structure into your builder.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-2">
              {groups.map((group, index) => {
                const Icon = group.icon;
                const isActive = index === activeGroup;

                return (
                  <button
                    key={group.type ?? index}
                    onClick={() => setActiveGroup(index)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                        : "border-transparent bg-white text-zinc-700 hover:border-zinc-200 hover:bg-zinc-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-xl p-2 ${
                          isActive
                            ? "bg-white/12 text-white"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {group.label}
                        </div>
                        <div
                          className={`mt-1 line-clamp-2 text-xs leading-5 ${
                            isActive ? "text-zinc-300" : "text-zinc-500"
                          }`}
                        >
                          {group.description}
                        </div>
                        <div
                          className={`mt-2 text-[11px] font-medium ${
                            isActive ? "text-zinc-300" : "text-zinc-400"
                          }`}
                        >
                          {group.variants?.length ?? 0} layouts
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-white">
          <div className="flex items-start justify-between border-b border-zinc-200 px-5 py-5">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold text-zinc-900">
                {currentGroup?.label}
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                {currentGroup?.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="ml-4 rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-b border-zinc-200 px-5 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <Search className="h-4 w-4 text-zinc-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search layouts, tags, tones, or patterns..."
                  className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>

              {allTags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {!filteredVariants.length ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 text-center">
                <div className="max-w-md px-6">
                  <h4 className="text-base font-semibold text-zinc-900">
                    No layouts found
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Try another keyword like grid, minimal, editorial, bundle, or featured.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredVariants.map((variant: any) => (
                  <ComponentVariantCard
                    key={variant.id}
                    type={currentGroup?.type}
                    variant={variant}
                    onInsert={() => onInsertVariant(variant)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}