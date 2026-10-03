"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroCampaign() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* Editorial High-Fashion Background with Parallax/Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(10,10,10,0.3) 0%, rgba(5,5,5,0.85) 100%), url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      {/* Subtle Noise / Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Micro Season Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 border border-gold/40 bg-black/60 backdrop-blur-md mb-4 sm:mb-6 animate-fade-in max-w-full">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold flex-shrink-0" />
          <span className="text-[9.5px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-zinc-300 font-medium whitespace-nowrap">
            2026 COUTURE & STREETWEAR
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-normal tracking-[0.1em] sm:tracking-[0.15em] text-white uppercase mb-4 sm:mb-6 leading-tight">
          DEFINE YOUR <br />
          <span className="font-display italic text-gold font-light">EVERYDAY.</span>
        </h1>

        {/* Subheading */}
        <p className="text-xs sm:text-base tracking-[0.18em] sm:tracking-[0.25em] text-zinc-300 uppercase max-w-2xl mx-auto mb-8 sm:mb-10 font-light">
          Premium fashion. Elevated essentials. Accessible luxury.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-9 py-4 bg-white text-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
          >
            <span>SHOP NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/shop?collection=all"
            className="w-full sm:w-auto px-9 py-4 bg-transparent border border-white/30 text-white font-medium text-xs tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
          >
            EXPLORE COLLECTION
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-light">100%</div>
            <div className="text-[10px] tracking-widest text-zinc-400 uppercase mt-0.5">Authentic Sourcing</div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-light">Pan-India</div>
            <div className="text-[10px] tracking-widest text-zinc-400 uppercase mt-0.5">Express Dispatch</div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-light">School Bazar</div>
            <div className="text-[10px] tracking-widest text-zinc-400 uppercase mt-0.5">Midnapore Flagship</div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-light">Instant</div>
            <div className="text-[10px] tracking-widest text-zinc-400 uppercase mt-0.5">WhatsApp Ordering</div>
          </div>
        </div>
      </div>
    </section>
  );
}
