"use client";

import React, { useState } from "react";
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
  Calendar,
  Check,
} from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

export default function StorePage() {
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentPhone, setAppointmentPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [booked, setBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointmentName && appointmentPhone) {
      setBooked(true);
      setTimeout(() => setBooked(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block">
            MIDNAPORE FLAGSHIP ATELIER
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white uppercase">
            VISIT OUR STORE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Immerse yourself in tactile luxury at our flagship boutique located in School Bazar, Midnapore. Try on Italian leather silhouettes, test artisanal extraits, and consult our master stylists.
          </p>
        </div>

        {/* 2-Column Hero & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Details (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-8 sm:p-10 space-y-8">
            <div>
              <span className="text-xs text-gold uppercase tracking-widest font-semibold block mb-1">
                DESTINATION & HERITAGE
              </span>
              <h2 className="font-serif text-3xl text-white">
                All Feet Fashion Boutique
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Situated at the crossroads of School Bazar and Bibiganj, our boutique offers a curated sanctuary of modern streetwear, executive horology, and niche perfumery.
              </p>
            </div>

            {/* Address & Hours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-y border-white/10 py-6">
              <div className="space-y-1">
                <span className="text-gold uppercase tracking-wider font-semibold block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ADDRESS</span>
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  {STORE_INFO.address.line1} <br />
                  {STORE_INFO.address.landmark} <br />
                  {STORE_INFO.address.city}, {STORE_INFO.address.state} — {STORE_INFO.address.pincode}
                </p>
                <div className="text-[10px] text-zinc-500 font-mono pt-1">
                  GPS: 22.4130° N, 87.3270° E
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-gold uppercase tracking-wider font-semibold block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>OPENING HOURS</span>
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  Open Every Day (Mon – Sun) <br />
                  <strong className="text-white font-medium">10:00 AM – 9:30 PM</strong>
                </p>
                <div className="text-[10px] text-emerald-400 pt-1 font-semibold uppercase">
                  Open Today for In-Store Trials
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-gold uppercase tracking-wider font-semibold block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>TELEPHONE HELPLINE</span>
                </span>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="text-zinc-300 hover:text-gold transition font-mono block text-sm"
                >
                  {STORE_INFO.displayPhone}
                </a>
                <span className="text-[10px] text-zinc-500">Concierge line for holds & stock inquiry</span>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-400 uppercase tracking-wider font-semibold block flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WHATSAPP CONCIERGE</span>
                </span>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-mono block text-sm"
                >
                  +91 9382107724
                </a>
                <span className="text-[10px] text-zinc-500">Fast responses within 5 minutes</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-[0.2em] uppercase transition flex items-center justify-center gap-2 shadow-2xl"
              >
                <Navigation className="w-4 h-4 fill-black" />
                <span>GET DIRECTIONS (GOOGLE MAPS)</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Hello! I'm planning to visit your Midnapore store today.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-xs tracking-[0.2em] uppercase font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT WITH STORE</span>
              </a>
            </div>
          </div>

          {/* Right: Embedded Google Map & Appointment Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Map Embed */}
            <div className="relative aspect-[4/3] w-full border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl">
              <iframe
                title="All Feet Fashion Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.702758253164!2d87.3244519!3d22.4130182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d5bde32c24c0b%3A0xe887cd7b40b91388!2sAll%20Feet%20Fashion!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale contrast-125 hover:filter-none transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Book Complimentary VIP Styling Session */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-base uppercase tracking-wider text-white">
                  BOOK COMPLIMENTARY VIP STYLING
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Reserve an exclusive 30-minute private fitting session with our boutique master stylist.
              </p>

              {booked ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>VIP Session Requested! Our Midnapore concierge will contact you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={appointmentName}
                    onChange={(e) => setAppointmentName(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (WhatsApp)"
                    value={appointmentPhone}
                    onChange={(e) => setAppointmentPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono"
                  />
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900 hover:bg-gold hover:text-black border border-white/10 hover:border-gold text-xs uppercase tracking-widest font-semibold transition"
                  >
                    CONFIRM RESERVATION
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Gallery of Boutique Environment */}
        <div className="space-y-6 pt-12 border-t border-white/10">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              THE BOUTIQUE EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl text-white font-light mt-1">
              STORE PHOTOGRAPHS & ATMOSPHERE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="h-80 bg-cover bg-center border border-white/5 relative group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition p-6 flex items-end">
                <span className="text-xs uppercase tracking-widest font-semibold text-white bg-black/70 px-3 py-1 border border-white/10">
                  Footwear Trial Lounge
                </span>
              </div>
            </div>

            <div
              className="h-80 bg-cover bg-center border border-white/5 relative group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1200&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition p-6 flex items-end">
                <span className="text-xs uppercase tracking-widest font-semibold text-white bg-black/70 px-3 py-1 border border-white/10">
                  Horology & Accessories Gallery
                </span>
              </div>
            </div>

            <div
              className="h-80 bg-cover bg-center border border-white/5 relative group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop')`,
              }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition p-6 flex items-end">
                <span className="text-xs uppercase tracking-widest font-semibold text-white bg-black/70 px-3 py-1 border border-white/10">
                  Apparel Suite & Streetwear Racks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
