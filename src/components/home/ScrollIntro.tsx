"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollIntro({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Register ScrollTrigger plugin safely on client
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Check if user already skipped or prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            setIsDismissed(true);
            if (onComplete) onComplete();
          },
        },
      });

      // 1. Hero visual slow cinematic zoom
      tl.to(
        heroImageRef.current,
        {
          scale: 1.25,
          opacity: 0.9,
          ease: "power2.out",
        },
        0
      );

      // 2. Left curtain moves left, right curtain moves right
      tl.to(
        leftCurtainRef.current,
        {
          xPercent: -105,
          ease: "power3.inOut",
        },
        0
      );

      tl.to(
        rightCurtainRef.current,
        {
          xPercent: 105,
          ease: "power3.inOut",
        },
        0
      );

      // 3. Logo scales down and fades into top navigation position
      tl.to(
        centerLogoRef.current,
        {
          scale: 0.7,
          opacity: 0,
          y: -80,
          ease: "power2.inOut",
        },
        0.1
      );

      // 4. Intro text fades early
      tl.to(
        scrollPromptRef.current,
        {
          opacity: 0,
          y: 30,
          ease: "power1.out",
        },
        0
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissed(true);
    if (onComplete) onComplete();
    // Scroll past intro container smoothly
    window.scrollTo({
      top: window.innerHeight * 1.2,
      behavior: "smooth",
    });
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black z-30 select-none"
    >
      {/* Background Campaign Visual */}
      <div
        ref={heroImageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center origin-center transition-transform duration-700 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5, 5, 5, 0.4), rgba(5, 5, 5, 0.8)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />

      {/* Left Luxury Panel / Curtain */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#070707] border-r border-gold/20 shadow-2xl flex items-center justify-end pr-8"
      >
        <div className="hidden sm:block text-right">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold/60 font-semibold block">
            THE ATELIER
          </span>
          <span className="font-serif text-3xl font-light text-zinc-600 tracking-widest">
            ALL FEET
          </span>
        </div>
      </div>

      {/* Right Luxury Panel / Curtain */}
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#070707] border-l border-gold/20 shadow-2xl flex items-center justify-start pl-8"
      >
        <div className="hidden sm:block text-left">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold/60 font-semibold block">
            AUTUMN / WINTER
          </span>
          <span className="font-serif text-3xl font-light text-zinc-600 tracking-widest">
            COLLECTION
          </span>
        </div>
      </div>

      {/* Centered Brand Monogram & Statements */}
      <div
        ref={centerLogoRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center z-10"
      >
        {/* Monogram Crest */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 border border-gold/60 flex items-center justify-center bg-black/80 backdrop-blur-md mb-6 shadow-2xl">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-gold tracking-tight">
            AFF
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-[0.25em] text-white uppercase mb-2">
          ALL FEET FASHION
        </h1>

        <p className="text-xs sm:text-sm tracking-[0.35em] text-gold uppercase font-medium">
          LUXURY • STYLE • CONFIDENCE • EXCLUSIVITY
        </p>
      </div>

      {/* Bottom Scroll Prompt & Skip Button */}
      <div
        ref={scrollPromptRef}
        className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center z-20 gap-4"
      >
        <div className="flex flex-col items-center gap-1.5 text-zinc-300 animate-pulse">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-zinc-400">
            SCROLL TO ENTER
          </span>
          <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
        </div>

        <button
          onClick={handleSkip}
          className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 hover:text-gold border border-white/10 hover:border-gold/50 px-4 py-1.5 bg-black/60 backdrop-blur-sm transition duration-300"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
}
