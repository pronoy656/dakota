'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  MessageSquarePlus, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Flame, 
  X, 
  MapPin, 
  ChevronDown, 
  Award,
  Layers,
  ArrowRight,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { Review, REVIEWS, PRODUCTS } from '@/data/storeData';

export default function CustomerReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'rating'>('helpful');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    REVIEWS.forEach(r => {
      counts[r.id] = r.likes || 12;
    });
    return counts;
  });
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New review form state
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formAuthor, setFormAuthor] = useState<string>('');
  const [formRole, setFormRole] = useState<string>('Apparel Decorator');
  const [formCity, setFormCity] = useState<string>('');
  const [formProvince, setFormProvince] = useState<string>('ON');
  const [formProduct, setFormProduct] = useState<string>('Build Your Custom DTF Gang Sheet');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formBody, setFormBody] = useState<string>('');
  const [formCategory, setFormCategory] = useState<string>('gang-sheet');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Upvote / Like toggle
  const handleToggleLike = (id: string) => {
    setLikedReviews(prev => {
      const isLiked = !!prev[id];
      const newLiked = !isLiked;
      setLikesCount(prevCounts => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) + (newLiked ? 1 : -1)
      }));
      return { ...prev, [id]: newLiked };
    });
  };

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviewsList.filter(rev => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'gang-sheet' && rev.category !== 'gang-sheet') return false;
        if (selectedCategory === 'ready-to-press' && rev.category !== 'ready-to-press') return false;
        if (selectedCategory === 'durability' && rev.category !== 'durability') return false;
        if (selectedCategory === 'shipping' && rev.category !== 'shipping') return false;
        if (selectedCategory === 'apparel' && rev.category !== 'apparel') return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = rev.title.toLowerCase().includes(query);
        const matchBody = rev.body.toLowerCase().includes(query);
        const matchAuthor = rev.author.toLowerCase().includes(query);
        const matchLocation = rev.location.toLowerCase().includes(query);
        const matchProduct = (rev.productTitle || '').toLowerCase().includes(query);
        const matchRole = (rev.role || '').toLowerCase().includes(query);
        if (!matchTitle && !matchBody && !matchAuthor && !matchLocation && !matchProduct && !matchRole) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'helpful') {
        const aLikes = likesCount[a.id] || 0;
        const bLikes = likesCount[b.id] || 0;
        return bLikes - aLikes;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // Default/Recent
    });
  }, [reviewsList, selectedCategory, searchQuery, sortBy, likesCount]);

  // Handle Review Submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formTitle.trim() || !formBody.trim()) {
      showToast('⚠️ Please fill out all required fields before submitting.');
      return;
    }

    const initials = formAuthor.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CU';
    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      author: formAuthor.trim(),
      role: formRole.trim(),
      location: `${formCity.trim() || 'Ontario'}, ${formProvince}`,
      province: formProvince,
      rating: formRating,
      date: 'Just now',
      title: formTitle.trim(),
      body: formBody.trim(),
      verified: true,
      productTitle: formProduct,
      category: formCategory,
      likes: 1,
      badge: 'Verified Canadian Customer',
      avatarColor: 'from-emerald-600 to-teal-600'
    };

    setReviewsList(prev => [newRev, ...prev]);
    setLikesCount(prev => ({ ...prev, [newRev.id]: 1 }));
    setIsWriteModalOpen(false);
    showToast('🎉 Thank you! Your verified review has been published.');

    // Reset Form
    setFormAuthor('');
    setFormCity('');
    setFormTitle('');
    setFormBody('');
    setFormRating(5);
  };

  const getInitials = (author: string) => {
    const parts = author.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return author.substring(0, 2).toUpperCase();
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: reviewsList.length,
      'gang-sheet': reviewsList.filter(r => r.category === 'gang-sheet').length,
      'ready-to-press': reviewsList.filter(r => r.category === 'ready-to-press').length,
      durability: reviewsList.filter(r => r.category === 'durability').length,
      shipping: reviewsList.filter(r => r.category === 'shipping').length,
    };
    return counts;
  }, [reviewsList]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="customer-reviews-section">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 backdrop-blur-xl border border-emerald-500/40 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 text-sm font-bold animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Persona Title */}
      <div className="text-center space-y-3 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-xs font-black tracking-wide uppercase shadow-xs">
          <span>🇨🇦</span>
          <span>Verified Canadian Customer Reviews</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-heading">
          Trusted by <span className="text-red-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#ef4444] dark:via-orange-400 dark:to-amber-400">1,200+ Canadian Brands</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Real feedback from apparel decorators, commercial print shops, and boutique crafters across Ontario and Canada.
        </p>
      </div>

      {/* Sleek Minimalist Rating & Action Summary Bar */}
      <div className="bg-white dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 hover:border-red-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both relative overflow-hidden group/summary">
        {/* Subtle Shine Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 dark:via-white/5 to-transparent group-hover/summary:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-heading">4.98</span>
            <div className="space-y-0.5 text-left">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                Overall Quality Rating
              </span>
            </div>
          </div>

          <div className="hidden sm:block h-10 w-px bg-slate-200 dark:bg-white/10" />

          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-extrabold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>1,250+ Verified Orders Delivered</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              98% of customers rate our DTF transfers 5 stars for wash durability &amp; vibrant color.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center sm:justify-end">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-red-600/25 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>

          <Link
            href="/products/gang-sheet-builder"
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-extrabold text-xs rounded-2xl border border-slate-200 dark:border-white/10 flex items-center space-x-1.5 transition-all text-center"
          >
            <span>Build Gang Sheet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Interactive Filter Chips & Search Bar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center space-x-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>All Reviews</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}>
                {categoryCounts.all}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('gang-sheet')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center space-x-1.5 ${
                selectedCategory === 'gang-sheet'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Gang Sheets</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'gang-sheet' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}>
                {categoryCounts['gang-sheet']}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('ready-to-press')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center space-x-1.5 ${
                selectedCategory === 'ready-to-press'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Ready-to-Press</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'ready-to-press' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}>
                {categoryCounts['ready-to-press']}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('durability')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center space-x-1.5 ${
                selectedCategory === 'durability'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Wash &amp; Durability</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'durability' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}>
                {categoryCounts.durability}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('shipping')}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center space-x-1.5 ${
                selectedCategory === 'shipping'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Ontario Shipping</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'shipping' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
              }`}>
                {categoryCounts.shipping}
              </span>
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort customer reviews"
                className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl text-xs text-slate-900 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold cursor-pointer"
              >
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
                <option value="recent">Most Recent</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-950/80 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No customer reviews found matching &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {filteredReviews.slice(0, visibleCount).map((rev, idx) => {
            const isLiked = !!likedReviews[rev.id];
            const currentLikes = likesCount[rev.id] || (rev.likes || 12);
            const initials = getInitials(rev.author);

            return (
              <div 
                key={rev.id} 
                className="relative group animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${(idx % 6) * 100}ms` }}
              >
                <div className="bg-gradient-to-b from-white to-slate-50 dark:from-[#0d121c] dark:to-[#090d14] rounded-3xl p-7 sm:p-8 border border-slate-200/80 dark:border-white/[0.08] transition-all duration-300 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.4)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] hover:-translate-y-1 relative overflow-hidden h-full z-10 flex flex-col justify-between">
                  {/* Subtle Quotation Mark Watermark */}
                  <div className="absolute top-2 right-4 text-9xl text-slate-100 dark:text-white/[0.015] font-serif leading-none select-none pointer-events-none transition-colors duration-500 z-0 opacity-60">
                    &quot;
                  </div>

                  <div className="relative z-10 flex flex-col h-full space-y-6">
                    {/* Top: Avatar, Name & Stars */}
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="w-11 h-11 rounded-2xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white dark:text-slate-300 font-black text-sm shrink-0 border border-slate-200 dark:border-white/10 shadow-xs">
                        {initials}
                      </div>
                      
                      {/* Name & Stars */}
                      <div className="space-y-1">
                        <strong className="text-[15px] font-black text-slate-900 dark:text-white leading-none block tracking-tight">
                          {rev.author}
                        </strong>
                        <div className="flex items-center space-x-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Review Content */}
                    <div className="space-y-2 flex-1 pt-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-[15px] leading-snug tracking-tight">
                        &quot;{rev.title}&quot;
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {rev.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Expand / Load More Button */}
      {filteredReviews.length > visibleCount && (
        <div className="text-center pt-8">
          <div className="relative inline-flex rounded-2xl overflow-hidden p-[2px] group shadow-lg hover:shadow-red-500/20 transition-shadow duration-300">
            {/* Spinning Gradient Border Layer */}
            <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ef4444_0%,#f59e0b_50%,#ef4444_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button Content */}
            <button
              onClick={() => setVisibleCount(filteredReviews.length)}
              className="relative w-full h-full px-8 py-3.5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-900 dark:text-white font-extrabold text-xs rounded-[14px] transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span>Show All {filteredReviews.length} Canadian Reviews</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WRITE A REVIEW MODAL                                                      */}
      {/* ========================================================================= */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            onClick={() => setIsWriteModalOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative bg-slate-900 dark:bg-slate-900 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-400 block mb-1">
                  Customer Testimonial
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white dark:text-white light:text-slate-900 font-heading">
                  Write a Customer Review
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                aria-label="Close review modal"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 dark:bg-white/5 light:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star Rating Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = (formHoverRating || formRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setFormHoverRating(star)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              isActive 
                                ? 'fill-amber-400 text-amber-400 drop-shadow-md' 
                                : 'text-slate-600 dark:text-slate-600 light:text-slate-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-amber-400 ml-2">
                    {formRating === 5 && '🌟 Exceptional (5/5)'}
                    {formRating === 4 && '👍 Very Good (4/5)'}
                    {formRating === 3 && '👌 Good (3/5)'}
                    {formRating === 2 && '👎 Fair (2/5)'}
                    {formRating === 1 && '⚠️ Needs Improvement (1/5)'}
                  </span>
                </div>
              </div>

              {/* Author Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                    Your Name or Business <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica M. / Apex Prints"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                    Customer Role / Persona
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    aria-label="Customer role or business persona"
                    className="w-full px-3.5 py-2.5 bg-slate-800 dark:bg-slate-800 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="Screen Print Shop Owner">Screen Print Shop Owner</option>
                    <option value="Streetwear Brand Founder">Streetwear Brand Founder</option>
                    <option value="Apparel Decorator">Apparel Decorator</option>
                    <option value="Etsy Creator & Merch Crafter">Etsy Creator & Merch Crafter</option>
                    <option value="Commercial DTG Studio">Commercial DTG Studio</option>
                    <option value="Sports Team Merchandiser">Sports Team Merchandiser</option>
                  </select>
                </div>
              </div>

              {/* Location: City & Province */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                    City (e.g. Toronto)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. London"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                    Province
                  </label>
                  <select
                    value={formProvince}
                    onChange={(e) => setFormProvince(e.target.value)}
                    aria-label="Canadian province or territory"
                    className="w-full px-3.5 py-2.5 bg-slate-800 dark:bg-slate-800 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="ON">Ontario (ON)</option>
                    <option value="BC">British Columbia (BC)</option>
                    <option value="AB">Alberta (AB)</option>
                    <option value="QC">Quebec (QC)</option>
                    <option value="MB">Manitoba (MB)</option>
                    <option value="SK">Saskatchewan (SK)</option>
                    <option value="NS">Nova Scotia (NS)</option>
                    <option value="NB">New Brunswick (NB)</option>
                  </select>
                </div>
              </div>

              {/* Product Purchased */}
              <div>
                <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Product / Service Ordered
                </label>
                <select
                  value={formProduct}
                  onChange={(e) => {
                    setFormProduct(e.target.value);
                    if (e.target.value.includes('Gang Sheet')) setFormCategory('gang-sheet');
                    else if (e.target.value.includes('Camp') || e.target.value.includes('Ready')) setFormCategory('ready-to-press');
                    else setFormCategory('apparel');
                  }}
                  aria-label="Select product or service ordered"
                  className="w-full px-3.5 py-2.5 bg-slate-800 dark:bg-slate-800 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Build Your Custom DTF Gang Sheet">Build Your Custom DTF Gang Sheet (22&quot; Wide)</option>
                  <option value="Upload Your Custom DTF Gang Sheet">Upload Your Custom DTF Gang Sheet</option>
                  <option value="Rolling Gang Sheet Builder">Rolling Continuous Gang Sheet Builder</option>
                  <option value="Camp Life Leopard Print Camper Mountain Sunset">Ready-to-Press Camp Life Design</option>
                  <option value="Custom Heavy Cotton Crewneck T-Shirt">Custom Heavy Cotton Crewneck T-Shirt</option>
                  <option value="Custom Fleece Pullover Hoodie">Custom Fleece Pullover Hoodie</option>
                </select>
              </div>

              {/* Review Title */}
              <div>
                <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Review Headline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phenomenal opacity on black hoodies!"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Review Body */}
              <div>
                <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1">
                  Your Detailed Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell other Canadian printers about color vibrancy, press time, peel behavior, and wash longevity..."
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/5 dark:bg-white/5 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl text-xs text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-red-500 resize-none leading-relaxed"
                />
              </div>

              {/* Verified Buyer notice */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/30 rounded-xl flex items-center space-x-2 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Your review will be marked with the <strong>Verified Canadian Buyer</strong> trust badge.</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 dark:bg-white/5 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
