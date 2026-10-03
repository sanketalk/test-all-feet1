"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function CategoryCards() {
  return (
    <section className="py-20 bg-luxury-950 text-white font-sans border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block mb-2">
              CURATED CHAPTERS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
              DISCOVER BY CATEGORY
            </h2>
          </div>
          <p className="text-xs text-zinc-400 tracking-wider uppercase mt-3 md:mt-0 max-w-xs">
            Hand-selected luxury essentials crafted to elevate every dimension of your lifestyle.
          </p>
        </div>

        {/* Categories Grid (Swipeable on mobile, grid on desktop) */}
        <div className="flex overflow-x-auto pb-6 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 no-scrollbar snap-x snap-mandatory">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group relative h-[440px] sm:h-[480px] min-w-[280px] sm:min-w-0 flex-shrink-0 sm:flex-shrink overflow-hidden bg-zinc-900 border border-white/5 hover:border-gold/50 transition-all duration-500 snap-center"
            >
              {/* Image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-108"
                style={{ backgroundImage: `url('${cat.image}')` }}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

              {/* Category Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                {/* Top Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.25em] text-gold uppercase px-2.5 py-1 bg-black/60 border border-gold/30 backdrop-blur-sm">
                    {cat.itemCount} PIECES
                  </span>
                  <span className="text-[10px] tracking-widest text-zinc-400 font-mono">
                    AFF / 0{CATEGORIES.indexOf(cat) + 1}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="space-y-3">
                  <span className="text-xs italic font-serif text-zinc-300 block">
                    &ldquo;{cat.tagline}&rdquo;
                  </span>
                  <h3 className="font-serif text-3xl font-light tracking-widest text-white group-hover:text-gold transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {cat.subtitle}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-white group-hover:text-gold transition-colors duration-300">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
