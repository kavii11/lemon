"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";

export const useBuilder = create((set,get)=>({
 sections:[{id:nanoid(),blocks:[]}],
 selected:null,

 addSection:()=>set(state=>({sections:[...state.sections,{id:nanoid(),blocks:[]}]})),

 deleteSection:(id)=>set(state=>({sections:state.sections.filter(s=>s.id!==id)})),

 duplicateSection:(id)=>set(state=>({
  sections:state.sections.flatMap(s=>s.id===id?[s,{...s,id:nanoid()}]:[s])
 })),

 selectBlock:(sectionId,blockId)=>set({selected:{sectionId,blockId}}),

 addBlock:(sectionId,type)=>set(state=>({
  sections:state.sections.map(s=>s.id===sectionId?{...s,blocks:[...s.blocks,{id:nanoid(),type,style:{fontSize:16,align:"left"}}]}:s)
 })),

 updateStyle:(sectionId,blockId,style)=>set(state=>({
  sections:state.sections.map(s=>{
   if(s.id!==sectionId)return s;
   return {
    ...s,
    blocks:s.blocks.map(b=>b.id===blockId?{...b,style:{...b.style,...style}}:b)
   }
  })
 }))
}));
