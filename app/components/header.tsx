"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Header() {
  const [open, setOpen] = useState(false);

  const menuClass = `${inter.className} text-[14px] font-medium text-zinc-600 hover:text-yellow-500 transition`;

  return (
    <nav className="fixed top-2 bg-[#fefefc] border-b border-black left-0 w-full z-50 flex justify-center h-14">

      {/* FLOATING CONTAINER */}
      <div className="w-[95%] max-w-7xl h-12 px-6 flex items-center justify-between
        rounded-xl backdrop-blur-xl bg-white/70
        border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">

        {/* LEFT */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className={menuClass}>Home</a>
          <a href="#" className={menuClass}>Products</a>
          <button className="px-4 py-1.5 text-[13px] font-semibold rounded-full
            bg-gradient-to-r from-yellow-300 to-yellow-400 text-zinc-900
            shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
            Products management
          </button>
        </div>

        {/* LOGO CENTER */}
        {/* LOGO CENTER */}
<div className="flex items-center justify-center gap-2">

  {/* Lemon Icon */}
  <img 
    src="/LogoLemon.png"
    alt="Lemon Icon"
    className="h-10 w-auto object-contain"
    draggable="false"
  />

  {/* Brand Name */}
  <img 
    src="/Brandname.png"
    alt="Brand Name"
    className="h-4 w-auto object-contain"
    draggable="false"
  />

</div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className={menuClass}>About</a>

          <button className="px-4 py-1.5 text-[13px] font-semibold rounded-full
            bg-gradient-to-r from-yellow-300 to-yellow-400 text-zinc-900
            shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
            Get Started
          </button>
        </div>

        {/* MOBILE */}
        <div
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="w-5 h-[2px] bg-zinc-800"></span>
          <span className="w-5 h-[2px] bg-zinc-800"></span>
          <span className="w-5 h-[2px] bg-zinc-800"></span>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-14 w-[95%] max-w-7xl bg-white rounded-xl shadow-lg border p-4 space-y-3">
          <a href="#" className="block text-sm font-medium text-zinc-800">Home</a>
          <a href="#" className="block text-sm font-medium text-zinc-800">Products</a>
          <a href="#" className="block text-sm font-medium text-zinc-800">About</a>

          <button className="w-full mt-2 px-4 py-2 rounded-full bg-yellow-400 font-semibold">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}