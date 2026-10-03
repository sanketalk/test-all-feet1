"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0] || "";
  const secondaryImage = product.images[1] || product.images[0] || "";

  const handleQuickAdd = (size?: string) => {
    addToCart(product, {
      size: size || product.sizes[0],
      color: product.colors[0]?.name,
      quantity: 1,
    });
    setAddedAnimation(true);
    setShowSizePicker(false);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col bg-zinc-950/40 border border-white/5 hover:border-gold/40 transition-all duration-300 font-sans",
          className
        )}
      >
        {/* Media Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            {/* Primary Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out group-hover:opacity-0"
              style={{ backgroundImage: `url('${primaryImage}')` }}
            />
            {/* Secondary Hover Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
              style={{ backgroundImage: `url('${secondaryImage}')` }}
            />
          </Link>

          {/* Badges (Top Left) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.badges.map((badge) => {
              let bg = "bg-black/80 text-white border-white/20";
              if (badge === "BESTSELLER") bg = "bg-gold text-black border-gold font-bold";
              if (badge === "NEW") bg = "bg-white text-black border-white font-semibold";
              if (badge === "LIMITED") bg = "bg-red-950/80 text-red-200 border-red-500/40";
              if (badge === "SALE") bg = "bg-emerald-950/80 text-emerald-300 border-emerald-500/40";

              return (
                <span
                  key={badge}
                  className={cn(
                    "text-[9px] tracking-widest uppercase px-2 py-0.5 border backdrop-blur-sm",
                    bg
                  )}
                >
                  {badge}
                </span>
              );
            })}
          </div>

          {/* Top Right Wishlist Heart */}
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2.5 right-2.5 p-2 bg-black/60 hover:bg-black text-white rounded-full border border-white/10 hover:border-gold/60 backdrop-blur-sm transition z-10"
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors",
                isFavorited ? "fill-gold text-gold" : "text-zinc-300"
              )}
            />
          </button>

          {/* Quick View Button (Hover reveal on desktop) */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            aria-label="Quick View"
            className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-gold text-white hover:text-black text-[10px] tracking-widest uppercase border border-white/10 hover:border-gold opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {/* Size picker drawer on quick add */}
          {showSizePicker && (
            <div className="absolute inset-x-0 bottom-0 bg-black/95 p-3 border-t border-gold/30 z-20 animate-slide-up">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-2 uppercase tracking-wider">
                <span>Select Size</span>
                <button
                  onClick={() => setShowSizePicker(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleQuickAdd(sz)}
                    className="py-1 px-2 text-[10px] uppercase font-medium bg-zinc-900 border border-white/10 hover:border-gold hover:text-gold text-zinc-300 transition"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
          <div>
            {/* Brand & Rating */}
            <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
              <span>{product.brand}</span>
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-3 h-3 fill-gold" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-zinc-500">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Title */}
            <Link
              href={`/product/${product.slug}`}
              className="font-serif text-sm sm:text-base font-normal tracking-wide text-white hover:text-gold transition line-clamp-1 block"
            >
              {product.name}
            </Link>

            {/* Short Tagline */}
            <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-light">
              {product.tagline}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-medium text-white">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-zinc-500 line-through">
                  {formatPrice(product.mrp)}
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            {product.sizes.length > 1 ? (
              <button
                onClick={() => setShowSizePicker((prev) => !prev)}
                aria-label="Select size and add to cart"
                className="px-2.5 py-1.5 bg-zinc-900 hover:bg-gold text-zinc-200 hover:text-black border border-white/10 hover:border-gold text-[10px] tracking-wider uppercase font-semibold transition flex items-center gap-1"
              >
                <ShoppingBag className="w-3 h-3" />
                <span className="hidden sm:inline">Add</span>
              </button>
            ) : (
              <button
                onClick={() => handleQuickAdd()}
                disabled={addedAnimation}
                aria-label="Add to cart"
                className={cn(
                  "px-2.5 py-1.5 text-[10px] tracking-wider uppercase font-semibold border transition flex items-center gap-1",
                  addedAnimation
                    ? "bg-emerald-600 text-white border-emerald-500"
                    : "bg-zinc-900 hover:bg-gold text-zinc-200 hover:text-black border-white/10 hover:border-gold"
                )}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span className="hidden sm:inline">Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3" />
                    <span className="hidden sm:inline">Add</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
