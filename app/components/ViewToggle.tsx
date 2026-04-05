"use client";

import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";

export default function ViewToggle() {
  const currentDevice = useBuilder((s) => s.currentDevice);
  const setDevice = useBuilder((s) => s.setDevice);

  const items = [
    { value: "desktop", label: "Desktop", icon: Monitor },
    { value: "tablet", label: "Tablet", icon: Tablet },
    { value: "mobile", label: "Mobile", icon: Smartphone },
  ] as const;

  return (
    <div className="view-toggle">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            type="button"
            className={currentDevice === item.value ? "active" : ""}
            onClick={() => setDevice(item.value)}
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}