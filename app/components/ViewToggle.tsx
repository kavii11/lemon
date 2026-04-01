"use client";

import { useState } from "react";

export default function ViewToggle() {
  const [mode, setMode] = useState("desktop");

  return (
    <div className="fixed top-20 right-4 z-50 bg-white border p-2 rounded shadow">
      <button onClick={() => setMode("desktop")}>Desktop</button>
      <button onClick={() => setMode("mobile")}>Mobile</button>
    </div>
  );
}