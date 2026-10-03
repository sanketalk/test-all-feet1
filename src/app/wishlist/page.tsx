"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, {
      size: product.sizes[0],
      color: product.colors[0]?.name,
      quantity: 1,
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
              CURATED FAVORITES
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-white uppercase">
              MY WISHLIST ({wishlist.length})
            </h1>
          </div>

          <Link
            href="/shop"
            className="text-xs uppercase tracking-wider text-zinc-400 hover:text-gold transition flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="py-24 text-center bg-zinc-950 border border-white/5 space-y-4 max-w-lg mx-auto p-8">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto text-zinc-600">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-white font-light">Your wishlist is empty</h2>
            <p className="text-xs text-zinc-400">
              Explore our boutique and tap the heart icon on any piece you wish to save for later.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="px-6 py-3 bg-gold text-black text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition inline-block"
              >
                DISCOVER CATALOG
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-950 border border-white/5 flex flex-col justify-between group hover:border-gold/40 transition"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                  <Link href={`/product/${product.slug}`}>
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${product.images[0]}')` }}
                    />
                  </Link>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2.5 right-2.5 p-2 bg-black/70 hover:bg-black text-zinc-400 hover:text-red-400 rounded-full border border-white/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="absolute bottom-2 left-2">
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-black/80 text-emerald-400 border border-emerald-500/30">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">
                      {product.brand}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-serif text-sm text-white hover:text-gold transition line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-semibold text-white font-mono">
                        {formatPrice(product.price)}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-zinc-500 line-through">
                          {formatPrice(product.mrp)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 bg-zinc-900 hover:bg-gold text-zinc-200 hover:text-black border border-white/10 hover:border-gold text-[10px] uppercase tracking-widest font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
