"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";
import { ProductCategory } from "@/types";

interface SizeGuideModalProps {
  category: ProductCategory;
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ category, isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"cm" | "inch">("inch");

  if (!isOpen) return null;

  const isFootwear = category === "shoes";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-white/10 shadow-2xl p-6 text-white overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gold" />
            <h3 className="font-serif text-lg tracking-wider uppercase font-medium">
              {isFootwear ? "FOOTWEAR SIZING GUIDE" : "APPAREL & FIT CHART"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1 text-zinc-400 hover:text-white rounded-full bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end gap-2 mb-4 text-xs uppercase tracking-wider">
          <button
            onClick={() => setUnit("inch")}
            className={`px-3 py-1 border transition ${
              unit === "inch" ? "bg-gold text-black border-gold font-bold" : "border-white/10 text-zinc-400"
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnit("cm")}
            className={`px-3 py-1 border transition ${
              unit === "cm" ? "bg-gold text-black border-gold font-bold" : "border-white/10 text-zinc-400"
            }`}
          >
            Centimetres
          </button>
        </div>

        {/* Tables */}
        {isFootwear ? (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse border border-white/10">
              <thead>
                <tr className="bg-zinc-900 text-gold uppercase tracking-widest text-[10px]">
                  <th className="p-3 border border-white/10">UK / India</th>
                  <th className="p-3 border border-white/10">US</th>
                  <th className="p-3 border border-white/10">EU</th>
                  <th className="p-3 border border-white/10">Foot Length ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">UK 6</td>
                  <td className="p-3 border border-white/10">7.0</td>
                  <td className="p-3 border border-white/10">40</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "9.8\"" : "25.0 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">UK 7</td>
                  <td className="p-3 border border-white/10">8.0</td>
                  <td className="p-3 border border-white/10">41</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "10.2\"" : "26.0 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">UK 8</td>
                  <td className="p-3 border border-white/10">9.0</td>
                  <td className="p-3 border border-white/10">42</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "10.6\"" : "27.0 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">UK 9</td>
                  <td className="p-3 border border-white/10">10.0</td>
                  <td className="p-3 border border-white/10">43</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "11.0\"" : "28.0 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">UK 10</td>
                  <td className="p-3 border border-white/10">11.0</td>
                  <td className="p-3 border border-white/10">44</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "11.4\"" : "29.0 cm"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse border border-white/10">
              <thead>
                <tr className="bg-zinc-900 text-gold uppercase tracking-widest text-[10px]">
                  <th className="p-3 border border-white/10">Size</th>
                  <th className="p-3 border border-white/10">Chest ({unit})</th>
                  <th className="p-3 border border-white/10">Length ({unit})</th>
                  <th className="p-3 border border-white/10">Shoulder ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">S</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "42\"" : "106 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "28\"" : "71 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "20\"" : "51 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">M</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "44\"" : "112 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "29\"" : "74 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "21\"" : "53 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">L</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "46\"" : "117 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "30\"" : "76 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "22\"" : "56 cm"}</td>
                </tr>
                <tr>
                  <td className="p-3 border border-white/10 font-bold text-white">XL</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "48\"" : "122 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "31\"" : "79 cm"}</td>
                  <td className="p-3 border border-white/10">{unit === "inch" ? "23\"" : "58 cm"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tip */}
        <div className="mt-4 p-3 bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400">
          <strong className="text-white">Fit Advisory:</strong> Our heavyweight streetwear tees and chunky sneakers are designed with an intentionally relaxed boxy silhouette. If you prefer a tailored snug fit, select one size smaller.
        </div>
      </div>
    </div>
  );
}
