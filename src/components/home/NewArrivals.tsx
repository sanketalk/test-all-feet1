"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "../product/ProductCard";
import { ProductCategory } from "@/types";

export function NewArrivals() {
  const { products } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | ProductCategory>("ALL");

  const categories: { label: string; value: "ALL" | ProductCategory }[] = [
    { label: "ALL", value: "ALL" },
    { label: "WATCHES", value: "watches" },
    { label: "PERFUMES", value: "perfumes" },
    { label: "SHOES", value: "shoes" },
    { label: "CLOTHING", value: "clothing" },
    { label: "SUNGLASSES", value: "sunglasses" },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === "ALL") return true;
    return p.category === selectedFilter;
  });

  return (
    <section className="py-20 bg-[#080808] text-white font-sans border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block mb-2">
              FRESH DROPS. NO SECOND THOUGHTS.
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
              NEW ARRIVALS
            </h2>
          </div>

          <Link
            href="/shop?sort=newest"
            className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 hover:text-gold transition flex items-center gap-1.5 mt-4 md:mt-0"
          >
            <span>VIEW COMPLETE CATALOG</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedFilter(cat.value)}
              className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition border ${
                selectedFilter === cat.value
                  ? "bg-gold text-black border-gold font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 border-white/10 hover:border-zinc-500 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid: Desktop 4 cols, Tablet 3 cols, Mobile 2 cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
