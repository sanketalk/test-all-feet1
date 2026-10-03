"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Crown,
} from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

export function StoreShowcase() {
  return (
    <section className="py-24 bg-luxury-950 text-white font-sans border-b border-white/5" id="store-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block mb-2">
            PHYSICAL FLAGSHIP BOUTIQUE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white uppercase">
            VISIT OUR STORE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 tracking-wider uppercase mt-3">
            Experience tactile craftsmanship, trial lounges, and bespoke concierge styling in the heart of Midnapore.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Store Details & Perks (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-white/10 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Boutique Name & Heritage */}
              <div className="border-b border-white/10 pb-6">
                <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold block mb-1">
                  OFFICIAL RETAIL DESTINATION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  All Feet Fashion — Midnapore Flagship
                </h3>
              </div>

              {/* Contact & Hours Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-300">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-black border border-gold/30 text-gold flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white uppercase tracking-wider font-semibold mb-1">
                      Store Address
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">
                      {STORE_INFO.address.line1} <br />
                      {STORE_INFO.address.landmark} <br />
                      {STORE_INFO.address.city}, {STORE_INFO.address.state} — {STORE_INFO.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-black border border-gold/30 text-gold flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white uppercase tracking-wider font-semibold mb-1">
                      Store Timings
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">
                      Monday to Sunday <br />
                      <strong className="text-white font-medium">10:00 AM – 9:30 PM</strong> <br />
                      <span className="text-emerald-400 text-[11px]">Open Today</span>
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-black border border-gold/30 text-gold flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white uppercase tracking-wider font-semibold mb-1">
                      Direct Helpline
                    </h4>
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-zinc-300 hover:text-gold transition font-mono"
                    >
                      {STORE_INFO.displayPhone}
                    </a>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Call for product inquiries</p>
                  </div>
                </div>

                {/* WhatsApp Concierge */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-black border border-emerald-500/40 text-emerald-400 flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white uppercase tracking-wider font-semibold mb-1">
                      WhatsApp Store Assistant
                    </h4>
                    <a
                      href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Hello! I'm planning to visit the All Feet Fashion store in Midnapore.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-mono transition"
                    >
                      +91 9382107724
                    </a>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Live store assistance & holds</p>
                  </div>
                </div>
              </div>

              {/* In-Store Perks */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-semibold block mb-4">
                  IN-STORE CLIENT PRIVILEGES
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>VIP Personal Styling Suite</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Trial & Fitting Lounge</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <RefreshCw className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Instant Size Exchanges</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <Crown className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Offline Secret Drops</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs: Get Directions & WhatsApp */}
            <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-[0.2em] uppercase transition flex items-center justify-center gap-2 group shadow-xl"
              >
                <Navigation className="w-4 h-4 fill-black" />
                <span>GET DIRECTIONS (GOOGLE MAPS)</span>
              </a>

              <Link
                href="/store"
                className="w-full sm:w-auto px-7 py-3.5 bg-transparent border border-white/20 hover:border-gold hover:text-gold text-white text-xs tracking-[0.2em] uppercase transition flex items-center justify-center"
              >
                VIEW STORE GALLERY & DETAILS
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Map & Imagery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Embedded Google Map */}
            <div className="relative aspect-[4/3] w-full border border-white/10 overflow-hidden bg-zinc-900 group">
              <iframe
                title="All Feet Fashion Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.702758253164!2d87.3244519!3d22.4130182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d5bde32c24c0b%3A0xe887cd7b40b91388!2sAll%20Feet%20Fashion!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale contrast-125 group-hover:filter-none transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[10px] uppercase tracking-wider text-gold flex items-center gap-1.5 pointer-events-none">
                <MapPin className="w-3 h-3" />
                <span>22.4130° N, 87.3270° E</span>
              </div>
            </div>

            {/* In-store experience photos */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div
                className="aspect-[4/3] bg-cover bg-center border border-white/5 hover:border-gold/40 transition duration-300"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop')`,
                }}
              />
              <div
                className="aspect-[4/3] bg-cover bg-center border border-white/5 hover:border-gold/40 transition duration-300"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop')`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
