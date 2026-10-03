"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, MessageCircle } from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#080808] px-4 font-sans py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 border border-gold/40 mx-auto flex items-center justify-center bg-black">
          <span className="font-serif text-2xl text-gold font-bold">AFF</span>
        </div>

        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold block mb-2">
            EXPERIENCE INTERRUPTED
          </span>
          <h1 className="font-serif text-3xl font-light text-white tracking-wide">
            SOMETHING WENT WRONG
          </h1>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            We encountered a temporary hiccup while rendering this experience. Please reload or contact our boutique concierge.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-gold hover:bg-gold-light text-black text-xs font-semibold tracking-widest uppercase transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>TRY AGAIN</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-900 border border-white/10 hover:border-gold/40 text-white text-xs font-medium tracking-widest uppercase transition flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>BACK HOME</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-white/10 text-[11px] text-zinc-500">
          Need immediate support? WhatsApp us at{" "}
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
            className="text-gold hover:underline inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            {STORE_INFO.displayPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
