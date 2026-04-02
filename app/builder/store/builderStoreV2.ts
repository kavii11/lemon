import { create } from "zustand";

export type BlockType = "text" | "image";

export type Block = {
  id: string;
  type: BlockType;
  content?: string;
};

export type Section = {
  id: string;
  blocks: Block[];
};

type BuilderState = {
  sections: Section[];
  addBlock: (sectionId: string, type: BlockType, index?: number) => void;
  moveBlock: (sectionId: string, from: number, to: number) => void;
};

const uid = () => Math.random().toString(36).slice(2);

export const useBuilderStore = create<BuilderState>((set) => ({
  sections: [{ id: "section-1", blocks: [] }],

  addBlock: (sectionId, type, index) =>
    set((state) => ({
      sections: state.sections.map((s) => {
        if (s.id !== sectionId) return s;

        const newBlock: Block = {
          id: uid(),
          type,
          content: type === "text" ? "New Text" : "",
        };

        const updated = [...s.blocks];

        if (index === undefined) updated.push(newBlock);
        else updated.splice(index, 0, newBlock);

        return { ...s, blocks: updated };
      }),
    })),

  moveBlock: (sectionId, from, to) =>
    set((state) => ({
      sections: state.sections.map((s) => {
        if (s.id !== sectionId) return s;

        const arr = [...s.blocks];
        const [item] = arr.splice(from, 1);
        arr.splice(to, 0, item);

        return { ...s, blocks: arr };
      }),
    })),
}));
