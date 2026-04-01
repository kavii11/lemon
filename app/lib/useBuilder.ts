"use client";

import { create } from "zustand";

type Device = "desktop" | "tablet" | "mobile";

type Style = {
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;

  display?: string;
  justifyContent?: string;
  alignItems?: string;

  width?: string;
  height?: string;
};

type Block = {
  id: string;
  type: string;
  props: {
    content?: string;
    style?: {
      desktop?: Style;
      tablet?: Style;
      mobile?: Style;
    };
  };
};

type Section = {
  id: string;
  type: string;
  blocks: Block[];
};

type BuilderState = {
  sections: Section[];
  history: Section[][];
  future: Section[][];

  currentDevice: Device;
  selectedBlock: { sectionId: string; blockId: string } | null;

  setDevice: (d: Device) => void;
  setSelectedBlock: (s: string, b: string) => void;

  addSection: (type: string, index?: number) => void;
  addBlock: (sectionId: string, type: string) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;

  updateBlock: (sectionId: string, blockId: string, updates: any) => void;

  undo: () => void;
  redo: () => void;

  exportData: () => Section[];
};

export const useBuilder = create<BuilderState>((set, get) => ({
  sections: [{ id: "section-1", type: "hero", blocks: [] }],

  history: [],
  future: [],

  currentDevice: "desktop",
  selectedBlock: null,

  setDevice: (d) => set({ currentDevice: d }),

  setSelectedBlock: (s, b) =>
    set({ selectedBlock: { sectionId: s, blockId: b } }),

  // 🧠 HISTORY HELPER
  saveHistory: () =>
    set((state: any) => ({
      history: [...state.history, state.sections],
      future: [],
    })),

  addSection: (type, index) =>
    set((state) => {
      const newSection = {
        id: Date.now().toString(),
        type,
        blocks: [],
      };

      const sections = [...state.sections];

      if (index !== undefined) sections.splice(index + 1, 0, newSection);
      else sections.push(newSection);

      return {
        history: [...state.history, state.sections],
        sections,
        future: [],
      };
    }),

  addBlock: (sectionId, type) =>
    set((state) => ({
      history: [...state.history, state.sections],
      future: [],
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              blocks: [
                ...s.blocks,
                {
                  id: Date.now().toString(),
                  type,
                  props: { content: "Edit me", style: {} },
                },
              ],
            }
          : s
      ),
    })),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) => {
      let moving: any;

      const sections = state.sections.map((s) => {
        const filtered = s.blocks.filter((b) => {
          if (b.id === activeId) {
            moving = b;
            return false;
          }
          return true;
        });
        return { ...s, blocks: filtered };
      });

      return {
        history: [...state.history, state.sections],
        future: [],
        sections: sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                blocks: [...s.blocks, moving],
              }
            : s
        ),
      };
    }),

  updateBlock: (sectionId, blockId, updates) =>
    set((state) => {
      const device = state.currentDevice;

      return {
        history: [...state.history, state.sections],
        future: [],
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                blocks: s.blocks.map((b) =>
                  b.id === blockId
                    ? {
                        ...b,
                        props: {
                          ...b.props,
                          style: {
                            ...b.props.style,
                            [device]: {
                              ...b.props.style?.[device],
                              ...updates,
                            },
                          },
                        },
                      }
                    : b
                ),
              }
            : s
        ),
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const prev = state.history[state.history.length - 1];

      return {
        sections: prev,
        history: state.history.slice(0, -1),
        future: [state.sections, ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];

      return {
        sections: next,
        history: [...state.history, state.sections],
        future: state.future.slice(1),
      };
    }),

  exportData: () => get().sections,
}));