"use client";

import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Download,
  Layers3,
} from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";

function getDeviceFrameLabel(device: "desktop" | "tablet" | "mobile") {
  switch (device) {
    case "mobile":
      return "390 × 844";
    case "tablet":
      return "820 × 1180";
    case "desktop":
    default:
      return "1280 × 800";
  }
}

export default function CanvasTopbar() {
  const currentDevice = useBuilder((s: any) => s.currentDevice);
  const setDevice = useBuilder((s: any) => s.setDevice);
  const undo = useBuilder((s: any) => s.undo);
  const redo = useBuilder((s: any) => s.redo);
  const exportData = useBuilder((s: any) => s.exportData);
  const sections = useBuilder((s: any) => s.sections);
  const builderType = useBuilder((s: any) => s.builderType);

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
    <div className="canvas-topbar-wrap">
      <div className="canvas-topbar">
        <div className="canvas-topbar-left">
          <div className="canvas-topbar-title">
            <span className="canvas-topbar-badge">
              <Layers3 size={14} />
              Canvas
            </span>

            <div className="canvas-topbar-meta">
              <strong>
                {builderType === "product" ? "Product Builder" : "Website Builder"}
              </strong>
              <span>{sections.length} section(s)</span>
            </div>
          </div>
        </div>

        <div className="canvas-topbar-center">
          <div className="canvas-device-group">
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

            <span className="canvas-device-size" aria-label="Current canvas size">
              {getDeviceFrameLabel(currentDevice)}
            </span>
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
            className="canvas-topbar-btn canvas-topbar-btn-export"
            onClick={handleExport}
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}