"use client";

import { create } from "zustand";

export const useBuilder = create((set) => ({
  blocks: [],

  addBlock: (type: string) =>
    set((state: any) => ({
      blocks: [
        ...state.blocks,
        {
          id: Date.now().toString(),
          type,
          props: {},
        },
      ],
    })),

  updateBlock: (id: string, props: any) =>
    set((state: any) => ({
      blocks: state.blocks.map((b: any) =>
        b.id === id ? { ...b, props: { ...b.props, ...props } } : b
      ),
    })),
}));
