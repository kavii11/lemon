"use client";

import { useBuilder } from "../../lib/useBuilder";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductLayoutRendererProps {
  variant: any;
}

export default function ProductLayoutRenderer({ variant }: ProductLayoutRendererProps) {
  const { currentDevice } = useBuilder();

  if (!variant?.sections) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-500">
        No layout data
      </div>
    );
  }

  return (
    <div className="w-full space-y-16">
      {variant.sections.map((section: any, sectionIdx: number) => (
        <section key={section.id || `section-${sectionIdx}`} className="w-full">
          {section.regions?.map((region: any, regionIdx: number) => (
            <div
              key={region.id || `region-${regionIdx}`}
              className={`grid gap-8 ${getGridClass(region.grid || section.layout || "2-cols")}`}
            >
              {region.blocks?.map((block: any, blockIdx: number) => (
                <LayoutBlock
                  key={block.id || `block-${blockIdx}`}
                  block={block}
                  device={currentDevice}
                />
              ))}
            </div>
          ))}
          {!section.regions &&
            section.blocks?.map((block: any, blockIdx: number) => (
              <LayoutBlock
                key={block.id || `block-${blockIdx}`}
                block={block}
                device={currentDevice}
              />
            ))}
        </section>
      ))}
    </div>
  );
}

function LayoutBlock({ block, device }: { block: any; device: string }) {
  const style = block.props?.style?.[device] || {};
  const blockStyle = {
    width: style.width || "100%",
    minHeight: style.minHeight || "300px",
    ...style,
  };

  switch (block.type) {
    case "hero":
    case "hero-section":
      return <HeroBlock {...block.props} style={blockStyle} />;
    case "product":
    case "product-card":
      return <ProductCardBlock {...block.props} style={blockStyle} />;
    case "product-list":
    case "product-grid":
      return <ProductGridBlock {...block.props} style={blockStyle} />;
    case "features":
    case "feature-list":
      return <FeaturesBlock {...block.props} style={blockStyle} />;
    case "stats":
      return <StatsBlock {...block.props} style={blockStyle} />;
    case "image":
    case "image-block":
      return <ImageBlock {...block.props} style={blockStyle} />;
    case "heading":
    case "title":
      return <HeadingBlock {...block.props} style={blockStyle} />;
    case "text":
    case "paragraph":
      return <TextBlock {...block.props} style={blockStyle} />;
    case "button":
      return <ButtonBlock {...block.props} style={blockStyle} />;
    default:
      return <GenericBlock {...block.props} style={blockStyle} />;
  }
}

// Grid layout utilities
function getGridClass(layout: string): string {
  const classes: Record<string, string> = {
    "1-col": "grid-cols-1",
    "2-cols": "grid-cols-1 lg:grid-cols-2",
    "3-cols": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    "split": "grid-cols-1 lg:grid-cols-2",
    default: "grid-cols-1 lg:grid-cols-2",
  };
  return classes[layout] || classes.default;
}

// Block renderers
function HeroBlock({ title, subtitle, description, image, src, buttons, style }: any) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      style={style}
    >
      {/* Left: Image */}
      <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden bg-zinc-50">
        <Image
          src={image || src || "https://picsum.photos/800/600?hero"}
          alt={title || "Hero image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      {/* Right: Content */}
      <div className="space-y-6">
        {title && (
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-800 to-black bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
        )}
        {(subtitle || description) && (
          <p className="text-xl text-zinc-600 max-w-lg leading-relaxed">
            {subtitle || description}
          </p>
        )}
        {buttons?.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((btn: any, idx: number) => (
              <button
                key={idx}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
                  btn.variant === "secondary"
                    ? "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 shadow-sm"
                    : "bg-zinc-900 text-white hover:bg-black shadow-lg hover:shadow-xl"
                }`}
              >
                {btn.label || "Get Started"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCardBlock({ title, price, src, image, description, style }: any) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:shadow-zinc-500/10 transition-all duration-300"
      style={style}
    >
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100">
        <Image
          src={image || src || "https://picsum.photos/400/300"}
          alt={title || "Product"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="300px"
        />
      </div>
      <div className="p-6">
        {title && (
          <h3 className="font-semibold text-lg text-zinc-900 mb-2 group-hover:text-zinc-950">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-zinc-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        {price && (
          <div className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-black bg-clip-text text-transparent">
            ${price}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductGridBlock({ title, products, style }: any) {
  return (
    <div className="space-y-8 text-center" style={style}>
      {title && (
        <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(products || []).map((product: any, idx: number) => (
          <ProductCardBlock key={idx} {...product} />
        ))}
      </div>
    </div>
  );
}

function FeaturesBlock({ title, features, style }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={style}>
      {(features || []).map((feature: any, idx: number) => (
        <div key={idx} className="group p-8 rounded-2xl border border-zinc-200 bg-white hover:shadow-xl hover:shadow-zinc-500/10 transition-all">
          <div className="w-16 h-16 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-2xl font-bold text-white">{idx + 1}</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 mb-3">{feature.text || feature.title}</h3>
          <p className="text-zinc-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

function StatsBlock({ stats, title, style }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" style={style}>
      {title && (
        <h2 className="col-span-full text-3xl font-bold text-center text-zinc-900 mb-12">
          {title}
        </h2>
      )}
      {(stats || []).map((stat: any, idx: number) => (
        <div key={idx} className="text-center p-8 rounded-2xl bg-gradient-to-b from-white to-zinc-50 border border-zinc-200 shadow-sm hover:shadow-lg transition-all">
          <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-zinc-900 to-black bg-clip-text text-transparent mb-2">
            {stat.value}
          </div>
          <div className="text-zinc-600 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function ImageBlock({ src, alt, title, description, style }: any) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg" style={style}>
      <Image
        src={src || "https://picsum.photos/800/500"}
        alt={alt || "Image"}
        fill
        className="object-cover"
        sizes="100vw"
      />
      {(title || description) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end">
          {title && <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>}
          {description && <p className="text-zinc-200 max-w-md">{description}</p>}
        </div>
      )}
    </div>
  );
}

function HeadingBlock({ content, title, style }: any) {
  return (
    <div className="text-center" style={style}>
      <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-zinc-900 via-zinc-800 to-black bg-clip-text text-transparent leading-tight">
        {content || title}
      </h1>
    </div>
  );
}

function TextBlock({ content, style }: any) {
  return (
    <div className="max-w-4xl mx-auto text-center" style={style}>
      <p className="text-xl lg:text-2xl text-zinc-700 leading-relaxed">
        {content}
      </p>
    </div>
  );
}

function ButtonBlock({ content, href, style }: any) {
  return (
    <a
      href={href}
      className="inline-flex px-12 py-6 bg-zinc-900 text-white text-xl font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:bg-black transition-all duration-300 hover:-translate-y-1"
      style={style}
    >
      {content || "Get Started"}
    </a>
  );
}

function GenericBlock({ title, content, style }: any) {
  return (
    <div
      className="p-12 rounded-3xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100 border border-zinc-200 shadow-xl"
      style={style}
    >
      {title && (
        <h3 className="text-3xl font-bold text-zinc-900 mb-6">{title}</h3>
      )}
      {content && (
        <p className="text-xl text-zinc-700 leading-relaxed max-w-2xl">{content}</p>
      )}
    </div>
  );
}