"use client";

import { create } from "zustand";
import { productLibrary } from "@/app/components/productLibrary";

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
  trend?: string;
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

export type LayoutChild = {
  id: string;
  type: string;
  role?: string;
  props: BlockProps;
  children?: LayoutChild[];
};

export type ProductLayoutInstance = {
  id: string;
  variantId: string;
  label?: string;
  layout?: string;
  frame: {
    desktop?: Style;
    tablet?: Style;
    mobile?: Style;
  };
  children: LayoutChild[];
};

export type SelectedNode =
  | { kind: "layout"; layoutId: string }
  | { kind: "child"; layoutId: string; childId: string }
  | null;

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

export type Region = {
  id: string;
  name: string;
  blocks: Block[];
};

export type Section = {
  id: string;
  type: string;
  layout?: string;  // NEW
  regions?: Region[];  // NEW
  blocks: Block[];  // Keep for backwards compatibility
};

export type BuilderSnapshot = {
  sectionsWebsite: Section[];
  sectionsProduct: Section[];
  productLayout: ProductLayoutInstance | null;
  activeLayoutId: string | null;
  currentVariant: any | null;
  hasRealProductLayout: boolean;
};

const cloneSnapshot = (snapshot: BuilderSnapshot): BuilderSnapshot =>
  JSON.parse(JSON.stringify(snapshot));

const makeSnapshot = (state: BuilderState): BuilderSnapshot => ({
  sectionsWebsite: cloneSections(state.sectionsWebsite),
  sectionsProduct: cloneSections(state.sectionsProduct),
  productLayout: state.productLayout
    ? JSON.parse(JSON.stringify(state.productLayout))
    : null,
  activeLayoutId: state.activeLayoutId,
  currentVariant: state.currentVariant,
  hasRealProductLayout: state.hasRealProductLayout,
});

const findChildById = (
  children: LayoutChild[] = [],
  childId: string
): LayoutChild | null => {
  for (const child of children) {
    if (child.id === childId) return child;
    const nested = findChildById(child.children || [], childId);
    if (nested) return nested;
  }
  return null;
};

const updateChildTree = (
  children: LayoutChild[] = [],
  childId: string,
  updater: (child: LayoutChild) => LayoutChild
): LayoutChild[] =>
  children.map((child) => {
    if (child.id === childId) return updater(child);
    if (child.children?.length) {
      return {
        ...child,
        children: updateChildTree(child.children, childId, updater),
      };
    }
    return child;
  });

const removeChildTree = (
  children: LayoutChild[] = [],
  childId: string
): LayoutChild[] =>
  children
    .filter((child) => child.id !== childId)
    .map((child) => ({
      ...child,
      children: child.children?.length
        ? removeChildTree(child.children, childId)
        : [],
    }));

const duplicateChildTree = (
  children: LayoutChild[] = [],
  childId: string
): LayoutChild[] =>
  children.flatMap((child) => {
    if (child.id === childId) {
      const copy: LayoutChild = JSON.parse(JSON.stringify(child));
      copy.id = uid();
      return [child, copy];
    }

    if (child.children?.length) {
      return [
        {
          ...child,
          children: duplicateChildTree(child.children, childId),
        },
      ];
    }

    return [child];
  });

const pushHistory = (state: BuilderState) => ({
  history: [...state.history, cloneSnapshot(makeSnapshot(state))],
  future: [],
});

