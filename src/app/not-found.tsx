import Link from "next/link";
import { MessageSquare, ArrowRight, Compass } from "lucide-react";
import { STORE_INFO } from "@/data/storeInfo";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-[#080808] text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Subtle Silhouette */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-10 max-w-xl text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold block">
          ERROR 404 • ARCHIVE UNREACHABLE
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-wide italic">
          are you lost, baby girl?
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          The page you’re looking for doesn’t exist, but text{" "}
          <strong className="text-white font-mono">{STORE_INFO.displayPhone}</strong> for assistance or boutique directions.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition flex items-center justify-center gap-2 shadow-2xl"
          >
            <Compass className="w-4 h-4" />
            <span>BACK TO SHOP</span>
          </Link>

          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Hello! I hit a missing page on your website and need assistance.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-400 text-xs tracking-widest uppercase font-semibold transition flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TEXT 9382107724</span>
          </a>
        </div>
      </div>
    </div>
  );
}
