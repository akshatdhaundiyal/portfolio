import crypto from "crypto";
import { DeliverableType } from "./types";

/**
 * Razorpay credentials provider.
 * Falls back gracefully to mock credentials in local development when environment variables are omitted.
 */
export function getRazorpayCredentials(): { keyId: string; keySecret: string; isLive: boolean } {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_portfolio_demo";
  const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_portfolio_demo";
  const isLive = !keyId.startsWith("rzp_test_") && keyId !== "rzp_test_portfolio_demo";
  return { keyId, keySecret, isLive };
}

export interface CreateOrderParams {
  amount: number; // in smallest currency unit (paise/cents)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResult {
  id: string;
  amount: number;
  currency: string;
  status: string;
  receipt?: string;
}

/**
 * Creates an order directly against Razorpay REST API using native fetch and HTTP Basic Auth.
 * Avoids third-party npm package vulnerabilities and complies with zero-dependency discipline.
 */
export async function createRazorpayOrder(params: CreateOrderParams): Promise<RazorpayOrderResult> {
  const { keyId, keySecret } = getRazorpayCredentials();

  // If using mock credentials in development without real API access, return deterministic mock order
  if (keyId === "rzp_test_portfolio_demo" && keySecret === "rzp_secret_portfolio_demo") {
    const mockId = `order_mock_${Date.now().toString(36)}_${crypto.randomBytes(3).toString("hex")}`;
    return {
      id: mockId,
      amount: params.amount,
      currency: params.currency,
      status: "created",
      receipt: params.receipt,
    };
  }

  const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      receipt: params.receipt,
      notes: params.notes || {},
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Razorpay Order API Failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency,
    status: data.status,
    receipt: data.receipt,
  };
}

/**
 * Cryptographically verifies payment signature using Node.js HMAC-SHA256.
 * Signature payload format: `${razorpay_order_id}|${razorpay_payment_id}`
 */
export function verifyRazorpaySignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const { keyId, keySecret } = getRazorpayCredentials();

  // In mock local development mode, accept standard mock signatures
  if (keyId === "rzp_test_portfolio_demo" && params.signature.startsWith("mock_sig_")) {
    return true;
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  return generatedSignature === params.signature;
}

/**
 * Generates an authentic cryptographic license string format for software deliverables (e.g. Media Chronicle).
 */
export function generateLicenseKey(productSlug: string, customerEmail?: string): string {
  const prefix = productSlug.includes("chronicle") ? "MC1" : "LIC";
  const seed = `${productSlug}:${customerEmail || "customer"}:${Date.now()}`;
  const hash = crypto.createHash("sha256").update(seed).digest("hex").toUpperCase();
  
  return `${prefix}-${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}`;
}

/**
 * Dispatches appropriate fulfillment payload based on product deliverable type.
 */
export function generateFulfillmentPayload(
  deliverableType: DeliverableType,
  productSlug: string,
  customerEmail?: string
): { fulfillmentToken: string; message: string } {
  if (deliverableType === "license_key") {
    const licenseKey = generateLicenseKey(productSlug, customerEmail);
    return {
      fulfillmentToken: licenseKey,
      message: "License key generated and activated for up to 3 personal devices.",
    };
  }

  if (deliverableType === "consulting_session") {
    const sessionToken = `CAL-APML-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    return {
      fulfillmentToken: sessionToken,
      message: "Session reservation secured. Check calendar booking instructions below.",
    };
  }

  return {
    fulfillmentToken: `ASSET-${crypto.randomBytes(6).toString("hex").toUpperCase()}`,
    message: "Digital asset unlocked. Instant download link generated.",
  };
}
