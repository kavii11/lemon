import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import DndProvider from "./components/DndProvider";
import Header from "./components/header"; // ✅ updated
import Sidebar from "./components/sidebar"; // ✅ updated

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lemonoid",
  description: "Modern Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const handleDragEnd = (event: any) => {
  const { active, over } = event;

  if (!over) return;

  console.log("Dragged:", active.id);
  console.log("Dropped on:", over.id);
};
  return (
  <html
    lang="en"
    className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
  >
    <body className="min-h-screen bg-[#ffffff] font-[var(--font-inter)]">
      <DndProvider>
        {children}
      </DndProvider>
    </body>
  </html>
);
}