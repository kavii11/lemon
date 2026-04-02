"use client";

export default function BlockRendererFinal({ block }: any) {
  const style = {
    padding: block.style?.padding,
    margin: block.style?.margin,
    background: block.style?.background,
    color: block.style?.color,
  } as React.CSSProperties;

  switch (block.type) {
    case "navbar":
      return <div style={style} className="bg-black text-white p-4">Navbar</div>;
    case "hero":
      return <div style={style} className="p-10 bg-yellow-100">Hero Section</div>;
    case "footer":
      return <div style={style} className="bg-black text-white p-4">Footer</div>;
    default:
      return <div style={style}>Block</div>;
  }
}
