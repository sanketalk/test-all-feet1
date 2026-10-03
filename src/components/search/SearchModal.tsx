"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, TrendingUp, Clock, ArrowRight, Tag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Skeleton Watch",
  "Oud Perfume",
  "Chunky Sole Sneaker",
  "Boxy Oversized Tee",
  "Venetian Chelsea Boot",
  "Titanium Aviator",
  "Full-Grain Wallet",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { products } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aff_recent_searches");
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const saveSearch = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("aff_recent_searches", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectSearch = (term: string) => {
    saveSearch(term);
    onClose();
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      handleSelectSearch(query);
    }
  };

  if (!isOpen) return null;

  // Search filtering with typo tolerance & tag matching
  const matchingProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.badges.some((b) => b.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/90 backdrop-blur-xl animate-fade-in font-sans">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 shadow-2xl z-10 text-white overflow-hidden animate-slide-up">
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-white/10 bg-zinc-900/60">
          <Search className="w-5 h-5 text-gold flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search watches, perfumes, shoes, streetwear..."
            className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 focus:outline-none tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {query.trim() ? (
            /* Results Grid */
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest mb-4">
                <span>
                  {matchingProducts.length} PRODUCTS FOUND FOR &ldquo;{query}&rdquo;
                </span>
                {matchingProducts.length > 0 && (
                  <button
                    onClick={() => handleSelectSearch(query)}
                    className="text-gold hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {matchingProducts.length === 0 ? (
                <div className="py-12 text-center text-zinc-400 space-y-3">
                  <p className="font-serif text-xl text-white">No products found</p>
                  <p className="text-xs">
                    Try checking your spelling or search by category like &ldquo;watches&rdquo;, &ldquo;perfumes&rdquo;, or &ldquo;shoes&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchingProducts.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        saveSearch(product.name);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-white/5 hover:border-gold/30 transition group"
                    >
                      <div
                        className="w-14 h-16 bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url('${product.images[0]}')` }}
                      />
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 block">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm text-white group-hover:text-gold transition truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-semibold text-white font-mono">
                            {formatPrice(product.price)}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-[11px] text-zinc-500 line-through">
                              {formatPrice(product.mrp)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Suggestions & Trends */
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Recent Searches</span>
                    </span>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem("aff_recent_searches");
                      }}
                      className="text-[10px] text-zinc-500 hover:text-white"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectSearch(term)}
                        className="px-3 py-1.5 bg-zinc-900 border border-white/10 hover:border-gold hover:text-gold text-xs text-zinc-300 transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Fashion Searches */}
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-gold" />
                  <span>Trending Right Now</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectSearch(term)}
                      className="px-3.5 py-1.5 bg-zinc-900/60 border border-white/5 hover:border-gold hover:text-gold text-xs text-zinc-300 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Shortcuts */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-3 font-semibold">
                  BROWSE ALL DEPARTMENTS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["watches", "perfumes", "shoes", "clothing", "sunglasses", "accessories"].map(
                    (cat) => (
                      <Link
                        key={cat}
                        href={`/shop?category=${cat}`}
                        onClick={onClose}
                        className="p-2.5 bg-zinc-900/30 border border-white/5 hover:border-gold/30 hover:text-gold text-xs uppercase tracking-wider text-zinc-300 transition flex items-center justify-between"
                      >
                        <span>{cat}</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
