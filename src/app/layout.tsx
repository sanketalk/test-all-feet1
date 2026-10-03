import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AIStyleAssistant } from "@/components/ai/AIStyleAssistant";
import { STORE_INFO } from "@/data/storeInfo";
import { generateLocalBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    template: "%s | All Feet Fashion — Luxury Footwear & Streetwear",
    default: "All Feet Fashion — Premium Fashion, Watches & Footwear | Midnapore Boutique",
  },
  description:
    "All Feet Fashion is a premium fashion & lifestyle house based in Midnapore, West Bengal. Explore handcrafted skeleton watches, extrait perfumes, Italian footwear, and heavyweight streetwear at accessible luxury prices.",
  keywords: [
    "All Feet Fashion",
    "All Feet Fashion Midnapore",
    "Luxury watches India",
    "Oud Perfume India",
    "Chunky sneakers India",
    "Midnapore fashion store",
    "School Bazar Midnapore",
    "High fashion streetwear",
  ],
  authors: [{ name: "All Feet Fashion" }],
  openGraph: {
    title: "All Feet Fashion — Define Your Everyday",
    description: "Premium fashion, elevated essentials, and luxury footwear in Midnapore, West Bengal.",
    url: "https://allfeetfashion.in",
    siteName: "All Feet Fashion",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "All Feet Fashion Luxury Campaign",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Feet Fashion — Luxury Lifestyle & Footwear",
    description: "Handcrafted timepieces, extrait perfumes, and elevated fashion essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="bg-[#080808] text-[#EAEAE6] antialiased min-h-screen flex flex-col selection:bg-gold selection:text-black">
        <StoreProvider>
          <WishlistProvider>
            <CartProvider>
              {/* Sticky Luxury Header */}
              <Header />

              {/* Main Content Area */}
              <main className="flex-1">{children}</main>

              {/* Slide-out Cart Drawer */}
              <CartDrawer />

              {/* Global AI Style Assistant */}
              <AIStyleAssistant />

              {/* Floating WhatsApp CTA */}
              <WhatsAppFloat />

              {/* Sticky Mobile Bottom Navigation */}
              <MobileBottomNav />

              {/* Full Global Footer */}
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
