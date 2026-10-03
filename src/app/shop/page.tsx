"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  Search,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCategory } from "@/types";
import { formatPrice } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const { products } = useStore();

  // URL query params initialization
  const initialCategory = searchParams.get("category") as ProductCategory | null;
  const initialSort = searchParams.get("sort") || "featured";
  const initialSearch = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "";

  // State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(15000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>(
    initialFilter ? [initialFilter.toUpperCase()] : []
  );
  const [sortOption, setSortOption] = useState<string>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "watches", label: "Watches" },
    { id: "perfumes", label: "Perfumes" },
    { id: "shoes", label: "Shoes & Sneakers" },
    { id: "clothing", label: "Clothing" },
    { id: "sunglasses", label: "Sunglasses" },
    { id: "accessories", label: "Accessories" },
  ];

  const availableSizes = ["S", "M", "L", "XL", "UK 7", "UK 8", "UK 9", "UK 10", "100ml", "42mm"];
  const badgesList = ["NEW", "BESTSELLER", "LIMITED", "SALE"];

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const toggleBadge = (bd: string) => {
    setSelectedBadges((prev) =>
      prev.includes(bd) ? prev.filter((b) => b !== bd) : [...prev, bd]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceMax(15000);
    setSelectedSizes([]);
    setSelectedBadges([]);
    setSearchQuery("");
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
        // Price Max
        if (p.price > selectedPriceMax) return false;
        // Search
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Sizes
        if (selectedSizes.length > 0) {
          const hasSize = selectedSizes.some((s) => p.sizes.includes(s));
          if (!hasSize) return false;
        }
        // Badges
        if (selectedBadges.length > 0) {
          const hasBadge = selectedBadges.some((b) =>
            p.badges.includes(b as any)
          );
          if (!hasBadge) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "price-low") return a.price - b.price;
        if (sortOption === "price-high") return b.price - a.price;
        if (sortOption === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortOption === "popular") return b.reviewCount - a.reviewCount;
        return 0; // featured
      });
  }, [
    products,
    selectedCategory,
    selectedPriceMax,
    searchQuery,
    selectedSizes,
    selectedBadges,
    sortOption,
  ]);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2">
            HOME / ALL PRODUCTS
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-wide text-white uppercase">
                SHOP ALL
              </h1>
              <p className="text-xs text-zinc-400 tracking-wider uppercase mt-2">
                Showing {filteredProducts.length} curated luxury pieces
              </p>
            </div>

            {/* In-catalog Quick Search */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full bg-zinc-900 border border-white/10 pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold tracking-wide"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3.5" />
            </div>
          </div>
        </div>

        {/* Controls Bar: Filter Toggle & Sorting */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
            <span>Filters</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-wider">
            <span>Filter by:</span>
            {selectedCategory !== "all" && (
              <span className="px-2 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px]">
                {selectedCategory}
              </span>
            )}
            {selectedBadges.map((b) => (
              <span key={b} className="px-2 py-1 bg-zinc-900 border border-white/10 text-white text-[10px]">
                {b}
              </span>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-zinc-400 hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-zinc-900 border border-white/10 text-xs text-white px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Drops</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar (1 col) */}
          <aside className="hidden lg:block space-y-8 bg-zinc-950 p-6 border border-white/5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-serif text-lg tracking-wider uppercase text-white font-medium">
                FILTERS
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] uppercase tracking-wider text-zinc-400 hover:text-gold flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">
                CATEGORY
              </h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left py-1 text-xs tracking-wider uppercase transition flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? "text-gold font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase tracking-widest text-gold font-semibold">
                  MAX PRICE
                </span>
                <span className="font-mono text-white">{formatPrice(selectedPriceMax)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="w-full accent-gold bg-zinc-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>₹1,000</span>
                <span>₹15,000</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">
                SIZES / DIMENSIONS
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-2.5 py-1 text-xs uppercase border transition ${
                      selectedSizes.includes(sz)
                        ? "bg-gold text-black border-gold font-semibold"
                        : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges / Collections */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">
                EDITIONS & TAGS
              </h4>
              <div className="space-y-1.5">
                {badgesList.map((badge) => (
                  <button
                    key={badge}
                    onClick={() => toggleBadge(badge)}
                    className="w-full flex items-center justify-between text-xs text-zinc-400 hover:text-white py-1 uppercase tracking-wider"
                  >
                    <span>{badge}</span>
                    <div
                      className={`w-3.5 h-3.5 border flex items-center justify-center ${
                        selectedBadges.includes(badge)
                          ? "bg-gold border-gold text-black"
                          : "border-white/20"
                      }`}
                    >
                      {selectedBadges.includes(badge) && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid (3 cols) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center space-y-4 bg-zinc-950/40 border border-white/5 p-8">
                <p className="font-serif text-2xl text-white font-light">No items match your criteria</p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try adjusting your price range or clearing active filters to view all products.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-gold text-black text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom-Sheet / Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full bg-zinc-950 border-t border-white/10 p-6 max-h-[85vh] overflow-y-auto space-y-6 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-serif text-lg tracking-wider uppercase text-white font-semibold">
                FILTERS
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <span className="text-xs uppercase text-gold tracking-widest font-semibold">
                Category
              </span>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-2 text-xs uppercase tracking-wider border text-left transition ${
                      selectedCategory === cat.id
                        ? "bg-gold text-black border-gold font-semibold"
                        : "bg-zinc-900 border-white/10 text-zinc-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="uppercase text-gold tracking-widest font-semibold">
                  Max Price
                </span>
                <span className="font-mono text-white">{formatPrice(selectedPriceMax)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="w-full accent-gold bg-zinc-800"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex gap-3">
              <button
                onClick={resetFilters}
                className="w-1/2 py-3 bg-zinc-900 border border-white/10 text-xs uppercase tracking-widest font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-3 bg-gold text-black text-xs uppercase tracking-widest font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Loading Couture Collections...</span>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
