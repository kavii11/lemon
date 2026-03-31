"use client";

import { Plus } from "lucide-react";

export default function Canvas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">

      {/* 🔲 HEADER SECTION */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center mb-6 bg-white/60 hover:border-yellow-400 transition">
        
        <Plus className="w-6 h-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">Add Header Section</p>

      </div>

      {/* 🔲 HERO SECTION */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center mb-6 bg-white/60 hover:border-yellow-400 transition">
        
        <Plus className="w-6 h-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">Add Hero Section</p>

      </div>

      {/* 🔲 CONTENT SECTION */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center mb-6 bg-white/60 hover:border-yellow-400 transition">
        
        <Plus className="w-6 h-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">Add Content Section</p>

      </div>

      {/* 🔲 FOOTER SECTION */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center bg-white/60 hover:border-yellow-400 transition">
        
        <Plus className="w-6 h-6 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500">Add Footer Section</p>

      </div>

    </div>
  );
}