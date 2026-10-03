"use client";

import React, { useEffect, use } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Package,
  MessageSquare,
  ArrowRight,
  Printer,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { STORE_INFO } from "@/data/storeInfo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderSuccessPage({ params }: PageProps) {
  const { id: orderNumber } = use(params);
  const { orders } = useStore();

  const order = orders.find((o) => o.orderNumber === orderNumber);

  useEffect(() => {
    // Fire festive luxury gold/silver confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#FFFFFF", "#C5A880", "#000000"],
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Banner */}
        <div className="text-center space-y-4 pb-12 border-b border-white/10">
          <div className="w-16 h-16 bg-gold/10 border border-gold/40 rounded-full flex items-center justify-center mx-auto text-gold">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block">
            ORDER CONFIRMED & RECEIVED
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
            THANK YOU FOR YOUR PATRONAGE
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Your order has been registered at our Midnapore Flagship Atelier. A confirmation has been initiated with your tracking reference.
          </p>

          <div className="inline-block p-3 bg-zinc-900 border border-white/10 text-xs font-mono text-gold tracking-widest mt-2">
            ORDER ID: {orderNumber}
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="mt-8 bg-zinc-950 border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-serif text-lg tracking-wider uppercase text-white font-medium">
              DISPATCH & RECEIPT BREAKDOWN
            </h2>
            <button
              onClick={handlePrint}
              className="text-xs text-zinc-400 hover:text-gold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {order ? (
            <div className="space-y-6 text-xs">
              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-900/40 border border-white/5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    DELIVERY RECIPIENT
                  </span>
                  <div className="font-semibold text-white">{order.customer.fullName}</div>
                  <div className="text-zinc-400 font-mono mt-0.5">{order.customer.phone}</div>
                  <div className="text-zinc-400">{order.customer.email}</div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    DESTINATION ADDRESS
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {order.customer.street} <br />
                    {order.customer.landmark ? `${order.customer.landmark}, ` : ""}
                    {order.customer.city}, {order.customer.state} — {order.customer.pincode}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                  ORDERED PIECES ({order.items.length})
                </span>
                {order.items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between p-3 bg-zinc-900/20 border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-14 bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url('${it.product.images[0]}')` }}
                      />
                      <div>
                        <div className="font-serif text-white">{it.product.name}</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                          Qty: {it.quantity} {it.selectedSize ? `• Size: ${it.selectedSize}` : ""}{" "}
                          {it.selectedColor ? `• ${it.selectedColor}` : ""}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-white font-medium">
                      {formatPrice(it.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="space-y-1.5 pt-4 border-t border-white/10 text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(order.subtotal)}</span>
                </div>
                {order.volumeDiscount > 0 && (
                  <div className="flex justify-between text-gold">
                    <span>Multi-Item Promotion</span>
                    <span className="font-mono">-{formatPrice(order.volumeDiscount)}</span>
                  </div>
                )}
                {order.couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-{formatPrice(order.couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-gold font-bold">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-zinc-400">
              Order reference #{orderNumber} has been received and queued for dispatch.
            </p>
          )}

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/track-order?id=${orderNumber}`}
              className="py-3.5 bg-zinc-900 hover:bg-gold text-zinc-200 hover:text-black border border-white/10 hover:border-gold text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Delivery Status</span>
            </Link>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello! Inquiring about my order #${orderNumber}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Order Support</span>
            </a>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-gold transition inline-flex items-center gap-1.5"
            >
              <span>Continue Exploring Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
