"use client";

import { useDraggable } from "@dnd-kit/core";
import { Inter } from "next/font/google";
import {
  Layout,
  Type,
  Image,
  Square,
  Columns,
  ShoppingCart,
  FileText,
  FormInput,
  Video,
  Layers,
  Grid,
  List,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
});

// 🔥 FULL BUILDER LIBRARY
const sections = [
  {
    title: "Layout",
    items: [
      { name: "section", icon: Layout },
      { name: "container", icon: Square },
      { name: "grid", icon: Grid },
      { name: "2-columns", icon: Columns },
      { name: "3-columns", icon: Columns },
      { name: "stack", icon: Layers },
    ],
  },
  {
    title: "Basic",
    items: [
      { name: "text", icon: Type },
      { name: "heading", icon: Type },
      { name: "button", icon: Square },
      { name: "image", icon: Image },
      { name: "video", icon: Video },
      { name: "list", icon: List },
    ],
  },
  {
    title: "Sections",
    items: [
      { name: "navbar", icon: Layout },
      { name: "hero", icon: Layout },
      { name: "features", icon: Layout },
      { name: "pricing", icon: Layout },
      { name: "testimonials", icon: Layout },
      { name: "cta", icon: Layout },
      { name: "footer", icon: Layout },
    ],
  },
  {
    title: "Forms",
    items: [
      { name: "input", icon: FormInput },
      { name: "textarea", icon: FormInput },
      { name: "select", icon: FormInput },
      { name: "checkbox", icon: FormInput },
      { name: "submit", icon: Square },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      { name: "product", icon: ShoppingCart },
      { name: "product-list", icon: ShoppingCart },
      { name: "cart", icon: ShoppingCart },
      { name: "checkout", icon: ShoppingCart },
    ],
  },
  {
    title: "Blog",
    items: [
      { name: "blog-list", icon: FileText },
      { name: "blog-post", icon: FileText },
      { name: "paragraph", icon: FileText },
      { name: "image-block", icon: Image },
    ],
  },
];

// 🔥 DRAG ITEM
function DragItem({ type, Icon, label }: any) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${type}-${crypto.randomUUID()}`, // ✅ unique
    data: {
      type,
      source: "sidebar",
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg cursor-grab
      bg-gray-50 hover:bg-yellow-100 active:scale-95 transition border text-center"
    >
      <Icon className="w-5 h-5 text-yellow-500" />
      <span className="text-[11px] font-medium text-gray-700 leading-tight">
        {label}
      </span>
    </div>
  );
}

// 🔥 MAIN SIDEBAR
export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[20%] bg-white border-r flex flex-col">

      {/* 🔝 BRAND (RESTORED ✅) */}
      <div className="flex items-center justify-center gap-2 py-3">
        <img
          src="/LogoLemon.png"
          alt="Logo"
          className="h-8 object-contain"
          draggable="false"
        />
        <p className={`${inter.className} text-[15px] font-semibold text-zinc-800`}>
          Dashboard
        </p>
      </div>

      <div className="border-t" />

      {/* 🔥 COMPONENT LIBRARY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {sections.map((section, i) => (
          <div key={i}>
            <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">
              {section.title}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {section.items.map((item, idx) => (
                <DragItem
                  key={idx}
                  type={item.name}
                  Icon={item.icon}
                  label={item.name}
                />
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* 🔻 FOOTER (RESTORED ✅) */}
      <div className="border-t p-4 space-y-2 text-right">
        <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
          Guide
        </p>
        <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
          How to use?
        </p>
      </div>

    </aside>
  );
}