import { prisma } from "../prisma";
import { StoredOrder } from "./types";

// In-memory runtime cache for development/offline fallback if DB is not connected
const memoryOrders: Map<string, StoredOrder> = new Map();
let isDbAvailable: boolean | null = null;

export interface CreateOrderRecordParams {
  orderId: string;
  productSlug: string;
  productName: string;
  amount: number;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export async function recordPendingOrder(params: CreateOrderRecordParams): Promise<StoredOrder> {
  const newOrder: StoredOrder = {
    id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    orderId: params.orderId,
    paymentId: null,
    productSlug: params.productSlug,
    productName: params.productName,
    amount: params.amount,
    currency: params.currency,
    status: "created",
    customerName: params.customerName || null,
    customerEmail: params.customerEmail || null,
    customerPhone: params.customerPhone || null,
    fulfillmentToken: null,
    receipt: params.receipt || null,
    notes: params.notes || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (isDbAvailable !== false) {
    try {
      const orderDelegate = (prisma as any).order;
      if (!orderDelegate) {
        throw new Error("Prisma Order delegate not yet initialized in client");
      }
      const dbOrder = await orderDelegate.create({
        data: {
          orderId: params.orderId,
          productSlug: params.productSlug,
          productName: params.productName,
          amount: params.amount,
          currency: params.currency,
          status: "created",
          customerName: params.customerName,
          customerEmail: params.customerEmail,
          customerPhone: params.customerPhone,
          receipt: params.receipt,
          notes: params.notes,
        },
      });
      isDbAvailable = true;
      return dbOrder as unknown as StoredOrder;
    } catch (error) {
      isDbAvailable = false;
      console.warn("Database unavailable for order creation, persisting to in-memory store:", error);
    }
  }

  memoryOrders.set(params.orderId, newOrder);
  return newOrder;
}

export async function markOrderPaid(params: {
  orderId: string;
  paymentId: string;
  fulfillmentToken: string;
  customerEmail?: string;
  customerName?: string;
}): Promise<StoredOrder | null> {
  if (isDbAvailable !== false) {
    try {
      const orderDelegate = (prisma as any).order;
      if (!orderDelegate) {
        throw new Error("Prisma Order delegate not yet initialized in client");
      }
      const updatedDb = await orderDelegate.update({
        where: { orderId: params.orderId },
        data: {
          status: "paid",
          paymentId: params.paymentId,
          fulfillmentToken: params.fulfillmentToken,
          customerEmail: params.customerEmail || undefined,
          customerName: params.customerName || undefined,
        },
      });
      isDbAvailable = true;
      return updatedDb as unknown as StoredOrder;
    } catch (error) {
      console.warn("Failed updating order in database, falling back to in-memory update:", error);
    }
  }

  const existing = memoryOrders.get(params.orderId);
  if (existing) {
    const updated: StoredOrder = {
      ...existing,
      status: "paid",
      paymentId: params.paymentId,
      fulfillmentToken: params.fulfillmentToken,
      customerEmail: params.customerEmail || existing.customerEmail,
      customerName: params.customerName || existing.customerName,
      updatedAt: new Date(),
    };
    memoryOrders.set(params.orderId, updated);
    return updated;
  }

  // If order was created in DB earlier but DB now failed, or started in-memory
  const fallbackOrder: StoredOrder = {
    id: `ord_${Date.now()}`,
    orderId: params.orderId,
    paymentId: params.paymentId,
    productSlug: "unknown",
    productName: "Order",
    amount: 0,
    currency: "INR",
    status: "paid",
    customerEmail: params.customerEmail || null,
    customerName: params.customerName || null,
    fulfillmentToken: params.fulfillmentToken,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryOrders.set(params.orderId, fallbackOrder);
  return fallbackOrder;
}

export async function getOrderByOrderId(orderId: string): Promise<StoredOrder | null> {
  if (isDbAvailable !== false) {
    try {
      const orderDelegate = (prisma as any).order;
      if (!orderDelegate) {
        throw new Error("Prisma Order delegate not yet initialized in client");
      }
      const dbOrder = await orderDelegate.findUnique({
        where: { orderId },
      });
      if (dbOrder) {
        return dbOrder as unknown as StoredOrder;
      }
    } catch (error) {
      console.warn("Database query for order failed, falling back to in-memory store:", error);
    }
  }

  return memoryOrders.get(orderId) || null;
}
