import React from "react";
import ProductsClient from "./ProductsClient";
import { Package } from "lucide-react";

export const metadata = {
  title: "Products & Systems Advisory | Akshat Dhaundiyal",
  description:
    "Acquire perpetual licenses for Media Chronicle or schedule 1-on-1 Applied ML System Architecture Reviews with Akshat Dhaundiyal.",
};

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Editorial Header Banner */}
      <div className="space-y-4 border-b border-black/10 dark:border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d94e34]/10 border border-[#d94e34]/20 text-[#d94e34] font-mono text-xs">
          <Package className="w-3.5 h-3.5" />
          <span>COMMERCIAL LAB // SOFTWARE &amp; ADVISORY CATALOG</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Products &amp; Advisory.
        </h1>

        <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
          Air-gapped desktop photo indexing engines, production computer vision tools, and intensive 1-on-1 machine learning architecture reviews. Transparent pricing, no subscriptions.
        </p>
      </div>

      {/* Interactive Products Grid & Razorpay Checkout */}
      <ProductsClient />
    </div>
  );
}
