import { Product } from "@/types";
import { STORE_INFO } from "@/data/storeInfo";

export const BASE_URL = "https://allfeetfashion.in";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: STORE_INFO.name,
    image: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    ],
    "@id": `${BASE_URL}/#store`,
    url: BASE_URL,
    telephone: STORE_INFO.phone,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: STORE_INFO.address.line1,
      addressLocality: STORE_INFO.address.city,
      addressRegion: STORE_INFO.address.state,
      postalCode: STORE_INFO.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_INFO.coordinates.lat,
      longitude: STORE_INFO.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "21:30",
      },
    ],
    sameAs: [
      `https://instagram.com/${STORE_INFO.instagram.replace("@", "")}`,
      STORE_INFO.googleMapsUrl,
    ],
  };
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: STORE_INFO.name,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}
