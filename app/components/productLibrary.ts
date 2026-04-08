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
        name: "Standard Product Page",
        description: "Gallery, info, reviews, and related products",
        kind: "multi-section",
        sections: [
          {
            type: "product-hero",
            blocks: [
              {
                type: "product-gallery",
                props: {
                  images: [
                    "https://picsum.photos/900/900?random=11",
                    "https://picsum.photos/900/900?random=12",
                    "https://picsum.photos/900/900?random=13",
                    "https://picsum.photos/900/900?random=14",
                  ],
                  alt: "Product gallery",
                  style: {
                    desktop: { width: "56%", minHeight: "620px" },
                    tablet: { width: "100%", minHeight: "520px" },
                    mobile: { width: "100%", minHeight: "420px" },
                  },
                },
              },
              {
                type: "badge",
                props: {
                  content: "Best seller",
                  style: {
                    desktop: {
                      width: "auto",
                      minHeight: "36px",
                      padding: "8px 12px",
                      backgroundColor: "#ecfeff",
                      color: "#155e75",
                      borderRadius: "999px",
                      fontWeight: "700",
                    },
                    tablet: {
                      width: "auto",
                      minHeight: "36px",
                      padding: "8px 12px",
                      backgroundColor: "#ecfeff",
                      color: "#155e75",
                      borderRadius: "999px",
                      fontWeight: "700",
                    },
                    mobile: {
                      width: "auto",
                      minHeight: "36px",
                      padding: "8px 12px",
                      backgroundColor: "#ecfeff",
                      color: "#155e75",
                      borderRadius: "999px",
                      fontWeight: "700",
                    },
                  },
                },
              },
              {
                type: "product-title",
                props: {
                  content: "Premium Everyday Sneakers",
                  style: {
                    desktop: { width: "40%", minHeight: "68px", fontSize: "38px", fontWeight: "800", lineHeight: "1.1" },
                    tablet: { width: "100%", minHeight: "60px", fontSize: "32px", fontWeight: "800", lineHeight: "1.15" },
                    mobile: { width: "100%", minHeight: "56px", fontSize: "28px", fontWeight: "800", lineHeight: "1.2" },
                  },
                },
              },
              {
                type: "text",
                props: {
                  content: "4.8 rating · 128 reviews",
                  style: {
                    desktop: { width: "40%", minHeight: "32px", color: "#6b7280", fontSize: "14px" },
                    tablet: { width: "100%", minHeight: "32px", color: "#6b7280", fontSize: "14px" },
                    mobile: { width: "100%", minHeight: "32px", color: "#6b7280", fontSize: "14px" },
                  },
                },
              },
              {
                type: "discount-price",
                props: {
                  compareAt: "₹4,999",
                  price: "₹3,499",
                  style: {
                    desktop: { width: "40%", minHeight: "48px" },
                    tablet: { width: "100%", minHeight: "48px" },
                    mobile: { width: "100%", minHeight: "48px" },
                  },
                },
              },
              {
                type: "product-description",
                props: {
                  content:
                    "A modern lifestyle sneaker designed for comfort, daily wear, and a clean premium look.",
                  style: {
                    desktop: { width: "40%", minHeight: "96px", color: "#4b5563", lineHeight: "1.7" },
                    tablet: { width: "100%", minHeight: "96px", color: "#4b5563", lineHeight: "1.7" },
                    mobile: { width: "100%", minHeight: "110px", color: "#4b5563", lineHeight: "1.7" },
                  },
                },
              },
              {
                type: "list",
                props: {
                  items: [
                    "Premium upper finish",
                    "Soft cushioning",
                    "Free shipping available",
                    "Easy 7-day returns",
                  ],
                  style: {
                    desktop: { width: "40%", minHeight: "120px" },
                    tablet: { width: "100%", minHeight: "120px" },
                    mobile: { width: "100%", minHeight: "120px" },
                  },
                },
              },
              {
                type: "quantity-selector",
                props: {
                  label: "Quantity",
                  style: {
                    desktop: { width: "180px", minHeight: "56px" },
                    tablet: { width: "180px", minHeight: "56px" },
                    mobile: { width: "180px", minHeight: "56px" },
                  },
                },
              },
              {
                type: "add-to-cart",
                props: {
                  content: "Add to cart",
                  style: {
                    desktop: {
                      width: "40%",
                      minHeight: "56px",
                      padding: "14px 18px",
                      backgroundColor: "#111827",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontWeight: "700",
                    },
                    tablet: {
                      width: "100%",
                      minHeight: "56px",
                      padding: "14px 18px",
                      backgroundColor: "#111827",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontWeight: "700",
                    },
                    mobile: {
                      width: "100%",
                      minHeight: "56px",
                      padding: "14px 18px",
                      backgroundColor: "#111827",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontWeight: "700",
                    },
                  },
                },
              },
              {
                type: "buy-now",
                props: {
                  content: "Buy now",
                  style: {
                    desktop: {
                      width: "40%",
                      minHeight: "56px",
                      padding: "14px 18px",
                      backgroundColor: "#f3f4f6",
                      color: "#111827",
                      borderRadius: "12px",
                      border: "1px solid #d1d5db",
                      fontWeight: "700",
                    },
                    tablet: {
                      width: "100%",
                      minHeight: "56px",
                      padding: "14px 18px",
                      backgroundColor: "#f3f4f6",
                      color: "#111827",
                      borderRadius: "12px",
                      border: "1px solid #d1d5db",
                      fontWeight: "700",
                    },
                    mobile: {
                      width: "100%",
                      minHeight: "56px",
                      padding: "14px 18px",
                      backgroundColor: "#f3f4f6",
                      color: "#111827",
                      borderRadius: "12px",
                      border: "1px solid #d1d5db",
                      fontWeight: "700",
                    },
                  },
                },
              },
              {
                type: "wishlist",
                props: {
                  content: "Save to wishlist",
                  style: {
                    desktop: {
                      width: "40%",
                      minHeight: "48px",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      color: "#111827",
                    },
                    tablet: {
                      width: "100%",
                      minHeight: "48px",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      color: "#111827",
                    },
                    mobile: {
                      width: "100%",
                      minHeight: "48px",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      color: "#111827",
                    },
                  },
                },
              },
            ],
          },
          {
            type: "product-details",
            blocks: [
              {
                type: "heading",
                props: {
                  content: "Product details",
                },
              },
              {
                type: "text",
                props: {
                  content:
                    "Use this area for full description, size guide, specifications, and shipping policies.",
                },
              },
              {
                type: "faq",
                props: {
                  title: "Shipping and returns",
                  faqs: [
                    {
                      question: "How long does delivery take?",
                      answer: "Usually 3 to 5 business days.",
                    },
                    {
                      question: "Can I return the item?",
                      answer: "Yes, returns are accepted within 7 days.",
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "product-reviews",
            blocks: [
              {
                type: "testimonials",
                props: {
                  title: "Customer reviews",
                  testimonials: [
                    {
                      quote: "Very comfortable and looks premium.",
                      name: "Rohit",
                      role: "Verified buyer",
                    },
                    {
                      quote: "Fast delivery and really clean design.",
                      name: "Aditi",
                      role: "Verified buyer",
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "related-products",
            blocks: [
              {
                type: "product-list",
                props: {
                  title: "You may also like",
                  products: [
                    {
                      title: "Classic Runner",
                      price: "₹2,999",
                      image: "https://picsum.photos/600/600?random=41",
                    },
                    {
                      title: "Street Low",
                      price: "₹3,199",
                      image: "https://picsum.photos/600/600?random=42",
                    },
                    {
                      title: "Urban Flex",
                      price: "₹3,799",
                      image: "https://picsum.photos/600/600?random=43",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "centered-product",
        name: "Centered Product",
        description: "Minimal product layout",
        kind: "multi-section",
        sections: [
          {
            type: "product-centered",
            blocks: [
              {
                type: "product-image",
                props: {
                  src: "https://picsum.photos/1000/1000?random=51",
                  alt: "Minimal product image",
                },
              },
              {
                type: "product-title",
                props: {
                  content: "Minimal Product",
                },
              },
              {
                type: "price",
                props: {
                  price: "₹2,499",
                },
              },
              {
                type: "product-description",
                props: {
                  content: "A clean and simple product stack for modern brands.",
                },
              },
              {
                type: "buy-now",
                props: {
                  content: "Buy now",
                },
              },
            ],
          },
        ],
      },
      {
        id: "product-grid",
        name: "Product Grid",
        description: "Collection page",
        kind: "multi-section",
        sections: [
          {
            type: "product-grid",
            blocks: [
              {
                type: "heading",
                props: {
                  content: "Featured products",
                },
              },
              {
                type: "product-list",
                props: {
                  title: "Shop all",
                  products: [
                    {
                      title: "Daily Sneaker",
                      price: "₹2,699",
                      image: "https://picsum.photos/600/600?random=61",
                    },
                    {
                      title: "All Day Runner",
                      price: "₹3,299",
                      image: "https://picsum.photos/600/600?random=62",
                    },
                    {
                      title: "Classic Street Low",
                      price: "₹2,999",
                      image: "https://picsum.photos/600/600?random=63",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
];