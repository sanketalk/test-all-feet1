export interface StoreInfo {
  name: string;
  tagline: string;
  established: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  instagram: string;
  address: {
    line1: string;
    landmark: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
    fullFormatted: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    weekdays: string;
    weekends: string;
    daily: string;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  perks: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const STORE_INFO: StoreInfo = {
  name: "All Feet Fashion",
  tagline: "Define Your Everyday. Premium Fashion & Footwear.",
  established: "2022",
  phone: "+919382107724",
  displayPhone: "+91 9382107724",
  whatsappNumber: "919382107724",
  email: "support@allfeetfashion.in",
  instagram: "@allfeet.fashion",
  address: {
    line1: "Bibigunj, School Bazzar Chawk, School Bazar",
    landmark: "Near Green Valley",
    city: "Midnapore (Medinipur)",
    district: "Paschim Medinipur",
    state: "West Bengal",
    pincode: "721101",
    country: "India",
    fullFormatted:
      "Bibigunj, School Bazzar Chawk, Near Green Valley, School Bazar, Midnapore, West Bengal - 721101",
  },
  coordinates: {
    lat: 22.4130133,
    lng: 87.3270268,
  },
  hours: {
    weekdays: "10:00 AM – 9:30 PM",
    weekends: "10:00 AM – 10:00 PM",
    daily: "Open Every Day: 10:00 AM – 9:30 PM",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/All+Feet+Fashion/@22.4130182,87.3244519,17z/data=!3m1!4b1!4m6!3m5!1s0x3a1d5bde32c24c0b:0xe887cd7b40b91388!8m2!3d22.4130133!4d87.3270268!16s%2Fg%2F11zd96kq1x?entry=ttu",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.702758253164!2d87.3244519!3d22.4130182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d5bde32c24c0b%3A0xe887cd7b40b91388!2sAll%20Feet%20Fashion!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  perks: [
    {
      title: "VIP Styling Suite",
      description: "Complimentary personal styling and curation by our fashion advisors.",
      icon: "Sparkles",
    },
    {
      title: "Trial & Fitting Lounge",
      description: "Air-conditioned trial suites to experience footwear comfort and garment fits.",
      icon: "CheckCircle",
    },
    {
      title: "Express In-Store Exchange",
      description: "Hassle-free instant exchanges and size adjustments on all purchases.",
      icon: "RefreshCw",
    },
    {
      title: "Curated Luxury Drops",
      description: "Exclusive limited physical releases before they land online.",
      icon: "Crown",
    },
  ],
};
