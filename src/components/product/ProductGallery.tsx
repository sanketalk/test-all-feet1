"use client";

import React, { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });

  const currentImage = images[selectedIndex] || images[0] || "";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x, y });
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Main Image Display with Hover Zoom */}
      <div
        className="relative aspect-[3/4] w-full bg-zinc-950 border border-white/10 overflow-hidden cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-200"
          style={{
            backgroundImage: `url('${currentImage}')`,
            transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
            transform: isZoomed ? "scale(2.2)" : "scale(1)",
          }}
        />

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          aria-label="View Fullscreen"
          className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full border border-white/10 backdrop-blur-sm transition opacity-0 group-hover:opacity-100 z-10"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Arrows for mobile/swipe */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white rounded-full border border-white/10 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white rounded-full border border-white/10 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[3/4] w-20 flex-shrink-0 bg-cover bg-center border transition ${
                selectedIndex === idx
                  ? "border-gold opacity-100"
                  : "border-white/10 opacity-50 hover:opacity-90"
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            >
              <span className="sr-only">View image {idx + 1}</span>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={currentImage}
              alt={productName}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
