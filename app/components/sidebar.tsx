"use client";

import { useState } from "react";
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
      { name: "Section", icon: Layout },
      { name: "Container", icon: Square },
      { name: "2 Columns", icon: Columns },
      { name: "3 Columns", icon: Columns },
    ],
  },
  {
    title: "Basic",
    items: [
      { name: "Text", icon: Type },
      { name: "Heading", icon: Type },
      { name: "Button", icon: Square },
      { name: "Image", icon: Image },
      { name: "Video", icon: Video },
    ],
  },
  {
    title: "Website Sections",
    items: [
      { name: "Navbar", icon: Layout },
      { name: "Hero", icon: Layout },
      { name: "Features", icon: Layout },
      { name: "Footer", icon: Layout },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      { name: "Product Card", icon: ShoppingCart },
      { name: "Product List", icon: ShoppingCart },
      { name: "Cart", icon: ShoppingCart },
    ],
  },
  {
    title: "Blog",
    items: [
      { name: "Blog Post", icon: FileText },
      { name: "Paragraph", icon: FileText },
      { name: "Image Block", icon: Image },
    ],
  },
  {
    title: "Forms",
    items: [
      { name: "Input", icon: FormInput },
      { name: "Textarea", icon: FormInput },
      { name: "Submit Button", icon: Square },
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[20%] bg-white border-r flex flex-col">

      {/* 🔝 Brand (unchanged) */}
      <div className="flex items-center justify-center gap-2 py-3 border-b border-yellow-100">
        <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
        <span className="font-semibold text-gray-800">
          lemon<span className="text-yellow-500">oid</span>
        </span>
      </div>

      {/* 🔥 Scrollable middle */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {sections.map((section, i) => (
          <div key={i}>
            
            {/* Section Title */}
            <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              {section.title}
            </h3>

            {/* ✅ 3-column grid */}
            <div className="grid grid-cols-3 gap-3">
              {section.items.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <div
                    key={idx}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("type", item.name)
                    }
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg cursor-grab
                    bg-gray-50 hover:bg-yellow-100 transition border text-center"
                  >
                    <Icon className="w-5 h-5 text-yellow-500" />
                    <span className="text-[11px] font-medium text-gray-700 leading-tight">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

      {/* 🔻 Bottom links (unchanged) */}
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