type BuilderState = {
  builderType: "website" | "product";
  setBuilderType: (type: "website" | "product") => void;
 currentVariant: any | null;  // NEW
  sectionsWebsite: Section[];
  sectionsProduct: Section[];
    productLayout: ProductLayoutInstance | null;
  selectedNode: SelectedNode;
  setSelectedNode: (node: SelectedNode) => void;
  clearSelectedNode: () => void;
  sections: Section[];
  history: BuilderSnapshot[];
future: BuilderSnapshot[];
  currentDevice: Device;
  selectedBlock: { sectionId: string; blockId: string } | null;
  activeLayoutId: string | null;
  hasRealProductLayout: boolean;
    updateLayoutChildProps: (childId: string, updates: Partial<BlockProps>) => void;
  updateLayoutChildStyle: (
    childId: string,
    device: Device,
    updates: Partial<Style>
  ) => void;
  resizeLayoutChild: (
    childId: string,
    direction: "left" | "right" | "top" | "bottom",
    delta: number
  ) => void;
  removeLayoutChild: (childId: string) => void;
  duplicateLayoutChild: (childId: string) => void;

  setDevice: (device: Device) => void;
  setSelectedBlock: (sectionId: string, blockId: string) => void;
  clearSelectedBlock: () => void;

  addSection: (type: string, index?: number) => void;
  addBlock: (sectionId: string, type: string, index?: number) => void;
  addVariantSection: (variant: any) => void;
  addLayout: (layoutId: string) => void;
  replaceLayout: (layoutId: string) => void;
  clearCurrentBuilder: () => void;

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
  removeSection: (sectionId: string) => void;  // 👈 ADD THIS
  undo: () => void;
  redo: () => void;
  exportData: () => any;
};

const uid = () => crypto.randomUUID();

const cloneSections = (sections: Section[]) =>
  JSON.parse(JSON.stringify(sections)) as Section[];

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

const resolveProductVariant = (layoutId: string) => {
  for (const group of productLibrary || []) {
    const found = (group.variants || []).find((variant: any) => variant.id === layoutId);
    if (found) return found;
  }
  return null;
};

const hydrateVariantSections = (variant: any): Section[] => {
  if (!variant?.sections || !Array.isArray(variant.sections)) return [];

  return variant.sections.map((section: any) => {
    // Preserve regions if they exist, fallback to legacy blocks
    const regions = section.regions;
    const legacyBlocks = section.blocks || [];

    return {
      id: uid(),
      type: section.type || "section",
      layout: section.canvasLayout || "default",
      // NEW: Store regions OR flatten legacy blocks
      regions: regions
        ? regions.map((region: any) => ({
            id: uid(),
            name: region.name,
            blocks: (region.blocks || []).map((b: any) => {
              const base = createBlock(b.type);
              return {
                ...base,
                id: uid(),
                props: {
                  ...base.props,
                  ...(b.props || {}),
                },
              };
            }),
          }))
        : undefined,
      // BACKWARDS COMPATIBLE: Keep blocks for old layouts
      blocks: !regions
        ? (legacyBlocks || []).map((b: any) => {
            const base = createBlock(b.type);
            return {
              ...base,
              id: uid(),
              props: {
                ...base.props,
                ...(b.props || {}),
              },
            };
          })
        : [],
    };
  });
};

const hydrateLayoutChildren = (items: any[] = []): LayoutChild[] => {
  return items.map((item: any) => {
    const base = createBlock(item.type || "text");

    return {
      id: uid(),
      type: item.type || "text",
      role: item.role || item.name || undefined,
      props: {
        ...base.props,
        ...(item.props || {}),
      },
      children: Array.isArray(item.children)
        ? hydrateLayoutChildren(item.children)
        : [],
    };
  });
};

const hydrateProductLayout = (variant: any): ProductLayoutInstance | null => {
  if (!variant) return null;

  const rawChildren =
    Array.isArray(variant.children) && variant.children.length
      ? variant.children
      : Array.isArray(variant.sections)
      ? variant.sections.map((section: any) => ({
          type: "layout-region",
          role: section.canvasLayout || section.type || "section",
          props: {
            style: baseStyle({
              width: "100%",
              minHeight: "120px",
            }),
          },
          children: Array.isArray(section.regions)
            ? section.regions.map((region: any) => ({
                type: "layout-group",
                role: region.name,
                props: {
                  style: baseStyle({
                    width: "100%",
                    minHeight: "80px",
                  }),
                },
                children: (region.blocks || []).map((b: any) => ({
                  type: b.type,
                  role: b.role || region.name,
                  props: b.props || {},
                })),
              }))
            : (section.blocks || []).map((b: any) => ({
                type: b.type,
                props: b.props || {},
              })),
        }))
      : [];

  return {
    id: uid(),
    variantId: variant.id,
    label: variant.label || variant.title || "Product Layout",
    layout: variant.canvasLayout || variant.layout || "default",
    frame: baseStyle({
      width: "100%",
      minHeight: "520px",
      padding: "24px",
      borderRadius: "24px",
      backgroundColor: "#ffffff",
    }),
    children: hydrateLayoutChildren(rawChildren),
  };
};

