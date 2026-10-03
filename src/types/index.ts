export type ProductCategory =
  | "watches"
  | "perfumes"
  | "shoes"
  | "clothing"
  | "sunglasses"
  | "accessories";

export type ProductBadge = "NEW" | "BESTSELLER" | "LIMITED" | "SALE";

export interface ProductVariant {
  id: string;
  name: string;
  size?: string;
  color?: string;
  colorHex?: string;
  inStock: boolean;
  stockCount: number;
  sku: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  photos?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  tagline: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  videoUrl?: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  materials: string;
  careInstructions?: string;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
    imageIndex?: number;
  }[];
  variants: ProductVariant[];
  badges: ProductBadge[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isDrop?: boolean;
  gender?: "men" | "women" | "unisex";
}

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
}

export interface DiscountRule {
  id: string;
  minItems: number;
  discountPercentage: number;
  label: string;
  isActive: boolean;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  date?: string;
  completed: boolean;
  checkpoint?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: CustomerAddress;
  items: CartItem[];
  subtotal: number;
  volumeDiscount: number;
  couponDiscount: number;
  couponCode?: string;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: "WHATSAPP" | "ONLINE_UPI" | "COD";
  paymentStatus: "PENDING" | "PAID" | "VERIFIED";
  orderStatus: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  timeline: OrderTimelineStep[];
}
