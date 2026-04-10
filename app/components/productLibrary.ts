import { Layout } from "lucide-react";

export const productLibrary = [
  {
    type: "product-layout",
    label: "Product Layout",
    icon: Layout,
    category: "Product",
    description: "Prebuilt product page layouts",
    variants: [
      {
        id: "standard-product",
        name: "Standard Product",
        description: "Image, title, price and add to cart",
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
      {
        id: "centered-product",
        name: "Centered Product",
        description: "Minimal centered product layout",
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
      {
        id: "product-grid",
        name: "Product Grid",
        description: "Grid style product presentation",
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
    ],
  },
];