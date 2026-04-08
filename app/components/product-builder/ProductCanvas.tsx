"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useBuilder } from "@/app/lib/useBuilder";
import { productLibrary } from "../productLibrary";

const Canvas = dynamic(() => import("../canvas"), { ssr: false });

export default function ProductCanvas() {
  const setBuilderType = useBuilder((s) => s.setBuilderType);
  const sectionsProduct = useBuilder((s) => s.sectionsProduct);
  const addVariantSection = useBuilder((s: any) => s.addVariantSection);

  useEffect(() => {
    setBuilderType("product");

    if (sectionsProduct.length === 0) {
      const defaultVariant = productLibrary?.[0]?.variants?.find(
        (variant: any) => variant.id === "standard-product"
      );

      if (defaultVariant) {
        addVariantSection(defaultVariant);
      }
    }
  }, [setBuilderType, sectionsProduct.length, addVariantSection]);

  return <Canvas />;
}