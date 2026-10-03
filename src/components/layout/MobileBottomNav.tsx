"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { STORE_INFO } from "@/data/storeInfo";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 px-2 py-2">
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 text-[10px] tracking-wider uppercase transition",
            pathname === "/" ? "text-gold font-medium" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 text-[10px] tracking-wider uppercase transition",
            pathname.startsWith("/shop") ? "text-gold font-medium" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span>Shop</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-3 text-[10px] tracking-wider uppercase transition relative",
            pathname === "/wishlist" ? "text-gold font-medium" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <div className="relative">
            <Heart className="w-4 h-4 mb-0.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 text-[10px] tracking-wider uppercase text-zinc-400 hover:text-zinc-200 transition relative"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Hello All Feet Fashion team! I need assistance with an order.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 text-[10px] tracking-wider uppercase text-emerald-400 hover:text-emerald-300 transition"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span>Chat</span>
        </a>
      </div>
    </nav>
  );
}
