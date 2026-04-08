"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useBuilder } from "@/app/lib/useBuilder";

const Canvas = dynamic(() => import("../canvas"), {
  ssr: false,
});

export default function CanvasWrapper() {
  const setBuilderType = useBuilder((s) => s.setBuilderType);

  useEffect(() => {
    setBuilderType("website");
  }, []);

  return <Canvas />;
}