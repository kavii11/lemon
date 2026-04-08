"use client";

import { LayoutDashboard, ShoppingBag, Globe, FileText } from "lucide-react";

export default function PrimarySidebar({ active, setActive }: any) {
  return (
    <div className="w-full h-full flex flex-col items-center py-4 gap-4">

      <Item icon={LayoutDashboard} id="dashboard" active={active} setActive={setActive} />
      <Item icon={Globe} id="website" active={active} setActive={setActive} />
      <Item icon={ShoppingBag} id="products" active={active} setActive={setActive} />
      <Item icon={FileText} id="blog" active={active} setActive={setActive} />

    </div>
  );
}

function Item({ icon: Icon, id, active, setActive }: any) {
  return (
    <button
      onClick={() => setActive(id)}
      className={`p-3 rounded-md ${
        active === id ? "bg-yellow-500 text-black" : "hover:bg-zinc-800"
      }`}
    >
      <Icon size={16} />
    </button>
  );
}