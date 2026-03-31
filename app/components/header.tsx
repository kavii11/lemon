"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Header() {
  const [open, setOpen] = useState(false);

  const menuClass = `${inter.className} text-[15px] font-semibold text-zinc-700 hover:text-yellow-500 transition`;

  return (
    <nav className="sticky top-0 w-full h-16 z-50 backdrop-blur-xl border-b border-black-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center relative">

        {/* CENTER EVERYTHING */}
        <div className="flex items-center gap-10 text-lg font-semibold text-zinc-900">

          {/* Left Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className={menuClass}>Home</a>
            <a href="#" className={menuClass}>Products</a>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2 mx-8">
            <div className="flex items-center justify-center  shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 64 64" fill="none">
                <ellipse cx="32" cy="36" rx="18" ry="12" fill="#FFF3BF" />
                <path
                  d="M32 12 C36 6, 46 10, 42 18 C38 14, 34 16, 32 12 Z"
                  fill="#69DB7C"
                />
              </svg>
            </div>

            <span>
              lemon<span className="text-yellow-500">oid</span>
            </span>
          </div>

          {/* Right Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className={menuClass}>About</a>

            <button className="px-5 py-2 text-[15px] font-semibold rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400 text-zinc-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
              Get Started
            </button>
          </div>

        </div>

        {/* Mobile Button */}
        <div
          className="md:hidden absolute right-6 flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-[2px] bg-zinc-800"></span>
          <span className="w-6 h-[2px] bg-zinc-800"></span>
          <span className="w-6 h-[2px] bg-zinc-800"></span>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-yellow-50 px-6 pb-5 pt-3 space-y-4 border-t border-yellow-100">
          <a href="#" className={`${inter.className} block text-[16px] font-semibold text-zinc-800`}>Home</a>
          <a href="#" className={`${inter.className} block text-[16px] font-semibold text-zinc-800`}>Products</a>
          <a href="#" className={`${inter.className} block text-[16px] font-semibold text-zinc-800`}>About</a>

          <button className="w-full mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400 font-semibold text-zinc-900">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}