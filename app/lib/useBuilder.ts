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
  gap?: string;
  border?: string;
};

export type LinkItem = {
  label: string;
  href?: string;
};

export type ButtonItem = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type StatItem = {
  label: string;
  value: string;
};

export type PriceFeature = {
  text: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role?: string;
};

export type BlockProps = {
  content?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  src?: string;
  alt?: string;
  href?: string;
  poster?: string;
  price?: string;
  badge?: string;
  items?: string[];
  links?: LinkItem[];
  buttons?: ButtonItem[];
  stats?: StatItem[];
  features?: PriceFeature[];
  faqs?: FAQItem[];
  testimonials?: TestimonialItem[];
  options?: string[];
  label?: string;
  placeholder?: string;
  checked?: boolean;
  columns?: {
    title?: string;
    content?: string;
    items?: string[];
  }[];
  products?: {
    title: string;
    price: string;
    image?: string;
  }[];
  posts?: {
    title: string;
    excerpt: string;
  }[];
  style?: {
    desktop?: Style;
    tablet?: Style;
    mobile?: Style;
  };
  [key: string]: any;
};

export type Block = {
  id: string;
  type: string;
  isSpacer?: boolean;
  props: BlockProps;
};

export type Section = {
  id: string;
  type: string;
  blocks: Block[];
};

