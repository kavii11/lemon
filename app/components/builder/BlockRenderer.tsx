"use client";

import { Block } from "../store/builderStore";

export default function BlockRenderer({ block }: { block: Block }) {
  if (block.type === "text") {
    return (
      <div className="p-4 border border-zinc-700 rounded bg-zinc-800 text-white">
        {block.content}
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <div className="p-4 border border-zinc-700 rounded bg-zinc-800 text-white">
        Image Block
      </div>
    );
  }

  return null;
}
