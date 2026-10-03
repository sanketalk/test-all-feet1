"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Flame } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function LimitedDrop() {
  const { dropCountdownDate } = useStore();

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const target = new Date(dropCountdownDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dropCountdownDate]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-black text-white font-sans border-b border-white/5">
      {/* Background Campaign Visual */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          {/* Micro Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/70 border border-red-500/40 text-red-300 text-xs tracking-widest uppercase font-semibold">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>EXCLUSIVITY ALERT — ONLY 50 PIECES PRODUCED</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white uppercase leading-tight">
            THE DROP IS LIVE
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            &ldquo;Limited pieces. Once they’re gone, they’re gone.&rdquo; <br />
            Featuring the Noir Skeleton Chronograph & Venetian Suede Boot capsule.
          </p>

          {/* Countdown Clock */}
          <div className="pt-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-3 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>TIME REMAINING BEFORE CAPSULE ARCHIVE:</span>
            </div>

            <div className="grid grid-cols-4 gap-3 max-w-md">
              <div className="p-3 bg-zinc-900/90 border border-white/10 text-center">
                <span className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-zinc-500 mt-1">
                  Days
                </span>
              </div>

              <div className="p-3 bg-zinc-900/90 border border-white/10 text-center">
                <span className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-zinc-500 mt-1">
                  Hours
                </span>
              </div>

              <div className="p-3 bg-zinc-900/90 border border-white/10 text-center">
                <span className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-zinc-500 mt-1">
                  Mins
                </span>
              </div>

              <div className="p-3 bg-zinc-900/90 border border-gold/40 text-center bg-gold/5">
                <span className="font-serif text-2xl sm:text-3xl text-gold font-semibold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-gold mt-1">
                  Secs
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link
              href="/shop?collection=limited"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-[0.25em] uppercase transition shadow-2xl group"
            >
              <span>SHOP THE DROP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
