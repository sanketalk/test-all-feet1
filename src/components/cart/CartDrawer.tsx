"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Bookmark,
  ShoppingBag,
  ArrowRight,
  Truck,
  Sparkles,
  MessageSquare,
  Tag,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { createCheckoutWhatsAppUrl } from "@/lib/whatsapp";
import { STORE_INFO } from "@/data/storeInfo";

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    savedForLater,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCartFromSaved,
    removeSaved,
    couponCode,
    couponError,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    itemCount,
    subtotal,
    volumeDiscountPercentage,
    volumeDiscountAmount,
    couponDiscountAmount,
    shippingFee,
    finalTotal,
    freeShippingThreshold,
    amountAwayFromFreeShipping,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon("");
    }
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountAwayFromFreeShipping) / freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl h-full flex flex-col justify-between z-10 text-white animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-lg tracking-wider uppercase font-normal">
              YOUR SHOPPING BAG ({itemCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-zinc-900/80 px-5 py-3 border-b border-white/5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Truck className="w-4 h-4 text-gold" />
              {amountAwayFromFreeShipping === 0 ? (
                <span className="text-emerald-400 font-medium">
                  ✦ You unlocked FREE Pan-India Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-white">{formatPrice(amountAwayFromFreeShipping)}</strong> more for FREE SHIPPING
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">
              {freeShippingProgress}%
            </span>
          </div>

          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gold h-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 border border-white/10 flex items-center justify-center rounded-full text-zinc-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-white font-light">Your bag is empty</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Discover our latest chronographs, extrait perfumes, and elevated streetwear.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/shop");
                }}
                className="px-6 py-2.5 bg-gold text-black text-xs font-semibold uppercase tracking-widest hover:bg-gold-light transition"
              >
                EXPLORE CATALOG
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-zinc-900/40 border border-white/5 relative group"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-20 h-24 bg-cover bg-center flex-shrink-0 border border-white/5"
                    style={{
                      backgroundImage: `url('${item.product.images[0]}')`,
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm text-white hover:text-gold transition line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-zinc-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Tags */}
                      <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>

                      <div className="text-xs font-medium text-white mt-1">
                        {formatPrice(item.unitPrice)} each
                      </div>
                    </div>

                    {/* Quantity & Save for later */}
                    <div className="flex items-center justify-between pt-2">
                      {/* Qty Selector */}
                      <div className="flex items-center border border-white/10 bg-black">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-gold transition text-zinc-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-gold transition text-zinc-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => saveForLater(item.id)}
                        className="text-[10px] text-zinc-400 hover:text-gold transition uppercase tracking-wider flex items-center gap-1"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold">
                SAVED FOR LATER ({savedForLater.length})
              </h4>
              <div className="space-y-2">
                {savedForLater.map((sItem) => (
                  <div
                    key={sItem.id}
                    className="flex items-center justify-between p-2 bg-zinc-900/20 border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-12 bg-cover bg-center"
                        style={{ backgroundImage: `url('${sItem.product.images[0]}')` }}
                      />
                      <div>
                        <div className="text-white line-clamp-1 font-serif">{sItem.product.name}</div>
                        <div className="text-[11px] text-zinc-400">{formatPrice(sItem.unitPrice)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToCartFromSaved(sItem.id)}
                        className="text-[10px] uppercase text-gold hover:underline font-semibold tracking-wider"
                      >
                        Move To Cart
                      </button>
                      <button
                        onClick={() => removeSaved(sItem.id)}
                        className="text-zinc-500 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Billing & Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 bg-zinc-900 border-t border-white/10 space-y-3">
            {/* Automatic Volume Discount Alert */}
            {volumeDiscountAmount > 0 ? (
              <div className="flex items-center justify-between text-xs p-2 bg-gold/10 border border-gold/30 text-gold">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Multi-Item Discount ({volumeDiscountPercentage}% OFF)</span>
                </div>
                <span className="font-semibold font-mono">-{formatPrice(volumeDiscountAmount)}</span>
              </div>
            ) : (
              <div className="text-[10px] text-zinc-400 tracking-wider flex items-center justify-between px-1">
                <span>Tip: Add 2 items for 15% OFF, 3 for 20% OFF!</span>
              </div>
            )}

            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-xs p-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">-{formatPrice(couponDiscountAmount)}</span>
                    <button
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. WELCOME10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 bg-black border border-white/10 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-zinc-800 hover:bg-gold hover:text-black text-xs font-semibold tracking-wider uppercase transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[10px] text-red-400 mt-1">{couponError}</p>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-white/5">
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
                  <span>Coupon Discount</span>
                  <span className="font-mono">-{formatPrice(couponDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-semibold uppercase text-[10px]">
                      FREE
                    </span>
                  ) : (
                    <span className="text-white font-mono">{formatPrice(shippingFee)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base text-white font-medium pt-2 border-t border-white/10">
                <span>Total Payable</span>
                <span className="font-serif text-lg text-gold font-bold">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
                className="w-full py-3.5 bg-white hover:bg-gold text-black font-semibold text-xs tracking-[0.2em] uppercase transition flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 bg-transparent text-zinc-400 hover:text-white text-[11px] tracking-wider uppercase transition text-center"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
