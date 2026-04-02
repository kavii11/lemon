"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";

export const useBuilder = create((set,get)=>({
 sections:[{id:nanoid(),blocks:[]}],
 selected:null,
 history:[],
 future:[],

 selectBlock:(sectionId,blockId)=>set({selected:{sectionId,blockId}}),

 addSection:()=>{
  const {sections,history}=get();
  set({history:[...history,sections],sections:[...sections,{id:nanoid(),blocks:[]} ]});
 },

 addBlock:(sectionId,type)=>{
  const {sections,history}=get();
  set({
   history:[...history,sections],
   sections:sections.map(s=>s.id===sectionId?{...s,blocks:[...s.blocks,{id:nanoid(),type,style:{}}]}:s)
  });
 },

 updateStyle:(sectionId,blockId,style)=>{
  set(state=>({
   sections:state.sections.map(s=>{
    if(s.id!==sectionId)return s;
    return {
     ...s,
     blocks:s.blocks.map(b=>b.id===blockId?{...b,style:{...b.style,...style}}:b)
    }
   })
  }))
 },

 undo:()=>{
  const {history,sections,future}=get();
  if(!history.length)return;
  const prev=history[history.length-1];
  set({sections:prev,history:history.slice(0,-1),future:[sections,...future]});
 },

 redo:()=>{
  const {future,sections,history}=get();
  if(!future.length)return;
  const next=future[0];
  set({sections:next,future:future.slice(1),history:[...history,sections]});
 }
}));
