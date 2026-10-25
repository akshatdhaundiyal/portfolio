"use client";

import React, { useState, useEffect } from "react";
import { ProductConfig, PaymentCurrency, VerifyPaymentResponse } from "@/lib/payments/types";

interface RazorpayCheckoutModalProps {
  product: ProductConfig;
  isOpen: boolean;
  onClose: () => void;
  initialCurrency?: PaymentCurrency;
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function RazorpayCheckoutModal({
  product,
  isOpen,
  onClose,
  initialCurrency = "INR",
}: RazorpayCheckoutModalProps) {
  const [currency, setCurrency] = useState<PaymentCurrency>(initialCurrency);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "creating" | "checkout_open" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fulfillment, setFulfillment] = useState<VerifyPaymentResponse | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrency(initialCurrency);
  }, [initialCurrency]);

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage(null);
      setFulfillment(null);
      setCopied(false);
    }
  }, [isOpen]);

  // Load Razorpay Checkout SDK dynamically on demand
  useEffect(() => {
    if (!isOpen) return;

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPrice = currency === "USD" ? product.priceUsd : product.priceInr;
  const currencySymbol = currency === "USD" ? "$" : "₹";

  const handleCopyToken = () => {
    if (fulfillment?.fulfillmentToken) {
      navigator.clipboard.writeText(fulfillment.fulfillmentToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address for delivery.");
      return;
    }

    try {
      setStatus("creating");
      setErrorMessage(null);

      // 1. Call Portfolio API to create order
      const createRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          currency,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
        }),
      });

      if (!createRes.ok) {
        const errData = await createRes.json();
        throw new Error(errData.error || "Failed to initialize payment order.");
      }

      const orderData = await createRes.json();

      // In local dev without live keys, if mock order returned, simulate verification directly
      if (orderData.orderId.startsWith("order_mock_") || !window.Razorpay) {
        setStatus("verifying");
        const verifyRes = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_mock_${Date.now().toString(36)}`,
            razorpay_signature: `mock_sig_${Date.now()}`,
            customerEmail: email,
            customerName: name,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setFulfillment(verifyData);
          setStatus("success");
          return;
        }
      }

      // 2. Open standard Razorpay Checkout Modal
      setStatus("checkout_open");

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Akshat Dhaundiyal // Systems",
        description: product.title,
        order_id: orderData.orderId,
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#d94e34", // Signature chalk terracotta red
        },
        modal: {
          ondismiss: () => {
            if (status !== "success" && status !== "verifying") {
              setStatus("idle");
            }
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            setStatus("verifying");

            const verifyRes = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerEmail: email,
                customerName: name,
              }),
            });

            if (!verifyRes.ok) {
              const err = await verifyRes.json();
              throw new Error(err.error || "Payment signature verification failed.");
            }

            const verifyData: VerifyPaymentResponse = await verifyRes.json();
            setFulfillment(verifyData);
            setStatus("success");
          } catch (err: any) {
            console.error("Verification error:", err);
            setErrorMessage(err.message || "Failed verifying payment signature.");
            setStatus("error");
          }
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", (resp: any) => {
        setErrorMessage(resp.error?.description || "Payment failed or was declined by the bank.");
        setStatus("error");
      });
      rzpInstance.open();
    } catch (err: any) {
      console.error("Checkout initiation error:", err);
      setErrorMessage(err.message || "Could not launch Razorpay checkout.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fade-in">
      {/* Blackboard container */}
      <div
        className="relative w-full max-w-lg bg-[#14181b] border border-neutral-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#ece5d8] overflow-hidden"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Subtle Chalkboard Texture Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d94e34] via-[#f59e0b] to-[#10b981]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={status === "verifying"}
          className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === "success" && fulfillment ? (
          /* SUCCESS STATE: TACTILE CONFIRMATION CARD */
          <div className="space-y-6 pt-2 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase">
                  PAYMENT VERIFIED // COMPLETED
                </span>
                <h3 className="text-xl font-bold font-chalk text-white">Order Confirmed</h3>
              </div>
            </div>

            {/* Product & Receipt Stamp */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-700/60 space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-semibold text-neutral-200">{fulfillment.productName}</div>
                  <div className="text-xs font-mono text-neutral-400">Receipt: {fulfillment.receiptNumber}</div>
                </div>
                {/* Traditional Seal Aesthetic */}
                <div className="px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-400 font-mono text-[10px] uppercase tracking-wider bg-emerald-950/30">
                  OFFICIAL PAID
                </div>
              </div>

              {/* Fulfillment Token or Booking Link */}
              {fulfillment.fulfillmentToken && (
                <div className="pt-2 border-t border-neutral-800 space-y-1.5">
                  <div className="text-xs text-neutral-400 flex justify-between items-center">
                    <span>
                      {fulfillment.deliverableType === "license_key"
                        ? "Cryptographic License Key (3 PCs):"
                        : "Session Reservation Reference:"}
                    </span>
                    <button
                      onClick={handleCopyToken}
                      className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? "✓ Copied" : "Copy string"}
                    </button>
                  </div>
                  <div className="p-2.5 rounded bg-black/60 border border-neutral-800 font-mono text-xs sm:text-sm text-amber-300 tracking-wider break-all select-all">
                    {fulfillment.fulfillmentToken}
                  </div>
                </div>
              )}

              <p className="text-xs text-neutral-400 leading-relaxed">
                {fulfillment.message} A copy of this receipt and onboarding instructions have also been sent to{" "}
                <strong className="text-neutral-200">{email}</strong>.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#d94e34] hover:bg-[#b83d25] text-white font-medium font-chalk text-lg tracking-wide transition-colors cursor-pointer shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM STATE */
          <div className="space-y-6 pt-2">
            {/* Header with Product Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-[#d94e34] uppercase font-bold">
                  {product.badge}
                </span>

                {/* Currency Switcher */}
                <div className="inline-flex rounded-lg p-0.5 bg-neutral-900 border border-neutral-700 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      currency === "INR" ? "bg-[#d94e34] text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      currency === "USD" ? "bg-[#d94e34] text-white font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-bold font-chalk text-white">{product.title}</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">{product.tagline}</p>
            </div>

            {/* Price Banner */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-700/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 block">Total One-Time Amount</span>
                <span className="text-2xl font-bold text-white font-mono">
                  {currencySymbol}
                  {currentPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-neutral-400 ml-1.5">{currency}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded block">
                  30-DAY MONEY-BACK
                </span>
                <span className="text-[10px] text-neutral-400 mt-1 block">Instant Digital Delivery</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Delivery Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d94e34] font-sans"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">
                  Your cryptographic license key and receipt will be sent here.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">Full Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Akshat Dhaundiyal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900/90 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d94e34] font-sans"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "creating" || status === "verifying"}
                className="w-full py-3.5 rounded-xl bg-[#d94e34] hover:bg-[#b83d25] disabled:opacity-50 text-white font-medium font-chalk text-xl tracking-wide transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {status === "creating" || status === "verifying" ? (
                  <span className="inline-flex items-center gap-2 text-base font-sans font-medium">
                    <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                    </svg>
                    {status === "creating" ? "Initiating Order..." : "Verifying Cryptographic Signature..."}
                  </span>
                ) : (
                  <span>Proceed to Razorpay Checkout ({currencySymbol}{currentPrice.toLocaleString()}) →</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  256-Bit Encrypted
                </span>
                <span>•</span>
                <span>UPI, Cards, Netbanking</span>
                <span>•</span>
                <span>Razorpay Gateway</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
