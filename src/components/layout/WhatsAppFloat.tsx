"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

export function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="hidden lg:flex fixed bottom-6 right-5 z-40 items-end gap-3 font-sans">
      {/* Interactive Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-zinc-900/95 text-white text-xs px-3.5 py-2.5 rounded-none border border-gold/40 shadow-2xl backdrop-blur-md animate-fade-in max-w-xs">
          <div className="flex-1">
            <span className="font-semibold text-gold block text-[11px] uppercase tracking-wider">
              Concierge Online
            </span>
            <span className="text-zinc-300 text-[11px] leading-tight">
              Order directly or ask for fit styling advice.
            </span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-500 hover:text-white p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp CTA Button */}
      <a
        href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Hello All Feet Fashion team! I'm browsing your online store and would like assistance.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact All Feet Fashion on WhatsApp"
        className="w-13 h-13 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group border border-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
