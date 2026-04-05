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
  minHeight?: string;
};

type Block = {
  id: string;
  type: string;
  isSpacer?: boolean;
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
  setSelectedBlock: (sectionId: string, blockId: string) => void;

  addSection: (type: string, index?: number) => void;
  addBlock: (sectionId: string, type: string, index?: number) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;
  updateBlock: (sectionId: string, blockId: string, updates: any) => void;
  resizeBlock: (
    sectionId: string,
    blockId: string,
    direction: "left" | "right" | "top" | "bottom",
    delta: number
  ) => void;

  undo: () => void;
  redo: () => void;
  exportData: () => Section[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const getPercent = (value?: string, fallback = 100) => {
  if (!value) return fallback;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const getPixels = (value?: string, fallback = 120) => {
  if (!value) return fallback;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const makeDefaultStyle = () => ({
  desktop: { width: "100%", minHeight: "120px" },
  tablet: { width: "100%", minHeight: "120px" },
  mobile: { width: "100%", minHeight: "120px" },
});

const ensureSpacer = (blocks: Block[], device: Device) => {
  const clean = (blocks || []).filter((b) => b && b.id);
  const nonSpacer = clean.filter((b) => !b.isSpacer);

  const used = nonSpacer.reduce((sum, block) => {
    const width = getPercent(block.props?.style?.[device]?.width, 100);
    return sum + width;
  }, 0);

  const remaining = clamp(100 - used, 0, 100);
  const existingSpacer = clean.find((b) => b.isSpacer);

  const next = [...nonSpacer];

  if (remaining > 0 && remaining < 100) {
    const spacer: Block =
      existingSpacer ?? {
        id: crypto.randomUUID(),
        type: "spacer",
        isSpacer: true,
        props: {
          content: "Blank space",
          style: {
            desktop: {},
            tablet: {},
            mobile: {},
          },
        },
      };

    spacer.props.style = {
      ...spacer.props.style,
      [device]: {
        ...spacer.props.style?.[device],
        width: `${remaining}%`,
        minHeight: "120px",
      },
    };

    next.push(spacer);
  }

  return next;
};

const stripSpacers = (blocks: Block[] = []) =>
  blocks.filter((b) => b && b.id && !b.isSpacer);

export const useBuilder = create<BuilderState>((set, get) => ({
  sections: [
    { id: "section-navbar", type: "navbar", blocks: [] },
    { id: "section-hero", type: "hero", blocks: [] },
    { id: "section-content-1", type: "section", blocks: [] },
    { id: "section-content-2", type: "section", blocks: [] },
    { id: "section-footer", type: "footer", blocks: [] },
  ],
  history: [],
  future: [],
  currentDevice: "desktop",
  selectedBlock: null,

  setDevice: (d) => set({ currentDevice: d }),

  setSelectedBlock: (sectionId, blockId) =>
    set({ selectedBlock: { sectionId, blockId } }),

  addSection: (type, index) =>
    set((state) => {
      const newSection: Section = {
        id: crypto.randomUUID(),
        type,
        blocks: [],
      };

      const sections = [...state.sections];

      if (index !== undefined) {
        sections.splice(index + 1, 0, newSection);
      } else {
        sections.push(newSection);
      }

      return {
        history: [...state.history, state.sections],
        sections,
        future: [],
      };
    }),

  addBlock: (sectionId, type, index) =>
    set((state) => {
      const device = state.currentDevice;

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const newBlock: Block = {
          id: crypto.randomUUID(),
          type,
          props: {
            content: "Edit me",
            style: makeDefaultStyle(),
          },
        };

        const cleanBlocks = stripSpacers(section.blocks);

        const nextBlocks =
          index === undefined
            ? [...cleanBlocks, newBlock]
            : [
                ...cleanBlocks.slice(0, index),
                newBlock,
                ...cleanBlocks.slice(index),
              ];

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, state.sections],
        future: [],
        sections: updatedSections,
      };
    }),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) => {
      const device = state.currentDevice;
      let movingBlock: Block | null = null;

      const sectionsWithoutActive = state.sections.map((section) => {
        const cleanBlocks = stripSpacers(section.blocks);

        const remaining = cleanBlocks.filter((block) => {
          if (block.id === activeId) {
            movingBlock = block;
            return false;
          }
          return true;
        });

        return {
          ...section,
          blocks: remaining,
        };
      });

      if (!movingBlock) return state;

      const updatedSections = sectionsWithoutActive.map((section) => {
        const cleanBlocks = stripSpacers(section.blocks);

        if (section.id !== sectionId) {
          return {
            ...section,
            blocks: ensureSpacer(cleanBlocks, device),
          };
        }

        let insertAt = cleanBlocks.length;

        if (overId && !String(overId).startsWith("section-drop-")) {
          const overIndex = cleanBlocks.findIndex((b) => b.id === overId);
          if (overIndex !== -1) insertAt = overIndex;
        }

        const nextBlocks = [
          ...cleanBlocks.slice(0, insertAt),
          movingBlock!,
          ...cleanBlocks.slice(insertAt),
        ];

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, state.sections],
        future: [],
        sections: updatedSections,
      };
    }),

  updateBlock: (sectionId, blockId, updates) =>
    set((state) => {
      const device = state.currentDevice;

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextBlocks = stripSpacers(section.blocks).map((block) =>
          block.id === blockId
            ? {
                ...block,
                props: {
                  ...block.props,
                  style: {
                    ...block.props.style,
                    [device]: {
                      ...block.props.style?.[device],
                      ...updates,
                    },
                  },
                },
              }
            : block
        );

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, state.sections],
        future: [],
        sections: updatedSections,
      };
    }),

  resizeBlock: (sectionId, blockId, direction, delta) =>
    set((state) => {
      const device = state.currentDevice;

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextBlocks = stripSpacers(section.blocks).map((block) => {
          if (block.id !== blockId) return block;

          const current = block.props?.style?.[device] || {};
          const currentWidth = getPercent(current.width, 100);
          const currentHeight = getPixels(
            current.minHeight || current.height,
            120
          );

          let nextWidth = currentWidth;
          let nextHeight = currentHeight;

          if (direction === "left" || direction === "right") {
            nextWidth = clamp(currentWidth + delta, 20, 100);
          }

          if (direction === "top" || direction === "bottom") {
            nextHeight = clamp(currentHeight + delta * 4, 80, 800);
          }

          return {
            ...block,
            props: {
              ...block.props,
              style: {
                ...block.props.style,
                [device]: {
                  ...current,
                  width: `${nextWidth}%`,
                  minHeight: `${nextHeight}px`,
                },
              },
            },
          };
        });

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, state.sections],
        future: [],
        sections: updatedSections,
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const previous = state.history[state.history.length - 1];

      return {
        sections: previous,
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