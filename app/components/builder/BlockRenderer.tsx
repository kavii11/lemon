"use client";

import { MouseEvent } from "react";
import { Copy, GripVertical, Trash2 } from "lucide-react";
import { useBuilder } from "@/app/lib/useBuilder";

type ResizeDirection = "left" | "right" | "top" | "bottom";

export default function BlockRenderer({
  block,
  sectionId,
  dragHandleProps,
}: any) {
  const {
    setSelectedBlock,
    selectedBlock,
    currentDevice,
    resizeBlock,
    duplicateBlock,
    removeBlock,
  } = useBuilder();

  const props = block?.props || {};
  const style = props?.style?.[currentDevice] || {};
  const content = props?.content || block?.type || "Block";

  const isSelected =
    selectedBlock?.sectionId === sectionId &&
    selectedBlock?.blockId === block.id;

  const startResize = (e: MouseEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    let raf = 0;

    const onMove = (moveEvent: MouseEvent | globalThis.MouseEvent) => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        let delta = 0;

        if (direction === "left") {
          delta = (startX - moveEvent.clientX) / 4;
        } else if (direction === "right") {
          delta = (moveEvent.clientX - startX) / 4;
        } else if (direction === "top") {
          delta = (startY - moveEvent.clientY) / 4;
        } else if (direction === "bottom") {
          delta = (moveEvent.clientY - startY) / 4;
        }

        resizeBlock(sectionId, block.id, direction, delta);
      });
    };

    const onUp = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove as any);
    window.addEventListener("mouseup", onUp);
  };

  const rootStyle: React.CSSProperties = {
    backgroundColor: style.backgroundColor,
    color: style.color,
    padding: style.padding,
    width: style.width || "100%",
    margin: style.margin,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight as any,
    lineHeight: style.lineHeight,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,
    display: style.display as any,
    justifyContent: style.justifyContent as any,
    alignItems: style.alignItems as any,
    height: style.height,
    minHeight: style.minHeight,
    textAlign: style.textAlign,
    gap: style.gap,
    border: style.border,
  };

  const shellStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: 18,
    border: isSelected ? "1.5px solid #2563eb" : "1px solid #e5e7eb",
    background: "#ffffff",
    boxShadow: isSelected
      ? "0 0 0 4px rgba(37, 99, 235, 0.10), 0 14px 40px rgba(15, 23, 42, 0.08)"
      : "0 8px 24px rgba(15, 23, 42, 0.04)",
    overflow: "visible",
    transition: "border-color 180ms ease, box-shadow 180ms ease",
  };

  const panelStyle: React.CSSProperties = {
    ...rootStyle,
    position: "relative",
    borderRadius: style.borderRadius || 16,
    minHeight: style.minHeight || "120px",
    width: "100%",
  };

  const renderButtons = (buttons: any[] = []) => {
    if (!buttons.length) return null;

    return (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        {buttons.map((button, index) => {
          const variant = button.variant || "primary";

          const variantStyle: React.CSSProperties =
            variant === "secondary"
              ? {
                  background: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                }
              : variant === "ghost"
              ? {
                  background: "transparent",
                  color: "#0f172a",
                  border: "1px solid #e2e8f0",
                }
              : {
                  background: "#111827",
                  color: "#ffffff",
                  border: "1px solid #111827",
                };

          return (
            <a
              key={`${button.label}-${index}`}
              href={button.href || "#"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "10px 16px",
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: "none",
                ...variantStyle,
              }}
              onClick={(e) => e.preventDefault()}
            >
              {button.label}
            </a>
          );
        })}
      </div>
    );
  };

  const renderField = (label: string, input: React.ReactNode) => (
    <label
      style={{
        display: "grid",
        gap: 8,
        width: "100%",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#475569",
        }}
      >
        {label}
      </span>
      {input}
    </label>
  );

  const renderProductCards = (products: any[] = []) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((product, index) => (
          <div
            key={`${product.title}-${index}`}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 12,
              background: "#ffffff",
            }}
          >
            <img
              src={product.image || `https://picsum.photos/600/600?random=${index + 1}`}
              alt={product.title || "Product"}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
            <div style={{ marginTop: 10, fontWeight: 700 }}>
              {product.title}
            </div>
            <div style={{ marginTop: 4, color: "#475569" }}>
              {product.price}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (block.isSpacer || block.type === "spacer") {
      return (
        <div
          className="builder-generic-block"
          style={{
            minHeight: style.minHeight || 60,
            borderRadius: 12,
            border: "1px dashed #cbd5e1",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontWeight: 600,
          }}
        >
          Spacer
        </div>
      );
    }

    if (block.type === "heading") {
      return (
        <h1
          style={{
            margin: 0,
            fontSize: style.fontSize || 40,
            lineHeight: style.lineHeight || 1.1,
            fontWeight: style.fontWeight || 800,
          }}
        >
          {content}
        </h1>
      );
    }

    if (block.type === "text" || block.type === "paragraph") {
      return (
        <p
          style={{
            margin: 0,
            color: style.color || "#334155",
            lineHeight: style.lineHeight || 1.7,
            fontSize: style.fontSize || 16,
          }}
        >
          {content}
        </p>
      );
    }

    if (block.type === "button" || block.type === "submit") {
      return (
        <button
          type={block.type === "submit" ? "submit" : "button"}
          style={{
            minHeight: 44,
            padding: style.padding || "12px 18px",
            borderRadius: style.borderRadius || "12px",
            border: "none",
            background: style.backgroundColor || "#111827",
            color: style.color || "#ffffff",
            fontWeight: 700,
          }}
        >
          {content}
        </button>
      );
    }

    if (block.type === "badge") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "fit-content",
            minHeight: 32,
            padding: style.padding || "8px 12px",
            borderRadius: style.borderRadius || "999px",
            background: style.backgroundColor || "#fef3c7",
            color: style.color || "#92400e",
            fontWeight: 700,
          }}
        >
          {content}
        </span>
      );
    }

    if (block.type === "image") {
      return (
        <img
          src={props.src || "https://picsum.photos/1200/700"}
          alt={props.alt || "Image"}
          style={{
            width: "100%",
            height: "100%",
            minHeight: Number(String(style.minHeight || "240").replace("px", "")),
            objectFit: style.objectFit || "cover",
            borderRadius: Number(String(style.borderRadius || "16").replace("px", "")),
          }}
        />
      );
    }

    if (block.type === "image-block") {
      return (
        <div style={{ display: "grid", gap: 14 }}>
          <img
            src={props.src || "https://picsum.photos/1200/760"}
            alt={props.alt || "Image"}
            style={{
              width: "100%",
              minHeight: 220,
              objectFit: "cover",
              borderRadius: 14,
            }}
          />
          {props.title && <strong>{props.title}</strong>}
          {props.description && (
            <p style={{ margin: 0, color: "#475569" }}>{props.description}</p>
          )}
        </div>
      );
    }

    if (block.type === "video") {
      return (
        <div style={{ display: "grid", gap: 14 }}>
          <div
            style={{
              minHeight: 220,
              borderRadius: 14,
              background: "#0f172a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              backgroundImage: props.poster ? `url(${props.poster})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            Video Preview
          </div>
          {props.title && <strong>{props.title}</strong>}
          {props.description && (
            <p style={{ margin: 0, color: "#475569" }}>{props.description}</p>
          )}
        </div>
      );
    }

    if (block.type === "list") {
      return (
        <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
          {(props.items || []).map((item: string, index: number) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      );
    }

    if (block.type === "divider") {
      return (
        <div
          style={{
            width: "100%",
            borderTop: "1px solid #e2e8f0",
            marginTop: 8,
            marginBottom: 8,
          }}
        />
      );
    }

    if (block.type === "quote") {
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.5 }}>
            {content}
          </div>
          {props.subtitle && (
            <div style={{ color: "#64748b", fontSize: 14 }}>
              {props.subtitle}
            </div>
          )}
        </div>
      );
    }

    if (block.type === "card") {
      return (
        <div style={{ display: "grid", gap: 10 }}>
          <strong style={{ fontSize: 18 }}>{props.title}</strong>
          <p style={{ margin: 0, color: "#475569" }}>{props.content}</p>
        </div>
      );
    }

    if (block.type === "stats") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 12,
          }}
        >
          {(props.stats || []).map((stat: any, index: number) => (
            <div
              key={`${stat.label}-${index}`}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 14,
                background: "#f8fafc",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      );
    }

    if (block.type === "navbar") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <strong style={{ fontSize: 18 }}>{props.title || "Brand"}</strong>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {(props.links || []).map((link: any, index: number) => (
              <a
                key={`${link.label}-${index}`}
                href={link.href || "#"}
                style={{
                  color: "#334155",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
                onClick={(e) => e.preventDefault()}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "hero") {
      return (
        <div style={{ display: "grid", gap: 12, alignContent: "center", minHeight: 240 }}>
          {props.badge && (
            <span
              style={{
                display: "inline-flex",
                width: "fit-content",
                padding: "8px 12px",
                borderRadius: 999,
                background: "#eff6ff",
                color: "#1d4ed8",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {props.badge}
            </span>
          )}
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.1 }}>
            {props.title}
          </h2>
          <p style={{ margin: 0, color: "#475569", fontSize: 17, maxWidth: 680 }}>
            {props.subtitle}
          </p>
          {renderButtons(props.buttons)}
        </div>
      );
    }

    if (block.type === "features") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: 12,
            }}
          >
            {(props.columns || []).map((column: any, index: number) => (
              <div
                key={`${column.title}-${index}`}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <strong>{column.title}</strong>
                <p style={{ margin: "8px 0 0", color: "#475569" }}>
                  {column.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "pricing") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: 12,
            }}
          >
            {(props.columns || []).map((column: any, index: number) => (
              <div
                key={`${column.title}-${index}`}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 16,
                  background: "#ffffff",
                }}
              >
                <strong>{column.title}</strong>
                <div style={{ marginTop: 8, fontSize: 24, fontWeight: 800 }}>
                  {column.content}
                </div>
                <ul style={{ margin: "12px 0 0", paddingLeft: 18, display: "grid", gap: 6 }}>
                  {(column.items || []).map((item: string, itemIndex: number) => (
                    <li key={`${item}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "testimonials") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap: 12,
            }}
          >
            {(props.testimonials || []).map((item: any, index: number) => (
              <div
                key={`${item.name}-${index}`}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: 16,
                  background: "#f8fafc",
                }}
              >
                <p style={{ margin: 0, fontWeight: 600 }}>“{item.quote}”</p>
                <div style={{ marginTop: 10, color: "#64748b", fontSize: 14 }}>
                  {item.name}
                  {item.role ? ` · ${item.role}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "cta") {
      return (
        <div style={{ display: "grid", gap: 12, alignContent: "center" }}>
          <strong style={{ fontSize: 28 }}>{props.title}</strong>
          <p style={{ margin: 0, color: "#475569" }}>{props.subtitle}</p>
          {renderButtons(props.buttons)}
        </div>
      );
    }

    if (block.type === "footer") {
      return (
        <div style={{ display: "grid", gap: 10 }}>
          <strong>{props.title}</strong>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {(props.links || []).map((link: any, index: number) => (
              <a
                key={`${link.label}-${index}`}
                href={link.href || "#"}
                style={{ color: "#475569", textDecoration: "none" }}
                onClick={(e) => e.preventDefault()}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div style={{ color: "#64748b", fontSize: 14 }}>{props.content}</div>
        </div>
      );
    }

    if (block.type === "input") {
      return renderField(
        props.label || "Input label",
        <input
          placeholder={props.placeholder || "Enter value"}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "10px 12px",
            minHeight: 44,
            outline: "none",
          }}
        />
      );
    }

    if (block.type === "textarea") {
      return renderField(
        props.label || "Textarea label",
        <textarea
          placeholder={props.placeholder || "Write something..."}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "12px",
            minHeight: 120,
            outline: "none",
            resize: "vertical",
          }}
        />
      );
    }

    if (block.type === "select") {
      return renderField(
        props.label || "Select label",
        <select
          defaultValue=""
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: 10,
            padding: "10px 12px",
            minHeight: 44,
            outline: "none",
            background: "#ffffff",
          }}
        >
          <option value="" disabled>
            Select an option
          </option>
          {(props.options || []).map((option: string, index: number) => (
            <option key={`${option}-${index}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (block.type === "checkbox") {
      return (
        <label
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <input type="checkbox" defaultChecked={!!props.checked} />
          <span>{props.label || "Checkbox label"}</span>
        </label>
      );
    }

    if (block.type === "product") {
      return (
        <div style={{ display: "grid", gap: 14 }}>
          <img
            src={props.src || "https://picsum.photos/800/500"}
            alt={props.alt || props.title || "Product"}
            style={{
              width: "100%",
              minHeight: 180,
              objectFit: "cover",
              borderRadius: 14,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <strong>{props.title}</strong>
            <strong>{props.price}</strong>
          </div>
          <p style={{ margin: 0, color: "#475569" }}>{props.description}</p>
        </div>
      );
    }

    if (block.type === "product-list") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          {renderProductCards(props.products || [])}
        </div>
      );
    }

    if (block.type === "cart") {
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
            {(props.items || []).map((item: string, index: number) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
          <div style={{ fontWeight: 800 }}>Total: {props.price}</div>
        </div>
      );
    }

    if (block.type === "checkout") {
      return (
        <div style={{ display: "grid", gap: 12 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <p style={{ margin: 0, color: "#475569" }}>{props.subtitle}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              placeholder="Cardholder name"
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            />
            <input
              placeholder="Card number"
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            />
          </div>
        </div>
      );
    }

    if (block.type === "blog-list") {
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <div style={{ display: "grid", gap: 12 }}>
            {(props.posts || []).map((post: any, index: number) => (
              <div
                key={`${post.title}-${index}`}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  paddingBottom: 12,
                }}
              >
                <strong>{post.title}</strong>
                <p style={{ margin: "6px 0 0", color: "#475569" }}>
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "blog-post") {
      return (
        <article style={{ display: "grid", gap: 12 }}>
          <strong style={{ fontSize: 26 }}>{props.title}</strong>
          {props.subtitle && (
            <p style={{ margin: 0, color: "#64748b" }}>{props.subtitle}</p>
          )}
          <p style={{ margin: 0, color: "#334155", lineHeight: 1.8 }}>
            {props.content}
          </p>
        </article>
      );
    }

    if (block.type === "faq") {
      return (
        <div style={{ display: "grid", gap: 14 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          {(props.faqs || []).map((faq: any, index: number) => (
            <details
              key={`${faq.question}-${index}`}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 14,
                background: "#ffffff",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                {faq.question}
              </summary>
              <p style={{ margin: "10px 0 0", color: "#475569" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      );
    }

    if (block.type === "table") {
      const columns = props.columns || [];
      const rowCount = Math.max(
        0,
        ...columns.map((column: any) => column.items?.length || 0)
      );

      return (
        <div style={{ display: "grid", gap: 14 }}>
          <strong style={{ fontSize: 22 }}>{props.title}</strong>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {columns.map((column: any, index: number) => (
                    <th
                      key={`${column.title}-${index}`}
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column: any, colIndex: number) => (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                          padding: "10px 12px",
                          borderBottom: "1px solid #f1f5f9",
                          color: "#475569",
                        }}
                      >
                        {column.items?.[rowIndex] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (block.type === "product-title") {
      return (
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, lineHeight: 1.15 }}>
          {props.content || "Product Title"}
        </h2>
      );
    }

    if (block.type === "product-description") {
      return (
        <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
          {props.content || "Product description goes here"}
        </p>
      );
    }

    if (block.type === "product-image") {
      return (
        <img
          src={props.src || "https://picsum.photos/1000/1000?random=71"}
          alt={props.alt || "Product"}
          style={{
            width: "100%",
            minHeight: 320,
            objectFit: "cover",
            borderRadius: 16,
          }}
        />
      );
    }

    if (block.type === "product-gallery") {
      const images = props.images || [
        "https://picsum.photos/900/900?random=21",
        "https://picsum.photos/900/900?random=22",
        "https://picsum.photos/900/900?random=23",
        "https://picsum.photos/900/900?random=24",
      ];

      return (
        <div style={{ display: "grid", gap: 12 }}>
          <img
            src={images[0]}
            alt={props.alt || "Product gallery"}
            style={{
              width: "100%",
              minHeight: 360,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 10,
            }}
          >
            {images.slice(0, 4).map((image: string, index: number) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`Gallery ${index + 1}`}
                style={{
                  width: "100%",
                  height: 90,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (block.type === "price") {
      return (
        <div style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>
          {props.price || "₹999"}
        </div>
      );
    }

    if (block.type === "discount-price") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ textDecoration: "line-through", color: "#64748b", fontSize: 18 }}>
            {props.compareAt || "₹1,299"}
          </span>
          <span style={{ color: "#16a34a", fontWeight: 800, fontSize: 28 }}>
            {props.price || "₹999"}
          </span>
        </div>
      );
    }

    if (block.type === "add-to-cart") {
      return (
        <button
          style={{
            width: "100%",
            background: style.backgroundColor || "#111827",
            color: style.color || "#ffffff",
            padding: style.padding || "14px 18px",
            borderRadius: style.borderRadius || 12,
            fontWeight: 700,
            border: "none",
            minHeight: 52,
          }}
        >
          {props.content || "Add to cart"}
        </button>
      );
    }

    if (block.type === "buy-now") {
      return (
        <button
          style={{
            width: "100%",
            background: style.backgroundColor || "#f3f4f6",
            color: style.color || "#111827",
            padding: style.padding || "14px 18px",
            borderRadius: style.borderRadius || 12,
            fontWeight: 700,
            border: style.border || "1px solid #d1d5db",
            minHeight: 52,
          }}
        >
          {props.content || "Buy now"}
        </button>
      );
    }

    if (block.type === "wishlist") {
      return (
        <button
          style={{
            width: "100%",
            background: style.backgroundColor || "#ffffff",
            color: style.color || "#111827",
            padding: style.padding || "12px 16px",
            borderRadius: style.borderRadius || 12,
            border: style.border || "1px solid #e5e7eb",
            minHeight: 48,
            fontWeight: 600,
          }}
        >
          {props.content || "Save to wishlist"}
        </button>
      );
    }

    if (block.type === "quantity-selector") {
      return (
        <div style={{ display: "grid", gap: 8, width: "fit-content" }}>
          {props.label && (
            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>
              {props.label}
            </span>
          )}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #d1d5db",
              borderRadius: 12,
              padding: "10px 12px",
              background: "#ffffff",
            }}
          >
            <button style={{ fontSize: 18, fontWeight: 700 }}>−</button>
            <span style={{ minWidth: 20, textAlign: "center", fontWeight: 700 }}>
              1
            </span>
            <button style={{ fontSize: 18, fontWeight: 700 }}>+</button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="builder-generic-block"
        style={{
          minHeight: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
          border: "1px dashed #cbd5e1",
          borderRadius: 12,
          background: "#f8fafc",
          fontWeight: 600,
        }}
      >
        {block.type}
      </div>
    );
  };

  return (
    <div
      style={shellStyle}
      onClick={() => setSelectedBlock(sectionId, block.id)}
    >
      <div
        style={{
          position: "absolute",
          top: -14,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 20,
          opacity: isSelected ? 1 : 0,
          pointerEvents: isSelected ? "auto" : "none",
          transition: "opacity 180ms ease",
        }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            duplicateBlock(sectionId, block.id);
          }}
          aria-label="Duplicate block"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: "1px solid #dbe1ea",
            background: "#ffffff",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Copy size={16} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            removeBlock(sectionId, block.id);
          }}
          aria-label="Delete block"
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            border: "1px solid #fecaca",
            color: "#dc2626",
            background: "#ffffff",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        aria-label="Drag block"
        {...dragHandleProps}
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          width: 32,
          height: 32,
          borderRadius: 10,
          border: "1px solid #dbe1ea",
          background: "#ffffff",
          display: "grid",
          placeItems: "center",
          cursor: "grab",
          zIndex: 20,
          boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
        }}
      >
        <GripVertical size={16} />
      </button>

      <div style={panelStyle}>{renderContent()}</div>

      {isSelected && (
        <>
          <div
            onMouseDown={(e) => startResize(e, "left")}
            style={{
              position: "absolute",
              left: -4,
              top: "50%",
              transform: "translateY(-50%)",
              width: 8,
              height: 48,
              borderRadius: 999,
              background: "#2563eb",
              cursor: "ew-resize",
              zIndex: 30,
            }}
          />
          <div
            onMouseDown={(e) => startResize(e, "right")}
            style={{
              position: "absolute",
              right: -4,
              top: "50%",
              transform: "translateY(-50%)",
              width: 8,
              height: 48,
              borderRadius: 999,
              background: "#2563eb",
              cursor: "ew-resize",
              zIndex: 30,
            }}
          />
          <div
            onMouseDown={(e) => startResize(e, "top")}
            style={{
              position: "absolute",
              top: -4,
              left: "50%",
              transform: "translateX(-50%)",
              width: 48,
              height: 8,
              borderRadius: 999,
              background: "#2563eb",
              cursor: "ns-resize",
              zIndex: 30,
            }}
          />
          <div
            onMouseDown={(e) => startResize(e, "bottom")}
            style={{
              position: "absolute",
              bottom: -4,
              left: "50%",
              transform: "translateX(-50%)",
              width: 48,
              height: 8,
              borderRadius: 999,
              background: "#2563eb",
              cursor: "ns-resize",
              zIndex: 30,
            }}
          />
        </>
      )}
    </div>
  );
}