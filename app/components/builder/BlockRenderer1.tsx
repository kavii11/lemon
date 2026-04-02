"use client";

export default function BlockRenderer1({ block }: { block: any }) {
  switch (block.type) {
    case "navbar":
      return (
        <div className="bg-black text-white p-4 rounded">
          Navbar
        </div>
      );

    case "hero":
      return (
        <div className="bg-yellow-100 p-10 rounded text-center">
          <h1 className="text-2xl font-bold">Hero Section</h1>
          <p className="text-sm mt-2">This is a hero block</p>
        </div>
      );

    case "text":
      return (
        <div className="p-4">
          <p>Text Block</p>
        </div>
      );

    case "button":
      return (
        <div className="p-4">
          <button className="bg-yellow-500 px-4 py-2 rounded">
            Button
          </button>
        </div>
      );

    case "footer":
      return (
        <div className="bg-black text-white p-4 rounded">
          Footer
        </div>
      );

    default:
      return <div>Block</div>;
  }
}
