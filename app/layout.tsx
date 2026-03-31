import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Canvas from "./components/canvas"; // ✅ added

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen font-[var(--font-inter)]">

        {/* Header + Sidebar */}
        <Header />
        <Sidebar />

        {/* Canvas Area */}
        <main className="pt-16 ml-[20%] w-[80%] h-[calc(100vh-4rem)]">
          <Canvas>
            {children}
          </Canvas>
        </main>

      </body>
    </html>
  );
}