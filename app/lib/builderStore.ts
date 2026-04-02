"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";

export type Block = {
  id: string;
  type: string;
};

export type Section = {
  id: string;
  blocks: Block[];
};

type BuilderStore = {
  sections: Section[];
  addSection: (index?: number) => void;
  addBlock: (sectionId: string, type: string, index?: number) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;
};

export const useBuilder = create<BuilderStore>((set) => ({
  sections: [
    {
      id: nanoid(),
      blocks: [
        { id: nanoid(), type: "navbar" },
        { id: nanoid(), type: "hero" },
      ],
    },
    {
      id: nanoid(),
      blocks: [{ id: nanoid(), type: "text" }],
    },
    {
      id: nanoid(),
      blocks: [{ id: nanoid(), type: "footer" }],
    },
  ],

  addSection: (index = 0) =>
    set((state) => {
      const newSection: Section = { id: nanoid(), blocks: [] };
      const sections = [...state.sections];
      sections.splice(index, 0, newSection);
      return { sections };
    }),

  addBlock: (sectionId, type, index) =>
    set((state) => {
      const sections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const newBlock: Block = { id: nanoid(), type };
        const blocks = [...section.blocks];

        if (index !== undefined) blocks.splice(index, 0, newBlock);
        else blocks.push(newBlock);

        return { ...section, blocks };
      });

      return { sections };
    }),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) => {
      const sections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const blocks = [...section.blocks];
        const oldIndex = blocks.findIndex((b) => b.id === activeId);
        const newIndex = blocks.findIndex((b) => b.id === overId);

        if (oldIndex === -1 || newIndex === -1) return section;

        const [moved] = blocks.splice(oldIndex, 1);
        blocks.splice(newIndex, 0, moved);

        return { ...section, blocks };
      });

      return { sections };
    }),
}));
