"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, ThumbsUp, Plus, X, Check } from "lucide-react";
import { ProductReview } from "@/types";
import { useStore } from "@/context/StoreContext";

interface ReviewsListProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

export function ReviewsList({ productId, rating, reviewCount }: ReviewsListProps) {
  const { reviews, addReview } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Reviews matching this product or fallback general reviews
  const productReviews = reviews.filter((r) => r.productId === productId);
  const displayReviews = productReviews.length > 0 ? productReviews : reviews.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    addReview({
      productId,
      author: authorName,
      rating: newRating,
      title: title || "Outstanding quality",
      comment,
      verified: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowAddModal(false);
      setAuthorName("");
      setTitle("");
      setComment("");
    }, 1500);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Rating Breakdown Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-zinc-900/40 border border-white/5">
        <div className="flex items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="font-serif text-5xl font-light text-white">{rating.toFixed(1)}</span>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-gold my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider">
              BASED ON {reviewCount} VERIFIED REVIEWS
            </span>
          </div>

          <div className="hidden md:block h-16 w-[1px] bg-white/10" />

          {/* Breakdown bars */}
          <div className="hidden md:flex flex-col gap-1 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span>5★</span>
              <div className="w-32 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[88%]" />
              </div>
              <span className="font-mono">88%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>4★</span>
              <div className="w-32 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[10%]" />
              </div>
              <span className="font-mono">10%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>3★</span>
              <div className="w-32 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gold h-full w-[2%]" />
              </div>
              <span className="font-mono">2%</span>
            </div>
          </div>
        </div>

        {/* Write a review button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-zinc-900 hover:bg-gold text-zinc-200 hover:text-black border border-white/10 hover:border-gold text-xs uppercase tracking-widest font-semibold transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {displayReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 bg-zinc-900/20 border border-white/5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-gold/30 flex items-center justify-center font-serif text-xs text-gold">
                  {rev.author[0]}
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-zinc-500 font-mono">{rev.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-gold">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>

            {/* Title & Comment */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wide mb-1">
                {rev.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {rev.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 p-6 text-white overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="font-serif text-lg tracking-wider uppercase">
                WRITE A REVIEW
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center text-emerald-400 space-y-2">
                <Check className="w-8 h-8 mx-auto" />
                <p className="font-serif text-lg text-white">Thank you for your feedback!</p>
                <p className="text-xs text-zinc-400">Your review will appear immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Star rating selector */}
                <div>
                  <label className="block uppercase tracking-wider text-zinc-400 mb-1.5">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewRating(num)}
                        className="p-1 text-gold"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            newRating >= num ? "fill-gold text-gold" : "text-zinc-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-zinc-400 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Subham Roy"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-zinc-400 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Exceeded my expectations!"
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-zinc-400 mb-1">
                    Your Honest Experience *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe craftsmanship, fit, longevity, delivery..."
                    className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-gold resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gold hover:bg-gold-light text-black font-semibold text-xs tracking-widest uppercase transition"
                  >
                    SUBMIT VERIFIED REVIEW
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
