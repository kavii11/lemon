"use client";
import { useBuilder } from "@/app/lib/builderStore3";

const templates=[
 {name:"Landing",blocks:["navbar","hero","footer"]},
 {name:"Simple",blocks:["text"]}
];

export default function Sidebar2(){
 const {addSection,addBlock,sections}=useBuilder();

 const apply=(tpl)=>{
  addSection();
  const id=sections[sections.length-1]?.id;
  tpl.forEach(t=>addBlock(id,t));
 }

 return (
  <div className="p-4 bg-black text-white">
   <h2>Templates</h2>
   {templates.map(t=> (
    <div key={t.name} onClick={()=>apply(t.blocks)} className="p-2 bg-zinc-800 mb-2 cursor-pointer">
     {t.name}
    </div>
   ))}
  </div>
 )
}
