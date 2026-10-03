"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight, MapPin } from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Editorial Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-bold block">
            THE ALL FEET MANIFESTO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white uppercase leading-tight">
            ACCESSIBLE LUXURY. <br />
            UNCOMPROMISING ATTITUDE.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Born in Midnapore, crafted for India. We bridge the chasm between bespoke high-fashion runway design and everyday accessibility.
          </p>
        </div>

        {/* Hero Visual */}
        <div
          className="aspect-[16/9] w-full bg-cover bg-center border border-white/10 relative shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(8,8,8,0.8), transparent), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute bottom-6 left-6 max-w-md">
            <span className="text-[10px] tracking-widest uppercase text-gold font-bold block mb-1">
              FOUNDED IN MIDNAPORE, WEST BENGAL
            </span>
            <p className="font-serif text-xl sm:text-2xl text-white font-light">
              &ldquo;Luxury shouldn’t be a privilege reserved for the few; it should be how you experience each day.&rdquo;
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          <div className="p-8 bg-zinc-950 border border-white/10 space-y-3">
            <div className="w-10 h-10 border border-gold/40 flex items-center justify-center bg-black text-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white uppercase font-light">
              Craft & Precision
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              From 316L aerospace-grade surgical steel in our horology line to 280 GSM heavyweight combed cotton in our streetwear, we refuse synthetic shortcuts.
            </p>
          </div>

          <div className="p-8 bg-zinc-950 border border-white/10 space-y-3">
            <div className="w-10 h-10 border border-gold/40 flex items-center justify-center bg-black text-gold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white uppercase font-light">
              Accessible Pride
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              By working directly with boutique master craftsmen and cutting out multi-tier distributor markups, our clients receive genuine designer tier quality at direct value.
            </p>
          </div>

          <div className="p-8 bg-zinc-950 border border-white/10 space-y-3">
            <div className="w-10 h-10 border border-gold/40 flex items-center justify-center bg-black text-gold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-white uppercase font-light">
              Client Reverence
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Every patron enjoys direct WhatsApp concierge support, seamless 7-day exchanges, and open invitations to private fitting sessions at our School Bazar boutique.
            </p>
          </div>
        </div>

        {/* Founder's Note */}
        <div className="p-8 sm:p-12 bg-zinc-950 border border-gold/30 text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">
            A PERSONAL NOTE FROM THE ATELIER
          </span>
          <p className="font-serif text-lg sm:text-2xl text-zinc-200 font-light italic leading-relaxed">
            &ldquo;When we launched All Feet Fashion on School Bazar Chawk in Midnapore, we noticed young fashion-conscious people were forced to choose between cheap fast-fashion knockoffs or exorbitantly overpriced imported labels. We built All Feet Fashion to be the authentic alternative: real leather, real extrait oils, real heavy cotton, and proud Indian craftsmanship.&rdquo;
          </p>
          <div className="pt-2">
            <span className="text-xs uppercase tracking-widest text-white font-bold block">
              THE ALL FEET FOUNDING COLLECTIVE
            </span>
            <span className="text-[11px] text-zinc-500">Midnapore, West Bengal</span>
          </div>
        </div>

        {/* Store CTA */}
        <div className="pt-8 text-center space-y-4">
          <h3 className="font-serif text-2xl text-white">Experience Our Boutique In Person</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            {STORE_INFO.address.fullFormatted}
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/store"
              className="px-8 py-3.5 bg-gold text-black text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition"
            >
              VISIT MIDNAPORE STORE
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-zinc-900 border border-white/20 text-white text-xs uppercase tracking-widest font-semibold hover:border-gold hover:text-gold transition"
            >
              EXPLORE CATALOG
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
