"use client";

import { create } from "zustand";

// ✅ Block type
type Block = {
  id: string;
  type: string;
  props: Record<string, any>;
};

// ✅ Store type
type BuilderState = {
  blocks: Block[];
  addBlock: (type: string) => void;
  updateBlock: (id: string, props: Record<string, any>) => void;
};

// ✅ Typed Zustand store
export const useBuilder = create<BuilderState>((set) => ({
  blocks: [],

  addBlock: (type) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id: Date.now().toString(),
          type,
          props: {},
        },
      ],
    })),

  updateBlock: (id, props) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id
          ? { ...b, props: { ...b.props, ...props } }
          : b
      ),
    })),
}));