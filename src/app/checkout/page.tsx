"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Tag,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { CustomerAddress, Order, OrderStatus } from "@/types";
import { createCheckoutWhatsAppUrl } from "@/lib/whatsapp";
import { STORE_INFO } from "@/data/storeInfo";

const INDIAN_STATES = [
  "West Bengal",
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Gujarat",
  "Uttar Pradesh",
  "Haryana",
  "Rajasthan",
  "Kerala",
  "Punjab",
  "Bihar",
  "Odisha",
  "Assam",
  "Jharkhand",
  "Madhya Pradesh",
  "Andhra Pradesh",
  "Uttarakhand",
  "Goa",
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    volumeDiscountAmount,
    couponDiscountAmount,
    appliedCoupon,
    shippingFee,
    finalTotal,
    clearCart,
  } = useCart();
  const { addOrder } = useStore();

  // Form State
  const [formData, setFormData] = useState<CustomerAddress>({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    landmark: "",
    city: "Midnapore",
    state: "West Bengal",
    pincode: "721101",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "WHATSAPP" | "ONLINE_UPI" | "COD"
  >("WHATSAPP");

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-4 space-y-4">
        <h2 className="font-serif text-3xl font-light">Your Bag is Empty</h2>
        <p className="text-xs text-zinc-400">Add products before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-gold text-black text-xs uppercase tracking-widest font-semibold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const expressFee = shippingMethod === "express" ? 149 : 0;
  const grandTotal = finalTotal + expressFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic Validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.street.trim() || !formData.pincode.trim()) {
      setValidationError("Please complete all required shipping fields.");
      return;
    }

    if (formData.phone.replace(/\D/g, "").length < 10) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `AFF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      customer: formData,
      items: [...items],
      subtotal,
      volumeDiscount: volumeDiscountAmount,
      couponDiscount: couponDiscountAmount,
      couponCode: appliedCoupon?.code,
      shippingFee: shippingFee + expressFee,
      totalAmount: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === "ONLINE_UPI" ? "VERIFIED" : "PENDING",
      orderStatus: "CONFIRMED",
      courierName: "BlueDart Express",
      trackingNumber: `BD-${Math.floor(100000000 + Math.random() * 900000000)}`,
      timeline: [
        {
          status: "PENDING",
          label: "Order Placed",
          date: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          completed: true,
          checkpoint: "Online Boutique Hub",
        },
        {
          status: "CONFIRMED",
          label: "Order Confirmed",
          date: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          completed: true,
          checkpoint: "School Bazar Midnapore Boutique",
        },
        {
          status: "PACKED",
          label: "Quality Verification & Boxing",
          completed: false,
        },
        {
          status: "SHIPPED",
          label: "Dispatched with BlueDart",
          completed: false,
        },
        {
          status: "OUT_FOR_DELIVERY",
          label: "Out for Delivery",
          completed: false,
        },
        {
          status: "DELIVERED",
          label: "Delivered",
          completed: false,
        },
      ],
    };

    // Save order in StoreContext & LocalStorage
    addOrder(newOrder);

    // If WhatsApp checkout selected, open WhatsApp directly
    if (paymentMethod === "WHATSAPP") {
      const waUrl = createCheckoutWhatsAppUrl(
        orderNumber,
        items,
        {
          subtotal,
          volumeDiscount: volumeDiscountAmount,
          couponDiscount: couponDiscountAmount,
          couponCode: appliedCoupon?.code,
          shippingFee: shippingFee + expressFee,
          finalTotal: grandTotal,
        },
        formData
      );
      window.open(waUrl, "_blank");
    }

    // Clear cart and redirect to order success page
    clearCart();
    router.push(`/order-success/${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              SECURE 256-BIT ENCRYPTED CHECKOUT
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-light">
              CHECKOUT
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <Lock className="w-4 h-4 text-gold" />
            <span>Guaranteed Pan-India Delivery & Authentic Invoicing</span>
          </div>
        </div>

        {/* Checkout Main Form & Summary */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Shipping & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {validationError && (
              <div className="p-4 bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* 1. Customer Details */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h2 className="font-serif text-lg tracking-wider uppercase text-gold font-medium">
                1. CONTACT INFORMATION
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sourav Mukherjee"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Mobile Number (WhatsApp Enabled) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9830012345"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Email Address (For Invoice & Tracking)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sourav@example.com"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h2 className="font-serif text-lg tracking-wider uppercase text-gold font-medium">
                2. DELIVERY ADDRESS
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Street Address / House / Flat *
                  </label>
                  <input
                    type="text"
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Flat 3A, Silver Oak Apartment, College Road"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Near School Bazar Chawk"
                      className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Midnapore"
                      className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="e.g. 721101"
                      className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Shipping Speed */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h2 className="font-serif text-lg tracking-wider uppercase text-gold font-medium">
                3. SHIPPING METHOD
              </h2>

              <div className="space-y-3 text-xs">
                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition ${
                    shippingMethod === "standard"
                      ? "border-gold bg-gold/5"
                      : "border-white/10 bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="accent-gold"
                    />
                    <div>
                      <span className="font-semibold text-white block uppercase tracking-wider">
                        Standard Pan-India Delivery (3-5 Days)
                      </span>
                      <span className="text-zinc-400 text-[11px]">
                        Free for orders above ₹1,999 via BlueDart / Delhivery
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition ${
                    shippingMethod === "express"
                      ? "border-gold bg-gold/5"
                      : "border-white/10 bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="accent-gold"
                    />
                    <div>
                      <span className="font-semibold text-white block uppercase tracking-wider">
                        Express Priority & Insured Shipping (1-2 Days)
                      </span>
                      <span className="text-zinc-400 text-[11px]">
                        Air freight expedited dispatch with velvet gift packaging
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-white">{formatPrice(149)}</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Selection */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <h2 className="font-serif text-lg tracking-wider uppercase text-gold font-medium">
                4. PAYMENT METHOD
              </h2>

              <div className="space-y-3 text-xs">
                {/* A. WhatsApp Checkout */}
                <label
                  onClick={() => setPaymentMethod("WHATSAPP")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition ${
                    paymentMethod === "WHATSAPP"
                      ? "border-emerald-500 bg-emerald-950/20"
                      : "border-white/10 bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "WHATSAPP"}
                      onChange={() => setPaymentMethod("WHATSAPP")}
                      className="accent-emerald-500 mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white uppercase tracking-wider">
                          ORDER VIA WHATSAPP (RECOMMENDED)
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500 text-black text-[9px] font-bold uppercase">
                          INSTANT
                        </span>
                      </div>
                      <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                        Generates a structured order summary with all items and your address directly to our Midnapore store WhatsApp (<strong>+91 9382107724</strong>). You can pay via UPI or confirm Cash on Delivery with our team.
                      </p>
                    </div>
                  </div>
                  <MessageSquare className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                </label>

                {/* B. Online UPI / Card */}
                <label
                  onClick={() => setPaymentMethod("ONLINE_UPI")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition ${
                    paymentMethod === "ONLINE_UPI"
                      ? "border-gold bg-gold/5"
                      : "border-white/10 bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "ONLINE_UPI"}
                      onChange={() => setPaymentMethod("ONLINE_UPI")}
                      className="accent-gold mt-1"
                    />
                    <div>
                      <span className="font-semibold text-white uppercase tracking-wider block">
                        ONLINE PAYMENT (UPI / GOOGLE PAY / CARD / NETBANKING)
                      </span>
                      <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                        Instant digital confirmation with secure 256-bit payment gateway.
                      </p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-gold flex-shrink-0" />
                </label>

                {/* C. Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("COD")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition ${
                    paymentMethod === "COD"
                      ? "border-gold bg-gold/5"
                      : "border-white/10 bg-zinc-900/40"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="accent-gold mt-1"
                    />
                    <div>
                      <span className="font-semibold text-white uppercase tracking-wider block">
                        CASH ON DELIVERY (COD)
                      </span>
                      <p className="text-zinc-400 text-[11px] mt-1 leading-relaxed">
                        Pay with cash or UPI at your doorstep upon receiving the parcel.
                      </p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary & Place Order (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-950 border border-white/10 p-6 space-y-6 sticky top-24">
            <h2 className="font-serif text-lg tracking-wider uppercase text-white font-medium border-b border-white/10 pb-4">
              ORDER SUMMARY ({items.length} {items.length === 1 ? "ITEM" : "ITEMS"})
            </h2>

            {/* Items Thumbnails */}
            <div className="max-h-60 overflow-y-auto space-y-3 no-scrollbar divide-y divide-white/5">
              {items.map((it) => (
                <div key={it.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div
                    className="w-12 h-14 bg-cover bg-center flex-shrink-0 border border-white/5"
                    style={{ backgroundImage: `url('${it.product.images[0]}')` }}
                  />
                  <div className="flex-1 text-xs">
                    <div className="text-white font-serif line-clamp-1">{it.product.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Qty: {it.quantity} {it.selectedSize ? `• Size: ${it.selectedSize}` : ""}{" "}
                      {it.selectedColor ? `• ${it.selectedColor}` : ""}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-white">
                    {formatPrice(it.totalPrice)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-white/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-mono">{formatPrice(subtotal)}</span>
              </div>
              {volumeDiscountAmount > 0 && (
                <div className="flex justify-between text-gold">
                  <span>Volume Promotion</span>
                  <span className="font-mono">-{formatPrice(volumeDiscountAmount)}</span>
                </div>
              )}
              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon ({appliedCoupon?.code})</span>
                  <span className="font-mono">-{formatPrice(couponDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod === "express" ? "Express" : "Standard"})</span>
                <span>
                  {shippingFee + expressFee === 0 ? (
                    <span className="text-emerald-400 font-semibold uppercase text-[10px]">
                      FREE
                    </span>
                  ) : (
                    <span className="text-white font-mono">
                      {formatPrice(shippingFee + expressFee)}
                    </span>
                  )}
                </span>
              </div>

              <div className="flex justify-between text-lg font-serif text-white pt-4 border-t border-white/10 font-normal">
                <span>Total Amount</span>
                <span className="text-gold font-bold">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-bold transition flex items-center justify-center gap-2 shadow-2xl ${
                paymentMethod === "WHATSAPP"
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-gold hover:bg-gold-light text-black"
              }`}
            >
              {paymentMethod === "WHATSAPP" ? (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>CONFIRM & ORDER VIA WHATSAPP</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>PLACE ORDER SECURELY</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-zinc-500 text-center leading-relaxed">
              By confirming, you agree to All Feet Fashion Terms of Sale. Need help? Call or WhatsApp{" "}
              <a href={`tel:${STORE_INFO.phone}`} className="text-zinc-300 underline">
                {STORE_INFO.displayPhone}
              </a>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
