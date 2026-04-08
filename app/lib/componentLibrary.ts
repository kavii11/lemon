import {
  Layout,
  Type,
  Image,
  Square,
  Columns,
  ShoppingCart,
  FileText,
  FormInput,
  Video,
  Layers,
  Grid,
  List,
  Menu,
  PanelTop,
  Badge,
  GalleryHorizontal,
  MessageSquareQuote,
  CreditCard,
  Contact,
  Map,
  Star,
  BarChart3,
  Table2,
  MousePointerClick,
  Search,
  Share2,
  Users,
} from "lucide-react";

export type VariantDefinition = {
  id: string;
  name: string;
  description: string;
  preview?: string;
  kind: "block" | "section";
  props: any;
};

export type LibraryItem = {
  type: string;
  label: string;
  icon: any;
  category: string;
  description?: string;
  variants: VariantDefinition[];
};

export const componentLibrary: LibraryItem[] = [
  {
    type: "hero",
    label: "Hero",
    icon: Layout,
    category: "Sections",
    description: "Landing hero blocks",
    variants: [
      {
        id: "hero-centered",
        name: "Centered Hero",
        description: "Heading, paragraph and CTA",
        kind: "section",
        props: {
          sectionType: "hero",
          blocks: [
            { type: "heading", props: { content: "Build faster visually" } },
            { type: "text", props: { content: "Drag, drop and customize." } },
            { type: "button", props: { content: "Get Started" } },
          ],
        },
      },
      {
        id: "hero-split",
        name: "Split Hero",
        description: "Text left, image right",
        kind: "section",
        props: {
          sectionType: "hero",
          blocks: [
            { type: "heading", props: { content: "Design with speed" } },
            { type: "text", props: { content: "Visual builder like Webflow." } },
            { type: "image", props: { src: "/placeholder.jpg", alt: "Preview" } },
          ],
        },
      },
    ],
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointerClick,
    category: "Basic",
    variants: [
      {
        id: "button-primary",
        name: "Primary Button",
        description: "Filled CTA button",
        kind: "block",
        props: { content: "Click me" },
      },
      {
        id: "button-outline",
        name: "Outline Button",
        description: "Secondary action",
        kind: "block",
        props: { content: "Learn more" },
      },
    ],
  },
];