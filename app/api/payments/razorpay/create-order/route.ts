import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/payments/config";
import { createRazorpayOrder, getRazorpayCredentials } from "@/lib/payments/razorpay";
import { recordPendingOrder } from "@/lib/payments/orders";
import { CreateOrderRequest, CreateOrderResponse } from "@/lib/payments/types";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderRequest = await req.json();
    const { productSlug, currency = "INR", customerName, customerEmail, customerPhone } = body;

    if (!productSlug) {
      return NextResponse.json(
        { error: "Missing required parameter: productSlug" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const product = getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: `Product '${productSlug}' not found or inactive in catalog` },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    // Determine amount in smallest currency unit (paise for INR, cents for USD)
    const selectedCurrency = currency.toUpperCase() === "USD" ? "USD" : "INR";
    const unitPrice = selectedCurrency === "USD" ? product.priceUsd : product.priceInr;
    const amountInSmallestUnit = Math.round(unitPrice * 100);

    const receipt = `rcpt_${productSlug.slice(0, 8)}_${Date.now().toString(36)}`;

    // Create order against Razorpay REST API
    const rzpOrder = await createRazorpayOrder({
      amount: amountInSmallestUnit,
      currency: selectedCurrency,
      receipt,
      notes: {
        productSlug: product.slug,
        productTitle: product.title,
        customerEmail: customerEmail || "",
        customerName: customerName || "",
      },
    });

    // Persist pending order to database / in-memory store
    await recordPendingOrder({
      orderId: rzpOrder.id,
      productSlug: product.slug,
      productName: product.title,
      amount: amountInSmallestUnit,
      currency: selectedCurrency,
      customerName,
      customerEmail,
      customerPhone,
      receipt,
      notes: {
        productTitle: product.title,
        deliverableType: product.deliverableType,
      },
    });

    const { keyId } = getRazorpayCredentials();

    const responsePayload: CreateOrderResponse = {
      orderId: rzpOrder.id,
      amount: amountInSmallestUnit,
      currency: selectedCurrency,
      keyId,
      productName: product.title,
      productSlug: product.slug,
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error: any) {
    console.error("Payment Order Creation Failed:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error creating order" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
