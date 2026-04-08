"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useBuilder } from "@/app/lib/useBuilder";

type DropInfo = {
  sectionId: string;
  index: number;
} | null;

export default function DndProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [dropInfo, setDropInfo] = useState<DropInfo>(null);

  const { sections, addBlock, moveBlock } = useBuilder();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  if (!mounted) return null;

  const handleDragOver = (event: any) => {
    const { over } = event;

    if (!over) {
      setDropInfo(null);
      return;
    }

    const overId = String(over.id);

    // ✅ Drop on empty section
    if (overId.startsWith("section-drop-")) {
      const sectionId = overId.replace("section-drop-", "");
      const section = sections.find((s: any) => s.id === sectionId);

      setDropInfo({
        sectionId,
        index: section?.blocks?.length ?? 0,
      });
      return;
    }

    // ✅ Drop between blocks
    for (const section of sections || []) {
      const blockIndex = (section.blocks || []).findIndex(
        (block: any) => String(block.id) === overId
      );

      if (blockIndex !== -1) {
        setDropInfo({
          sectionId: section.id,
          index: blockIndex,
        });
        return;
      }
    }

    setDropInfo(null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || !dropInfo) {
      setDropInfo(null);
      return;
    }

    const activeData = active.data?.current || {};
    const source = activeData.source;
    const type = activeData.type;
    const activeId = String(active.id);
    const overId = String(over.id);

    // ✅ HANDLE SIDEBAR (website + product)
    if ((source === "sidebar" || source === "product-sidebar") && type) {
      addBlock(dropInfo.sectionId, type, dropInfo.index);
      setDropInfo(null);
      return;
    }

    // ✅ HANDLE CANVAS DRAG (reorder)
    if (source === "canvas") {
      moveBlock(dropInfo.sectionId, activeId, overId);
      setDropInfo(null);
      return;
    }

    setDropInfo(null);
  };

  const handleDragCancel = () => {
    setDropInfo(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
    </DndContext>
  );
}