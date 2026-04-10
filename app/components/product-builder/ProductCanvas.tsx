"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useBuilder } from "@/app/lib/useBuilder";

const Canvas = dynamic(() => import("../canvas"), { ssr: false });

export default function ProductCanvas() {
  const setBuilderType = useBuilder((s: any) => s.setBuilderType);

  useEffect(() => {
    setBuilderType("product");
  }, [setBuilderType]);

  return <Canvas />;
}