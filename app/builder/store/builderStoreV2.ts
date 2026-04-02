"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { Block, Section, BlockType } from "../core/blockTypes";

type BuilderState = {
  sections: Section[];
  selected: { sectionId: string; blockId: string } | null;

  addSection: () => void;
  addBlock: (sectionId: string, type: BlockType) => void;

  selectBlock: (sectionId: string, blockId: string) => void;

  updateStyle: (
    sectionId: string,
    blockId: string,
    style: Partial<Block["style"]>
  ) => void;

  deleteBlock: (sectionId: string, blockId: string) => void;
};

export const useBuilderV2 = create<BuilderState>((set) => ({
  sections: [
    {
      id: nanoid(),
      blocks: [],
    },
  ],
  selected: null,

  addSection: () =>
    set((state) => ({
      sections: [...state.sections, { id: nanoid(), blocks: [] }],
    })),

  addBlock: (sectionId, type) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              blocks: [
                ...s.blocks,
                {
                  id: nanoid(),
                  type,
                  props: {},
                  style: { padding: 10, fontSize: 16, align: "left" },
                },
              ],
            }
          : s
      ),
    })),

  selectBlock: (sectionId, blockId) =>
    set({ selected: { sectionId, blockId } }),

  updateStyle: (sectionId, blockId, style) =>
    set((state) => ({
      sections: state.sections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          blocks: s.blocks.map((b) =>
            b.id === blockId
              ? { ...b, style: { ...b.style, ...style } }
              : b
          ),
        };
      }),
    })),

  deleteBlock: (sectionId, blockId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, blocks: s.blocks.filter((b) => b.id !== blockId) }
          : s
      ),
    })),
}));
