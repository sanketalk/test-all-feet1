"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { CartItem, Product } from "@/types";
import { useStore } from "./StoreContext";

interface CartContextType {
  items: CartItem[];
  savedForLater: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    options?: { size?: string; color?: string; quantity?: number }
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  saveForLater: (itemId: string) => void;
  moveToCartFromSaved: (itemId: string) => void;
  removeSaved: (itemId: string) => void;
  clearCart: () => void;
  couponCode: string;
  couponError: string | null;
  appliedCoupon: {
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    description: string;
  } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  // Totals
  itemCount: number;
  subtotal: number;
  volumeDiscountPercentage: number;
  volumeDiscountAmount: number;
  couponDiscountAmount: number;
  shippingFee: number;
  finalTotal: number;
  freeShippingThreshold: number;
  amountAwayFromFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1999;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { coupons, discountRules } = useStore();
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    description: string;
  } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aff_cart");
      if (stored) setItems(JSON.parse(stored));

      const storedSaved = localStorage.getItem("aff_cart_saved");
      if (storedSaved) setSavedForLater(JSON.parse(storedSaved));

      const storedCoupon = localStorage.getItem("aff_applied_coupon");
      if (storedCoupon) setAppliedCoupon(JSON.parse(storedCoupon));
    } catch (e) {
      console.error("Cart localStorage error:", e);
    }
    setIsHydrated(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aff_cart", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("aff_cart_saved", JSON.stringify(savedForLater));
    } catch (e) {
      console.error(e);
    }
  }, [savedForLater, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem("aff_applied_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("aff_applied_coupon");
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon, isHydrated]);

  const addToCart = (
    product: Product,
    options?: { size?: string; color?: string; quantity?: number }
  ) => {
    const qty = options?.quantity || 1;
    const size = options?.size || product.sizes[0] || undefined;
    const color = options?.color || product.colors[0]?.name || undefined;

    setItems((prev) => {
      // Find if same item & variant exists
      const existingIdx = prev.findIndex(
        (it) =>
          it.productId === product.id &&
          it.selectedSize === size &&
          it.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const current = updated[existingIdx];
        const newQty = current.quantity + qty;
        updated[existingIdx] = {
          ...current,
          quantity: newQty,
          totalPrice: current.unitPrice * newQty,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${product.id}-${size || "def"}-${color || "def"}-${Date.now()}`,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity: qty,
        unitPrice: product.price,
        totalPrice: product.price * qty,
      };
      return [newItem, ...prev];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const saveForLater = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setSavedForLater((prev) => [item, ...prev]);
  };

  const moveToCartFromSaved = (itemId: string) => {
    const item = savedForLater.find((i) => i.id === itemId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((i) => i.id !== itemId));
    setItems((prev) => [item, ...prev]);
  };

  const removeSaved = (itemId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponCode("");
  };

  // Calculations
  const itemCount = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.totalPrice, 0),
    [items]
  );

  // Automatic volume discount rule check
  const { volumeDiscountPercentage, volumeDiscountAmount } = useMemo(() => {
    if (itemCount === 0) return { volumeDiscountPercentage: 0, volumeDiscountAmount: 0 };

    // Sort active discount rules descending by minItems
    const activeRules = [...discountRules]
      .filter((r) => r.isActive)
      .sort((a, b) => b.minItems - a.minItems);

    const matchedRule = activeRules.find((r) => itemCount >= r.minItems);
    if (!matchedRule) return { volumeDiscountPercentage: 0, volumeDiscountAmount: 0 };

    const discountAmount = Math.round((subtotal * matchedRule.discountPercentage) / 100);
    return {
      volumeDiscountPercentage: matchedRule.discountPercentage,
      volumeDiscountAmount: discountAmount,
    };
  }, [itemCount, subtotal, discountRules]);

  // Coupon discount calculation
  const couponDiscountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const baseAfterVolume = Math.max(0, subtotal - volumeDiscountAmount);
    if (appliedCoupon.discountType === "percentage") {
      return Math.round((baseAfterVolume * appliedCoupon.discountValue) / 100);
    } else {
      return Math.min(appliedCoupon.discountValue, baseAfterVolume);
    }
  }, [appliedCoupon, subtotal, volumeDiscountAmount]);

  const applyCoupon = (rawCode: string): boolean => {
    const code = rawCode.trim().toUpperCase();
    setCouponError(null);

    const match = coupons.find((c) => c.code.toUpperCase() === code && c.isActive);
    if (!match) {
      setCouponError("Invalid or expired coupon code.");
      return false;
    }

    if (subtotal < match.minOrderValue) {
      setCouponError(`Coupon requires a minimum cart total of ₹${match.minOrderValue}.`);
      return false;
    }

    setAppliedCoupon({
      code: match.code,
      discountType: match.discountType,
      discountValue: match.discountValue,
      description: match.description,
    });
    setCouponCode(code);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError(null);
  };

  // Shipping
  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (appliedCoupon?.code === "FREESHIP") return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }, [subtotal, appliedCoupon]);

  const amountAwayFromFreeShipping = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return FREE_SHIPPING_THRESHOLD - subtotal;
  }, [subtotal]);

  const finalTotal = useMemo(() => {
    if (subtotal === 0) return 0;
    const discounted = subtotal - volumeDiscountAmount - couponDiscountAmount;
    return Math.max(0, discounted) + shippingFee;
  }, [subtotal, volumeDiscountAmount, couponDiscountAmount, shippingFee]);

  return (
    <CartContext.Provider
      value={{
        items,
        savedForLater,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        saveForLater,
        moveToCartFromSaved,
        removeSaved,
        clearCart,
        couponCode,
        couponError,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        itemCount,
        subtotal,
        volumeDiscountPercentage,
        volumeDiscountAmount,
        couponDiscountAmount,
        shippingFee,
        finalTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountAwayFromFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
