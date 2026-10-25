export type DeliverableType = "license_key" | "consulting_session" | "digital_asset";

export type PaymentCurrency = "INR" | "USD";

export interface ProductConfig {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  priceInr: number; // in Indian Rupees
  priceUsd: number; // in US Dollars
  deliverableType: DeliverableType;
  highlights: string[];
  accentColor: string;
  active: boolean;
  metadata?: Record<string, unknown>;
}

export interface CreateOrderRequest {
  productSlug: string;
  currency?: PaymentCurrency;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: Record<string, string>;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number; // in smallest currency unit (e.g. paise)
  currency: string;
  keyId: string;
  productName: string;
  productSlug: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customerEmail?: string;
  customerName?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId: string;
  paymentId: string;
  receiptNumber: string;
  productName: string;
  productSlug: string;
  deliverableType: DeliverableType;
  fulfillmentToken?: string;
  message: string;
}

export interface StoredOrder {
  id: string;
  orderId: string;
  paymentId?: string | null;
  productSlug: string;
  productName: string;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed";
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  fulfillmentToken?: string | null;
  receipt?: string | null;
  notes?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
