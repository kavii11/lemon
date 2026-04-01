"use client";

export default function BlockPicker({ onSelect }: any) {
  return (
    <div className="absolute bg-white shadow-xl border rounded-lg p-3 w-60 z-50">

      {/* TEXT */}
      <button
        onClick={() => onSelect("text")}
        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
      >
        Text
      </button>

      {/* IMAGE */}
      <button
        onClick={() => onSelect("image")}
        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
      >
        Image
      </button>

      {/* BACKGROUND */}
      <div className="group relative">
        <div className="px-3 py-2 hover:bg-gray-100 flex justify-between cursor-pointer">
          Background →
        </div>

        <div className="absolute left-full top-0 hidden group-hover:block bg-white border shadow p-2 w-40">
          <button onClick={() => onSelect("bg-color")} className="block w-full text-left p-2 hover:bg-gray-100">Color</button>
          <button onClick={() => onSelect("bg-image")} className="block w-full text-left p-2 hover:bg-gray-100">Image</button>
          <button onClick={() => onSelect("bg-gradient")} className="block w-full text-left p-2 hover:bg-gray-100">Gradient</button>
        </div>
      </div>

      {/* HEADING */}
      <div className="group relative">
        <div className="px-3 py-2 hover:bg-gray-100 flex justify-between cursor-pointer">
          Heading →
        </div>

        <div className="absolute left-full top-0 hidden group-hover:block bg-white border shadow p-2 w-40">
          <button onClick={() => onSelect("h1")} className="block w-full text-left p-2 hover:bg-gray-100">H1</button>
          <button onClick={() => onSelect("h2")} className="block w-full text-left p-2 hover:bg-gray-100">H2</button>
          <button onClick={() => onSelect("h3")} className="block w-full text-left p-2 hover:bg-gray-100">H3</button>
        </div>
      </div>

      {/* BORDER */}
      <div className="group relative">
        <div className="px-3 py-2 hover:bg-gray-100 flex justify-between cursor-pointer">
          Border →
        </div>

        <div className="absolute left-full top-0 hidden group-hover:block bg-white border shadow p-2 w-40">
          <button onClick={() => onSelect("radius")} className="block w-full text-left p-2 hover:bg-gray-100">Radius</button>
          <button onClick={() => onSelect("border")} className="block w-full text-left p-2 hover:bg-gray-100">Border</button>
        </div>
      </div>

    </div>
  );
}