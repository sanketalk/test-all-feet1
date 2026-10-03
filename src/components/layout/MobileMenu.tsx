"use client";

import React from "react";
import Link from "next/link";
import { X, Search, Phone, MapPin, Instagram, ArrowRight, MessageSquare } from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";
import { CATEGORIES } from "@/data/categories";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl text-white flex flex-col justify-between overflow-y-auto animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
          <div className="w-8 h-8 border border-gold/60 flex items-center justify-center bg-black flex-shrink-0">
            <span className="font-serif text-sm font-bold text-gold tracking-tight">AFF</span>
          </div>
          <div className="flex flex-col whitespace-nowrap">
            <span className="font-serif text-sm tracking-[0.16em] font-semibold text-white leading-tight">
              ALL FEET
            </span>
            <span className="text-[7.5px] tracking-[0.28em] text-zinc-400 uppercase font-medium leading-none mt-0.5">
              FASHION
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Bar Prompt */}
      <div className="px-6 pt-4">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-white/10 rounded-none text-zinc-400 text-xs tracking-wider uppercase text-left"
        >
          <Search className="w-4 h-4 text-gold" />
          <span>SEARCH PRODUCTS, STYLES, OUD, WATCHES...</span>
        </button>
      </div>

      {/* Main Categories Navigation */}
      <div className="px-6 py-6 space-y-5">
        <div className="text-[10px] tracking-widest uppercase text-gold font-bold">
          SHOP BY CATEGORY
        </div>

        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              onClick={onClose}
              className="flex items-center justify-between group py-2 border-b border-white/5 hover:border-gold/40 transition"
            >
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light tracking-wide text-zinc-100 group-hover:text-gold transition">
                  {cat.title}
                </span>
                <span className="text-[10px] tracking-wider text-zinc-500 uppercase">
                  {cat.tagline}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-gold group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>

        {/* Featured Shortcuts */}
        <div className="pt-4 grid grid-cols-2 gap-3 text-xs tracking-wider uppercase">
          <Link
            href="/shop?sort=newest"
            onClick={onClose}
            className="p-3 bg-zinc-900/60 border border-white/5 hover:border-gold/30 text-zinc-300 hover:text-gold text-center"
          >
            ✦ New Arrivals
          </Link>
          <Link
            href="/shop?filter=bestseller"
            onClick={onClose}
            className="p-3 bg-zinc-900/60 border border-white/5 hover:border-gold/30 text-zinc-300 hover:text-gold text-center"
          >
            ★ Best Sellers
          </Link>
          <Link
            href="/track-order"
            onClick={onClose}
            className="p-3 bg-zinc-900/60 border border-white/5 hover:border-gold/30 text-zinc-300 hover:text-gold text-center"
          >
            Track Order
          </Link>
          <Link
            href="/store"
            onClick={onClose}
            className="p-3 bg-zinc-900/60 border border-white/5 hover:border-gold/30 text-zinc-300 hover:text-gold text-center"
          >
            Visit Boutique
          </Link>
        </div>
      </div>

      {/* Footer Info: Store & Contact */}
      <div className="p-6 bg-zinc-950 border-t border-white/10 space-y-4 text-xs text-zinc-400">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-white font-medium">Boutique: School Bazar, Midnapore</div>
            <div className="text-[11px] text-zinc-500">Open Daily 10:00 AM – 9:30 PM</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp: {STORE_INFO.displayPhone}</span>
          </a>

          <a
            href={`https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white"
          >
            <Instagram className="w-4 h-4" />
            <span>{STORE_INFO.instagram}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
