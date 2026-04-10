import {
  Layout,
  Type,
  Image,
  Square,
  ShoppingCart,
  FileText,
  FormInput,
  Video,
  List,
  Badge,
  MessageSquareQuote,
  BarChart3,
  Table2,
  MousePointerClick,
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
    type: "heading",
    label: "Heading",
    icon: Type,
    category: "Basic",
    description: "Titles and section headings",
    variants: [
      {
        id: "heading-default",
        name: "Heading",
        description: "Large title text",
        kind: "block",
        props: { content: "Heading text" },
      },
    ],
  },
  {
    type: "text",
    label: "Text",
    icon: FileText,
    category: "Basic",
    description: "Short text or paragraph",
    variants: [
      {
        id: "text-default",
        name: "Text",
        description: "Body copy block",
        kind: "block",
        props: { content: "Add your text here" },
      },
    ],
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: FileText,
    category: "Basic",
    description: "Longer paragraph content",
    variants: [
      {
        id: "paragraph-default",
        name: "Paragraph",
        description: "Detailed copy block",
        kind: "block",
        props: { content: "Paragraph content" },
      },
    ],
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointerClick,
    category: "Basic",
    description: "Call to action button",
    variants: [
      {
        id: "button-primary",
        name: "Primary Button",
        description: "Filled CTA button",
        kind: "block",
        props: { content: "Click me" },
      },
    ],
  },
  {
    type: "badge",
    label: "Badge",
    icon: Badge,
    category: "Basic",
    description: "Small label or pill",
    variants: [
      {
        id: "badge-default",
        name: "Badge",
        description: "Status or small tag",
        kind: "block",
        props: { content: "Popular" },
      },
    ],
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
    category: "Media",
    description: "Single image block",
    variants: [
      {
        id: "image-default",
        name: "Image",
        description: "Product or content image",
        kind: "block",
        props: { src: "https://picsum.photos/800/500", alt: "Preview image" },
      },
    ],
  },
  {
    type: "image-block",
    label: "Image Block",
    icon: Image,
    category: "Media",
    description: "Image with supporting content",
    variants: [
      {
        id: "image-block-default",
        name: "Image Block",
        description: "Image with text",
        kind: "block",
        props: {
          src: "https://picsum.photos/800/500",
          alt: "Preview image",
          title: "Image title",
          description: "Image description",
        },
      },
    ],
  },
  {
    type: "video",
    label: "Video",
    icon: Video,
    category: "Media",
    description: "Video preview or embed block",
    variants: [
      {
        id: "video-default",
        name: "Video",
        description: "Poster and description",
        kind: "block",
        props: {
          title: "Video title",
          description: "Video description",
        },
      },
    ],
  },
  {
    type: "list",
    label: "List",
    icon: List,
    category: "Basic",
    description: "Bullet style points",
    variants: [
      {
        id: "list-default",
        name: "List",
        description: "Feature list",
        kind: "block",
        props: { items: ["Point one", "Point two", "Point three"] },
      },
    ],
  },
  {
    type: "quote",
    label: "Quote",
    icon: MessageSquareQuote,
    category: "Content",
    description: "Testimonial or quote",
    variants: [
      {
        id: "quote-default",
        name: "Quote",
        description: "Quoted text block",
        kind: "block",
        props: {
          content: "This product is great.",
          subtitle: "Customer name",
        },
      },
    ],
  },
  {
    type: "stats",
    label: "Stats",
    icon: BarChart3,
    category: "Data",
    description: "Simple stats display",
    variants: [
      {
        id: "stats-default",
        name: "Stats",
        description: "Key product stats",
        kind: "block",
        props: {
          stats: [
            { label: "Users", value: "12K" },
            { label: "Sales", value: "4.8K" },
          ],
        },
      },
    ],
  },
  {
    type: "table",
    label: "Table",
    icon: Table2,
    category: "Data",
    description: "Comparison or details table",
    variants: [
      {
        id: "table-default",
        name: "Table",
        description: "Feature comparison table",
        kind: "block",
        props: {
          title: "Comparison table",
          columns: [
            { title: "Feature", items: ["Size", "Color", "Material"] },
            { title: "Value", items: ["M", "Black", "Cotton"] },
          ],
        },
      },
    ],
  },
  {
    type: "input",
    label: "Input",
    icon: FormInput,
    category: "Forms",
    description: "Single line input field",
    variants: [
      {
        id: "input-default",
        name: "Input",
        description: "Text input field",
        kind: "block",
        props: {
          label: "Field label",
          placeholder: "Enter value",
        },
      },
    ],
  },
  {
    type: "textarea",
    label: "Textarea",
    icon: FormInput,
    category: "Forms",
    description: "Multi-line input field",
    variants: [
      {
        id: "textarea-default",
        name: "Textarea",
        description: "Long text field",
        kind: "block",
        props: {
          label: "Message",
          placeholder: "Write here",
        },
      },
    ],
  },
  {
    type: "select",
    label: "Select",
    icon: FormInput,
    category: "Forms",
    description: "Dropdown selector",
    variants: [
      {
        id: "select-default",
        name: "Select",
        description: "Dropdown options",
        kind: "block",
        props: {
          label: "Choose option",
          options: ["Option 1", "Option 2", "Option 3"],
        },
      },
    ],
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: Square,
    category: "Forms",
    description: "Checkbox field",
    variants: [
      {
        id: "checkbox-default",
        name: "Checkbox",
        description: "Boolean field",
        kind: "block",
        props: {
          label: "I agree",
          checked: false,
        },
      },
    ],
  },
  {
    type: "product",
    label: "Product",
    icon: ShoppingCart,
    category: "Commerce",
    description: "Single product card",
    variants: [
      {
        id: "product-default",
        name: "Product",
        description: "Product summary card",
        kind: "block",
        props: {
          title: "Product name",
          price: "₹999",
          description: "Short product description",
          src: "https://picsum.photos/800/500",
          alt: "Product image",
        },
      },
    ],
  },
  {
    type: "product-list",
    label: "Product List",
    icon: ShoppingCart,
    category: "Commerce",
    description: "Multiple product cards",
    variants: [
      {
        id: "product-list-default",
        name: "Product List",
        description: "List of products",
        kind: "block",
        props: {
          title: "Featured products",
          products: [
            { title: "Basic Tee", price: "₹499", image: "https://picsum.photos/400/280?1" },
            { title: "Pro Hoodie", price: "₹999", image: "https://picsum.photos/400/280?2" },
          ],
        },
      },
    ],
  },
];