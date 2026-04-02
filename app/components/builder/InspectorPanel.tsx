"use client";

import React from "react";
import { useBuilder } from "@/app/lib/builderStore";

export default function InspectorPanel() {
  const { sections } = useBuilder();

  // simple selection (temporary logic)
  const selectedBlock = sections[0]?.blocks[0];

  if (!selectedBlock) {
    return (
      <div className="w-72 bg-white border-l p-4">No selection</div>
    );
  }

  return (
    <div className="w-72 bg-white border-l p-4 space-y-4">
      <h2 className="font-semibold">Inspector</h2>

      <div>
        <label className="text-sm">Block Type</label>
        <div className="text-xs text-gray-500">{selectedBlock.type}</div>
      </div>

      <div>
        <label className="text-sm">Padding</label>
        <input
          type="number"
          className="w-full border p-1 rounded"
          placeholder="e.g. 20"
        />
      </div>

      <div>
        <label className="text-sm">Margin</label>
        <input
          type="number"
          className="w-full border p-1 rounded"
          placeholder="e.g. 20"
        />
      </div>

      <div>
        <label className="text-sm">Background</label>
        <input
          type="color"
          className="w-full h-10"
        />
      </div>
    </div>
  );
}
