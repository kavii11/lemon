"use client";

import { useBuilder } from "@/app/lib/builderStoreFinal";

export default function TopbarFinal() {
  const { undo, redo } = useBuilder();

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b">
      <div>Lemon Builder</div>
      <div className="flex gap-2">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
    </div>
  );
}
