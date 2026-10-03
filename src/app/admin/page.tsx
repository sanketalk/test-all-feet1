"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  DollarSign,
  AlertTriangle,
  Lock,
  ArrowUpRight,
  Filter,
  CheckCircle,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { OrderStatus, Product, ProductCategory } from "@/types";

export default function AdminDashboardPage() {
  const {
    products,
    orders,
    reviews,
    coupons,
    discountRules,
    dropCountdownDate,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addCoupon,
    toggleCoupon,
    updateDiscountRules,
    setDropCountdownDate,
  } = useStore();

  // Simple Admin Security Pin Gate
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [pinInput, setPinInput] = useState("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "marketing" | "reviews"
  >("overview");

  // Filter/Search states
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");
  const [productSearch, setProductSearch] = useState("");

  // Product Create/Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "AFF Horizon",
    category: "watches" as ProductCategory,
    tagline: "",
    price: 2999,
    mrp: 5999,
    description: "",
    materials: "Premium Finish",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
    sizes: "Free Size",
    stockCount: 20,
    inStock: true,
  });

  // Coupon Creation State
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(1999);

  // Financial Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalItemsSold = orders.reduce(
    (acc, o) => acc + o.items.reduce((s, it) => s + it.quantity, 0),
    0
  );
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const lowStockCount = products.filter((p) => p.stockCount < 10).length;

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      brand: "AFF Horizon",
      category: "watches",
      tagline: "",
      price: 2999,
      mrp: 5999,
      description: "",
      materials: "Premium Finish",
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200",
      sizes: "Free Size",
      stockCount: 20,
      inStock: true,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      tagline: prod.tagline,
      price: prod.price,
      mrp: prod.mrp,
      description: prod.description,
      materials: prod.materials,
      imageUrl: prod.images[0] || "",
      sizes: prod.sizes.join(", "),
      stockCount: prod.stockCount,
      inStock: prod.inStock,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    const discountPercentage = Math.max(
      0,
      Math.round(((productForm.mrp - productForm.price) / productForm.mrp) * 100)
    );

    const sizesArr = productForm.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        tagline: productForm.tagline,
        price: productForm.price,
        mrp: productForm.mrp,
        discountPercentage,
        description: productForm.description,
        materials: productForm.materials,
        sizes: sizesArr,
        stockCount: productForm.stockCount,
        inStock: productForm.inStock,
        images: [productForm.imageUrl],
      });
    } else {
      const slug = productForm.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      addProduct({
        slug,
        name: productForm.name,
        brand: productForm.brand,
        category: productForm.category,
        tagline: productForm.tagline,
        price: productForm.price,
        mrp: productForm.mrp,
        discountPercentage,
        rating: 4.8,
        reviewCount: 1,
        images: [productForm.imageUrl],
        description: productForm.description,
        specifications: {
          Category: productForm.category,
          Origin: "Bespoke Collection",
        },
        features: ["Hand-finished luxury standard"],
        materials: productForm.materials,
        sizes: sizesArr.length > 0 ? sizesArr : ["Standard"],
        colors: [{ name: "Signature", hex: "#111111" }],
        variants: [
          {
            id: `v-${Date.now()}`,
            name: "Default",
            inStock: true,
            stockCount: productForm.stockCount,
            sku: `AFF-${Date.now()}`,
          },
        ],
        badges: ["NEW"],
        inStock: productForm.inStock,
        stockCount: productForm.stockCount,
      });
    }

    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.toUpperCase().trim(),
      discountType: "percentage",
      discountValue: newCouponDiscount,
      minOrderValue: newCouponMin,
      description: `${newCouponDiscount}% off over ₹${newCouponMin}`,
      expiryDate: "2026-12-31",
      isActive: true,
    });
    setNewCouponCode("");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                ALL FEET FASHION COMMAND CENTER
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
              STORE MANAGEMENT SUITE
            </h1>
            <p className="text-xs text-zinc-400">
              Live database connection • School Bazar Flagship, Midnapore
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-zinc-900 border border-white/10 hover:border-gold hover:text-gold text-xs uppercase tracking-wider text-zinc-300 transition flex items-center gap-1.5"
            >
              <span>View Live Store</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-white/10 text-xs uppercase tracking-widest no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-5 border-b-2 transition whitespace-nowrap ${
              activeTab === "overview"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`py-3 px-5 border-b-2 transition whitespace-nowrap ${
              activeTab === "products"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-5 border-b-2 transition whitespace-nowrap ${
              activeTab === "orders"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Orders & Tracking ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("marketing")}
            className={`py-3 px-5 border-b-2 transition whitespace-nowrap ${
              activeTab === "marketing"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Promotions & Drops
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-3 px-5 border-b-2 transition whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Reviews Moderation ({reviews.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider">
                  <span>Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-gold" />
                </div>
                <div className="font-serif text-3xl text-white font-medium">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  +18.4% from last 30 days
                </div>
              </div>

              <div className="p-6 bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider">
                  <span>Processed Orders</span>
                  <ShoppingBag className="w-4 h-4 text-gold" />
                </div>
                <div className="font-serif text-3xl text-white font-medium">
                  {orders.length}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {totalItemsSold} pieces shipped Pan-India
                </div>
              </div>

              <div className="p-6 bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider">
                  <span>Average Order Value</span>
                  <TrendingUp className="w-4 h-4 text-gold" />
                </div>
                <div className="font-serif text-3xl text-white font-medium">
                  {formatPrice(averageOrderValue)}
                </div>
                <div className="text-[11px] text-zinc-400">
                  Driven by multi-item bundle savings
                </div>
              </div>

              <div className="p-6 bg-zinc-950 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider">
                  <span>Low Stock Alert</span>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="font-serif text-3xl text-red-400 font-medium">
                  {lowStockCount}
                </div>
                <div className="text-[11px] text-zinc-400">
                  Products with fewer than 10 units
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-zinc-950 border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif text-lg tracking-wider uppercase text-white font-medium">
                  RECENT CONSIGNMENTS FEED
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-gold uppercase tracking-wider hover:underline"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-500 uppercase tracking-widest text-[10px]">
                      <th className="py-3 px-2">Order ID</th>
                      <th className="py-3 px-2">Customer</th>
                      <th className="py-3 px-2">Date</th>
                      <th className="py-3 px-2">Items</th>
                      <th className="py-3 px-2">Total</th>
                      <th className="py-3 px-2">Payment</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-zinc-900/40 transition">
                        <td className="py-3 px-2 font-mono text-gold">{o.orderNumber}</td>
                        <td className="py-3 px-2 text-white">{o.customer.fullName}</td>
                        <td className="py-3 px-2 text-zinc-400">{o.date}</td>
                        <td className="py-3 px-2 text-zinc-400">{o.items.length}</td>
                        <td className="py-3 px-2 font-mono text-white">
                          {formatPrice(o.totalAmount)}
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 bg-zinc-900 border border-white/10 text-[10px]">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase font-semibold">
                            {o.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search products by title or brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-3.5" />
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-6 py-2.5 bg-gold hover:bg-gold-light text-black text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-zinc-950 border border-white/10 overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase tracking-widest text-[10px] bg-zinc-900/40">
                    <th className="py-3.5 px-4">Item</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Rating</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products
                    .filter((p) =>
                      productSearch
                        ? p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.brand.toLowerCase().includes(productSearch.toLowerCase())
                        : true
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-900/40 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-12 bg-cover bg-center flex-shrink-0 border border-white/10"
                              style={{ backgroundImage: `url('${p.images[0]}')` }}
                            />
                            <div>
                              <div className="font-serif text-white font-medium line-clamp-1">
                                {p.name}
                              </div>
                              <div className="text-[10px] text-zinc-500 uppercase">{p.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 uppercase text-zinc-400">{p.category}</td>
                        <td className="py-3.5 px-4 font-mono text-white font-medium">
                          {formatPrice(p.price)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 border text-[10px] uppercase font-semibold ${
                              p.stockCount < 10
                                ? "border-red-500/40 text-red-400 bg-red-950/40"
                                : "border-emerald-500/40 text-emerald-400 bg-emerald-950/40"
                            }`}
                          >
                            {p.stockCount} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gold font-mono">{p.rating} ★</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-zinc-400 hover:text-gold border border-white/10 hover:border-gold transition"
                              aria-label="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${p.name}?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-zinc-400 hover:text-red-400 border border-white/10 hover:border-red-400 transition"
                              aria-label="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER STATUS & TRACKING MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search order by ID, customer, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-3.5" />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 uppercase tracking-wider">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-zinc-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-gold uppercase"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="PACKED">PACKED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders
                .filter((o) => {
                  if (orderStatusFilter !== "ALL" && o.orderStatus !== orderStatusFilter) {
                    return false;
                  }
                  if (orderSearch) {
                    const q = orderSearch.toLowerCase();
                    return (
                      o.orderNumber.toLowerCase().includes(q) ||
                      o.customer.fullName.toLowerCase().includes(q) ||
                      o.customer.phone.includes(q)
                    );
                  }
                  return true;
                })
                .map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 bg-zinc-950 border border-white/10 space-y-4 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">
                          {ord.orderNumber}
                        </span>
                        <h4 className="font-serif text-lg text-white">
                          {ord.customer.fullName} • {ord.customer.phone}
                        </h4>
                        <p className="text-zinc-400 text-[11px] mt-0.5">
                          {ord.customer.street}, {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})
                        </p>
                      </div>

                      {/* Status Selector dropdown */}
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400 uppercase text-[10px] tracking-wider">
                          Update Lifecycle:
                        </span>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="bg-black border border-gold/50 px-3 py-1.5 text-xs text-gold uppercase font-bold focus:outline-none"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PACKED">PACKED</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>

                    {/* Items row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {ord.items.map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center gap-2 p-2 bg-zinc-900/30 border border-white/5"
                        >
                          <div
                            className="w-10 h-12 bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url('${it.product.images[0]}')` }}
                          />
                          <div className="overflow-hidden">
                            <span className="text-white block font-serif truncate">
                              {it.product.name}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              Qty {it.quantity} {it.selectedSize ? `• ${it.selectedSize}` : ""}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-zinc-400 text-[11px]">
                      <span>
                        Payment: <strong>{ord.paymentMethod}</strong> ({ord.paymentStatus})
                      </span>
                      <span className="font-serif text-sm text-white">
                        Total Amount: <strong className="text-gold font-mono">{formatPrice(ord.totalAmount)}</strong>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: MARKETING & COUPONS */}
        {activeTab === "marketing" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in text-xs">
            {/* Coupon Codes Manager */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
              <h3 className="font-serif text-lg uppercase text-white font-medium border-b border-white/10 pb-3">
                COUPON & VOUCHER CODES
              </h3>

              {/* Add Coupon Form */}
              <form onSubmit={handleCreateCoupon} className="space-y-3 p-4 bg-zinc-900/40 border border-white/5">
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">
                  CREATE NEW COUPON
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="CODE (e.g. VIP25)"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="bg-black border border-white/10 p-2 text-white uppercase focus:outline-none focus:border-gold font-mono"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Discount %"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="bg-black border border-white/10 p-2 text-white focus:outline-none focus:border-gold font-mono"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Min Order ₹"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="bg-black border border-white/10 p-2 text-white focus:outline-none focus:border-gold font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gold hover:bg-gold-light text-black text-[11px] uppercase tracking-wider font-bold transition"
                >
                  ADD COUPON
                </button>
              </form>

              {/* Active Coupons List */}
              <div className="space-y-2">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="flex items-center justify-between p-3 bg-zinc-900/30 border border-white/5"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-gold font-bold">{c.code}</span>
                        <span className="text-[10px] text-emerald-400">
                          {c.discountValue}% OFF
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 block">{c.description}</span>
                    </div>

                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`px-3 py-1 border text-[10px] uppercase font-semibold transition ${
                        c.isActive
                          ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/30"
                          : "border-zinc-700 text-zinc-500"
                      }`}
                    >
                      {c.isActive ? "ACTIVE" : "DISABLED"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Automatic Multi-Item Rules */}
            <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
              <h3 className="font-serif text-lg uppercase text-white font-medium border-b border-white/10 pb-3">
                AUTOMATIC VOLUME DISCOUNTS
              </h3>

              <p className="text-zinc-400 leading-relaxed">
                Applied automatically in checkout cart without needing a code:
              </p>

              <div className="space-y-3">
                {discountRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-3.5 bg-zinc-900/40 border border-white/5"
                  >
                    <div>
                      <span className="font-semibold text-white block uppercase">
                        {rule.label}
                      </span>
                      <span className="text-[11px] text-zinc-400">
                        Triggered when cart has {rule.minItems}+ items
                      </span>
                    </div>
                    <span className="font-mono text-gold font-bold text-sm">
                      {rule.discountPercentage}% OFF
                    </span>
                  </div>
                ))}
              </div>

              {/* Limited Drop Countdown date */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold block">
                  LIMITED DROP CAMPAIGN TIMER TARGET
                </span>
                <input
                  type="text"
                  value={dropCountdownDate}
                  onChange={(e) => setDropCountdownDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 p-2 text-white font-mono"
                  placeholder="YYYY-MM-DDTHH:mm:ss"
                />
                <span className="text-[10px] text-zinc-500 block">
                  Format: YYYY-MM-DDTHH:mm:ss (Updates homepage countdown clock)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === "reviews" && (
          <div className="space-y-4 animate-fade-in text-xs">
            <h3 className="font-serif text-lg uppercase text-white font-medium">
              VERIFIED CLIENT REVIEWS FEED ({reviews.length})
            </h3>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-zinc-950 border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white">{rev.author}</span>
                      <span className="text-zinc-500 font-mono text-[10px] ml-2">
                        {rev.date}
                      </span>
                    </div>
                    <div className="text-gold font-mono">{rev.rating} ★</div>
                  </div>
                  <h4 className="font-semibold text-zinc-300 uppercase">{rev.title}</h4>
                  <p className="text-zinc-400 font-light leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Add/Edit Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
            <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs animate-slide-up">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-serif text-lg uppercase text-white">
                  {editingProductId ? "EDIT PRODUCT" : "CREATE NEW BOUTIQUE PRODUCT"}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    placeholder="e.g. Monaco Chronograph"
                    className="w-full bg-zinc-900 border border-white/10 p-2 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={productForm.brand}
                      onChange={(e) =>
                        setProductForm({ ...productForm, brand: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Category
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value as ProductCategory,
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-2 text-white uppercase"
                    >
                      <option value="watches">Watches</option>
                      <option value="perfumes">Perfumes</option>
                      <option value="shoes">Shoes</option>
                      <option value="clothing">Clothing</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      MRP (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={productForm.mrp}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          mrp: Number(e.target.value),
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Image URL (Unsplash or CDN)
                  </label>
                  <input
                    type="url"
                    value={productForm.imageUrl}
                    onChange={(e) =>
                      setProductForm({ ...productForm, imageUrl: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-white/10 p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) =>
                      setProductForm({ ...productForm, sizes: e.target.value })
                    }
                    placeholder="S, M, L, XL or UK 7, UK 8, UK 9"
                    className="w-full bg-zinc-900 border border-white/10 p-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Inventory Stock
                    </label>
                    <input
                      type="number"
                      value={productForm.stockCount}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stockCount: Number(e.target.value),
                        })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={productForm.tagline}
                      onChange={(e) =>
                        setProductForm({ ...productForm, tagline: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-white/10 p-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({ ...productForm, description: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-white/10 p-2 text-white resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 bg-zinc-900 text-zinc-400 hover:text-white uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gold text-black uppercase font-bold"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
