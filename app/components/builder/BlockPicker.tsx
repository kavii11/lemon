"use client";

import { useBuilderStore } from "../store/builderStore";

export default function BlockPicker({
  sectionId,
  index,
}: {
  sectionId: string;
  index?: number;
}) {
  const addBlock = useBuilderStore((s) => s.addBlock);

  return (
    <div className="flex gap-2 my-2">
      <button
        onClick={() => addBlock(sectionId, "text", index)}
        className="px-3 py-1 bg-yellow-500 text-black rounded"
      >
        + Text
      </button>

      <button
        onClick={() => addBlock(sectionId, "image", index)}
        className="px-3 py-1 bg-yellow-500 text-black rounded"
      >
        + Image
      </button>
    </div>
  );
}
