"use client";

import { create } from "zustand";

type Block = {
  id: string;
  type: string;
  props: Record<string, any>;
};

type Section = {
  id: string;
  type: string;
  blocks: Block[];
};

type BuilderState = {
  sections: Section[];

  addSection: (type: string, index?: number) => void;
  moveSection: (activeId: string, overId: string) => void;

  addBlock: (sectionId: string, type: string) => void;
  moveBlock: (
    sectionId: string,
    activeId: string,
    overId: string
  ) => void;

  updateBlock: (
    sectionId: string,
    blockId: string,
    props: Record<string, any>
  ) => void;
};

export const useBuilder = create<BuilderState>((set) => ({
  sections: [
    { id: "section-1", type: "header", blocks: [] },
    { id: "section-2", type: "hero", blocks: [] },
  ],

  // ✅ Add Section
  addSection: (type, index) =>
    set((state) => {
      const newSection = {
        id: Date.now().toString(),
        type,
        blocks: [],
      };

      const sections = [...state.sections];

      if (index !== undefined && index >= 0) {
        sections.splice(index + 1, 0, newSection);
      } else {
        sections.push(newSection);
      }

      return { sections };
    }),

  // ✅ Move Section (drag)
  moveSection: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.sections.findIndex((s) => s.id === activeId);
      const newIndex = state.sections.findIndex((s) => s.id === overId);

      const updated = [...state.sections];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return { sections: updated };
    }),

  // ✅ Add Block
  addBlock: (sectionId, type) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: [
                ...section.blocks,
                {
                  id: Date.now().toString(),
                  type,
                  props: {},
                },
              ],
            }
          : section
      ),
    })),

  // ✅ Move Block (future drag inside section)
  moveBlock: (sectionId, activeId, overId) =>
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const oldIndex = section.blocks.findIndex((b) => b.id === activeId);
        const newIndex = section.blocks.findIndex((b) => b.id === overId);

        const updated = [...section.blocks];
        const [moved] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, moved);

        return { ...section, blocks: updated };
      }),
    })),

  // ✅ Update Block
  updateBlock: (sectionId, blockId, props) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              blocks: section.blocks.map((b) =>
                b.id === blockId
                  ? { ...b, props: { ...b.props, ...props } }
                  : b
              ),
            }
          : section
      ),
    })),
}));