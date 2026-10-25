import { ProductConfig } from "./types";

/**
 * Centralized Commercial Offerings Catalog
 * Decouples pricing and product specifications from frontend presentation.
 * Easily extended for future products and services without modifying payment logic.
 */
export const PRODUCT_CATALOG: Record<string, ProductConfig> = {
  "media-chronicle": {
    slug: "media-chronicle",
    title: "Media Chronicle",
    subtitle: "Air-Gapped Vault & Offline Multi-Modal Photo Indexer",
    tagline: "Index and semantically query 100,000+ RAW photos across external hard drives in milliseconds with zero cloud egress.",
    badge: "DESKTOP SOFTWARE // PERPETUAL V1",
    priceInr: 6499, // ₹6,499 INR
    priceUsd: 79,   // $79 USD
    deliverableType: "license_key",
    highlights: [
      "Perpetual offline license for up to 3 Windows PCs",
      "Local multi-modal vision engine with 0 bytes transmitted",
      "Instant query indexing across disconnected external USB drives",
      "Free minor version updates & 30-day money-back guarantee"
    ],
    accentColor: "#f43f5e",
    active: true,
    metadata: {
      platform: "Windows x64",
      version: "1.0.0-rc",
      installerName: "MediaChronicle-Setup-x64.exe",
    }
  },
  "executive-advisory": {
    slug: "executive-advisory",
    title: "Applied ML Architecture Review",
    subtitle: "1-on-1 Strategic Technical Advisory & Code Audit",
    tagline: "60-minute intensive teardown of your ML inference pipelines, model evaluation, or data platforms with an Applied ML Lead.",
    badge: "1-ON-1 CONSULTING SESSION",
    priceInr: 14999, // ₹14,999 INR
    priceUsd: 199,   // $199 USD
    deliverableType: "consulting_session",
    highlights: [
      "Architecture, SLA & GPU cloud inference cost teardown",
      "Model deployment, latency, and telemetry bottleneck analysis",
      "Comprehensive written technical action memo delivered within 48h",
      "Direct follow-up access via private asynchronous channel"
    ],
    accentColor: "#f59e0b",
    active: true,
    metadata: {
      durationMinutes: 60,
      deliveryChannel: "Google Meet / Private Channel",
    }
  }
};

/**
 * Helper to fetch an active product by slug.
 */
export function getProductBySlug(slug: string): ProductConfig | null {
  const product = PRODUCT_CATALOG[slug];
  if (!product || !product.active) {
    return null;
  }
  return product;
}

/**
 * Exchange rate fallback ratio for display conversions if needed.
 */
export const DEFAULT_CURRENCY = "INR" as const;
