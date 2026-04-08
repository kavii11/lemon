"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Globe,
  FileText,
  Info,
  Phone,
  Book,
  HelpCircle,
} from "lucide-react";

import Header from "../header";
import ProductCanvas from "../product-builder/ProductCanvas";
import WebsiteCanvas from "../website-builder/WebsiteCanvas";

import PrimarySidebar from "../PrimarySidebar";
import WebsiteSidebar from "../WebsiteSidebar";
import ProductSidebar from "../ProductSidebar";
import BlogSidebar from "../BlogSidebar";

export default function DashboardLayout() {
  const [active, setActive] = useState("dashboard");
  const isDashboard = active === "dashboard";

  return (
    <div className="bg-black text-white">

      {/* HEADER */}
      <Header />

      {/* SIDEBARS */}
      <div className="fixed rounded top-[64px] left-0 bottom-0 flex z-50">

        {isDashboard ? (
          /* ✅ FULL SIDEBAR (20%) */
          <div className="w-[20vw] min-w-[240px] border-r border-zinc-800 p-4 flex flex-col justify-between bg-black">
            
            {/* 🔝 TOP */}
            <div>
              <h1 className="text-lg font-semibold mb-6">My Platform</h1>

              <SidebarItem icon={LayoutDashboard} label="Dashboard" id="dashboard" active={active} setActive={setActive} />

              <p className="text-xs text-zinc-500 mt-6 mb-2">MANAGEMENT</p>

              <SidebarItem icon={ShoppingBag} label="Products Management" id="products" active={active} setActive={setActive} />
              <SidebarItem icon={Globe} label="Create Website" id="website" active={active} setActive={setActive} />

              <p className="text-xs text-zinc-500 mt-6 mb-2">PAGES</p>

              <SidebarItem icon={FileText} label="Blog" id="blog" active={active} setActive={setActive} />
              <SidebarItem icon={Info} label="About" id="about" active={active} setActive={setActive} />
              <SidebarItem icon={Phone} label="Contact" id="contact" active={active} setActive={setActive} />
            </div>

            {/* 🔻 BOTTOM (UPDATED SAME AS OTHER SIDEBARS) */}
            <div>
              <div className="w-full border-t border-zinc-800"></div>

              <div className="p-4 space-y-2 text-right">
                <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">
                  Guide
                </p>
                <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">
                  How to use?
                </p>
              </div>
            </div>

          </div>
        ) : (
          <>
            {/* PRIMARY SIDEBAR */}
            <div className="w-[4vw] min-w-[60px] border-r border-zinc-800 bg-black flex flex-col items-center py-4">
              <PrimarySidebar active={active} setActive={setActive} />
            </div>

            {/* SECONDARY SIDEBAR */}
            <div className="w-[16vw] min-w-[200px] bg-black border-r border-zinc-800 overflow-y-auto">
              {active === "website" && <WebsiteSidebar />}
              {active === "products" && <ProductSidebar />}
              {active === "blog" && <BlogSidebar />}
            </div>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="fixed top-[56px] left-[20vw] right-0 bottom-0">
        {renderContent(active)}
      </div>

    </div>
  );
}

/* ================= Sidebar Item ================= */

function SidebarItem({ icon: Icon, label, id, active, setActive }: any) {
  return (
    <div
      onClick={() => setActive(id)}
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer mb-1 ${
        active === id ? "bg-yellow-500 text-black" : "hover:bg-zinc-800"
      }`}
    >
      <Icon size={16} />
      <span className="text-sm">{label}</span>
    </div>
  );
}

/* ================= CONTENT ================= */

function renderContent(active: string) {
  switch (active) {
    case "products":
      return <ProductCanvas />;

    case "website":
      return <WebsiteCanvas />;

    case "blog":
      return <div className="p-10">Blog Builder Coming Soon</div>;

    default:
      return <DashboardHome />;
  }
}

/* ================= DASHBOARD ================= */

function DashboardHome() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-zinc-400">
        Overview of your platform, analytics, and tools.
      </p>
    </div>
  );
}

/* (HelpSection kept but no longer used — safe to keep) */
function HelpSection() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle size={18} />
        <h2 className="text-sm font-semibold">Need Help?</h2>
      </div>
      <p className="text-xs text-zinc-500 mb-3">
        Visit our help center or contact support for assistance.
      </p>
      <img src="/help-section.jpg" alt="Help section" className="w-full rounded-md" />
    </div>
  );
}