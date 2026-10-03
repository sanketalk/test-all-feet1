import { HeroCampaign } from "@/components/home/HeroCampaign";
import { CategoryCards } from "@/components/home/CategoryCards";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BestSellers } from "@/components/home/BestSellers";
import { LimitedDrop } from "@/components/home/LimitedDrop";
import { StoreShowcase } from "@/components/home/StoreShowcase";
import { InstagramFit } from "@/components/home/InstagramFit";
import { TrustSection } from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <div className="relative bg-[#080808]">
      {/* 1. Main Hero Campaign Banner */}
      <HeroCampaign />

      {/* 3. Visual Category Cards */}
      <CategoryCards />

      {/* 4. New Arrivals Grid */}
      <NewArrivals />

      {/* 5. Best Sellers Horizontal Carousel */}
      <BestSellers />

      {/* 6. Limited Promotional Drop Capsule with Live Countdown */}
      <LimitedDrop />

      {/* 7. Physical Store Showcase with Midnapore Coordinates & Map */}
      <StoreShowcase />

      {/* 8. Instagram Fit Community Lookbook */}
      <InstagramFit />

      {/* 9. Pan-India Trust Guarantees */}
      <TrustSection />
    </div>
  );
}
