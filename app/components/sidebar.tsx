"use client";

import { useDraggable } from "@dnd-kit/core";
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
} from "lucide-react";

const sections = [
  {
    title: "Layout",
    items: [
      { name: "section", icon: Layout },
      { name: "container", icon: Square },
      { name: "2col", icon: Columns },
      { name: "3col", icon: Columns },
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
    ],
  },
  {
    title: "Website Sections",
    items: [
      { name: "navbar", icon: Layout },
      { name: "hero", icon: Layout },
      { name: "features", icon: Layout },
      { name: "footer", icon: Layout },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      { name: "product", icon: ShoppingCart },
      { name: "productlist", icon: ShoppingCart },
      { name: "cart", icon: ShoppingCart },
    ],
  },
  {
    title: "Blog",
    items: [
      { name: "blog", icon: FileText },
      { name: "paragraph", icon: FileText },
      { name: "imageblock", icon: Image },
    ],
  },
  {
    title: "Forms",
    items: [
      { name: "input", icon: FormInput },
      { name: "textarea", icon: FormInput },
      { name: "submit", icon: Square },
    ],
  },
];

function DragItem({ type, Icon, label }: any) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: type,
    data: { type },
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

export default function Sidebar() {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[20%] bg-white border-r flex flex-col">

      {/* 🔝 Brand (UNCHANGED) */}
      <div className="flex items-center justify-center gap-2 py-3 border-b border-yellow-100">
        <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
        <span className="font-semibold text-gray-800">
          lemon<span className="text-yellow-500">oid</span>
        </span>
      </div>

      {/* 🔥 Scrollable Builder Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {sections.map((section, i) => (
          <div key={i}>
            
            <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              {section.title}
            </h3>

            {/* 3 Column Grid */}
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

      {/* 🔻 Bottom Links (UNCHANGED) */}
      <div className="p-4 space-y-2 text-right">
        <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition underline-offset-4 hover:underline">
          Guide
        </p>
        <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition underline-offset-4 hover:underline">
          How to use?
        </p>
      </div>

    </aside>
  );
}
