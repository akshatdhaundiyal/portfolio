import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature, generateFulfillmentPayload } from "@/lib/payments/razorpay";
import { getOrderByOrderId, markOrderPaid } from "@/lib/payments/orders";
import { getProductBySlug } from "@/lib/payments/config";
import { VerifyPaymentRequest, VerifyPaymentResponse } from "@/lib/payments/types";

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
    const body: VerifyPaymentRequest = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerEmail, customerName } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 1. Cryptographically verify signature
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment cryptographic signature. Transaction rejected." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 2. Retrieve corresponding order
    const storedOrder = await getOrderByOrderId(razorpay_order_id);
    const productSlug = storedOrder?.productSlug || "media-chronicle";
    const product = getProductBySlug(productSlug);

    const deliverableType = product?.deliverableType || "license_key";
    const emailToUse = customerEmail || storedOrder?.customerEmail || undefined;

    // 3. Generate fulfillment payload (license key or session token)
    const { fulfillmentToken, message } = generateFulfillmentPayload(
      deliverableType,
      productSlug,
      emailToUse
    );

    // 4. Update order record in persistence layer
    await markOrderPaid({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      fulfillmentToken,
      customerEmail: emailToUse,
      customerName: customerName || storedOrder?.customerName || undefined,
    });

    const receiptNumber = `REC-${productSlug.slice(0, 4).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    const responsePayload: VerifyPaymentResponse = {
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      receiptNumber,
      productName: product?.title || storedOrder?.productName || "Product",
      productSlug,
      deliverableType,
      fulfillmentToken,
      message,
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error: any) {
    console.error("Payment Verification Failed:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error verifying payment" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
