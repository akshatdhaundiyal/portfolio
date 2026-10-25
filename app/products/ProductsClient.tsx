"use client";

import React, { useState } from "react";
import { PRODUCT_CATALOG } from "@/lib/payments/config";
import { ProductConfig, PaymentCurrency } from "@/lib/payments/types";
import RazorpayCheckoutModal from "@/components/payments/RazorpayCheckoutModal";
import { ShieldCheck, Zap, Download, Calendar, CheckCircle2, ChevronDown } from "lucide-react";

export default function ProductsClient() {
  const [currency, setCurrency] = useState<PaymentCurrency>("INR");
  const [selectedProduct, setSelectedProduct] = useState<ProductConfig | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const products = Object.values(PRODUCT_CATALOG).filter((p) => p.active);

  const handleBuy = (product: ProductConfig) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const currencySymbol = currency === "USD" ? "$" : "₹";

  const faqs = [
    {
      q: "How is my purchase delivered immediately after payment?",
      a: "Upon successful cryptographic verification of your Razorpay payment, your unique cryptographic license key string (for Media Chronicle) or private calendar scheduling link (for Advisory) is rendered instantly on-screen and dispatched to your email address."
    },
    {
      q: "What payment methods are supported via Razorpay?",
      a: "Razorpay securely processes Indian UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit & Debit cards (Visa, MasterCard, RuPay, Amex), and Netbanking across 50+ banks, as well as international cards."
    },
    {
      q: "Can Media Chronicle run on air-gapped machines without internet?",
      a: "Yes. Media Chronicle is built specifically for strict privacy and air-gapped operation. The core computer vision and multi-modal vector search models run 100% locally on your machine with zero telemetry and zero external server calls."
    },
    {
      q: "What is your refund guarantee?",
      a: "Every Media Chronicle lifetime license is backed by an unconditional 30-day money-back guarantee. If the engine does not meet your archival workflow requirements, email us for a prompt 100% refund."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Currency Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl bg-neutral-900/60 dark:bg-neutral-900/40 border border-neutral-700/60 dark:border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>OFFICIAL MERCHANT CHECKOUT // ENCRYPTED RAZORPAY GATEWAY</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-400">Currency:</span>
          <div className="inline-flex rounded-lg p-1 bg-neutral-800/80 border border-neutral-700 text-xs font-mono">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                currency === "INR"
                  ? "bg-[#d94e34] text-white font-bold shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                currency === "USD"
                  ? "bg-[#d94e34] text-white font-bold shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {products.map((product) => {
          const price = currency === "USD" ? product.priceUsd : product.priceInr;
          const isChronicle = product.slug === "media-chronicle";

          return (
            <div
              key={product.slug}
              className="relative flex flex-col justify-between rounded-2xl bg-[#14181b] border border-neutral-700/80 p-6 sm:p-8 text-[#ece5d8] shadow-xl hover:border-neutral-500 transition-all duration-200"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
              }}
            >
              {/* Highlight ribbon accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                style={{ backgroundColor: product.accentColor }}
              />

              <div className="space-y-6">
                {/* Badge & Deliverable */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono tracking-wider font-bold px-2 py-0.5 rounded border uppercase"
                    style={{
                      color: product.accentColor,
                      borderColor: `${product.accentColor}40`,
                      backgroundColor: `${product.accentColor}10`,
                    }}
                  >
                    {product.badge}
                  </span>

                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    {isChronicle ? (
                      <>
                        <Download className="w-3.5 h-3.5 text-rose-400" /> Windows x64
                      </>
                    ) : (
                      <>
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> 60-Min Session
                      </>
                    )}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                    {product.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2 leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 px-5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                      One-Time Investment
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                        {currencySymbol}{price.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">{currency}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded">
                    {isChronicle ? "30-Day Guarantee" : "Memo Included"}
                  </span>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Included Capabilities:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                    {product.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: product.accentColor }}
                        />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t border-neutral-800/80">
                <button
                  onClick={() => handleBuy(product)}
                  className="w-full py-3.5 px-6 rounded-xl text-white font-medium font-chalk text-lg tracking-wide transition-all duration-150 shadow-lg cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    backgroundColor: product.accentColor,
                  }}
                >
                  <Zap className="w-4 h-4" />
                  <span>
                    {isChronicle ? "Acquire Lifetime License →" : "Book Architecture Review →"}
                  </span>
                </button>
                <p className="text-center text-[11px] font-mono text-neutral-500 mt-2.5">
                  Instant checkout via Razorpay • 256-Bit SSL Encryption
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6 pt-10 border-t border-neutral-700/60 dark:border-white/[0.08]">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono text-[#d94e34] uppercase tracking-wider font-bold">
            COMMERCIAL QUESTIONS // TRANSPARENCY
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-700/60 dark:border-neutral-800 bg-[#14181b] overflow-hidden text-[#ece5d8]"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold hover:text-[#d94e34] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#d94e34]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed border-t border-neutral-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Checkout Modal */}
      {selectedProduct && (
        <RazorpayCheckoutModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialCurrency={currency}
        />
      )}
    </div>
  );
}
