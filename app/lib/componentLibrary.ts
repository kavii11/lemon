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
  Grid3X3,
  PanelsTopLeft,
  Rows3,
  GalleryVertical,
  Star,
  Users,
  CheckCircle,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  HardDrive,
  Database,
  Settings,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react";

export type VariantDefinition = {
  id: string;
  name: string;
  description: string;
  preview?: {
    tone: string;
    density: string;
    frame: string;
    highlights: string[];
  };
  kind: "block" | "section";
  props: any;
  tags?: string[];
};

export type LibraryItem = {
  type: string;
  label: string;
  icon: any;
  category: string;
  description?: string;
  variants: VariantDefinition[];
};

// ✅ PRODUCTION-READY COMPONENT LIBRARY
// Expanded for real production use with preview metadata and variant support
export const componentLibrary: LibraryItem[] = [
  // === BASIC TEXT & TYPOGRAPHY ===
  {
    type: "heading",
    label: "Headings",
    icon: Type,
    category: "Typography",
    description: "Section titles and page headings",
    variants: [
      {
        id: "heading-hero",
        name: "Hero Heading",
        description: "Large display title for hero sections",
        kind: "block",
        preview: {
          tone: "display",
          density: "airy",
          frame: "centered",
          highlights: ["large-type", "hero-scale"],
        },
        props: { content: "Hero Title", size: "hero" },
      },
      {
        id: "heading-section",
        name: "Section Heading",
        description: "Standard section title",
        kind: "block",
        preview: {
          tone: "structured",
          density: "balanced",
          frame: "left-aligned",
          highlights: ["section-title"],
        },
        props: { content: "Section Title", size: "xl" },
      },
      {
        id: "heading-card",
        name: "Card Heading",
        description: "Compact heading for cards and modules",
        kind: "block",
        preview: {
          tone: "compact",
          density: "dense",
          frame: "card",
          highlights: ["card-title"],
        },
        props: { content: "Card Title", size: "lg" },
      },
    ],
  },
  {
    type: "text",
    label: "Text Blocks",
    icon: FileText,
    category: "Typography",
    description: "Body copy and short text content",
    variants: [
      {
        id: "text-body",
        name: "Body Text",
        description: "Standard paragraph text",
        kind: "block",
        preview: {
          tone: "readable",
          density: "balanced",
          frame: "prose",
          highlights: ["body-copy"],
        },
        props: { content: "This is standard body text for paragraphs and descriptions." },
      },
      {
        id: "text-price",
        name: "Price Text",
        description: "Product pricing and numbers",
        kind: "block",
        preview: {
          tone: "prominent",
          density: "compact",
          frame: "pricing",
          highlights: ["price-display"],
        },
        props: { content: "₹1,499" },
      },
    ],
  },
  {
    type: "paragraph",
    label: "Paragraphs",
    icon: FileText,
    category: "Typography",
    description: "Longer descriptive content blocks",
    variants: [
      {
        id: "paragraph-standard",
        name: "Standard Paragraph",
        description: "Full-width paragraph content",
        kind: "block",
        preview: {
          tone: "editorial",
          density: "airy",
          frame: "prose-column",
          highlights: ["long-copy"],
        },
        props: { content: "This paragraph provides detailed information about the product, its features, benefits, and why customers should choose it over alternatives." },
      },
    ],
  },

  // === INTERACTION & CTAs ===
  {
    type: "button",
    label: "Buttons",
    icon: MousePointerClick,
    category: "Interaction",
    description: "Call-to-action and navigation buttons",
    variants: [
      {
        id: "button-primary",
        name: "Primary Button",
        description: "Main conversion action",
        kind: "block",
        preview: {
          tone: "prominent",
          density: "balanced",
          frame: "cta",
          highlights: ["primary-action"],
        },
        props: { content: "Add to Cart", variant: "primary" },
      },
      {
        id: "button-secondary",
        name: "Secondary Button",
        description: "Supporting action button",
        kind: "block",
        preview: {
          tone: "subtle",
          density: "compact",
          frame: "secondary-cta",
          highlights: ["support-action"],
        },
        props: { content: "Learn More", variant: "secondary" },
      },
      {
        id: "button-ghost",
        name: "Ghost Button",
        description: "Minimal outline button",
        kind: "block",
        preview: {
          tone: "minimal",
          density: "compact",
          frame: "ghost",
          highlights: ["outline-action"],
        },
        props: { content: "View Details", variant: "ghost" },
      },
    ],
  },
  {
    type: "badge",
    label: "Badges",
    icon: Badge,
    category: "Interaction",
    description: "Status labels and tags",
    variants: [
      {
        id: "badge-primary",
        name: "Primary Badge",
        description: "Feature or status badge",
        kind: "block",
        preview: {
          tone: "attention",
          density: "compact",
          frame: "inline",
          highlights: ["status-tag"],
        },
        props: { content: "New" },
      },
      {
        id: "badge-success",
        name: "Success Badge",
        description: "Positive status indicator",
        kind: "block",
        props: { content: "In Stock" },
      },
      {
        id: "badge-warning",
        name: "Warning Badge",
        description: "Caution or limited status",
        kind: "block",
        props: { content: "Limited" },
      },
    ],
  },

  // === MEDIA ===
  {
    type: "image",
    label: "Images",
    icon: Image,
    category: "Media",
    description: "Product images and visual content",
    variants: [
      {
        id: "image-hero",
        name: "Hero Image",
        description: "Full-width hero image",
        kind: "block",
        preview: {
          tone: "prominent",
          density: "full",
          frame: "hero",
          highlights: ["large-media"],
        },
        props: { 
          src: "https://picsum.photos/1200/600?hero", 
          alt: "Hero product image" 
        },
      },
      {
        id: "image-product",
        name: "Product Image",
        description: "Product detail image",
        kind: "block",
        preview: {
          tone: "product",
          density: "balanced",
          frame: "detail",
          highlights: ["product-media"],
        },
        props: { 
          src: "https://picsum.photos/800/600?product", 
          alt: "Product image" 
        },
      },
      {
        id: "image-thumbnail",
        name: "Thumbnail Image",
        description: "Small gallery or list image",
        kind: "block",
        preview: {
          tone: "compact",
          density: "dense",
          frame: "thumb",
          highlights: ["small-media"],
        },
        props: { 
          src: "https://picsum.photos/300/200?thumb", 
          alt: "Thumbnail image" 
        },
      },
    ],
  },
  {
    type: "image-block",
    label: "Image Blocks",
    icon: Image,
    category: "Media",
    description: "Images with caption or supporting content",
    variants: [
      {
        id: "image-block-caption",
        name: "Image + Caption",
        description: "Image with descriptive text below",
        kind: "block",
        preview: {
          tone: "editorial",
          density: "balanced",
          frame: "image-text",
          highlights: ["media-caption"],
        },
        props: {
          src: "https://picsum.photos/800/500",
          alt: "Featured image",
          caption: "Image caption or credit",
        },
      },
    ],
  },
  {
    type: "video",
    label: "Video",
    icon: Video,
    category: "Media",
    description: "Product demo or explainer video",
    variants: [
      {
        id: "video-poster",
        name: "Video Poster",
        description: "Video with poster image",
        kind: "block",
        preview: {
          tone: "dynamic",
          density: "rich",
          frame: "video-preview",
          highlights: ["play-button"],
        },
        props: {
          title: "Product Demo",
          description: "Watch how it works",
        },
      },
    ],
  },

  // === CONTENT & STRUCTURE ===
  {
    type: "list",
    label: "Lists",
    icon: List,
    category: "Content",
    description: "Bullet points and feature lists",
    variants: [
      {
        id: "list-features",
        name: "Feature List",
        description: "Product feature bullet points",
        kind: "block",
        preview: {
          tone: "structured",
          density: "balanced",
          frame: "bullet-list",
          highlights: ["feature-points"],
        },
        props: { 
          items: [
            "Fast and reliable performance",
            "Modern design and styling", 
            "Easy to customize",
            "Great customer support"
          ] 
        },
      },
      {
        id: "list-checkmarks",
        name: "Checkmark List",
        description: "Benefits with checkmark icons",
        kind: "block",
        props: { 
          items: ["Benefit one ✓", "Benefit two ✓", "Benefit three ✓"] 
        },
      },
    ],
  },
  {
    type: "quote",
    label: "Quotes",
    icon: MessageSquareQuote,
    category: "Content",
    description: "Testimonials and customer quotes",
    variants: [
      {
        id: "quote-testimonial",
        name: "Testimonial",
        description: "Customer review quote",
        kind: "block",
        preview: {
          tone: "trust",
          density: "airy",
          frame: "testimonial",
          highlights: ["customer-voice"],
        },
        props: {
          content: "This product completely transformed our workflow.",
          author: "Sarah Johnson, CEO",
          role: "Acme Corp",
        },
      },
    ],
  },

  // === DATA ===
  {
    type: "stats",
    label: "Stats",
    icon: BarChart3,
    category: "Data",
    description: "Key metrics and performance indicators",
    variants: [
      {
        id: "stats-grid",
        name: "Stats Grid",
        description: "3-6 key metrics in a grid",
        kind: "block",
        preview: {
          tone: "metrics",
          density: "compact",
          frame: "stat-grid",
          highlights: ["number-focus"],
        },
        props: {
          stats: [
            { label: "Happy Customers", value: "12K", trend: "+24%" },
            { label: "Products Sold", value: "48K", trend: "+18%" },
            { label: "Rating", value: "4.9", trend: "⭐" },
          ],
        },
      },
    ],
  },
  {
    type: "table",
    label: "Tables",
    icon: Table2,
    category: "Data",
    description: "Comparison tables and structured data",
    variants: [
      {
        id: "table-comparison",
        name: "Comparison Table",
        description: "Feature comparison between products",
        kind: "block",
        preview: {
          tone: "structured",
          density: "dense",
          frame: "table",
          highlights: ["row-comparison"],
        },
        props: {
          title: "Feature Comparison",
          columns: [
            { title: "Basic", items: ["✓", "✗", "✓"] },
            { title: "Pro", items: ["✓", "✓", "✓"] },
            { title: "Enterprise", items: ["✓", "✓", "✓+"] },
          ],
        },
      },
    ],
  },

  // === FORMS ===
  {
    type: "input",
    label: "Inputs",
    icon: FormInput,
    category: "Forms",
    description: "Form input fields",
    variants: [
      {
        id: "input-text",
        name: "Text Input",
        description: "Standard text field",
        kind: "block",
        preview: {
          tone: "form",
          density: "compact",
          frame: "input-field",
          highlights: ["form-element"],
        },
        props: {
          label: "Email Address",
          placeholder: "user@example.com",
        },
      },
    ],
  },
  {
    type: "textarea",
    label: "Text Areas",
    icon: FormInput,
    category: "Forms",
    description: "Multi-line text input",
    variants: [
      {
        id: "textarea-message",
        name: "Message Area",
        description: "Contact form message field",
        kind: "block",
        props: {
          label: "Your Message",
          placeholder: "Tell us more about your needs...",
        },
      },
    ],
  },
  {
    type: "select",
    label: "Selects",
    icon: FormInput,
    category: "Forms",
    description: "Dropdown selection fields",
    variants: [
      {
        id: "select-options",
        name: "Options Dropdown",
        description: "Multiple choice selector",
        kind: "block",
        props: {
          label: "Product Size",
          options: ["Small", "Medium", "Large", "X-Large"],
        },
      },
    ],
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    icon: Square,
    category: "Forms",
    description: "Boolean selection fields",
    variants: [
      {
        id: "checkbox-agree",
        name: "Agreement Checkbox",
        description: "Terms acceptance field",
        kind: "block",
        props: {
          label: "I agree to the terms and conditions",
          checked: false,
        },
      },
    ],
  },

  // === COMMERCE COMPONENTS ===
  {
    type: "product",
    label: "Products",
    icon: ShoppingCart,
    category: "Commerce",
    description: "Single product presentation",
    variants: [
      {
        id: "product-card",
        name: "Product Card",
        description: "Compact product card for lists",
        kind: "block",
        preview: {
          tone: "catalog",
          density: "compact",
          frame: "card",
          highlights: ["product-preview"],
        },
        props: {
          title: "Premium Hoodie",
          price: "₹1,999",
          description: "Comfortable organic cotton hoodie.",
          src: "https://picsum.photos/400/500?product1",
          alt: "Premium hoodie product image",
        },
      },
      {
        id: "product-detail",
        name: "Product Detail",
        description: "Expanded product detail view",
        kind: "block",
        preview: {
          tone: "detail",
          density: "rich",
          frame: "detail-view",
          highlights: ["expanded-product"],
        },
        props: {
          title: "Premium Hoodie",
          price: "₹1,999",
          description: "Made from 100% organic cotton with premium stitching and custom fit.",
          src: "https://picsum.photos/800/1000?product2",
          alt: "Premium hoodie detailed image",
        },
      },
    ],
  },
  {
    type: "product-list",
    label: "Product Lists",
    icon: ShoppingCart,
    category: "Commerce",
    description: "Multiple product collections",
    variants: [
      {
        id: "product-list-grid",
        name: "Product Grid",
        description: "3-column product grid",
        kind: "block",
        preview: {
          tone: "catalog",
          density: "balanced",
          frame: "grid-3",
          highlights: ["product-grid"],
        },
        props: {
          title: "Featured Products",
          products: [
            { title: "Basic Tee", price: "₹499", image: "https://picsum.photos/300/400?tee1" },
            { title: "Pro Hoodie", price: "₹999", image: "https://picsum.photos/300/400?hoodie1" },
            { title: "Cap", price: "₹299", image: "https://picsum.photos/300/400?cap1" },
          ],
        },
      },
      {
        id: "product-list-masonry",
        name: "Masonry Products",
        description: "Asymmetric product masonry",
        kind: "block",
        preview: {
          tone: "visual",
          density: "rich",
          frame: "masonry",
          highlights: ["varied-cards"],
        },
        props: {
          title: "Latest Collection",
          products: [
            { title: "Jacket", price: "₹2,499", image: "https://picsum.photos/400/600?jacket" },
            { title: "T-Shirt", price: "₹599", image: "https://picsum.photos/300/400?tshirt" },
          ],
        },
      },
    ],
  },

  // === TRUST & SOCIAL PROOF ===
  {
    type: "stats",
    label: "Trust Signals",
    icon: Star,
    category: "Trust",
    description: "Ratings, reviews and social proof",
    variants: [
      {
        id: "stats-trust",
        name: "Trust Stats",
        description: "Customer numbers and ratings",
        kind: "block",
        preview: {
          tone: "trust",
          density: "compact",
          frame: "trust-metrics",
          highlights: ["social-proof-numbers"],
        },
        props: {
          stats: [
            { label: "⭐ 4.9 Rating", value: "(2,847 reviews)" },
            { label: "Trusted By", value: "12K+ customers" },
            { label: "Ships Worldwide", value: "100+ countries" },
          ],
        },
      },
    ],
  },
  {
    type: "quote",
    label: "Testimonials",
    icon: Users,
    category: "Trust",
    description: "Customer testimonials and quotes",
    variants: [
      {
        id: "quote-customer",
        name: "Customer Quote",
        description: "Single customer testimonial",
        kind: "block",
        preview: {
          tone: "authentic",
          density: "airy",
          frame: "testimonial-card",
          highlights: ["customer-voice"],
        },
        props: {
          content: "This completely transformed how we work. Best investment we've made.",
          author: "Michael Chen",
          role: "Founder, TechCorp",
          rating: 5,
        },
      },
    ],
  },

  // === ADVANCED COMPONENTS ===
  {
    type: "divider",
    label: "Dividers",
    icon: Rows3,
    category: "Layout",
    description: "Section separators",
    variants: [
      {
        id: "divider-simple",
        name: "Simple Divider",
        description: "Horizontal section separator",
        kind: "block",
        props: { style: "solid" },
      },
    ],
  },
  {
    type: "spacer",
    label: "Spacers",
    icon: Square,
    category: "Layout",
    description: "Vertical spacing blocks",
    variants: [
      {
        id: "spacer-small",
        name: "Small Spacer",
        description: "Compact vertical space",
        kind: "block",
        props: { height: "small" },
      },
      {
        id: "spacer-large",
        name: "Large Spacer",
        description: "Generous vertical space",
        kind: "block",
        props: { height: "large" },
      },
    ],
  },
];