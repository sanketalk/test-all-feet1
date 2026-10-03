"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Coupon,
  DiscountRule,
  Order,
  OrderStatus,
  Product,
  ProductReview,
} from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { INITIAL_REVIEWS } from "@/data/reviews";

interface StoreContextType {
  products: Product[];
  reviews: ProductReview[];
  orders: Order[];
  coupons: Coupon[];
  discountRules: DiscountRule[];
  dropCountdownDate: string;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addReview: (review: Omit<ProductReview, "id" | "date" | "helpfulCount">) => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;
  updateDiscountRules: (rules: DiscountRule[]) => void;
  setDropCountdownDate: (dateStr: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
}

const DEFAULT_COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 999,
    description: "10% off on your first luxury order",
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "LUXE20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 4999,
    description: "20% off on premium collections over ₹4,999",
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "FREESHIP",
    discountType: "fixed",
    discountValue: 99,
    minOrderValue: 499,
    description: "Free express shipping waiver",
    expiryDate: "2026-12-31",
    isActive: true,
  },
];

const DEFAULT_DISCOUNT_RULES: DiscountRule[] = [
  { id: "dr-1", minItems: 2, discountPercentage: 15, label: "BUY 2 → 15% OFF", isActive: true },
  { id: "dr-2", minItems: 3, discountPercentage: 20, label: "BUY 3 → 20% OFF", isActive: true },
  { id: "dr-3", minItems: 5, discountPercentage: 30, label: "BUY 5 → 30% OFF", isActive: true },
];

const DEFAULT_SAMPLE_ORDERS: Order[] = [
  {
    id: "ord-1",
    orderNumber: "AFF-2026-8942",
    date: "02 Mar 2026",
    customer: {
      fullName: "Anirban Chatterjee",
      phone: "+91 98301 24589",
      email: "anirban.c@gmail.com",
      street: "Flat 4B, Silver Oak Heights, Keranitola",
      city: "Midnapore",
      state: "West Bengal",
      pincode: "721101",
    },
    items: [
      {
        id: "item-1",
        productId: "aff-watch-01",
        product: INITIAL_PRODUCTS[0],
        selectedColor: "Obsidian Black",
        quantity: 1,
        unitPrice: 4999,
        totalPrice: 4999,
      },
      {
        id: "item-2",
        productId: "aff-perf-01",
        product: INITIAL_PRODUCTS[3],
        selectedSize: "100ml",
        quantity: 1,
        unitPrice: 2499,
        totalPrice: 2499,
      },
    ],
    subtotal: 7498,
    volumeDiscount: 1125, // 15% on 2 items
    couponDiscount: 0,
    shippingFee: 0,
    totalAmount: 6373,
    paymentMethod: "WHATSAPP",
    paymentStatus: "VERIFIED",
    orderStatus: "SHIPPED",
    courierName: "BlueDart Express",
    trackingNumber: "BD-994821034",
    timeline: [
      { status: "PENDING", label: "Order Placed", date: "02 Mar 2026, 11:20 AM", completed: true, checkpoint: "Midnapore Online Hub" },
      { status: "CONFIRMED", label: "Order Confirmed", date: "02 Mar 2026, 11:45 AM", completed: true, checkpoint: "School Bazar Store" },
      { status: "PACKED", label: "Quality Inspection & Packed", date: "02 Mar 2026, 03:10 PM", completed: true, checkpoint: "Packaging Suite" },
      { status: "SHIPPED", label: "Shipped with BlueDart", date: "03 Mar 2026, 09:30 AM", completed: true, checkpoint: "Kolkata Distribution Center" },
      { status: "OUT_FOR_DELIVERY", label: "Out for Delivery", completed: false },
      { status: "DELIVERED", label: "Delivered", completed: false },
    ],
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);
  const [orders, setOrders] = useState<Order[]>(DEFAULT_SAMPLE_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [discountRules, setDiscountRules] = useState<DiscountRule[]>(DEFAULT_DISCOUNT_RULES);
  // Default drop countdown: 3 days from now
  const [dropCountdownDate, setDropCountdownDate] = useState<string>("2026-10-15T23:59:59");
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("aff_products");
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedOrders = localStorage.getItem("aff_orders");
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedReviews = localStorage.getItem("aff_reviews");
      if (storedReviews) setReviews(JSON.parse(storedReviews));

      const storedCoupons = localStorage.getItem("aff_coupons");
      if (storedCoupons) setCoupons(JSON.parse(storedCoupons));

      const storedRules = localStorage.getItem("aff_discount_rules");
      if (storedRules) setDiscountRules(JSON.parse(storedRules));
    } catch (e) {
      console.error("Failed to load store data from localStorage:", e);
    }
    setIsHydrated(true);
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aff_products", JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aff_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aff_reviews", JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aff_coupons", JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons, isHydrated]);

  const addProduct = (newProduct: Omit<Product, "id">) => {
    const id = `aff-${newProduct.category.slice(0, 3)}-${Date.now()}`;
    const product: Product = { ...newProduct, id };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const nowStr = new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        });

        const statusOrder: OrderStatus[] = [
          "PENDING",
          "CONFIRMED",
          "PACKED",
          "SHIPPED",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
        ];
        const targetIdx = statusOrder.indexOf(status);

        const updatedTimeline = ord.timeline.map((step) => {
          const stepIdx = statusOrder.indexOf(step.status);
          const isDone = stepIdx <= targetIdx;
          return {
            ...step,
            completed: isDone,
            date: isDone && !step.date ? nowStr : step.date,
          };
        });

        return {
          ...ord,
          orderStatus: status,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const addReview = (reviewData: Omit<ProductReview, "id" | "date" | "helpfulCount">) => {
    const newRev: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      helpfulCount: 0,
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const updateDiscountRules = (rules: DiscountRule[]) => {
    setDiscountRules(rules);
    localStorage.setItem("aff_discount_rules", JSON.stringify(rules));
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        reviews,
        orders,
        coupons,
        discountRules,
        dropCountdownDate,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        addReview,
        addCoupon,
        toggleCoupon,
        updateDiscountRules,
        setDropCountdownDate,
        getProductBySlug,
        getProductById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