type BuilderState = {
  builderType: "website" | "product";
  setBuilderType: (type: "website" | "product") => void;

  sectionsWebsite: Section[];
  sectionsProduct: Section[];
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
  addVariantSection: (variant: any) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;
  updateBlock: (sectionId: string, blockId: string, updates: Partial<Style>) => void;
  updateBlockProps: (sectionId: string, blockId: string, updates: Partial<BlockProps>) => void;
  updateBlockStyle: (
    sectionId: string,
    blockId: string,
    device: Device,
    updates: Partial<Style>
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
  exportData: () => any;
};

const uid = () => crypto.randomUUID();

const cloneSections = (sections: Section[]) =>
  JSON.parse(JSON.stringify(sections)) as Section[];

const PRODUCT_LAYOUT_VARIANT_IDS = new Set([
  "standard-product",
  "centered-product",
  "product-grid",
]);

const baseStyle = (overrides?: Partial<Style>) => ({
  desktop: {
    width: "100%",
    minHeight: "120px",
    ...overrides,
  },
  tablet: {
    width: "100%",
    minHeight: "120px",
    ...overrides,
  },
  mobile: {
    width: "100%",
    minHeight: "120px",
    ...overrides,
  },
});

const createBlock = (type: string): Block => {
  const commonCardStyle = {
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
  };

  const blocks: Record<string, Block> = {
    heading: {
      id: uid(),
      type: "heading",
      props: {
        content: "Build pages visually",
        style: baseStyle({
          fontSize: "40px",
          fontWeight: "800",
          lineHeight: "1.1",
          minHeight: "88px",
        }),
      },
    },
    text: {
      id: uid(),
      type: "text",
      props: {
        content: "This is a text block.",
        style: baseStyle({
          fontSize: "16px",
          lineHeight: "1.7",
          minHeight: "100px",
        }),
      },
    },
    paragraph: {
      id: uid(),
      type: "paragraph",
      props: {
        content: "Paragraph block",
        style: baseStyle({
          fontSize: "16px",
          lineHeight: "1.8",
          minHeight: "110px",
        }),
      },
    },
    button: {
      id: uid(),
      type: "button",
      props: {
        content: "Get started",
        href: "",
        style: baseStyle({
          width: "auto",
          minHeight: "56px",
          padding: "12px 18px",
          backgroundColor: "#111827",
          color: "#ffffff",
          borderRadius: "12px",
          fontWeight: "700",
        }),
      },
    },
    submit: {
      id: uid(),
      type: "submit",
      props: {
        content: "Submit",
        style: baseStyle({
          width: "auto",
          minHeight: "56px",
          padding: "12px 18px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          borderRadius: "12px",
          fontWeight: "700",
        }),
      },
    },
    badge: {
      id: uid(),
      type: "badge",
      props: {
        content: "Popular",
        style: baseStyle({
          width: "auto",
          minHeight: "42px",
          padding: "8px 12px",
          backgroundColor: "#fef3c7",
          color: "#92400e",
          borderRadius: "999px",
          fontWeight: "700",
        }),
      },
    },
    image: {
      id: uid(),
      type: "image",
      props: {
        src: "https://picsum.photos/1200/700",
        alt: "Builder image",
        style: baseStyle({
          minHeight: "240px",
          borderRadius: "16px",
          objectFit: "cover",
        }),
      },
    },
    "image-block": {
      id: uid(),
      type: "image-block",
      props: {
        src: "https://picsum.photos/1200/760",
        alt: "Content image",
        title: "Image title",
        description: "Optional supporting image description.",
        style: baseStyle({
          minHeight: "280px",
          borderRadius: "16px",
        }),
      },
    },
    video: {
      id: uid(),
      type: "video",
      props: {
        poster: "https://picsum.photos/1200/700?grayscale",
        title: "Video preview",
        description: "Add your video embed or poster later.",
        style: baseStyle({
          minHeight: "260px",
          borderRadius: "16px",
        }),
      },
    },
    list: {
      id: uid(),
      type: "list",
      props: {
        items: ["Fast setup", "Responsive controls", "Visual editing"],
        style: baseStyle({
          minHeight: "140px",
        }),
      },
    },
    divider: {
      id: uid(),
      type: "divider",
      props: {
        style: baseStyle({
          minHeight: "24px",
        }),
      },
    },
    spacer: {
      id: uid(),
      type: "spacer",
      isSpacer: true,
      props: {
        content: "Spacer",
        style: baseStyle({
          minHeight: "60px",
        }),
      },
    },
    quote: {
      id: uid(),
      type: "quote",
      props: {
        content: "Great design systems create speed without sacrificing control.",
        subtitle: "Product Team",
        style: baseStyle({
          minHeight: "160px",
          padding: "24px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
        }),
      },
    },
    card: {
      id: uid(),
      type: "card",
      props: {
        title: "Feature card",
        content: "Use cards for features, summaries, and promo blocks.",
        style: baseStyle({
          minHeight: "190px",
          ...commonCardStyle,
          boxShadow: "0 10px 25px rgba(15,23,42,0.05)",
        }),
      },
    },
    stats: {
      id: uid(),
      type: "stats",
      props: {
        stats: [
          { label: "Users", value: "12K" },
          { label: "Revenue", value: "84K" },
        ],
        style: baseStyle({
          minHeight: "180px",
          ...commonCardStyle,
        }),
      },
    },
    input: {
      id: uid(),
      type: "input",
      props: {
        label: "Email address",
        placeholder: "name@example.com",
        style: baseStyle({
          minHeight: "86px",
        }),
      },
    },
    textarea: {
      id: uid(),
      type: "textarea",
      props: {
        label: "Message",
        placeholder: "Write your message...",
        style: baseStyle({
          minHeight: "140px",
        }),
      },
    },
    select: {
      id: uid(),
      type: "select",
      props: {
        label: "Select plan",
        options: ["Starter", "Pro", "Scale"],
        style: baseStyle({
          minHeight: "86px",
        }),
      },
    },
    checkbox: {
      id: uid(),
      type: "checkbox",
      props: {
        label: "I agree to the terms",
        checked: false,
        style: baseStyle({
          minHeight: "56px",
        }),
      },
    },
    product: {
      id: uid(),
      type: "product",
      props: {
        title: "Product name",
        price: "49",
        src: "https://picsum.photos/800/500",
        alt: "Product image",
        description: "Short product description with key value points.",
        style: baseStyle({
          minHeight: "300px",
          ...commonCardStyle,
        }),
      },
    },
    "product-list": {
      id: uid(),
      type: "product-list",
      props: {
        title: "Featured products",
        products: [
          { title: "Basic Tee", price: "29", image: "https://picsum.photos/400/280?1" },
          { title: "Pro Hoodie", price: "59", image: "https://picsum.photos/400/280?2" },
        ],
        style: baseStyle({
          minHeight: "340px",
          ...commonCardStyle,
        }),
      },
    },
    table: {
      id: uid(),
      type: "table",
      props: {
        title: "Comparison table",
        columns: [
          { title: "Plan", items: ["Starter", "Pro"] },
          { title: "Price", items: ["19", "49"] },
        ],
        style: baseStyle({
          minHeight: "220px",
          ...commonCardStyle,
        }),
      },
    },
  };

  return (
    blocks[type] || {
      id: uid(),
      type,
      props: {
        content: `${type} block`,
        style: baseStyle({ minHeight: "120px" }),
      },
    }
  );
};

const createSection = (type: string): Section => ({
  id: uid(),
  type,
  blocks: [],
});

const initialWebsiteSections: Section[] = [
  {
    id: uid(),
    type: "section",
    blocks: [createBlock("heading"), createBlock("text"), createBlock("button")],
  },
];

const initialProductSections: Section[] = [
  {
    id: uid(),
    type: "section",
    blocks: [],
  },
];

const pushHistory = (state: BuilderState) => {
  const currentSections =
    state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

  return {
    history: [...state.history, cloneSections(currentSections)],
    future: [],
  };
};

export const useBuilder = create<BuilderState>((set, get) => ({
  builderType: "website",
  sectionsWebsite: initialWebsiteSections,
  sectionsProduct: initialProductSections,
  sections: initialWebsiteSections,
  history: [],
  future: [],
  currentDevice: "desktop",
  selectedBlock: null,

  setBuilderType: (type) =>
    set((state) => ({
      builderType: type,
      sections: type === "website" ? state.sectionsWebsite : state.sectionsProduct,
    })),

  setDevice: (device) => set({ currentDevice: device }),

  setSelectedBlock: (sectionId, blockId) => set({ selectedBlock: { sectionId, blockId } }),

  clearSelectedBlock: () => set({ selectedBlock: null }),

  addSection: (type, index) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = createSection(type);
      const insertAt = typeof index === "number" ? index : next.length;
      next.splice(insertAt, 0, section);

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        selectedBlock: null,
        ...pushHistory(state),
      };
    }),

  addVariantSection: (variant: any) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      if (state.builderType !== "product") return state;

      const next = cloneSections(currentSections);

      if (next.some((section) => section.blocks?.length > 0)) {
        return state;
      }

      if (variant?.kind === "multi-section" && Array.isArray(variant.sections)) {
        const newSections = variant.sections.map((section: any) => ({
          id: uid(),
          type:
            variant.id === "standard-product"
              ? "product-standard"
              : variant.id === "centered-product"
              ? "product-centered"
              : variant.id === "product-grid"
              ? "product-grid"
              : section.type || "section",
          blocks: (section.blocks || []).map((b: any) => {
            const base = createBlock(b.type);
            return {
              ...base,
              props: {
                ...base.props,
                ...(b.props || {}),
              },
            };
          }),
        }));

        return {
          sections: newSections,
          sectionsWebsite: state.sectionsWebsite,
          sectionsProduct: newSections,
          sections: newSections,
          selectedBlock: null,
          ...pushHistory(state),
        };
      }

      return state;
    }),

  addBlock: (sectionId, type, index) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      if (
        state.builderType === "product" &&
        PRODUCT_LAYOUT_VARIANT_IDS.has(type)
      ) {
        const variantMap: Record<string, any> = {
          "standard-product": {
            id: "standard-product",
            kind: "multi-section",
            sections: [
              {
                type: "product-standard",
                blocks: [
                  { type: "image" },
                  { type: "heading", props: { content: "Product Name" } },
                  { type: "text", props: { content: "₹999" } },
                  { type: "button", props: { content: "Add to Cart" } },
                ],
              },
            ],
          },
          "centered-product": {
            id: "centered-product",
            kind: "multi-section",
            sections: [
              {
                type: "product-centered",
                blocks: [
                  { type: "image" },
                  { type: "heading", props: { content: "Minimal Product" } },
                  { type: "text", props: { content: "₹799" } },
                  { type: "button", props: { content: "Buy Now" } },
                ],
              },
            ],
          },
          "product-grid": {
            id: "product-grid",
            kind: "multi-section",
            sections: [
              {
                type: "product-grid",
                blocks: [
                  { type: "heading", props: { content: "Our Products" } },
                  { type: "product-list" },
                ],
              },
            ],
          },
        };

        return get().addVariantSection(variantMap[type]), state;
      }

      const next = cloneSections(currentSections);
      const section = next.find((item) => item.id === sectionId);
      if (!section) return state;

      const block = createBlock(type);
      const insertAt =
        typeof index === "number"
          ? Math.max(0, Math.min(index, section.blocks.length))
          : section.blocks.length;

      section.blocks.splice(insertAt, 0, block);

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        selectedBlock: { sectionId, blockId: block.id },
        ...pushHistory(state),
      };
    }),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);

      let sourceSectionIndex = -1;
      let sourceBlockIndex = -1;

      for (let i = 0; i < next.length; i++) {
        const foundIndex = next[i].blocks.findIndex((block) => block.id === activeId);
        if (foundIndex !== -1) {
          sourceSectionIndex = i;
          sourceBlockIndex = foundIndex;
          break;
        }
      }

      if (sourceSectionIndex === -1 || sourceBlockIndex === -1) return state;

      const sourceSection = next[sourceSectionIndex];
      const [movedBlock] = sourceSection.blocks.splice(sourceBlockIndex, 1);

      const targetSection = next.find((section) => section.id === sectionId);
      if (!targetSection) return state;

      let targetIndex = targetSection.blocks.findIndex((block) => block.id === overId);
      if (targetIndex === -1) targetIndex = targetSection.blocks.length;

      if (sourceSection.id === targetSection.id && sourceBlockIndex < targetIndex) {
        targetIndex -= 1;
      }

      targetSection.blocks.splice(targetIndex, 0, movedBlock);

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        selectedBlock: { sectionId: targetSection.id, blockId: movedBlock.id },
        ...pushHistory(state),
      };
    }),

  updateBlock: (sectionId, blockId, updates) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = next.find((s) => s.id === sectionId);
      const block = section?.blocks.find((b) => b.id === blockId);
      if (!block) return state;

      const currentDevice = state.currentDevice;
      const currentStyle = block.props.style?.[currentDevice] || {};

      block.props.style = block.props.style || baseStyle();
      block.props.style[currentDevice] = {
        ...currentStyle,
        ...updates,
      };

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        ...pushHistory(state),
      };
    }),

  updateBlockProps: (sectionId, blockId, updates) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = next.find((s) => s.id === sectionId);
      const block = section?.blocks.find((b) => b.id === blockId);
      if (!block) return state;

      block.props = {
        ...block.props,
        ...updates,
      };

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        ...pushHistory(state),
      };
    }),

  updateBlockStyle: (sectionId, blockId, device, updates) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = next.find((s) => s.id === sectionId);
      const block = section?.blocks.find((b) => b.id === blockId);
      if (!block) return state;

      block.props.style = block.props.style || baseStyle();
      block.props.style[device] = {
        ...(block.props.style[device] || {}),
        ...updates,
      };

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        ...pushHistory(state),
      };
    }),

  resizeBlock: (sectionId, blockId, direction, delta) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = next.find((s) => s.id === sectionId);
      const block = section?.blocks.find((b) => b.id === blockId);
      if (!block) return state;

      const device = state.currentDevice;
      block.props.style = block.props.style || baseStyle();
      const style = block.props.style[device] || {};

      const currentWidth = parseInt(String(style.width || "100").replace("%", ""), 10);
      const currentMinHeight = parseInt(String(style.minHeight || "120").replace("px", ""), 10);

      if (direction === "left" || direction === "right") {
        const nextWidth = Math.max(20, Math.min(100, currentWidth + delta));
        block.props.style[device] = {
          ...style,
          width: `${nextWidth}%`,
        };
      }

      if (direction === "top" || direction === "bottom") {
        const nextMinHeight = Math.max(48, Math.min(1200, currentMinHeight + delta * 4));
        block.props.style[device] = {
          ...style,
          minHeight: `${nextMinHeight}px`,
        };
      }

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
      };
    }),

  duplicateBlock: (sectionId, blockId) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = next.find((s) => s.id === sectionId);
      if (!section) return state;

      const index = section.blocks.findIndex((b) => b.id === blockId);
      if (index === -1) return state;

      const copy = JSON.parse(JSON.stringify(section.blocks[index])) as Block;
      copy.id = uid();
      section.blocks.splice(index + 1, 0, copy);

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        selectedBlock: { sectionId, blockId: copy.id },
        ...pushHistory(state),
      };
    }),

  removeBlock: (sectionId, blockId) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

      const next = cloneSections(currentSections);
      const section = next.find((s) => s.id === sectionId);
      if (!section) return state;

      section.blocks = section.blocks.filter((b) => b.id !== blockId);

      return {
        sections: next,
        sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
        selectedBlock: state.selectedBlock?.blockId === blockId ? null : state.selectedBlock,
        ...pushHistory(state),
      };
    }),

  undo: () =>
    set((state) => {
      if (!state.history.length) return state;

      const previous = state.history[state.history.length - 1];

      return {
        sections: previous,
        sectionsWebsite: state.builderType === "website" ? previous : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? previous : state.sectionsProduct,
        history: state.history.slice(0, -1),
        future: [
          cloneSections(
            state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct
          ),
          ...state.future,
        ],
      };
    }),

  redo: () =>
    set((state) => {
      if (!state.future.length) return state;

      const nextFuture = state.future[0];

      return {
        sections: nextFuture,
        sectionsWebsite: state.builderType === "website" ? nextFuture : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? nextFuture : state.sectionsProduct,
        history: [
          ...state.history,
          cloneSections(
            state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct
          ),
        ],
        future: state.future.slice(1),
      };
    }),

  exportData: () => {
    const state = get();
    const currentSections =
      state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

    return {
      builderType: state.builderType,
      currentDevice: state.currentDevice,
      sections: currentSections,
    };
  },
}));