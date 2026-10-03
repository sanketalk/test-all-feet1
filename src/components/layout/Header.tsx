"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { SearchModal } from "../search/SearchModal";

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "NEW ARRIVALS", href: "/shop?sort=newest" },
    { label: "SHOP", href: "/shop" },
    { label: "COLLECTIONS", href: "/shop?collection=all" },
    { label: "BEST SELLERS", href: "/shop?filter=bestseller" },
    { label: "OFFERS", href: "/shop?filter=sale" },
    { label: "STORE", href: "/store" },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-luxury-900 border-b border-white/5 py-1.5 px-3 sm:px-4 text-center text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-zinc-400 font-medium flex items-center justify-between sm:justify-center gap-2 sm:gap-3">
        <span className="truncate">PAN-INDIA EXPRESS SHIPPING</span>
        <span className="w-1 h-1 rounded-full bg-gold hidden sm:inline"></span>
        <span className="text-gold hidden sm:inline">BUY 2 GET 15% OFF | CODE: WELCOME10</span>
        <span className="w-1 h-1 rounded-full bg-gold hidden sm:inline"></span>
        <Link href="/store" className="hover:text-white transition flex items-center gap-1 flex-shrink-0 text-gold sm:text-zinc-400 text-[10px] sm:text-[11px]">
          <span>MIDNAPORE STORE</span> <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 font-sans",
          isScrolled
            ? "luxury-glass shadow-2xl py-2.5 sm:py-3"
            : "bg-luxury-950/80 backdrop-blur-md border-b border-white/5 py-3 sm:py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 border border-gold/50 flex items-center justify-center bg-black group-hover:border-gold transition-colors duration-300 flex-shrink-0">
                <span className="font-serif text-sm sm:text-base font-bold text-gold tracking-tight">AFF</span>
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-serif text-sm sm:text-base tracking-[0.16em] sm:tracking-[0.2em] font-semibold text-white group-hover:text-gold transition-colors duration-300 leading-tight">
                  ALL FEET
                </span>
                <span className="text-[7.5px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.35em] text-zinc-400 uppercase font-medium leading-none mt-0.5">
                  FASHION
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-xs uppercase tracking-[0.2em] font-medium transition-all duration-200 relative py-1 hover:text-gold",
                    isActive ? "text-gold font-semibold" : "text-zinc-300"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Catalog"
              className="text-zinc-300 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-white/5"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Account Link (Desktop) */}
            <Link
              href="/account"
              aria-label="Customer Account"
              className="text-zinc-300 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-white/5 hidden sm:block"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Wishlist Trigger (Desktop - on mobile it's in sticky bottom nav) */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-zinc-300 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-white/5 hidden sm:block"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="relative text-zinc-300 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-white/5 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden text-zinc-300 hover:text-gold transition p-1.5"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
