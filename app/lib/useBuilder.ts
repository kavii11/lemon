"use client";

import { create } from "zustand";

export type Device = "desktop" | "tablet" | "mobile";

export type Style = {
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
  textAlign?: "left" | "center" | "right";
  objectFit?: "cover" | "contain";
};

export type Block = {
  id: string;
  type: string;
  isSpacer?: boolean;
  props: {
    content?: string;
    src?: string;
    alt?: string;
    href?: string;
    items?: string[];
    placeholder?: string;
    options?: string[];
    label?: string;
    style?: {
      desktop?: Style;
      tablet?: Style;
      mobile?: Style;
    };
  };
};

export type Section = {
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

  setDevice: (device: Device) => void;
  setSelectedBlock: (sectionId: string, blockId: string) => void;
  clearSelectedBlock: () => void;

  addSection: (type: string, index?: number) => void;
  addBlock: (sectionId: string, type: string, index?: number) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;
  updateBlock: (sectionId: string, blockId: string, updates: Partial<Style>) => void;
  updateBlockProps: (
    sectionId: string,
    blockId: string,
    propsUpdates: Partial<Block["props"]>
  ) => void;
  resizeBlock: (
    sectionId: string,
    blockId: string,
    direction: "left" | "right" | "top" | "bottom",
    delta: number
  ) => void;
  duplicateBlock: (sectionId: string, blockId: string) => void;
  removeBlock: (sectionId: string, blockId: string) => void;

  undo: () => void;
  redo: () => void;
  exportData: () => Section[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const deepClone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

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

const makeDefaultStyle = (): Required<Block["props"]>["style"] => ({
  desktop: { width: "100%", minHeight: "120px" },
  tablet: { width: "100%", minHeight: "120px" },
  mobile: { width: "100%", minHeight: "120px" },
});

const makeBlockDefaults = (type: string): Block["props"] => {
  const base = {
    style: makeDefaultStyle(),
  };

  switch (type) {
    case "heading":
      return {
        ...base,
        content: "Your headline",
        style: {
          desktop: {
            ...base.style.desktop,
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "1.1",
          },
          tablet: {
            ...base.style.tablet,
            fontSize: "32px",
            fontWeight: "700",
            lineHeight: "1.1",
          },
          mobile: {
            ...base.style.mobile,
            fontSize: "26px",
            fontWeight: "700",
            lineHeight: "1.2",
          },
        },
      };

    case "text":
    case "paragraph":
      return {
        ...base,
        content: "Edit this text content.",
        style: {
          desktop: {
            ...base.style.desktop,
            fontSize: "16px",
            lineHeight: "1.7",
          },
          tablet: {
            ...base.style.tablet,
            fontSize: "16px",
            lineHeight: "1.7",
          },
          mobile: {
            ...base.style.mobile,
            fontSize: "15px",
            lineHeight: "1.6",
          },
        },
      };

    case "button":
    case "submit":
      return {
        ...base,
        content: "Click me",
        href: "#",
        style: {
          desktop: {
            ...base.style.desktop,
            width: "220%",
            minHeight: "72px",
            backgroundColor: "#111827",
            color: "#ffffff",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "16px",
          },
          tablet: {
            ...base.style.tablet,
            width: "220%",
            minHeight: "72px",
            backgroundColor: "#111827",
            color: "#ffffff",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "16px",
          },
          mobile: {
            ...base.style.mobile,
            width: "100%",
            minHeight: "64px",
            backgroundColor: "#111827",
            color: "#ffffff",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "16px",
          },
        },
      };

    case "image":
    case "image-block":
      return {
        ...base,
        alt: "Builder image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        style: {
          desktop: {
            ...base.style.desktop,
            minHeight: "260px",
            objectFit: "cover",
          },
          tablet: {
            ...base.style.tablet,
            minHeight: "220px",
            objectFit: "cover",
          },
          mobile: {
            ...base.style.mobile,
            minHeight: "180px",
            objectFit: "cover",
          },
        },
      };

    case "video":
      return {
        ...base,
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        style: {
          desktop: { ...base.style.desktop, minHeight: "320px" },
          tablet: { ...base.style.tablet, minHeight: "260px" },
          mobile: { ...base.style.mobile, minHeight: "220px" },
        },
      };

    case "list":
      return {
        ...base,
        items: ["First item", "Second item", "Third item"],
      };

    case "input":
      return {
        ...base,
        label: "Input label",
        placeholder: "Type here",
      };

    case "textarea":
      return {
        ...base,
        label: "Textarea label",
        placeholder: "Write here",
        style: {
          desktop: { ...base.style.desktop, minHeight: "160px" },
          tablet: { ...base.style.tablet, minHeight: "160px" },
          mobile: { ...base.style.mobile, minHeight: "140px" },
        },
      };

    case "select":
      return {
        ...base,
        label: "Choose one",
        options: ["Option 1", "Option 2", "Option 3"],
      };

    case "checkbox":
      return {
        ...base,
        label: "I agree to the terms",
        style: {
          desktop: { ...base.style.desktop, minHeight: "auto", width: "100%" },
          tablet: { ...base.style.tablet, minHeight: "auto", width: "100%" },
          mobile: { ...base.style.mobile, minHeight: "auto", width: "100%" },
        },
      };

    default:
      return {
        ...base,
        content: `New ${type}`,
      };
  }
};

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
      existingSpacer ??
      ({
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
      } as Block);

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

const rebalanceSections = (sections: Section[], device: Device) =>
  sections.map((section) => ({
    ...section,
    blocks: ensureSpacer(stripSpacers(section.blocks), device),
  }));

const initialSections: Section[] = [
  { id: "section-navbar", type: "navbar", blocks: [] },
  { id: "section-hero", type: "hero", blocks: [] },
  { id: "section-content-1", type: "section", blocks: [] },
  { id: "section-content-2", type: "section", blocks: [] },
  { id: "section-footer", type: "footer", blocks: [] },
];

export const useBuilder = create<BuilderState>((set, get) => ({
  sections: initialSections,
  history: [],
  future: [],
  currentDevice: "desktop",
  selectedBlock: null,

  setDevice: (device) => set({ currentDevice: device }),

  setSelectedBlock: (sectionId, blockId) =>
    set({ selectedBlock: { sectionId, blockId } }),

  clearSelectedBlock: () => set({ selectedBlock: null }),

  addSection: (type, index) =>
    set((state) => {
      const snapshot = deepClone(state.sections);
      const sections = deepClone(state.sections);
      const newSection: Section = {
        id: crypto.randomUUID(),
        type,
        blocks: [],
      };

      if (typeof index === "number") {
        sections.splice(index + 1, 0, newSection);
      } else {
        sections.push(newSection);
      }

      return {
        history: [...state.history, snapshot],
        future: [],
        sections,
      };
    }),

  addBlock: (sectionId, type, index) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const cleanBlocks = stripSpacers(section.blocks);
        const newBlock: Block = {
          id: crypto.randomUUID(),
          type,
          props: makeBlockDefaults(type),
        };

        const nextBlocks =
          typeof index === "number"
            ? [
                ...cleanBlocks.slice(0, index),
                newBlock,
                ...cleanBlocks.slice(index),
              ]
            : [...cleanBlocks, newBlock];

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
      };
    }),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);
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
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
      };
    }),

  updateBlock: (sectionId, blockId, updates) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextBlocks = stripSpacers(section.blocks).map((block) =>
          block.id !== blockId
            ? block
            : {
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
        );

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
      };
    }),

  updateBlockProps: (sectionId, blockId, propsUpdates) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextBlocks = stripSpacers(section.blocks).map((block) =>
          block.id !== blockId
            ? block
            : {
                ...block,
                props: {
                  ...block.props,
                  ...propsUpdates,
                  style: {
                    ...block.props.style,
                    [device]: {
                      ...block.props.style?.[device],
                    },
                  },
                },
              }
        );

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
      };
    }),

  resizeBlock: (sectionId, blockId, direction, delta) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextBlocks = stripSpacers(section.blocks).map((block) => {
          if (block.id !== blockId) return block;

          const current = block.props?.style?.[device] || {};
          const currentWidth = getPercent(current.width, 100);
          const currentHeight = getPixels(current.minHeight || current.height, 120);

          let nextWidth = currentWidth;
          let nextHeight = currentHeight;

          if (direction === "left" || direction === "right") {
            nextWidth = clamp(currentWidth + delta, 20, 100);
          }

          if (direction === "top" || direction === "bottom") {
            nextHeight = clamp(currentHeight + delta * 4, 80, 960);
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
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
      };
    }),

  duplicateBlock: (sectionId, blockId) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const cleanBlocks = stripSpacers(section.blocks);
        const index = cleanBlocks.findIndex((block) => block.id === blockId);
        if (index === -1) return section;

        const original = cleanBlocks[index];
        const clone: Block = {
          ...deepClone(original),
          id: crypto.randomUUID(),
        };

        const nextBlocks = [
          ...cleanBlocks.slice(0, index + 1),
          clone,
          ...cleanBlocks.slice(index + 1),
        ];

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
      };
    }),

  removeBlock: (sectionId, blockId) =>
    set((state) => {
      const device = state.currentDevice;
      const snapshot = deepClone(state.sections);

      const updatedSections = state.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const nextBlocks = stripSpacers(section.blocks).filter(
          (block) => block.id !== blockId
        );

        return {
          ...section,
          blocks: ensureSpacer(nextBlocks, device),
        };
      });

      return {
        history: [...state.history, snapshot],
        future: [],
        sections: updatedSections,
        selectedBlock:
          state.selectedBlock?.sectionId === sectionId &&
          state.selectedBlock?.blockId === blockId
            ? null
            : state.selectedBlock,
      };
    }),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const previous = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);

      return {
        sections: rebalanceSections(deepClone(previous), state.currentDevice),
        history: newHistory,
        future: [deepClone(state.sections), ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        sections: rebalanceSections(deepClone(next), state.currentDevice),
        history: [...state.history, deepClone(state.sections)],
        future: newFuture,
      };
    }),

  exportData: () => {
    const { sections } = get();
    return deepClone(sections).map((section) => ({
      ...section,
      blocks: stripSpacers(section.blocks),
    }));
  },
}));