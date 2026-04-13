import { Layout, Grid3X3, Rows3, PanelsTopLeft, GalleryVertical, ShoppingBag } from "lucide-react";

export const productLibrary = [
  {
    type: "product-layout",
    label: "Starter Product Layouts",
    icon: Layout,
    category: "Product",
    description: "Hero-first product page layouts for single product selling.",
    variants: [
    {
  id: "standard-product",
  name: "Standard Product",
  description: "Classic image, title, price and add to cart flow.",
  kind: "multi-section",
  preview: {
    tone: "classic",
    density: "balanced",
    frame: "split",
    highlights: ["media-left", "details-right", "single-cta"],
  },
  tags: ["single product", "classic", "detail"],
  sections: [
    {
      type: "product-standard",
      canvasLayout: "split-hero",
      regions: [
        {
          name: "media",
          blocks: [
            {
              type: "product-image",
              props: {
                src: "https://picsum.photos/900/900?random=101",
                alt: "Product image",
                style: {
                  desktop: { width: "100%", minHeight: "420px" },
                  tablet: { width: "100%", minHeight: "360px" },
                  mobile: { width: "100%", minHeight: "280px" },
                },
              },
            },
          ],
        },
        {
          name: "details",
          blocks: [
            {
              type: "badge",
              props: { content: "Best Seller" },
            },
            {
              type: "heading",
              props: { content: "Product Name" },
            },
            {
              type: "paragraph",
              props: {
                content:
                  "A short product description that explains the key value and why someone should buy it.",
              },
            },
            {
              type: "product",
              props: {
                title: "Product Name",
                price: "₹999",
                description: "Product description goes here.",
              },
            },
            {
              type: "button",
              props: { content: "Add to Cart" },
            },
          ],
        },
        {
          name: "bottom",
          blocks: [
            {
              type: "product-gallery",
              props: {},
            },
          ],
        },
      ],
    },
  ],
},
      {
        id: "centered-product",
        name: "Centered Product",
        description: "Minimal centered layout with compact visual hierarchy.",
        kind: "multi-section",
        preview: {
          tone: "minimal",
          density: "airy",
          frame: "stack",
          highlights: ["centered-copy", "single-column", "minimal-cta"],
        },
        tags: ["minimal", "single product", "centered"],
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
      {
        id: "split-highlight-product",
        name: "Split Highlight",
        description: "Large media area with product summary and primary CTA.",
        kind: "multi-section",
        preview: {
          tone: "modern",
          density: "balanced",
          frame: "hero-split",
          highlights: ["hero-image", "quick-details", "sticky-cta"],
        },
        tags: ["hero", "modern", "featured"],
        sections: [
          {
            type: "product-split-highlight",
            blocks: [
              { type: "image" },
              { type: "badge", props: { content: "Best Seller" } },
              { type: "heading", props: { content: "Featured Product" } },
              { type: "paragraph", props: { content: "A modern layout focused on product storytelling and action." } },
              { type: "text", props: { content: "₹1,499" } },
              { type: "button", props: { content: "Add to Cart" } },
            ],
          },
        ],
      },
      {
        id: "gallery-focus-product",
        name: "Gallery Focus",
        description: "Image-heavy product layout with thumbnail-led browsing.",
        kind: "multi-section",
        preview: {
          tone: "visual",
          density: "rich",
          frame: "gallery",
          highlights: ["large-media", "thumbnail-strip", "detail-panel"],
        },
        tags: ["gallery", "visual", "ecommerce"],
        sections: [
          {
            type: "product-gallery-focus",
            blocks: [
              { type: "image" },
              { type: "image-block" },
              { type: "heading", props: { content: "Gallery Product" } },
              { type: "paragraph", props: { content: "Perfect for products where images should lead the buying decision." } },
              { type: "text", props: { content: "₹1,899" } },
              { type: "button", props: { content: "Shop Now" } },
            ],
          },
        ],
      },
      {
        id: "story-product",
        name: "Story Product",
        description: "Narrative-style product presentation with descriptive content.",
        kind: "multi-section",
        preview: {
          tone: "editorial",
          density: "airy",
          frame: "story",
          highlights: ["headline", "story-copy", "product-proof"],
        },
        tags: ["storytelling", "editorial", "brand"],
        sections: [
          {
            type: "product-story",
            blocks: [
              { type: "badge", props: { content: "New Drop" } },
              { type: "heading", props: { content: "Designed for Everyday Use" } },
              { type: "paragraph", props: { content: "Use this layout when you want to sell through narrative, not just specs." } },
              { type: "image" },
              { type: "text", props: { content: "₹2,099" } },
              { type: "button", props: { content: "Explore Product" } },
            ],
          },
        ],
      },
      {
        id: "quick-buy-product",
        name: "Quick Buy",
        description: "Compact conversion-focused product section with low friction CTA.",
        kind: "multi-section",
        preview: {
          tone: "conversion",
          density: "compact",
          frame: "compact-split",
          highlights: ["tight-copy", "strong-price", "fast-action"],
        },
        tags: ["conversion", "compact", "cta"],
        sections: [
          {
            type: "product-quick-buy",
            blocks: [
              { type: "image" },
              { type: "heading", props: { content: "Quick Buy Product" } },
              { type: "text", props: { content: "₹699" } },
              { type: "paragraph", props: { content: "A compact product section built to shorten the path to purchase." } },
              { type: "button", props: { content: "Buy Instantly" } },
            ],
          },
        ],
      },
    ],
  },

  {
    type: "product-grid-layout",
    label: "Catalog And Grid Layouts",
    icon: Grid3X3,
    category: "Catalog",
    description: "Layouts for collections, multi-product browsing and category discovery.",
    variants: [
      {
        id: "product-grid",
        name: "Product Grid",
        description: "Clean grid style product presentation for multiple products.",
        kind: "multi-section",
        preview: {
          tone: "catalog",
          density: "balanced",
          frame: "grid-3",
          highlights: ["headline-top", "uniform-cards", "browse-first"],
        },
        tags: ["catalog", "grid", "listing"],
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
      {
        id: "featured-grid-product",
        name: "Featured Grid",
        description: "One featured product with supporting grid items below.",
        kind: "multi-section",
        preview: {
          tone: "featured-catalog",
          density: "balanced",
          frame: "feature-plus-grid",
          highlights: ["hero-card", "supporting-grid", "visual-priority"],
        },
        tags: ["featured", "catalog", "mixed grid"],
        sections: [
          {
            type: "product-featured-grid",
            blocks: [
              { type: "heading", props: { content: "Featured Collection" } },
              { type: "product" },
              { type: "product-list" },
            ],
          },
        ],
      },
      {
        id: "collection-masonry-product",
        name: "Collection Masonry",
        description: "Asymmetric collection layout for more visual browsing rhythm.",
        kind: "multi-section",
        preview: {
          tone: "editorial-catalog",
          density: "rich",
          frame: "masonry",
          highlights: ["mixed-card-heights", "collection-focus", "visual-rhythm"],
        },
        tags: ["masonry", "collection", "editorial"],
        sections: [
          {
            type: "product-collection-masonry",
            blocks: [
              { type: "heading", props: { content: "Shop By Collection" } },
              { type: "product-list" },
            ],
          },
        ],
      },
      {
        id: "category-grid-product",
        name: "Category Grid",
        description: "Category-led shopping layout with clear product grouping.",
        kind: "multi-section",
        preview: {
          tone: "structured",
          density: "balanced",
          frame: "category-grid",
          highlights: ["grouped-items", "clear-sections", "catalog-nav"],
        },
        tags: ["categories", "structured", "browse"],
        sections: [
          {
            type: "product-category-grid",
            blocks: [
              { type: "heading", props: { content: "Browse Categories" } },
              { type: "product-list" },
            ],
          },
        ],
      },
    ],
  },

  {
    type: "product-showcase-layout",
    label: "Showcase Layouts",
    icon: PanelsTopLeft,
    category: "Showcase",
    description: "Layouts for premium launches, featured campaigns and product storytelling.",
    variants: [
      {
        id: "launch-showcase-product",
        name: "Launch Showcase",
        description: "Premium launch layout with campaign-style hero and CTA.",
        kind: "multi-section",
        preview: {
          tone: "premium",
          density: "airy",
          frame: "launch-hero",
          highlights: ["campaign-hero", "product-reveal", "high-contrast-cta"],
        },
        tags: ["launch", "premium", "campaign"],
        sections: [
          {
            type: "product-launch-showcase",
            blocks: [
              { type: "badge", props: { content: "Just Launched" } },
              { type: "heading", props: { content: "Meet The Next Flagship Product" } },
              { type: "paragraph", props: { content: "A showcase-first layout built for new launches and premium drops." } },
              { type: "image" },
              { type: "button", props: { content: "Pre Order Now" } },
            ],
          },
        ],
      },
      {
        id: "benefit-showcase-product",
        name: "Benefit Showcase",
        description: "Feature and benefit-led presentation before purchase action.",
        kind: "multi-section",
        preview: {
          tone: "educational",
          density: "balanced",
          frame: "benefit-stack",
          highlights: ["benefit-blocks", "supporting-media", "cta-late"],
        },
        tags: ["benefits", "features", "explain"],
        sections: [
          {
            type: "product-benefit-showcase",
            blocks: [
              { type: "heading", props: { content: "Why Customers Choose This" } },
              { type: "stats" },
              { type: "image" },
              { type: "button", props: { content: "Get Yours" } },
            ],
          },
        ],
      },
      {
        id: "comparison-showcase-product",
        name: "Comparison Showcase",
        description: "Ideal for comparing versions, tiers or product upgrades.",
        kind: "multi-section",
        preview: {
          tone: "informative",
          density: "rich",
          frame: "comparison",
          highlights: ["table-compare", "tier-choice", "decision-support"],
        },
        tags: ["comparison", "tiers", "upgrade"],
        sections: [
          {
            type: "product-comparison-showcase",
            blocks: [
              { type: "heading", props: { content: "Compare Options" } },
              { type: "table" },
              { type: "button", props: { content: "Choose Plan" } },
            ],
          },
        ],
      },
    ],
  },

  {
    type: "product-content-layout",
    label: "Content Commerce Layouts",
    icon: Rows3,
    category: "Content",
    description: "Blended layouts for content, FAQs, reviews and long-form commerce pages.",
    variants: [
      {
        id: "faq-product-layout",
        name: "FAQ Commerce",
        description: "Product layout with FAQ support before the buying CTA.",
        kind: "multi-section",
        preview: {
          tone: "supportive",
          density: "balanced",
          frame: "content-stack",
          highlights: ["product-header", "faq-section", "trust-first"],
        },
        tags: ["faq", "support", "trust"],
        sections: [
          {
            type: "product-faq-layout",
            blocks: [
              { type: "heading", props: { content: "Everything You Need To Know" } },
              { type: "image" },
              { type: "faq" },
              { type: "button", props: { content: "Add to Cart" } },
            ],
          },
        ],
      },
      {
        id: "review-product-layout",
        name: "Review Driven",
        description: "Highlights social proof and customer feedback around the product.",
        kind: "multi-section",
        preview: {
          tone: "trust-led",
          density: "rich",
          frame: "review-column",
          highlights: ["social-proof", "rating-area", "review-blocks"],
        },
        tags: ["reviews", "trust", "social proof"],
        sections: [
          {
            type: "product-review-layout",
            blocks: [
              { type: "heading", props: { content: "Loved By Customers" } },
              { type: "quote" },
              { type: "stats" },
              { type: "button", props: { content: "Shop This Product" } },
            ],
          },
        ],
      },
      {
        id: "blog-commerce-layout",
        name: "Blog Commerce",
        description: "Blends product promotion with editorial or educational content.",
        kind: "multi-section",
        preview: {
          tone: "content-led",
          density: "airy",
          frame: "editorial-stack",
          highlights: ["article-intro", "product-block", "content-flow"],
        },
        tags: ["blog", "content", "editorial"],
        sections: [
          {
            type: "product-blog-commerce",
            blocks: [
              { type: "heading", props: { content: "Learn Before You Buy" } },
              { type: "paragraph", props: { content: "Use this layout when content should support product conversion." } },
              { type: "blog-list" },
              { type: "product" },
              { type: "button", props: { content: "Shop Featured Item" } },
            ],
          },
        ],
      },
    ],
  },

  {
    type: "product-conversion-layout",
    label: "Conversion Layouts",
    icon: ShoppingBag,
    category: "Conversion",
    description: "Fast-buy layouts optimized for action, urgency and checkout flow.",
    variants: [
      {
        id: "checkout-focused-product",
        name: "Checkout Focused",
        description: "Minimal friction layout that pushes users quickly toward checkout.",
        kind: "multi-section",
        preview: {
          tone: "conversion",
          density: "compact",
          frame: "checkout-split",
          highlights: ["short-copy", "price-priority", "checkout-cta"],
        },
        tags: ["checkout", "fast-buy", "conversion"],
        sections: [
          {
            type: "product-checkout-focused",
            blocks: [
              { type: "heading", props: { content: "Ready To Order?" } },
              { type: "text", props: { content: "₹1,299" } },
              { type: "button", props: { content: "Proceed To Checkout" } },
              { type: "checkout" },
            ],
          },
        ],
      },
      {
        id: "bundle-offer-product",
        name: "Bundle Offer",
        description: "Designed for upsell, bundles and higher cart value.",
        kind: "multi-section",
        preview: {
          tone: "offer-led",
          density: "balanced",
          frame: "bundle",
          highlights: ["bundle-stack", "value-message", "multi-buy"],
        },
        tags: ["bundle", "upsell", "offer"],
        sections: [
          {
            type: "product-bundle-offer",
            blocks: [
              { type: "heading", props: { content: "Save More With Bundles" } },
              { type: "product-list" },
              { type: "text", props: { content: "Starting at ₹2,499" } },
              { type: "button", props: { content: "Add Bundle" } },
            ],
          },
        ],
      },
      {
        id: "cart-led-product",
        name: "Cart Led",
        description: "Product presentation designed around cart visibility and action.",
        kind: "multi-section",
        preview: {
          tone: "utility",
          density: "compact",
          frame: "cart-surface",
          highlights: ["cart-visible", "short-details", "persistent-action"],
        },
        tags: ["cart", "utility", "commerce"],
        sections: [
          {
            type: "product-cart-led",
            blocks: [
              { type: "heading", props: { content: "Add Item To Cart" } },
              { type: "product" },
              { type: "cart" },
              { type: "button", props: { content: "Continue Shopping" } },
            ],
          },
        ],
      },
    ],
  },

  {
    type: "product-editorial-layout",
    label: "Editorial Layouts",
    icon: GalleryVertical,
    category: "Editorial",
    description: "High-end visual and narrative layouts for branded product storytelling.",
    variants: [
      {
        id: "magazine-product-layout",
        name: "Magazine Product",
        description: "Editorial composition with strong typography and visual rhythm.",
        kind: "multi-section",
        preview: {
          tone: "editorial",
          density: "airy",
          frame: "magazine",
          highlights: ["display-copy", "offset-media", "story-grid"],
        },
        tags: ["editorial", "premium", "brand"],
        sections: [
          {
            type: "product-magazine-layout",
            blocks: [
              { type: "heading", props: { content: "The Product Story" } },
              { type: "paragraph", props: { content: "A premium editorial layout built for visual-first brands." } },
              { type: "image" },
              { type: "quote" },
              { type: "button", props: { content: "Discover More" } },
            ],
          },
        ],
      },
      {
        id: "immersive-product-layout",
        name: "Immersive Product",
        description: "Large visual sections with focused CTA moments.",
        kind: "multi-section",
        preview: {
          tone: "immersive",
          density: "rich",
          frame: "full-bleed",
          highlights: ["large-media", "spacious-copy", "section-cta"],
        },
        tags: ["immersive", "visual", "premium"],
        sections: [
          {
            type: "product-immersive-layout",
            blocks: [
              { type: "image" },
              { type: "heading", props: { content: "Built To Be Experienced" } },
              { type: "paragraph", props: { content: "Great for premium products with strong art direction." } },
              { type: "button", props: { content: "Experience It" } },
            ],
          },
        ],
      },
    ],
  },
];