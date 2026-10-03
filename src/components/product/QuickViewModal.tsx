"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Star, ShoppingBag, MessageSquare, ArrowRight, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { createProductWhatsAppUrl } from "@/lib/whatsapp";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const whatsappUrl = createProductWhatsAppUrl(product, {
    size: selectedSize,
    color: selectedColor,
    quantity,
    url: typeof window !== "undefined" ? window.location.origin + `/product/${product.slug}` : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden text-white flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white bg-black/60 rounded-full border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery (Left) */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-zinc-900/40">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-black mb-3">
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url('${product.images[selectedImage] || product.images[0]}')` }}
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-14 border flex-shrink-0 bg-cover bg-center transition ${
                    selectedImage === i ? "border-gold" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundImage: `url('${img}')` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details (Right) */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-widest">
              <span>{product.brand}</span>
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-3.5 h-3.5 fill-gold" />
                <span>{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-normal text-white">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-serif text-white">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-zinc-500 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="text-xs text-emerald-400 uppercase font-semibold">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Color: <span className="text-white">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (c.imageIndex !== undefined) setSelectedImage(c.imageIndex);
                      }}
                      className={`px-3 py-1 text-xs border uppercase tracking-wider transition ${
                        selectedColor === c.name
                          ? "border-gold text-gold bg-gold/10"
                          : "border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Size: <span className="text-white">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs border uppercase tracking-wider font-medium transition ${
                        selectedSize === sz
                          ? "border-gold text-black bg-gold font-semibold"
                          : "border-white/10 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status indicator */}
            <div className="text-[11px] text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock — Ready for Pan-India Dispatch</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-3 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-gold text-black hover:text-black"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ORDER ON WHATSAPP</span>
            </a>

            <div className="text-center pt-1">
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="text-[11px] tracking-wider uppercase text-zinc-400 hover:text-gold transition inline-flex items-center gap-1"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
