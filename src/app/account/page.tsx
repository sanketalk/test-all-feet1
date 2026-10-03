"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Mail,
  Lock,
  Phone,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const { orders } = useStore();

  // Authentication Mock Simulation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "otp">("login");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Active tab in account
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile">(
    "orders"
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone) {
      setIsLoggedIn(true);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length >= 4) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#080808] text-white font-sans pt-12 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-zinc-950 border border-white/10 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto bg-black text-gold">
              <User className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-light text-white tracking-wide">
              {authMode === "login"
                ? "CLIENT SIGN IN"
                : authMode === "register"
                ? "JOIN THE ATELIER"
                : "OTP LOGIN"}
            </h1>
            <p className="text-xs text-zinc-400">
              Access your bespoke orders, saved measurements, and private drops.
            </p>
          </div>

          {/* Toggle between Login, Register, OTP */}
          <div className="flex border border-white/10 text-xs uppercase tracking-wider text-center">
            <button
              onClick={() => {
                setAuthMode("login");
                setOtpSent(false);
              }}
              className={`flex-1 py-2 transition ${
                authMode === "login"
                  ? "bg-gold text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setOtpSent(false);
              }}
              className={`flex-1 py-2 transition ${
                authMode === "register"
                  ? "bg-gold text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => {
                setAuthMode("otp");
                setOtpSent(false);
              }}
              className={`flex-1 py-2 transition ${
                authMode === "otp"
                  ? "bg-gold text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Phone OTP
            </button>
          </div>

          {/* OTP Mode */}
          {authMode === "otp" ? (
            otpSent ? (
              <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Enter 4-Digit SMS Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="1 2 3 4"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-center text-lg text-white font-mono tracking-widest focus:outline-none focus:border-gold"
                  />
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Demo OTP: Enter any 4 numbers (e.g. 1234)
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition"
                >
                  VERIFY & ENTER
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="e.g. 9382107724"
                    className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition"
                >
                  REQUEST ONE-TIME CODE
                </button>
              </form>
            )
          ) : (
            /* Email & Password Mode */
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                  Email Address or Mobile *
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-zinc-400 uppercase tracking-wider">
                    Password *
                  </label>
                  {authMode === "login" && (
                    <button
                      type="button"
                      onClick={() => alert("Password reset link simulated to your inbox.")}
                      className="text-zinc-500 hover:text-gold text-[10px]"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition shadow-xl"
              >
                {authMode === "login" ? "ENTER ACCOUNT" : "CREATE PRIVILEGED ACCOUNT"}
              </button>
            </form>
          )}

          {/* Social login divider */}
          <div className="pt-2 border-t border-white/10 text-center">
            <button
              onClick={() => {
                setEmailOrPhone("google.user@allfeet.in");
                setIsLoggedIn(true);
              }}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-xs border border-white/10 text-zinc-300 transition flex items-center justify-center gap-2"
            >
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              CLIENT PORTAL
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-light">
              WELCOME BACK, SUBHAM
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Member Tier: <strong>VIP All Feet Patron</strong> • Joined 2026
            </p>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-xs uppercase tracking-wider text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 text-xs uppercase tracking-widest mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-6 border-b-2 transition ${
              activeTab === "orders"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`py-3 px-6 border-b-2 transition ${
              activeTab === "addresses"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Saved Addresses (1)
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-6 border-b-2 transition ${
              activeTab === "profile"
                ? "border-gold text-gold font-semibold"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Profile & Security
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-16 text-center bg-zinc-950 border border-white/5 space-y-3">
                <Package className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="font-serif text-xl">No Previous Orders</h3>
                <p className="text-xs text-zinc-400">You haven’t placed an order yet.</p>
                <Link
                  href="/shop"
                  className="px-6 py-2 bg-gold text-black text-xs uppercase tracking-widest font-semibold inline-block"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-6 bg-zinc-950 border border-white/10 space-y-4 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/5 gap-2">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                        ORDER #{ord.orderNumber} • {ord.date}
                      </span>
                      <div className="text-sm font-serif text-white font-medium">
                        Total: {formatPrice(ord.totalAmount)} ({ord.items.length} items)
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-gold/10 border border-gold/30 text-gold uppercase tracking-wider font-semibold text-[10px]">
                        {ord.orderStatus}
                      </span>
                      <Link
                        href={`/track-order?id=${ord.orderNumber}`}
                        className="text-gold hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Track Consignment</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ord.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center gap-3 p-2 bg-zinc-900/40 border border-white/5"
                      >
                        <div
                          className="w-12 h-14 bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url('${it.product.images[0]}')` }}
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-serif text-white truncate">{it.product.name}</h4>
                          <span className="text-[10px] text-zinc-400 block">
                            Qty: {it.quantity} {it.selectedSize ? `• ${it.selectedSize}` : ""}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-300">
                            {formatPrice(it.unitPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-6 bg-zinc-950 border border-gold/40 relative space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-gold font-bold">
                DEFAULT PRIMARY ADDRESS
              </span>
              <h3 className="font-serif text-base text-white">Subham Roy</h3>
              <p className="text-zinc-400 leading-relaxed">
                Bibigunj, School Bazar Chawk <br />
                Near Green Valley <br />
                Midnapore, West Bengal — 721101
              </p>
              <div className="text-zinc-400 font-mono pt-1">+91 9382107724</div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-xl p-6 bg-zinc-950 border border-white/10 space-y-4 text-xs">
            <h3 className="font-serif text-lg uppercase text-white font-medium mb-2">
              PERSONAL CREDENTIALS
            </h3>
            <div>
              <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                Client Name
              </label>
              <input
                type="text"
                defaultValue="Subham Roy"
                className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="subham@allfeet.in"
                className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                Helpline / WhatsApp
              </label>
              <input
                type="tel"
                defaultValue="+91 9382107724"
                className="w-full bg-zinc-900 border border-white/10 px-3.5 py-2 text-white font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
