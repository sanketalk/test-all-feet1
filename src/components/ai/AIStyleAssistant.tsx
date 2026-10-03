"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  ShoppingBag,
  Bot,
  User,
  ArrowRight,
  Check,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface Message {
  id: string;
  sender: "assistant" | "user";
  text: string;
  recommendedProducts?: Product[];
}

const QUICK_PROMPTS = [
  "What should I wear for a date?",
  "Show me watches under ₹5,000",
  "Which perfume should I choose?",
  "I need an outfit with chunky sneakers",
  "Gift recommendations under ₹3,000",
];

export function AIStyleAssistant() {
  const { products } = useStore();
  const { addToCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: "Greetings. I am your All Feet Fashion AI Stylist. Tell me your occasion, budget, or preferred aesthetic, and I will curate pieces directly from our boutique catalog.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // AI Semantic and Rule-based Catalog Recommendation Engine
    setTimeout(() => {
      const q = query.toLowerCase();
      let matched: Product[] = [];
      let reply = "";

      // 1. Watches under budget
      if (q.includes("watch") || q.includes("watches") || q.includes("timepiece")) {
        const maxPriceMatch = q.match(/under\s*(?:rs\.?|₹)?\s*(\d+[\d,]*)/i);
        const maxPrice = maxPriceMatch ? parseInt(maxPriceMatch[1].replace(/,/g, ""), 10) : Infinity;

        matched = products.filter(
          (p) => p.category === "watches" && p.inStock && p.price <= maxPrice
        );
        reply = maxPriceMatch
          ? `Here are our finest handcrafted timepieces under ${formatPrice(maxPrice)}. Each piece features sapphire or hardened crystal and stainless steel casing.`
          : `Here are our premier chronographs and automatic timepieces crafted for executive presence.`;
      }
      // 2. Perfume / Fragrance
      else if (q.includes("perfume") || q.includes("fragrance") || q.includes("scent") || q.includes("oud")) {
        matched = products.filter((p) => p.category === "perfumes" && p.inStock);
        if (q.includes("date") || q.includes("evening") || q.includes("intimate")) {
          reply = "For evening and intimate settings, I highly recommend our Oud Impérial Extrait (35% oil) and Tobacco & Bourbon Reserve. They leave an unforgettable luxury projection.";
        } else {
          reply = "Here are our artisanal extrait de parfums and fresh summer eau de parfums formulated for lasting all-day sillage in the Indian climate.";
        }
      }
      // 3. Date night / Outfit styling
      else if (q.includes("date") || q.includes("dinner") || q.includes("party")) {
        const tee = products.find((p) => p.slug === "oversized-heavyweight-essential-tee");
        const boots = products.find((p) => p.slug === "venetian-leather-chelsea-boots");
        const watch = products.find((p) => p.slug === "noir-chronograph-42mm");
        const perf = products.find((p) => p.slug === "oud-imperial-extrait-100ml");

        matched = [tee, boots, watch, perf].filter(Boolean) as Product[];
        reply = "For an elevated, effortless date look: Pair our 280 GSM Boxy Heavyweight Tee with the Venetian Suede Chelsea Boots. Finish with the Noir Skeleton Chronograph and a spray of Oud Impérial.";
      }
      // 4. Chunky sneakers / streetwear
      else if (q.includes("sneaker") || q.includes("shoe") || q.includes("streetwear")) {
        const sneakers = products.filter((p) => p.category === "shoes" && p.inStock);
        const pants = products.filter((p) => p.slug === "tokyo-tactical-cargo-pant");
        matched = [...sneakers, ...pants];
        reply = "Our Ghost Monolith Chunky Sneakers pair magnificently with the Tokyo Tactical Cargo Trousers for an architectural high-street drape.";
      }
      // 5. Gifts
      else if (q.includes("gift") || q.includes("present") || q.includes("girlfriend") || q.includes("boyfriend")) {
        const wallet = products.find((p) => p.slug === "florence-full-grain-bifold-wallet");
        const shades = products.find((p) => p.slug === "milano-chunky-acetate-sunglasses");
        const perf = products.find((p) => p.slug === "oud-imperial-extrait-100ml");
        matched = [wallet, shades, perf].filter(Boolean) as Product[];
        reply = "Our most cherished gift selections come packaged in luxury presentation boxes with authenticity cards. Here are the top customer favorites:";
      }
      // 6. Generic / Fallback search
      else {
        matched = products
          .filter((p) => p.inStock && (p.isBestSeller || p.isFeatured))
          .slice(0, 3);
        reply = "Based on current boutique trends, here are our most coveted signature pieces. Let me know if you would like recommendations for a specific budget or occasion!";
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "assistant",
        text: reply,
        recommendedProducts: matched.slice(0, 3),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-16 sm:bottom-20 lg:bottom-6 left-3 sm:left-5 z-40 font-sans">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black hover:from-black hover:to-zinc-900 text-gold border border-gold/50 shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold animate-spin-slow flex-shrink-0" />
          <span className="text-[9.5px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
            <span className="sm:hidden">AI STYLIST ✦</span>
            <span className="hidden sm:inline">AI STYLE ASSISTANT ✦</span>
          </span>
        </button>
      </div>

      {/* Chat Window Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
          <div className="relative w-full sm:max-w-lg bg-zinc-950 border border-white/10 shadow-2xl h-[92vh] sm:h-[650px] flex flex-col justify-between text-white overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="p-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-gold/60 flex items-center justify-center bg-black text-gold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm tracking-wider uppercase font-semibold text-white flex items-center gap-1.5">
                    <span>AFF AI STYLIST</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-zinc-400 tracking-wider">
                    Online • Real-Time Boutique Advisor
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gold text-black font-medium"
                        : "bg-zinc-900 border border-white/10 text-zinc-200"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {/* Render Product Cards inside chat */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="w-full mt-3 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">
                        CURATED RECOMMENDATIONS:
                      </span>
                      {msg.recommendedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-2.5 bg-zinc-900/80 border border-white/10 hover:border-gold/40 transition gap-3"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div
                              className="w-12 h-14 bg-cover bg-center flex-shrink-0"
                              style={{ backgroundImage: `url('${p.images[0]}')` }}
                            />
                            <div className="truncate">
                              <h4 className="font-serif text-xs text-white truncate font-medium">
                                {p.name}
                              </h4>
                              <div className="text-[11px] text-gold font-mono">
                                {formatPrice(p.price)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <Link
                              href={`/product/${p.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[10px] uppercase font-semibold"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => {
                                addToCart(p);
                              }}
                              className="px-2.5 py-1.5 bg-gold hover:bg-gold-light text-black text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-white/5 p-3 w-32">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] tracking-wider ml-1">Styling...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-zinc-900/40 border-t border-white/5 overflow-x-auto no-scrollbar flex gap-2">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 bg-zinc-900 border border-white/10 hover:border-gold hover:text-gold text-[10px] text-zinc-300 whitespace-nowrap transition"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-zinc-900 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask for styling advice, outfits, or budget..."
                className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="p-2 bg-gold hover:bg-gold-light text-black transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
