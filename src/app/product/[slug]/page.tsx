"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Zap,
  MessageSquare,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Ruler,
  Check,
  Heart,
  Share2,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { createProductWhatsAppUrl } from "@/lib/whatsapp";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { ReviewsList } from "@/components/product/ReviewsList";
import { ProductCard } from "@/components/product/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const { getProductBySlug, products } = useStore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = getProductBySlug(slug) || products[0];

  // Component state
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0]?.name || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Accordion active tab
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif text-3xl">Product Not Found</h2>
        <Link href="/shop" className="px-6 py-2 bg-gold text-black text-xs uppercase tracking-widest font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    router.push("/checkout");
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      if (pincode.startsWith("721")) {
        setPincodeStatus("Same-Day / Next-Day Delivery available in Midnapore region!");
      } else {
        setPincodeStatus("Estimated Delivery: 2-4 Business Days via BlueDart Express");
      }
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const whatsappUrl = createProductWhatsAppUrl(product, {
    size: selectedSize,
    color: selectedColor,
    quantity,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-6 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] text-zinc-500 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-white transition">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-300 font-medium truncate">{product.name}</span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Product Gallery (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* RIGHT: Product Information (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand, Badges & Wishlist */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold">
                  {product.brand}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Wishlist toggle"
                    className="p-2 border border-white/10 hover:border-gold rounded-full text-zinc-400 hover:text-white transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? "fill-gold text-gold" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white leading-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-xs text-zinc-400 tracking-wider uppercase mt-1 italic font-serif">
                &ldquo;{product.tagline}&rdquo;
              </p>

              {/* Rating & Review jump link */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white font-mono">
                  {product.rating}
                </span>
                <span className="text-xs text-zinc-500">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price & Tax Box */}
            <div className="p-4 bg-zinc-900/50 border border-white/10 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-base text-zinc-500 line-through font-mono">
                      {formatPrice(product.mrp)}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="text-[11px] text-zinc-400">
                Inclusive of all taxes • Free shipping on orders over ₹1,999
              </div>

              {/* EMI / Split Payment Info */}
              <div className="pt-2 mt-2 border-t border-white/5 text-[11px] text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>
                  Or 3 interest-free payments of <strong>{formatPrice(Math.round(product.price / 3))}</strong> with UPI / Credit Card.
                </span>
              </div>
            </div>

            {/* Color Variant Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-wider">
                  <span className="text-zinc-400">Color:</span>
                  <span className="text-white font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 border text-xs uppercase tracking-wider transition ${
                        selectedColor === c.name
                          ? "border-gold text-gold bg-gold/10 font-semibold"
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
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="text-zinc-400">Select Size:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-gold hover:underline flex items-center gap-1 text-[11px] font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-3 border text-xs uppercase font-medium tracking-wider transition text-center ${
                        selectedSize === sz
                          ? "border-gold bg-gold text-black font-bold"
                          : "border-white/10 bg-zinc-950 text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-zinc-400">
                Quantity:
              </span>
              <div className="flex items-center border border-white/10 bg-black">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white text-xs"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-mono font-medium text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              {/* Primary CTA: ADD TO CART */}
              <button
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`w-full py-4 text-xs tracking-[0.25em] uppercase font-bold transition flex items-center justify-center gap-2 shadow-2xl ${
                  addedAnimation
                    ? "bg-emerald-600 text-white"
                    : "bg-white hover:bg-gold text-black"
                }`}
              >
                {addedAnimation ? (
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

              {/* Secondary CTA: BUY NOW */}
              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-transparent border border-white/20 hover:border-gold hover:text-gold text-white text-xs tracking-[0.25em] uppercase font-semibold transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>BUY NOW</span>
              </button>

              {/* WhatsApp CTA: ORDER ON WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs tracking-[0.2em] uppercase font-semibold transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="p-4 bg-zinc-900/30 border border-white/5 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-semibold">
                CHECK ESTIMATED DELIVERY DATE
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode (e.g. 721101)"
                  className="flex-1 bg-black border border-white/10 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-gold hover:text-black text-xs uppercase tracking-wider font-semibold transition"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <div className="text-xs text-zinc-300 pt-1 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{pincodeStatus}</span>
                </div>
              )}
            </div>

            {/* Expandable Accordion Sections */}
            <div className="border-t border-white/10 divide-y divide-white/5 pt-2">
              {/* 1. Description */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "description" ? null : "description")
                  }
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-white hover:text-gold transition text-left"
                >
                  <span>DESCRIPTION</span>
                  {openAccordion === "description" ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openAccordion === "description" && (
                  <div className="pb-4 text-xs text-zinc-400 leading-relaxed font-light space-y-2 animate-fade-in">
                    <p>{product.description}</p>
                    {product.features && (
                      <ul className="list-disc pl-4 space-y-1 text-zinc-300 pt-2">
                        {product.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* 2. Details & Specs */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "specs" ? null : "specs")
                  }
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-white hover:text-gold transition text-left"
                >
                  <span>DETAILS & SPECIFICATIONS</span>
                  {openAccordion === "specs" ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openAccordion === "specs" && (
                  <div className="pb-4 text-xs animate-fade-in">
                    <table className="w-full text-left border border-white/10">
                      <tbody className="divide-y divide-white/5">
                        {Object.entries(product.specifications || {}).map(([key, val]) => (
                          <tr key={key} className="p-2">
                            <td className="p-2.5 bg-zinc-900/60 font-semibold text-zinc-300 w-1/3 border-r border-white/5">
                              {key}
                            </td>
                            <td className="p-2.5 text-zinc-400">{val}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="p-2.5 bg-zinc-900/60 font-semibold text-zinc-300 border-r border-white/5">
                            Materials
                          </td>
                          <td className="p-2.5 text-zinc-400">{product.materials}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 3. Shipping & Delivery */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "shipping" ? null : "shipping")
                  }
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-white hover:text-gold transition text-left"
                >
                  <span>SHIPPING & PAN-INDIA DELIVERY</span>
                  {openAccordion === "shipping" ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openAccordion === "shipping" && (
                  <div className="pb-4 text-xs text-zinc-400 leading-relaxed font-light space-y-2 animate-fade-in">
                    <p>
                      • <strong>Express Pan-India Logistics:</strong> Orders dispatched within 24 hours from our regional hubs via BlueDart and Delhivery.
                    </p>
                    <p>
                      • <strong>Delivery Timeframe:</strong> 2 to 4 business days across major metros and tier 1/2 cities. Midnapore and Kolkata local deliveries within 24-48 hours.
                    </p>
                    <p>
                      • <strong>Free Shipping:</strong> Complimentary on all orders exceeding ₹1,999.
                    </p>
                  </div>
                )}
              </div>

              {/* 4. Returns & Exchange */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "returns" ? null : "returns")
                  }
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-white hover:text-gold transition text-left"
                >
                  <span>7-DAY RETURNS & EXCHANGE POLICY</span>
                  {openAccordion === "returns" ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openAccordion === "returns" && (
                  <div className="pb-4 text-xs text-zinc-400 leading-relaxed font-light space-y-2 animate-fade-in">
                    <p>
                      We uphold an effortless 7-day return and exchange guarantee. If your shoes or garments do not fit to absolute perfection, schedule a complimentary doorstep exchange or visit our Midnapore School Bazar boutique for instant in-store replacement.
                    </p>
                  </div>
                )}
              </div>

              {/* 5. Authenticity Guarantee */}
              <div>
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "authenticity" ? null : "authenticity")
                  }
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-white hover:text-gold transition text-left"
                >
                  <span>AUTHENTICITY & BESPOKE QUALITY</span>
                  {openAccordion === "authenticity" ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
                {openAccordion === "authenticity" && (
                  <div className="pb-4 text-xs text-zinc-400 leading-relaxed font-light space-y-2 animate-fade-in">
                    <p>
                      Every All Feet Fashion creation comes serialized with warranty documentation. Hand-inspected at our flagship studio prior to shipment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-24 pt-16 border-t border-white/10">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block mb-1">
              COMMUNITY VOICES
            </span>
            <h2 className="font-serif text-3xl font-light text-white uppercase">
              CLIENT REVIEWS & EXPERIENCES
            </h2>
          </div>

          <ReviewsList
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </section>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/10">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold block mb-1">
                COMPLETE THE LOOK
              </span>
              <h2 className="font-serif text-3xl font-light text-white uppercase">
                YOU MAY ALSO LIKE
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom Action Bar on Mobile */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-zinc-950/95 border-t border-white/10 p-3 px-4 flex items-center justify-between gap-3 backdrop-blur-lg">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Total</div>
          <div className="text-sm font-semibold text-white font-mono">{formatPrice(product.price)}</div>
        </div>
        <div className="flex gap-2 flex-1 max-w-xs">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 bg-zinc-800 text-white text-[11px] uppercase font-semibold tracking-wider border border-white/10"
          >
            Add to Bag
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-2.5 bg-gold text-black text-[11px] uppercase font-bold tracking-wider"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Sizing Guide Modal */}
      {isSizeGuideOpen && (
        <SizeGuideModal
          category={product.category}
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}
    </div>
  );
}
