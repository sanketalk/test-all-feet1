"use client";

import React from "react";
import { Truck, ShieldCheck, RefreshCw, MessageSquare, Award } from "lucide-react";

export function TrustSection() {
  const trustItems = [
    {
      icon: Truck,
      title: "PAN-INDIA EXPRESS DELIVERY",
      description: "Direct dispatch from our regional hubs via premium courier partners (BlueDart / Delhivery) with real-time tracking.",
    },
    {
      icon: ShieldCheck,
      title: "100% AUTHENTIC GUARANTEE",
      description: "Every timepiece, perfume flacon, and garment is checked against our strict bespoke boutique specifications.",
    },
    {
      icon: RefreshCw,
      title: "7-DAY EASY EXCHANGES",
      description: "Size doesn't fit? We offer seamless reverse pickup or instant swap at our School Bazar boutique.",
    },
    {
      icon: MessageSquare,
      title: "INSTANT WHATSAPP ASSISTANCE",
      description: "Direct 1-on-1 concierge assistance for order questions, sizing advice, and payment confirmations.",
    },
  ];

  return (
    <section className="py-16 bg-zinc-950 text-white font-sans border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col space-y-3 p-6 bg-zinc-900/30 border border-white/5 hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center bg-black text-gold">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-sm tracking-widest uppercase text-white font-medium">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
