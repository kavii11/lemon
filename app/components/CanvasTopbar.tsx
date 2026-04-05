"use client";

import {
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Undo2,
  Redo2,
  Download,
  Layers3,
} from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";

type Props = {
  onAddSection: () => void;
};

export default function CanvasTopbar({ onAddSection }: Props) {
  const currentDevice = useBuilder((s) => s.currentDevice);
  const setDevice = useBuilder((s) => s.setDevice);
  const undo = useBuilder((s) => s.undo);
  const redo = useBuilder((s) => s.redo);
  const exportData = useBuilder((s) => s.exportData);
  const sections = useBuilder((s) => s.sections);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "builder-layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="canvas-topbar">
      <div className="canvas-topbar-left">
        <div className="canvas-topbar-title">
          <span className="canvas-topbar-badge">
            <Layers3 size={14} />
            Canvas
          </span>
          <div className="canvas-topbar-meta">
            <strong>Page Builder</strong>
            <span>{sections.length} sections</span>
          </div>
        </div>
      </div>

      <div className="canvas-topbar-center">
        <div className="canvas-device-switcher">
          <button
            type="button"
            className={currentDevice === "desktop" ? "active" : ""}
            onClick={() => setDevice("desktop")}
            aria-label="Desktop view"
          >
            <Monitor size={16} />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            className={currentDevice === "tablet" ? "active" : ""}
            onClick={() => setDevice("tablet")}
            aria-label="Tablet view"
          >
            <Tablet size={16} />
            <span>Tablet</span>
          </button>

          <button
            type="button"
            className={currentDevice === "mobile" ? "active" : ""}
            onClick={() => setDevice("mobile")}
            aria-label="Mobile view"
          >
            <Smartphone size={16} />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      <div className="canvas-topbar-right">
        <button
          type="button"
          className="canvas-topbar-btn"
          onClick={undo}
          aria-label="Undo"
        >
          <Undo2 size={16} />
        </button>

        <button
          type="button"
          className="canvas-topbar-btn"
          onClick={redo}
          aria-label="Redo"
        >
          <Redo2 size={16} />
        </button>

        <button
          type="button"
          className="canvas-topbar-btn"
          onClick={handleExport}
        >
          <Download size={16} />
          <span>Export</span>
        </button>

        <button
          type="button"
          className="canvas-topbar-btn primary"
          onClick={onAddSection}
        >
          <Plus size={16} />
          <span>Add section</span>
        </button>
      </div>
    </div>
  );
}