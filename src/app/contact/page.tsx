"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

const FAQS = [
  {
    q: "How long does Pan-India delivery take?",
    a: "We dispatch orders within 24 hours via express couriers (BlueDart / Delhivery). Metros and major cities take 2-4 business days. Local deliveries in Midnapore and Kolkata arrive within 24-48 hours.",
  },
  {
    q: "Can I try products in person before purchasing?",
    a: "Absolutely. Our flagship boutique is open daily from 10:00 AM to 9:30 PM at School Bazar, Bibiganj, Midnapore. We provide full trial lounges for footwear and apparel.",
  },
  {
    q: "What is your return or exchange policy?",
    a: "We offer a 7-day hassle-free exchange policy on unworn items with tags intact. You can request a doorstep pickup or visit our Midnapore store for instant size swap.",
  },
  {
    q: "Can I order directly on WhatsApp?",
    a: "Yes! You can order directly by clicking 'Order on WhatsApp' on any product page or checkout, or by messaging +91 9382107724.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold block">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-white uppercase">
            CONTACT & INQUIRIES
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Our team is available 7 days a week to assist with styling consultations, store directions, and custom orders.
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Left Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
              <span className="text-xs text-gold uppercase tracking-widest font-semibold block">
                MIDNAPORE BOUTIQUE
              </span>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Store Address</span>
                    <p className="text-zinc-400 leading-relaxed mt-0.5">
                      {STORE_INFO.address.fullFormatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Timings</span>
                    <p className="text-zinc-400 mt-0.5">
                      Open Every Day: 10:00 AM – 9:30 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Direct Telephone</span>
                    <a href={`tel:${STORE_INFO.phone}`} className="text-zinc-300 hover:text-gold font-mono">
                      {STORE_INFO.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">WhatsApp Concierge</span>
                    <a
                      href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-mono"
                    >
                      +91 9382107724
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div className="p-6 bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-3">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider block">
                PREFER INSTANT CHAT?
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Connect with our in-store associates on WhatsApp for instant photos of products, fabric textures, or stock holds.
              </p>
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Hello! I have a question regarding All Feet Fashion products.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>OPEN WHATSAPP CHAT</span>
              </a>
            </div>
          </div>

          {/* Right: Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-8 sm:p-10 space-y-6">
            <h2 className="font-serif text-2xl text-white font-light uppercase">
              SEND A MESSAGE TO CONCIERGE
            </h2>

            {submitted ? (
              <div className="p-8 text-center text-emerald-400 space-y-3 bg-zinc-900/60 border border-emerald-500/40">
                <Check className="w-10 h-10 mx-auto" />
                <h3 className="font-serif text-2xl text-white">Message Dispatched</h3>
                <p className="text-xs text-zinc-400">
                  Thank you, {name}. Our client advisor will respond within 2-4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyanjali Roy"
                      className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9830012345"
                      className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Your Inquiry / Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you're looking for, or inquire about custom sizes..."
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-12 border-t border-white/10">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-serif text-3xl text-white font-light uppercase">
              CLIENT ASSISTANCE & POLICIES
            </h2>
          </div>

          <div className="divide-y divide-white/5 border border-white/10 bg-zinc-950">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-5">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-white hover:text-gold transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-light animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
