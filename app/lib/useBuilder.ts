"use client";

import { create } from "zustand";

type Block = {
  id: string;
  type: string;
  props: {
    color?: string;
    padding?: string;
    [key: string]: any;
  };
};

type Section = {
  id: string;
  type: string;
  blocks: Block[];
};

type BuilderState = {
  sections: Section[];
  selectedBlock: any;

  setSelectedBlock: (sectionId: string, blockId: string) => void;

  addSection: (type: string, index?: number) => void;
  moveSection: (activeId: string, overId: string) => void;

  addBlock: (sectionId: string, type: string, index?: number) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;

  updateBlock: (sectionId: string, blockId: string, props: any) => void;

  exportData: () => any;
};

export const useBuilder = create<BuilderState>((set, get) => ({
  sections: [
    { id: "section-1", type: "header", blocks: [] },
    { id: "section-2", type: "hero", blocks: [] },
  ],

  selectedBlock: null,

  setSelectedBlock: (sectionId, blockId) =>
    set({ selectedBlock: { sectionId, blockId } }),

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

  moveSection: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.sections.findIndex((s) => s.id === activeId);
      const newIndex = state.sections.findIndex((s) => s.id === overId);

      if (oldIndex === -1 || newIndex === -1) return state;

      const updated = [...state.sections];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);

      return { sections: updated };
    }),

  addBlock: (sectionId, type, index) =>
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        // 🔥 TEMPLATE SUPPORT
        if (type === "hero") {
          return {
            ...section,
            blocks: [
              {
                id: Date.now().toString(),
                type: "heading",
                props: { content: "Hero Title" },
              },
              {
                id: Date.now().toString() + "2",
                type: "text",
                props: { content: "Hero description" },
              },
            ],
          };
        }

        const newBlock = {
          id: Date.now().toString(),
          type,
          props: {},
        };

        const blocks = [...section.blocks];

        if (index === undefined) blocks.push(newBlock);
        else blocks.splice(index, 0, newBlock);

        return { ...section, blocks };
      }),
    })),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) => {
      let movingBlock: any = null;

      const sections = state.sections.map((section) => {
        const filtered = section.blocks.filter((b) => {
          if (b.id === activeId) {
            movingBlock = b;
            return false;
          }
          return true;
        });

        return { ...section, blocks: filtered };
      });

      if (!movingBlock) return state;

      return {
        sections: sections.map((section) => {
          if (section.id !== sectionId) return section;

          const blocks = [...section.blocks];
          const index = blocks.findIndex((b) => b.id === overId);

          if (index === -1) blocks.push(movingBlock);
          else blocks.splice(index, 0, movingBlock);

          return { ...section, blocks };
        }),
      };
    }),

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

  exportData: () => {
    return get().sections;
  },
}));