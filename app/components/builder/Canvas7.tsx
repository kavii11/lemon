"use client";
import { useBuilder } from "@/app/lib/builderStore3";
import BlockRenderer1 from "./BlockRenderer1";

export default function Canvas7(){
 const {sections,selectBlock,selected,updateStyle,deleteSection,duplicateSection}=useBuilder();

 return (
  <div className="p-6 space-y-4">
   {sections.map(section=> (
    <div key={section.id} className="border p-4">
     <div className="flex gap-2 mb-2">
      <button onClick={()=>deleteSection(section.id)}>🗑 Section</button>
      <button onClick={()=>duplicateSection(section.id)}>⧉ Section</button>
     </div>

     {section.blocks.map(block=>{
      const isSelected = selected?.blockId===block.id;

      return (
       <div key={block.id}
        onClick={()=>selectBlock(section.id,block.id)}
        className={isSelected?"border-2 border-yellow-500":"border"}>

        <BlockRenderer1 block={block}/>

        {isSelected && (
         <div className="flex gap-2">
          <input placeholder="font size" type="number"
           onChange={(e)=>updateStyle(section.id,block.id,{fontSize:Number(e.target.value)})}/>
          <select onChange={(e)=>updateStyle(section.id,block.id,{align:e.target.value})}>
           <option>left</option>
           <option>center</option>
           <option>right</option>
          </select>
         </div>
        )}
       </div>
      )
     })}
    </div>
   ))}
  </div>
 )
}
