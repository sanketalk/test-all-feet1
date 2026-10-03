"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Order, OrderTimelineStep } from "@/types";
import { formatPrice } from "@/lib/utils";
import { STORE_INFO } from "@/data/storeInfo";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const { orders } = useStore();

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [phoneQuery, setPhoneQuery] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId && orders.length > 0) {
      const match = orders.find(
        (o) => o.orderNumber.toLowerCase() === initialId.trim().toLowerCase()
      );
      if (match) {
        setSearchedOrder(match);
        setHasSearched(true);
      }
    }
  }, [initialId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const match = orders.find((o) => {
      const idMatch = o.orderNumber.toLowerCase() === orderQuery.trim().toLowerCase();
      if (!phoneQuery.trim()) return idMatch;
      const phoneMatch = o.customer.phone.includes(phoneQuery.trim()) || o.customer.email.toLowerCase().includes(phoneQuery.trim().toLowerCase());
      return idMatch && phoneMatch;
    });

    setSearchedOrder(match || null);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block">
            REAL-TIME DISPATCH MONITOR
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white uppercase">
            TRACK YOUR ORDER
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Enter your Order Reference ID to follow your package from our Midnapore Atelier to your doorstep.
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="p-6 bg-zinc-950 border border-white/10 shadow-2xl max-w-xl mx-auto space-y-4 mb-12"
        >
          <div className="space-y-1.5 text-xs">
            <label className="block uppercase tracking-wider text-zinc-400 font-medium">
              Order ID / Number *
            </label>
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. AFF-2026-8942"
              className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono uppercase"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="block uppercase tracking-wider text-zinc-400 font-medium">
              Phone Number or Email (Optional)
            </label>
            <input
              type="text"
              value={phoneQuery}
              onChange={(e) => setPhoneQuery(e.target.value)}
              placeholder="e.g. 9830124589"
              className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>LOCATE PACKAGE</span>
          </button>
        </form>

        {/* Results Timeline */}
        {hasSearched && (
          <div>
            {searchedOrder ? (
              <div className="bg-zinc-950 border border-white/10 p-6 sm:p-10 space-y-8 animate-slide-up">
                {/* Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                      LIVE CONSIGNMENT STATUS
                    </span>
                    <h2 className="font-serif text-2xl text-white font-medium">
                      Order #{searchedOrder.orderNumber}
                    </h2>
                    <div className="text-xs text-zinc-400 mt-1">
                      Recipient: <strong>{searchedOrder.customer.fullName}</strong> • {searchedOrder.customer.city}, {searchedOrder.customer.state}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs px-3 py-1 bg-gold/10 border border-gold/40 text-gold uppercase tracking-wider font-semibold inline-block">
                      {searchedOrder.orderStatus}
                    </span>
                    {searchedOrder.trackingNumber && (
                      <div className="text-[11px] text-zinc-400 font-mono mt-1">
                        Courier: {searchedOrder.courierName} ({searchedOrder.trackingNumber})
                      </div>
                    )}
                  </div>
                </div>

                {/* Visual Step Timeline */}
                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
                    JOURNEY MILESTONES
                  </span>

                  <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-8">
                    {searchedOrder.timeline.map((step, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition ${
                            step.completed
                              ? "bg-gold text-black border-gold"
                              : "bg-zinc-900 text-zinc-600 border-white/20"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-4 h-4 fill-current" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-zinc-600" />
                          )}
                        </div>

                        {/* Step Details */}
                        <div>
                          <h4
                            className={`font-serif text-base tracking-wide uppercase ${
                              step.completed ? "text-white font-medium" : "text-zinc-500"
                            }`}
                          >
                            {step.label}
                          </h4>

                          {step.date && (
                            <div className="text-xs text-zinc-400 font-mono mt-0.5">
                              {step.date}
                            </div>
                          )}

                          {step.checkpoint && (
                            <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1">
                              <MapPin className="w-3 h-3 text-gold" />
                              <span>{step.checkpoint}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Package Items & Actions */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400">
                    Total: <strong className="text-white font-mono">{formatPrice(searchedOrder.totalAmount)}</strong> ({searchedOrder.items.length} pieces)
                  </div>

                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello! Looking for live updates on order #${searchedOrder.orderNumber}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-xs uppercase tracking-wider font-semibold transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center bg-zinc-950 border border-white/5 space-y-3">
                <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="font-serif text-xl text-white">No Record Found</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  We could not locate an active order with reference &ldquo;{orderQuery}&rdquo;. Please verify your ID or reach out to our concierge.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gold underline uppercase tracking-wider"
                  >
                    Contact Concierge on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-xs uppercase tracking-widest text-gold animate-pulse">
            Loading Tracking Portal...
          </div>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
