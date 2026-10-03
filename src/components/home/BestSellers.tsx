"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Flame } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "../product/ProductCard";

export function BestSellers() {
  const { products } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bestSellers = products.filter(
    (p) => p.isBestSeller || p.badges.includes("BESTSELLER")
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-luxury-900/60 text-white font-sans border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>THE ONES EVERYONE WANTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
              BEST SELLERS
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="/shop?filter=bestseller"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 hover:text-gold transition flex items-center gap-1 mr-4"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center bg-black/40 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center bg-black/40 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
