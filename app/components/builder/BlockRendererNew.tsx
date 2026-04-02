"use client";

import { Block } from "@/app/lib/builderStore";

export default function BlockRendererNew({ block }: { block: Block }) {
  switch (block.type) {
    case "navbar":
      return <div className="p-4 bg-black text-white">Navbar</div>;
    case "hero":
      return (
        <div className="p-10 bg-yellow-100 text-center">
          <h1 className="text-3xl font-bold">Hero Section</h1>
        </div>
      );
    case "footer":
      return <div className="p-4 bg-black text-white">Footer</div>;
    case "text":
      return <p>Text Block</p>;
    default:
      return <div>Block</div>;
  }
}
