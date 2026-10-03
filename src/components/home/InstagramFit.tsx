"use client";

import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

const INSTAGRAM_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    tag: "#AllFeetFits",
    caption: "Boxy heavyweight 280 GSM tee paired with Monaco chronograph.",
  },
  {
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    tag: "#NoirHorology",
    caption: "Matte skeleton chronographs catching the twilight glow.",
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    tag: "#MidnaporeStyle",
    caption: "In-store VIP fitting session at School Bazar boutique.",
  },
  {
    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop",
    tag: "#GhostMonolith",
    caption: "Ghost Monolith chunky sneakers breaking the city pavement.",
  },
];

export function InstagramFit() {
  return (
    <section className="py-20 bg-black text-white font-sans border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              <Instagram className="w-4 h-4" />
              <span>COMMUNITY LOOKBOOK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
              FOLLOW THE FIT
            </h2>
          </div>

          <a
            href={`https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-300 hover:text-gold transition flex items-center gap-1.5 mt-4 md:mt-0"
          >
            <span>FOLLOW {STORE_INFO.instagram}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4-Column Instagram Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <a
              key={idx}
              href={`https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-zinc-900 border border-white/5"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${post.image}')` }}
              />

              {/* Hover Scrim with tag */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                <span className="text-gold text-xs font-mono font-semibold">{post.tag}</span>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-white">
                  <span>View Post</span>
                  <ArrowUpRight className="w-3 h-3 text-gold" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
