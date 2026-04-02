"use client";

import { useBuilder } from "@/app/lib/builderStore2";

function renderBlock(b:any){
 const style = `
  padding:${b.style?.padding||0}px;
  margin:${b.style?.margin||0}px;
  background:${b.style?.background||"transparent"};
  color:${b.style?.color||"#000"};
 `;

 switch(b.type){
  case "navbar": return `<nav style="${style}">Navbar</nav>`;
  case "hero": return `<section style="${style}"><h1>Hero Section</h1></section>`;
  case "text": return `<p style="${style}">Text</p>`;
  case "button": return `<button style="${style}">Button</button>`;
  case "footer": return `<footer style="${style}">Footer</footer>`;
  default: return `<div style="${style}">Block</div>`;
 }
}

export default function Topbar2(){
 const {sections,undo,redo}=useBuilder() as any;

 const exportHTML = ()=>{
  const html = `
  <html>
   <head>
    <meta charset="UTF-8" />
    <title>Export</title>
   </head>
   <body>
    ${sections.map((s:any)=>`<section>${s.blocks.map(renderBlock).join("")}</section>`).join("")}
   </body>
  </html>`;

  const blob = new Blob([html],{type:"text/html"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href=url;
  a.download="page.html";
  a.click();
 };

 return (
  <div className="h-12 flex items-center justify-between px-4 border-b bg-white">
   <div className="font-semibold">Lemon Builder</div>

   <div className="flex gap-2 text-sm">
    <button onClick={undo}>Undo</button>
    <button onClick={redo}>Redo</button>
    <button onClick={exportHTML}>Export</button>
   </div>
  </div>
 );
}
