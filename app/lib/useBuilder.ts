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
  images?: string[];
  compareAt?: string;
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

type BuilderMode = "website" | "product";

type SelectedBlock = {
  sectionId: string;
  blockId: string;
} | null;

type BuilderState = {
  builderType: BuilderMode;
  setBuilderType: (type: BuilderMode) => void;

  sectionsWebsite: Section[];
  sectionsProduct: Section[];

  sections: Section[];
  history: Section[][];
  future: Section[][];
  currentDevice: Device;
  selectedBlock: SelectedBlock;

  setDevice: (device: Device) => void;
  setSelectedBlock: (sectionId: string, blockId: string) => void;
  clearSelectedBlock: () => void;

  addSection: (type: string, index?: number) => void;
  removeSection: (sectionId: string) => void;

  addBlock: (sectionId: string, type: string, index?: number) => void;
  moveBlock: (sectionId: string, activeId: string, overId: string) => void;

  updateBlock: (
    sectionId: string,
    blockId: string,
    updates: Partial<Block>
  ) => void;

  updateBlockProps: (
    sectionId: string,
    blockId: string,
    updates: Partial<BlockProps>
  ) => void;

  updateBlockStyle: (
    sectionId: string,
    blockId: string,
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

  addVariantSection: () => void;

  undo: () => void;
  redo: () => void;
  reset: () => void;
};

const uid = () => Math.random().toString(36).slice(2, 11);

const parseSize = (value?: string, fallback = 0) => {
  if (!value) return fallback;
  const num = parseFloat(String(value).replace("px", ""));
  return Number.isFinite(num) ? num : fallback;
};

const px = (value: number, min = 0) => `${Math.max(min, Math.round(value))}px`;

const createStyle = (desktop?: Partial<Style>): BlockProps["style"] => ({
  desktop: {
    padding: "16px",
    ...desktop,
  },
  tablet: {},
  mobile: {},
});

const createBlock = (type: string): Block => {
  const id = uid();

  const map: Record<string, Block> = {
    heading: {
      id,
      type,
      props: {
        content: "Write a clear headline",
        style: createStyle({
          fontSize: "42px",
          fontWeight: "800",
          lineHeight: "1.1",
          color: "#111827",
        }),
      },
    },
    text: {
      id,
      type,
      props: {
        content: "Add supporting text for this section.",
        style: createStyle({
          fontSize: "16px",
          lineHeight: "1.7",
          color: "#475569",
        }),
      },
    },
    paragraph: {
      id,
      type,
      props: {
        content: "Add supporting paragraph content here.",
        style: createStyle({
          fontSize: "16px",
          lineHeight: "1.7",
          color: "#475569",
        }),
      },
    },
    button: {
      id,
      type,
      props: {
        content: "Click here",
        style: createStyle({
          backgroundColor: "#111827",
          color: "#ffffff",
          padding: "12px 18px",
          borderRadius: "12px",
          width: "fit-content",
        }),
      },
    },
    submit: {
      id,
      type,
      props: {
        content: "Submit",
        style: createStyle({
          backgroundColor: "#111827",
          color: "#ffffff",
          padding: "12px 18px",
          borderRadius: "12px",
          width: "fit-content",
        }),
      },
    },
    badge: {
      id,
      type,
      props: {
        content: "New",
        style: createStyle({
          backgroundColor: "#fef3c7",
          color: "#92400e",
          padding: "8px 12px",
          borderRadius: "999px",
          width: "fit-content",
        }),
      },
    },
    image: {
      id,
      type,
      props: {
        src: "https://picsum.photos/1200/700",
        alt: "Image block",
        style: createStyle({
          minHeight: "260px",
          borderRadius: "16px",
          objectFit: "cover",
        }),
      },
    },
    "image-block": {
      id,
      type,
      props: {
        src: "https://picsum.photos/1200/760",
        alt: "Image block",
        title: "Image title",
        description: "Short image description",
        style: createStyle({
          padding: "0px",
        }),
      },
    },
    video: {
      id,
      type,
      props: {
        title: "Video title",
        description: "Short video description",
        poster: "https://picsum.photos/1200/760?grayscale",
        style: createStyle({
          padding: "0px",
        }),
      },
    },
    list: {
      id,
      type,
      props: {
        items: ["First item", "Second item", "Third item"],
        style: createStyle(),
      },
    },
    divider: {
      id,
      type,
      props: {
        style: createStyle({
          padding: "8px 0px",
        }),
      },
    },
    quote: {
      id,
      type,
      props: {
        content: "A memorable quote goes here.",
        subtitle: "Author name",
        style: createStyle({
          padding: "8px 0px",
        }),
      },
    },
    card: {
      id,
      type,
      props: {
        title: "Card title",
        content: "Card content",
        style: createStyle({
          padding: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
        }),
      },
    },
    stats: {
      id,
      type,
      props: {
        stats: [
          { label: "Users", value: "12k" },
          { label: "Growth", value: "24%" },
          { label: "Revenue", value: "₹2.4L" },
        ],
        style: createStyle(),
      },
    },
    navbar: {
      id,
      type,
      props: {
        title: "Brand",
        links: [
          { label: "Home", href: "#" },
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ],
        style: createStyle({
          padding: "16px",
        }),
      },
    },
    hero: {
      id,
      type,
      props: {
        badge: "New launch",
        title: "Build faster with flexible sections",
        subtitle: "Create responsive pages with blocks you can move, style, and resize.",
        buttons: [
          { label: "Get started", href: "#", variant: "primary" },
          { label: "Learn more", href: "#", variant: "secondary" },
        ],
        style: createStyle({
          padding: "32px",
          minHeight: "280px",
        }),
      },
    },
    features: {
      id,
      type,
      props: {
        title: "Features",
        columns: [
          { title: "Fast", content: "Quick setup and editing" },
          { title: "Flexible", content: "Reusable blocks and layouts" },
          { title: "Responsive", content: "Device-aware styling" },
        ],
        style: createStyle(),
      },
    },
    pricing: {
      id,
      type,
      props: {
        title: "Pricing",
        columns: [
          { title: "Starter", content: "₹499", items: ["1 site", "Basic support"] },
          { title: "Pro", content: "₹999", items: ["5 sites", "Priority support"] },
          { title: "Scale", content: "₹1999", items: ["Unlimited", "Team access"] },
        ],
        style: createStyle(),
      },
    },
    testimonials: {
      id,
      type,
      props: {
        title: "What customers say",
        testimonials: [
          { quote: "This builder is smooth and fast.", name: "Aman" },
          { quote: "Editing sections feels easy.", name: "Riya" },
        ],
        style: createStyle(),
      },
    },
    cta: {
      id,
      type,
      props: {
        title: "Ready to start?",
        subtitle: "Launch your page in minutes.",
        buttons: [{ label: "Start now", href: "#", variant: "primary" }],
        style: createStyle({
          padding: "24px",
          backgroundColor: "#f8fafc",
          borderRadius: "16px",
        }),
      },
    },
    footer: {
      id,
      type,
      props: {
        title: "Footer",
        content: "© 2026 Your brand",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
        style: createStyle({
          padding: "20px 16px",
        }),
      },
    },
    input: {
      id,
      type,
      props: {
        label: "Input label",
        placeholder: "Enter value",
        style: createStyle(),
      },
    },
    textarea: {
      id,
      type,
      props: {
        label: "Message",
        placeholder: "Write something...",
        style: createStyle(),
      },
    },
    select: {
      id,
      type,
      props: {
        label: "Choose option",
        options: ["Option 1", "Option 2", "Option 3"],
        style: createStyle(),
      },
    },
    checkbox: {
      id,
      type,
      props: {
        label: "I agree to terms",
        checked: false,
        style: createStyle(),
      },
    },
    product: {
      id,
      type,
      props: {
        title: "Product title",
        description: "Short product description",
        src: "https://picsum.photos/800/500",
        alt: "Product image",
        price: "₹999",
        style: createStyle({
          padding: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
        }),
      },
    },
    "product-list": {
      id,
      type,
      props: {
        title: "Featured products",
        products: [
          { title: "Product one", price: "₹999", image: "https://picsum.photos/600/600?1" },
          { title: "Product two", price: "₹1299", image: "https://picsum.photos/600/600?2" },
          { title: "Product three", price: "₹899", image: "https://picsum.photos/600/600?3" },
        ],
        style: createStyle(),
      },
    },
    cart: {
      id,
      type,
      props: {
        title: "Cart summary",
        items: ["Product A × 1", "Product B × 2"],
        price: "₹2,799",
        style: createStyle({
          padding: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
        }),
      },
    },
    checkout: {
      id,
      type,
      props: {
        title: "Checkout",
        subtitle: "Enter payment details",
        style: createStyle({
          padding: "16px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
        }),
      },
    },
    "blog-list": {
      id,
      type,
      props: {
        title: "Latest posts",
        posts: [
          { title: "Post one", excerpt: "Short summary for article one." },
          { title: "Post two", excerpt: "Short summary for article two." },
        ],
        style: createStyle(),
      },
    },
    "blog-post": {
      id,
      type,
      props: {
        title: "Blog post title",
        subtitle: "Published April 2026",
        content: "Write your article content here.",
        style: createStyle({
          padding: "16px 0px",
        }),
      },
    },
    faq: {
      id,
      type,
      props: {
        title: "Frequently asked questions",
        faqs: [
          { question: "What is this?", answer: "This is a flexible content block." },
          { question: "Can I edit it?", answer: "Yes, all content is editable." },
        ],
        style: createStyle(),
      },
    },
    table: {
      id,
      type,
      props: {
        title: "Table block",
        columns: [
          { title: "Name", items: ["A", "B", "C"] },
          { title: "Role", items: ["Dev", "Design", "PM"] },
          { title: "Status", items: ["Active", "Active", "Pending"] },
        ],
        style: createStyle(),
      },
    },
    "product-title": {
      id,
      type,
      props: {
        content: "Premium Product Name",
        style: createStyle({
          fontSize: "32px",
          fontWeight: "800",
          lineHeight: "1.15",
          color: "#111827",
        }),
      },
    },
    "product-description": {
      id,
      type,
      props: {
        content: "Describe the product, material, quality, and delivery promise.",
        style: createStyle({
          fontSize: "16px",
          lineHeight: "1.7",
          color: "#475569",
        }),
      },
    },
    "product-image": {
      id,
      type,
      props: {
        src: "https://picsum.photos/1000/1000?product",
        alt: "Product image",
        style: createStyle({
          minHeight: "320px",
          borderRadius: "16px",
          objectFit: "cover",
        }),
      },
    },
    "product-gallery": {
      id,
      type,
      props: {
        images: [
          "https://picsum.photos/900/900?random=21",
          "https://picsum.photos/900/900?random=22",
          "https://picsum.photos/900/900?random=23",
          "https://picsum.photos/900/900?random=24",
        ],
        style: createStyle(),
      },
    },
    price: {
      id,
      type,
      props: {
        price: "₹999",
        style: createStyle({
          fontSize: "26px",
          fontWeight: "800",
          color: "#111827",
        }),
      },
    },
    "discount-price": {
      id,
      type,
      props: {
        price: "₹999",
        compareAt: "₹1,299",
        style: createStyle(),
      },
    },
    "add-to-cart": {
      id,
      type,
      props: {
        content: "Add to cart",
        style: createStyle({
          backgroundColor: "#111827",
          color: "#ffffff",
          padding: "14px 18px",
          borderRadius: "12px",
          width: "100%",
        }),
      },
    },
    "buy-now": {
      id,
      type,
      props: {
        content: "Buy now",
        style: createStyle({
          backgroundColor: "#f3f4f6",
          color: "#111827",
          padding: "14px 18px",
          borderRadius: "12px",
          width: "100%",
          border: "1px solid #d1d5db",
        }),
      },
    },
    wishlist: {
      id,
      type,
      props: {
        content: "Save to wishlist",
        style: createStyle({
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "12px 16px",
          borderRadius: "12px",
          width: "100%",
          border: "1px solid #e5e7eb",
        }),
      },
    },
    "quantity-selector": {
      id,
      type,
      props: {
        label: "Quantity",
        style: createStyle(),
      },
    },
    spacer: {
      id,
      type,
      isSpacer: true,
      props: {
        style: createStyle({
          minHeight: "60px",
        }),
      },
    },
  };

  return map[type] || {
    id,
    type,
    props: {
      content: `${type} block`,
      style: createStyle(),
    },
  };
};

const createSection = (type: string): Section => {
  const id = uid();

  const sectionMap: Record<string, Section> = {
    hero: {
      id,
      type,
      blocks: [createBlock("hero")],
    },
    content: {
      id,
      type,
      blocks: [createBlock("heading"), createBlock("text")],
    },
    features: {
      id,
      type,
      blocks: [createBlock("features")],
    },
    pricing: {
      id,
      type,
      blocks: [createBlock("pricing")],
    },
    testimonials: {
      id,
      type,
      blocks: [createBlock("testimonials")],
    },
    faq: {
      id,
      type,
      blocks: [createBlock("faq")],
    },
    footer: {
      id,
      type,
      blocks: [createBlock("footer")],
    },
    productHero: {
      id,
      type,
      blocks: [createBlock("product-gallery"), createBlock("product-title"), createBlock("discount-price"), createBlock("product-description"), createBlock("quantity-selector"), createBlock("add-to-cart"), createBlock("buy-now"), createBlock("wishlist")],
    },
    products: {
      id,
      type,
      blocks: [createBlock("product-list")],
    },
    blog: {
      id,
      type,
      blocks: [createBlock("blog-list")],
    },
    form: {
      id,
      type,
      blocks: [createBlock("input"), createBlock("textarea"), createBlock("submit")],
    },
  };

  return sectionMap[type] || {
    id,
    type,
    blocks: [],
  };
};

const defaultWebsiteSections: Section[] = [
  createSection("hero"),
  createSection("features"),
  createSection("footer"),
];

const defaultProductSections: Section[] = [
  createSection("productHero"),
  createSection("faq"),
];

const cloneSections = (sections: Section[]) =>
  JSON.parse(JSON.stringify(sections)) as Section[];

const getSectionsForType = (
  type: BuilderMode,
  website: Section[],
  product: Section[]
) => (type === "product" ? product : website);

const setSectionsForType = (
  state: BuilderState,
  type: BuilderMode,
  sections: Section[]
) => {
  const cloned = cloneSections(sections);

  if (type === "product") {
    return {
      ...state,
      sectionsProduct: cloned,
      sections: cloned,
    };
  }

  return {
    ...state,
    sectionsWebsite: cloned,
    sections: cloned,
  };
};

const pushHistory = (state: BuilderState, current: Section[]) => ({
  history: [...state.history, cloneSections(current)],
  future: [],
});

const mutateActiveSections = (
  state: BuilderState,
  recipe: (sections: Section[]) => Section[]
) => {
  const current = getSectionsForType(
    state.builderType,
    state.sectionsWebsite,
    state.sectionsProduct
  );

  const next = recipe(cloneSections(current));

  return {
    ...setSectionsForType(state, state.builderType, next),
    ...pushHistory(state, current),
  };
};

export const useBuilder = create<BuilderState>((set, get) => ({
  builderType: "website",
  sectionsWebsite: cloneSections(defaultWebsiteSections),
  sectionsProduct: cloneSections(defaultProductSections),
  sections: cloneSections(defaultWebsiteSections),
  history: [],
  future: [],
  currentDevice: "desktop",
  selectedBlock: null,

  setBuilderType: (type) =>
    set((state) => {
      const sections =
        type === "product" ? state.sectionsProduct : state.sectionsWebsite;

      return {
        builderType: type,
        sections: cloneSections(sections),
        selectedBlock: null,
      };
    }),

  setDevice: (device) => set({ currentDevice: device }),

  setSelectedBlock: (sectionId, blockId) =>
    set({
      selectedBlock: { sectionId, blockId },
    }),

  clearSelectedBlock: () => set({ selectedBlock: null }),

  addSection: (type, index) =>
    set((state) =>
      mutateActiveSections(state, (sections) => {
        const newSection = createSection(type);

        if (typeof index === "number" && index >= 0 && index <= sections.length) {
          sections.splice(index, 0, newSection);
        } else {
          sections.push(newSection);
        }

        return sections;
      })
    ),

  removeSection: (sectionId) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.filter((section) => section.id !== sectionId)
      )
    ),

  addBlock: (sectionId, type, index) =>
    set((state) =>
      mutateActiveSections(state, (sections) => {
        return sections.map((section) => {
          if (section.id !== sectionId) return section;

          const nextBlocks = [...section.blocks];
          const newBlock = createBlock(type);

          if (typeof index === "number" && index >= 0 && index <= nextBlocks.length) {
            nextBlocks.splice(index, 0, newBlock);
          } else {
            nextBlocks.push(newBlock);
          }

          return {
            ...section,
            blocks: nextBlocks,
          };
        });
      })
    ),

  moveBlock: (sectionId, activeId, overId) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          const oldIndex = section.blocks.findIndex((b) => b.id === activeId);
          const newIndex = section.blocks.findIndex((b) => b.id === overId);

          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
            return section;
          }

          const nextBlocks = [...section.blocks];
          const [moved] = nextBlocks.splice(oldIndex, 1);
          nextBlocks.splice(newIndex, 0, moved);

          return {
            ...section,
            blocks: nextBlocks,
          };
        })
      )
    ),

  updateBlock: (sectionId, blockId, updates) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            blocks: section.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    ...updates,
                    props: {
                      ...block.props,
                      ...(updates.props || {}),
                    },
                  }
                : block
            ),
          };
        })
      )
    ),

  updateBlockProps: (sectionId, blockId, updates) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            blocks: section.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    props: {
                      ...block.props,
                      ...updates,
                    },
                  }
                : block
            ),
          };
        })
      )
    ),

  updateBlockStyle: (sectionId, blockId, updates) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id !== blockId) return block;

              const existingStyle = block.props.style || {};
              const deviceStyle = existingStyle[state.currentDevice] || {};

              return {
                ...block,
                props: {
                  ...block.props,
                  style: {
                    ...existingStyle,
                    [state.currentDevice]: {
                      ...deviceStyle,
                      ...updates,
                    },
                  },
                },
              };
            }),
          };
        })
      )
    ),

  resizeBlock: (sectionId, blockId, direction, delta) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id !== blockId) return block;

              const blockStyle = block.props.style || {};
              const current = blockStyle[state.currentDevice] || {};

              const width = parseSize(current.width, 0);
              const minHeight = parseSize(current.minHeight, 120);
              const height = parseSize(current.height, 0);

              let next: Partial<Style> = {};

              if (direction === "left" || direction === "right") {
                const baseWidth = width || 320;
                next.width = px(baseWidth + delta, 80);
              }

              if (direction === "top" || direction === "bottom") {
                if (height) {
                  next.height = px(height + delta, 40);
                } else {
                  next.minHeight = px(minHeight + delta, 40);
                }
              }

              return {
                ...block,
                props: {
                  ...block.props,
                  style: {
                    ...blockStyle,
                    [state.currentDevice]: {
                      ...current,
                      ...next,
                    },
                  },
                },
              };
            }),
          };
        })
      )
    ),

  duplicateBlock: (sectionId, blockId) =>
    set((state) =>
      mutateActiveSections(state, (sections) =>
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          const index = section.blocks.findIndex((b) => b.id === blockId);
          if (index === -1) return section;

          const original = section.blocks[index];
          const copy: Block = {
            ...cloneSections([{ id: "x", type: "x", blocks: [original] }])[0].blocks[0],
            id: uid(),
          };

          const nextBlocks = [...section.blocks];
          nextBlocks.splice(index + 1, 0, copy);

          return {
            ...section,
            blocks: nextBlocks,
          };
        })
      )
    ),

  removeBlock: (sectionId, blockId) =>
    set((state) =>
      mutateActiveSections(state, (sections) => {
        const nextSections = sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            blocks: section.blocks.filter((block) => block.id !== blockId),
          };
        });

        return nextSections;
      })
    ),

  addVariantSection: () =>
    set((state) =>
      mutateActiveSections(state, (sections) => {
        const variant: Section = {
          id: uid(),
          type: state.builderType === "product" ? "productVariant" : "variant",
          blocks:
            state.builderType === "product"
              ? [
                  createBlock("product-image"),
                  createBlock("product-title"),
                  createBlock("discount-price"),
                  createBlock("quantity-selector"),
                  createBlock("add-to-cart"),
                ]
              : [createBlock("heading"), createBlock("text"), createBlock("button")],
        };

        sections.push(variant);
        return sections;
      })
    ),

  undo: () =>
    set((state) => {
      if (!state.history.length) return state;

      const current = getSectionsForType(
        state.builderType,
        state.sectionsWebsite,
        state.sectionsProduct
      );

      const previous = state.history[state.history.length - 1];
      const nextHistory = state.history.slice(0, -1);

      const base = {
        history: nextHistory,
        future: [...state.future, cloneSections(current)],
        selectedBlock: null,
      };

      if (state.builderType === "product") {
        return {
          ...state,
          ...base,
          sectionsProduct: cloneSections(previous),
          sections: cloneSections(previous),
        };
      }

      return {
        ...state,
        ...base,
        sectionsWebsite: cloneSections(previous),
        sections: cloneSections(previous),
      };
    }),

  redo: () =>
    set((state) => {
      if (!state.future.length) return state;

      const current = getSectionsForType(
        state.builderType,
        state.sectionsWebsite,
        state.sectionsProduct
      );

      const next = state.future[state.future.length - 1];
      const nextFuture = state.future.slice(0, -1);

      const base = {
        history: [...state.history, cloneSections(current)],
        future: nextFuture,
        selectedBlock: null,
      };

      if (state.builderType === "product") {
        return {
          ...state,
          ...base,
          sectionsProduct: cloneSections(next),
          sections: cloneSections(next),
        };
      }

      return {
        ...state,
        ...base,
        sectionsWebsite: cloneSections(next),
        sections: cloneSections(next),
      };
    }),

  reset: () =>
    set((state) => {
      const website = cloneSections(defaultWebsiteSections);
      const product = cloneSections(defaultProductSections);
      const active = state.builderType === "product" ? product : website;

      return {
        sectionsWebsite: website,
        sectionsProduct: product,
        sections: active,
        history: [],
        future: [],
        selectedBlock: null,
      };
    }),
}));