const hasProductLayoutContent = (
  sections: Section[],
  productLayout?: ProductLayoutInstance | null
) => {
  if (productLayout?.children?.length) return true;

  return sections.some((section) => {
    const hasFlatBlocks =
      Array.isArray(section.blocks) &&
      section.blocks.some((block) => {
        const t = String(block?.type || "");
        return (
          t.startsWith("product-") ||
          t === "product" ||
          t === "product-list" ||
          t === "cart" ||
          t === "checkout" ||
          t === "table" ||
          t === "stats"
        );
      });

    const hasRegionBlocks =
      Array.isArray(section.regions) &&
      section.regions.some(
        (region) => Array.isArray(region.blocks) && region.blocks.length > 0
      );

    return hasFlatBlocks || hasRegionBlocks;
  });
};



export const useBuilder = create<BuilderState>((set, get) => ({
  builderType: "website",
  currentVariant: null,
    productLayout: null,
  selectedNode: null,

  sectionsWebsite: initialWebsiteSections,
  sectionsProduct: initialProductSections,
  sections: initialWebsiteSections,
  history: [],
  future: [],
  currentDevice: "desktop",
  selectedBlock: null,
  activeLayoutId: null,
  hasRealProductLayout: false,

  

   setBuilderType: (type) =>
    set((state) => ({
      builderType: type,
      sections: type === "website" ? state.sectionsWebsite : state.sectionsProduct,
      hasRealProductLayout:
        type === "product"
          ? hasProductLayoutContent(state.sectionsProduct, state.productLayout)
          : false,
    })),

  setDevice: (device) => set({ currentDevice: device }),

  setSelectedBlock: (sectionId, blockId) => set({ selectedBlock: { sectionId, blockId } }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  clearSelectedNode: () => set({ selectedNode: null }),
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
        hasRealProductLayout:
  state.builderType === "product"
    ? hasProductLayoutContent(next, state.productLayout)
    : state.hasRealProductLayout,
        ...pushHistory(state),
      };
    }),

    addVariantSection: (variant: any) =>
    set((state) => {
      if (state.builderType !== "product") return state;

      const editableSections = hydrateVariantSections(variant);
      const layoutInstance = hydrateProductLayout(variant);

      return {
        sections: editableSections,
        sectionsWebsite: state.sectionsWebsite,
        sectionsProduct: editableSections,
        productLayout: layoutInstance,
        selectedNode: layoutInstance
          ? { kind: "layout", layoutId: layoutInstance.id }
          : null,
        selectedBlock: null,
        activeLayoutId: variant?.id || null,
        currentVariant: variant,
        hasRealProductLayout: true,
        ...pushHistory(state),
      };
    }),

    addLayout: (layoutId: string) =>
    set((state) => {
      if (state.builderType !== "product") return state;
      const variant = resolveProductVariant(layoutId);
      if (!variant) return state;

      const editableSections = hydrateVariantSections(variant);
      const layoutInstance = hydrateProductLayout(variant);

      return {
        sections: editableSections,
        sectionsWebsite: state.sectionsWebsite,
        sectionsProduct: editableSections,
        productLayout: layoutInstance,
        selectedNode: layoutInstance
          ? { kind: "layout", layoutId: layoutInstance.id }
          : null,
        selectedBlock: null,
        activeLayoutId: layoutId,
        currentVariant: variant,
        hasRealProductLayout: true,
        ...pushHistory(state),
      };
    }),

  replaceLayout: (layoutId: string) =>
    set((state) => {
      if (state.builderType !== "product") return state;
      const variant = resolveProductVariant(layoutId);
      if (!variant) return state;

      const editableSections = hydrateVariantSections(variant);
      const layoutInstance = hydrateProductLayout(variant);

      return {
        sections: editableSections,
        sectionsWebsite: state.sectionsWebsite,
        sectionsProduct: editableSections,
        productLayout: layoutInstance,
        selectedNode: layoutInstance
          ? { kind: "layout", layoutId: layoutInstance.id }
          : null,
        selectedBlock: null,
        activeLayoutId: layoutId,
        currentVariant: variant,
        hasRealProductLayout: true,
        ...pushHistory(state),
      };
    }),

  clearCurrentBuilder: () =>
    set((state) => {
      const resetSections =
        state.builderType === "website" ? cloneSections(initialWebsiteSections) : cloneSections(initialProductSections);

           return {
        sections: resetSections,
        sectionsWebsite: state.builderType === "website" ? resetSections : state.sectionsWebsite,
        sectionsProduct: state.builderType === "product" ? resetSections : state.sectionsProduct,
        productLayout: state.builderType === "product" ? null : state.productLayout,
        selectedNode: null,
        selectedBlock: null,
        activeLayoutId: state.builderType === "product" ? null : state.activeLayoutId,
        hasRealProductLayout: state.builderType === "product" ? false : state.hasRealProductLayout,
        ...pushHistory(state),
        currentVariant: state.builderType === "product" ? null : state.currentVariant,
      };

    }),

  addBlock: (sectionId, type, index) =>
    set((state) => {
      const currentSections =
        state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

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
        hasRealProductLayout:
  state.builderType === "product"
    ? hasProductLayoutContent(next, state.productLayout)
    : state.hasRealProductLayout,
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
        hasRealProductLayout:
  state.builderType === "product"
    ? hasProductLayoutContent(next, state.productLayout)
    : state.hasRealProductLayout,
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

updateLayoutChildProps: (childId, updates) =>
  set((state) => {
    if (!state.productLayout) return state;

    const nextLayout: ProductLayoutInstance = {
      ...state.productLayout,
      children: updateChildTree(state.productLayout.children, childId, (child) => ({
        ...child,
        props: {
          ...child.props,
          ...updates,
        },
      })),
    };

    return {
      productLayout: nextLayout,
      selectedNode: { kind: "child", layoutId: nextLayout.id, childId },
      hasRealProductLayout: hasProductLayoutContent(state.sectionsProduct, nextLayout),
      ...pushHistory(state),
    };
  }),

updateLayoutChildStyle: (childId, device, updates) =>
  set((state) => {
    if (!state.productLayout) return state;

    const nextLayout: ProductLayoutInstance = {
      ...state.productLayout,
      children: updateChildTree(state.productLayout.children, childId, (child) => ({
        ...child,
        props: {
          ...child.props,
          style: {
            ...(child.props.style || baseStyle()),
            [device]: {
              ...((child.props.style || baseStyle())[device] || {}),
              ...updates,
            },
          },
        },
      })),
    };

    return {
  productLayout: nextLayout,
  selectedNode: { kind: "child", layoutId: nextLayout.id, childId },
  hasRealProductLayout: hasProductLayoutContent(state.sectionsProduct, nextLayout),
  ...pushHistory(state),
};
  }),

resizeLayoutChild: (childId, direction, delta) =>
  set((state) => {
    if (!state.productLayout) return state;

    const device = state.currentDevice;

    const nextLayout: ProductLayoutInstance = {
      ...state.productLayout,
      children: updateChildTree(state.productLayout.children, childId, (child) => {
        const styleMap = child.props.style || baseStyle();
        const style = styleMap[device] || {};
        const currentWidth = parseInt(String(style.width || "100").replace("%", ""), 10);
        const currentMinHeight = parseInt(String(style.minHeight || "48").replace("px", ""), 10);

        let nextStyle = { ...style };

        if (direction === "left" || direction === "right") {
          nextStyle.width = `${Math.max(10, Math.min(100, currentWidth + delta))}%`;
        }

        if (direction === "top" || direction === "bottom") {
          nextStyle.minHeight = `${Math.max(24, Math.min(1200, currentMinHeight + delta * 2))}px`;
        }

        return {
          ...child,
          props: {
            ...child.props,
            style: {
              ...styleMap,
              [device]: nextStyle,
            },
          },
        };
      }),
    };

    return {
  productLayout: nextLayout,
  selectedNode: { kind: "child", layoutId: nextLayout.id, childId },
  hasRealProductLayout: hasProductLayoutContent(state.sectionsProduct, nextLayout),
  ...pushHistory(state),
};
  }),

removeLayoutChild: (childId) =>
  set((state) => {
    if (!state.productLayout) return state;

    const nextLayout: ProductLayoutInstance = {
      ...state.productLayout,
      children: removeChildTree(state.productLayout.children, childId),
    };

   return {
  productLayout: nextLayout,
  selectedNode:
    state.selectedNode?.kind === "child" && state.selectedNode.childId === childId
      ? { kind: "layout", layoutId: nextLayout.id }
      : state.selectedNode,
  hasRealProductLayout: hasProductLayoutContent(state.sectionsProduct, nextLayout),
  ...pushHistory(state),
};
  }),

duplicateLayoutChild: (childId) =>
  set((state) => {
    if (!state.productLayout) return state;

    const nextLayout: ProductLayoutInstance = {
      ...state.productLayout,
      children: duplicateChildTree(state.productLayout.children, childId),
    };

    return {
  productLayout: nextLayout,
  selectedNode: state.selectedNode,
  hasRealProductLayout: hasProductLayoutContent(state.sectionsProduct, nextLayout),
  ...pushHistory(state),
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
        hasRealProductLayout:
  state.builderType === "product"
    ? hasProductLayoutContent(next, state.productLayout)
    : state.hasRealProductLayout,
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
        hasRealProductLayout:
  state.builderType === "product"
    ? hasProductLayoutContent(next, state.productLayout)
    : state.hasRealProductLayout,
        ...pushHistory(state),
      };
    }),

   removeSection: (sectionId) =>
  set((state) => {
    const currentSections =
      state.builderType === "website" ? state.sectionsWebsite : state.sectionsProduct;

    const filtered = currentSections.filter((s: any) => s.id !== sectionId);

    const next =
      state.builderType === "product" && filtered.length === 0
        ? cloneSections(initialProductSections)
        : filtered;

        return {
      sections: next,
      sectionsWebsite: state.builderType === "website" ? next : state.sectionsWebsite,
      sectionsProduct: state.builderType === "product" ? next : state.sectionsProduct,
      productLayout: state.builderType === "product" ? null : state.productLayout,
      selectedNode: null,
      selectedBlock: null,
      activeLayoutId: state.builderType === "product" ? null : state.activeLayoutId,
      currentVariant: state.builderType === "product" ? null : state.currentVariant,
      hasRealProductLayout:
        state.builderType === "product"
          ? hasProductLayoutContent(next, null)
          : state.hasRealProductLayout,
      ...pushHistory(state),
    };
  }),

   undo: () =>
  set((state) => {
    if (!state.history.length) return state;

    const previous = state.history[state.history.length - 1];
    const currentSnapshot = makeSnapshot(state);

    return {
      sections:
        state.builderType === "website"
          ? previous.sectionsWebsite
          : previous.sectionsProduct,
      sectionsWebsite: previous.sectionsWebsite,
      sectionsProduct: previous.sectionsProduct,
      productLayout: previous.productLayout,
      activeLayoutId: previous.activeLayoutId,
      currentVariant: previous.currentVariant,
      hasRealProductLayout: previous.hasRealProductLayout,
      selectedNode: null,
      selectedBlock: null,
      history: state.history.slice(0, -1),
      future: [cloneSnapshot(currentSnapshot), ...state.future],
    };
  }),

redo: () =>
  set((state) => {
    if (!state.future.length) return state;

    const nextFuture = state.future[0];
    const currentSnapshot = makeSnapshot(state);

    return {
      sections:
        state.builderType === "website"
          ? nextFuture.sectionsWebsite
          : nextFuture.sectionsProduct,
      sectionsWebsite: nextFuture.sectionsWebsite,
      sectionsProduct: nextFuture.sectionsProduct,
      productLayout: nextFuture.productLayout,
      activeLayoutId: nextFuture.activeLayoutId,
      currentVariant: nextFuture.currentVariant,
      hasRealProductLayout: nextFuture.hasRealProductLayout,
      selectedNode: null,
      selectedBlock: null,
      history: [...state.history, cloneSnapshot(currentSnapshot)],
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
      activeLayoutId: state.activeLayoutId,
      currentVariant: state.currentVariant,
      productLayout: state.productLayout,
      selectedNode: state.selectedNode,
      hasRealProductLayout: state.hasRealProductLayout,
      sections: currentSections,
    };
  },
}));