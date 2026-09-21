'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Flame, 
  Sparkles, 
  UploadCloud, 
  Layers, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  HelpCircle, 
  Shirt, 
  ChevronRight, 
  Zap, 
  Phone, 
  Search, 
  Check, 
  RotateCcw, 
  Sliders, 
  Palette, 
  Play, 
  Pause, 
  RefreshCw,
  Maximize2,
  FileCheck,
  CheckCheck,
  Info,
  Printer,
  Sun,
  Moon,
  Eye,
  Package,
  Monitor
} from 'lucide-react';
import { PRODUCTS, COLLECTIONS, REVIEWS, FAQS, FABRICS_LIST, STORE_INFO, GANG_SHEET_SIZES } from '@/data/storeData';
import ProductCard from '@/components/ProductCard';
import CustomerReviewsSection from '@/components/CustomerReviewsSection';
import { useCurrency } from '@/context/CurrencyContext';

export default function HomePage() {
  const { formatPrice } = useCurrency();
  const [heroTab, setHeroTab] = useState<'printer' | 'apparel' | 'estimator' | 'upload'>('printer');
  const [apparelMode, setApparelMode] = useState<'dark' | 'light'>('dark');
  const [quickEstimatorHeight, setQuickEstimatorHeight] = useState(24);
  const [selectedFabricIndex, setSelectedFabricIndex] = useState(0);
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const bestSellingTransfers = PRODUCTS.filter((p) => p.category === 'ready-to-press');
  const gangSheetProducts = PRODUCTS.filter((p) => p.category === 'gang-sheet');

  const selectedSizeObj = GANG_SHEET_SIZES.find((s) => s.height === quickEstimatorHeight) || GANG_SHEET_SIZES[1];
  const estimatedPrice = selectedSizeObj.price;
  const sqInches = 22 * quickEstimatorHeight;
  const pricePerSqInch = (estimatedPrice / sqInches).toFixed(3);

  // Filter FAQs by category
  const filteredFaqs = FAQS.filter((faq) => {
    return faqCategory === 'all' || faq.category.toLowerCase().includes(faqCategory.toLowerCase());
  });

  const marqueeItems = [
    '🍁 PROUDLY PRINTED IN SOUTHWOLD, ONTARIO',
    '⚡ 24-48H ULTRA-FAST PRODUCTION DISPATCH',
    '🎯 300 DPI JAPANESE PIGMENT INKS',
    '💎 50+ INDUSTRIAL WASH CYCLE DURABILITY',
    '🔥 12-SECOND HEAT PRESS & CRISP COLD PEEL',
    '🛡️ OEKO-TEX® ECO-CERTIFIED INKS',
    '📦 FREE EXPRESS SHIPPING OVER $150 CAD',
    '✨ NO MINIMUM ORDER QUANTITY',
  ];

  return (
    <div className="flex flex-col space-y-24 sm:space-y-32 pb-24 overflow-hidden bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION - ULTRA-PREMIUM EDITORIAL STUDIO WITH VISUAL DECK        */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-studio-grid">
        {/* Radiant Ambient Glow Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-red-600/15 via-rose-600/5 to-transparent rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-48 right-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 pt-4 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="text-center lg:text-left space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold shadow-sm backdrop-blur-xl transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-slate-900 dark:text-slate-200 tracking-wide">Ontario Facility Active</span>
                <span className="text-slate-300 dark:text-white/20">|</span>
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400 shrink-0" />
                  4.98/5 Rating
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight text-slate-950 dark:text-white leading-[1.05] font-heading">
                  Ultra-Vibrant <span className="text-red-600 dark:text-red-500">DTF Transfers</span> <br className="hidden sm:block" />
                  &amp; Gang Sheets
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Commercial-grade 300 DPI Japanese pigment inks with a high-density white underbase. 
                  <span className="text-slate-900 dark:text-slate-200 font-bold block mt-2">
                    50+ wash durability • Zero setup fees • 24–48h fast dispatch.
                  </span>
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/products/gang-sheet-builder"
                  className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2.5 group"
                >
                  <Flame className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
                  <span>Build Gang Sheet</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/products/upload-your-custom-dtf-gang-sheet"
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-white border border-slate-200 dark:border-white/10 font-bold text-sm sm:text-base rounded-2xl backdrop-blur-xl transition-all flex items-center justify-center space-x-2.5 shadow-sm"
                >
                  <UploadCloud className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span>Upload Print-Ready File</span>
                </Link>
              </div>

              {/* Trust Micro-Icons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> No Minimums</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-blue-500" /> Free Ship $150+</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-500" /> OEKO-TEX® Inks</span>
              </div>
            </div>

            {/* Right Column: 3D Circular Process Flow */}
            <div className="relative mx-auto w-full max-w-[500px] aspect-square flex flex-col lg:block mt-12 lg:mt-0">
              
              {/* Glowing Background Blob */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-red-600/20 to-emerald-600/20 rounded-full blur-[100px] pointer-events-none" />

              {/* The Circular Track (Visible on lg) */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-[3px] border-dashed border-slate-300 dark:border-slate-700 animate-[spin_40s_linear_infinite] z-0" />

              {/* Central Element */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-28 h-28 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-[0_8px_0_theme(colors.slate.200)] dark:shadow-[0_8px_0_theme(colors.slate.950)] items-center justify-center">
                 <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full shadow-inner flex items-center justify-center">
                   <Monitor className="w-8 h-8 text-slate-400 dark:text-slate-500 animate-pulse" />
                 </div>
              </div>

              {/* Process Step 1: Select Product (Top Left) */}
              <div className="relative lg:absolute lg:top-[5%] lg:left-[2%] z-10 w-full lg:w-[200px] mb-4 lg:mb-0 bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.05),_0_6px_0_theme(colors.slate.200)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5),_0_6px_0_theme(colors.slate.950)] hover:-translate-y-2 hover:shadow-[0_15px_25px_rgba(0,0,0,0.1),_0_8px_0_theme(colors.slate.200)] dark:hover:shadow-[0_15px_25px_rgba(0,0,0,0.5),_0_8px_0_theme(colors.slate.950)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-xs shadow-inner shrink-0">1</div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">Product</h4>
                </div>
                <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-2xl flex items-center justify-center shadow-inner border border-blue-200/50 dark:border-blue-800/30 relative">
                   <Shirt className="w-10 h-10 text-blue-500 drop-shadow-md group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Process Step 2: Select Design (Top Right) */}
              <div className="relative lg:absolute lg:top-[5%] lg:right-[2%] z-20 w-full lg:w-[200px] mb-4 lg:mb-0 bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.05),_0_6px_0_theme(colors.slate.200)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5),_0_6px_0_theme(colors.slate.950)] hover:-translate-y-2 hover:shadow-[0_15px_25px_rgba(0,0,0,0.1),_0_8px_0_theme(colors.slate.200)] dark:hover:shadow-[0_15px_25px_rgba(0,0,0,0.5),_0_8px_0_theme(colors.slate.950)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-xs shadow-inner shrink-0">2</div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">Design</h4>
                </div>
                <div className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-2xl flex flex-col items-center justify-center shadow-inner border-2 border-dashed border-purple-200 dark:border-purple-800/50 relative">
                   <UploadCloud className="w-8 h-8 text-purple-500 mb-1 drop-shadow-md group-hover:scale-110 transition-transform" />
                   <span className="text-[9px] font-black text-purple-600/70 dark:text-purple-400/70">UPLOAD PDF</span>
                </div>
              </div>

              {/* Process Step 3: Print & Ready (Bottom Right) */}
              <div className="relative lg:absolute lg:bottom-[5%] lg:right-[2%] z-30 w-full lg:w-[200px] mb-4 lg:mb-0 bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.05),_0_6px_0_theme(colors.slate.200)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5),_0_6px_0_theme(colors.slate.950)] hover:-translate-y-2 hover:shadow-[0_15px_25px_rgba(0,0,0,0.1),_0_8px_0_theme(colors.slate.200)] dark:hover:shadow-[0_15px_25px_rgba(0,0,0,0.5),_0_8px_0_theme(colors.slate.950)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-xs shadow-inner shrink-0">3</div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">Print</h4>
                </div>
                <div className="h-20 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-2xl flex items-center justify-center shadow-inner border border-emerald-200/50 dark:border-emerald-800/30 relative overflow-hidden">
                   <Printer className="w-10 h-10 text-emerald-500 drop-shadow-md group-hover:scale-110 transition-transform z-10" />
                   <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399] animate-[pulse_1.5s_infinite] z-20" />
                </div>
              </div>

              {/* Process Step 4: Delivered (Bottom Left) */}
              <div className="relative lg:absolute lg:bottom-[5%] lg:left-[2%] z-40 w-full lg:w-[200px] bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-100 dark:border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.05),_0_6px_0_theme(colors.slate.200)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5),_0_6px_0_theme(colors.slate.950)] hover:-translate-y-2 hover:shadow-[0_15px_25px_rgba(0,0,0,0.1),_0_8px_0_theme(colors.slate.200)] dark:hover:shadow-[0_15px_25px_rgba(0,0,0,0.5),_0_8px_0_theme(colors.slate.950)] transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-inner shrink-0">4</div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">Delivered</h4>
                </div>
                <div className="h-20 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl flex items-center justify-center shadow-inner border border-amber-200 dark:border-amber-900/50 relative">
                   <Package className="w-10 h-10 text-amber-500 drop-shadow-md group-hover:scale-110 transition-transform" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHY CHOOSE HDTEES&TOPS - THE 4 PILLARS BENTO GRID                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-heading">
            Why Choose <span className="text-red-600">HDtees&amp;tops?</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered for high-volume screen printers, custom apparel brands, and crafters who demand color brilliance and longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-950/80 rounded-3xl p-7 space-y-4 flex flex-col justify-between border border-slate-200/90 dark:border-white/10 shadow-lg hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:border-red-500/40 group">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-600/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white font-heading">
                300 DPI High-Def Precision
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Japanese micro-droplet pigment inks paired with high-density white underbase deliver photo-grade saturation and 0.5pt fine line details.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-red-600 dark:text-red-400 font-bold">
              <span>Full RGB Color Gamut</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-950/80 rounded-3xl p-7 space-y-4 flex flex-col justify-between border border-slate-200/90 dark:border-white/10 shadow-lg hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/40 group">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-600/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white font-heading">
                Fast Ontario Production
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Orders are queued, printed, and cured in 24–48 hours at our Southwold, Ontario facility with express tracking across all Canadian provinces.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-bold">
              <span>24–48h Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-950/80 rounded-3xl p-7 space-y-4 flex flex-col justify-between border border-slate-200/90 dark:border-white/10 shadow-lg hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/40 group">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-600/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white font-heading">
                12s Easy Heat Press
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Press at 300°F for 10–15 seconds with effortless cold peel. No weeding, no messy screen setups, and 50+ commercial wash cycle longevity.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <span>50+ Commercial Washes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-950/80 rounded-3xl p-7 space-y-4 flex flex-col justify-between border border-slate-200/90 dark:border-white/10 shadow-lg hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl hover:border-amber-500/40 group">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-600/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-950 dark:text-white font-heading">
                Helpful Canadian Support
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct phone and email support right here in Ontario to assist with gang sheet setup, DPI validation, vector conversion, and custom orders.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold">
              <span>Southwold, ON Support</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>
      {/* ========================================================================= */}
      {/* 3. CORE CATALOG COLLECTIONS                                               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/40 px-3 py-1 rounded-full">
              Explore Our Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-heading mt-3">
              Featured DTF <span className="text-red-600">Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 font-medium leading-relaxed">
              Browse our premium selection of top-selling categories designed for professional apparel decorators, screen printers, and premium clothing brands looking for the highest quality transfers.
            </p>
          </div>
          <Link
            href="/collections"
            className="relative px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-800/60 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 overflow-hidden group flex items-center shrink-0 shadow-sm"
          >
            <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View All Categories</span>
            <ArrowRight className="relative z-10 w-4 h-4 ml-1.5 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.handle}`}
              className="bg-white dark:bg-slate-950/80 rounded-2xl overflow-hidden group border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-red-500/40 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>

              <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-transparent flex flex-col flex-1">
                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-red-600 transition-colors leading-tight">
                      {col.title}
                    </h3>
                    <span className="text-[10px] font-black bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full shrink-0 self-start sm:self-auto">
                      {col.itemCount} Items
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>
                
                <div className="pt-3 mt-auto flex items-center justify-between text-[11px] font-extrabold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors duration-300 border-t border-transparent group-hover:border-red-100 dark:group-hover:border-red-900/30">
                  <span className="flex items-center gap-1.5">
                    Explore Catalog
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "PRINT ON ANY FABRIC OR TEXTILE" LAB & PRO SPECS                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading leading-tight">
            Print On Any <br className="hidden sm:block" />
            <span className="text-red-600">Fabric or Textile</span>
          </h2>
          
          <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Unlike traditional screen printing or vinyl, our DTF transfers adhere seamlessly to virtually all textiles with <strong className="text-slate-700 font-extrabold">zero dye bleed</strong>, <strong className="text-slate-700 font-extrabold">zero cracking</strong>, and an <strong className="text-slate-700 font-extrabold">ultra-soft hand feel</strong>.
          </p>
        </div>

        <div className="space-y-8">
          {/* Interactive Fabric Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {FABRICS_LIST.map((fab, idx) => (
              <button
                key={fab.name}
                onClick={() => setSelectedFabricIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  selectedFabricIndex === idx
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-red-200 hover:text-red-600'
                }`}
              >
                {fab.name}
              </button>
            ))}
          </div>

          {/* Active Fabric Display Card with Pro Pressing Protocol & Benchmarks */}
          {(() => {
            const currentFab = FABRICS_LIST[selectedFabricIndex];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mt-8">
                {/* Left Col: Fabric Details */}
                <div className="lg:col-span-6 p-8 lg:p-12 space-y-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold tracking-wider rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Premium Quality. Maximum Versatility.
                    </div>

                    <div>
                      <h3 className="text-4xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight">
                        {currentFab.name}
                      </h3>
                      <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-lg">
                        {currentFab.desc}
                      </p>
                    </div>

                    {/* 4 Core Parameter Cards (Styled as Features) */}
                    <div className="grid grid-cols-4 gap-4 pt-6">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-500">
                           <Flame className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[11px] font-bold text-slate-900 leading-tight">Breathable<br/>&amp; Comfortable</h4>
                          <p className="text-[10px] text-slate-500">Keeps you cool<br/>all day long.</p>
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-500">
                           <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[11px] font-bold text-slate-900 leading-tight">Long-Lasting<br/>Prints</h4>
                          <p className="text-[10px] text-slate-500">Stays vibrant<br/>wash after wash.</p>
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-500">
                           <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[11px] font-bold text-slate-900 leading-tight">Soft Hand<br/>Feel</h4>
                          <p className="text-[10px] text-slate-500">Feels natural,<br/>not plastic.</p>
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-red-500">
                           <Layers className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[11px] font-bold text-slate-900 leading-tight">Perfect for<br/>Everyday Wear</h4>
                          <p className="text-[10px] text-slate-500">From casual tees<br/>to premium apparel.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty Space Filler: Satisfaction Guarantee */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50/50 rounded-2xl p-6 border border-red-100/50 flex items-center gap-5 my-auto shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-red-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Commercial Grade Guarantee</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Every transfer is rigorously lab-tested for unmatched durability, vibrant colors, and perfect adherence on all fabrics.
                      </p>
                    </div>
                  </div>

                  {/* Recommended Garment Blanks */}
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4 mt-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <Shirt className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-900 block mb-0.5">Recommended &amp; Tested Garments</span>
                        <p className="text-xs text-slate-500 font-medium">
                          {currentFab.idealBlanks}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-600 pt-2 border-t border-slate-200">
                      <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1"/> T-Shirts</span>
                      <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1"/> Hoodies</span>
                      <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1"/> Sweatshirts</span>
                      <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1"/> Polos</span>
                      <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1"/> More</span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Process & Action */}
                <div className="lg:col-span-6 bg-slate-50 relative p-8 lg:p-12 border-l border-slate-200 space-y-8 flex flex-col justify-between overflow-hidden">
                  
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-2">
                        The Process
                      </span>
                      <h4 className="text-3xl font-black text-slate-900 font-heading tracking-tight">
                        From Print to Perfection
                      </h4>
                      <p className="text-sm text-slate-500 mt-2 font-medium">
                        Advanced DTF technology ensures your designs stay vibrant, flexible and durable — on every fabric.
                      </p>
                    </div>

                    {/* Step-by-Step Pressing Roadmap */}
                    <div className="space-y-3">
                      <div className="group relative flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm overflow-hidden cursor-default">
                        <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                        <span className="relative z-10 w-7 h-7 rounded-full bg-red-50 text-red-600 group-hover:bg-white group-hover:text-red-600 transition-colors duration-300 flex items-center justify-center font-black text-xs shrink-0">1</span>
                        <div className="relative z-10">
                          <span className="font-bold text-slate-900 group-hover:text-white transition-colors duration-300 text-sm block">Pre-Press Moisture Removal</span>
                          <span className="text-slate-500 group-hover:text-black transition-colors duration-300 text-xs block mt-0.5 font-medium">{currentFab.prePress}</span>
                        </div>
                      </div>

                      <div className="group relative flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm overflow-hidden cursor-default">
                        <div className="absolute inset-0 bg-red-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                        <span className="relative z-10 w-7 h-7 rounded-full bg-red-50 text-red-600 group-hover:bg-white group-hover:text-red-600 transition-colors duration-300 flex items-center justify-center font-black text-xs shrink-0">2</span>
                        <div className="relative z-10">
                          <span className="font-bold text-slate-900 group-hover:text-white transition-colors duration-300 text-sm block">Heat Fusion Press</span>
                          <span className="text-slate-500 group-hover:text-black transition-colors duration-300 text-xs block mt-0.5 font-medium">
                            Press at <strong className="text-slate-900 group-hover:text-black transition-colors duration-300">{currentFab.temp}</strong> for <strong className="text-slate-900 group-hover:text-black transition-colors duration-300">{currentFab.time}</strong> at {currentFab.pressure}.
                          </span>
                        </div>
                      </div>

                      <div className="group relative flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm overflow-hidden cursor-default">
                        <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                        <span className="relative z-10 w-7 h-7 rounded-full bg-red-50 text-red-600 group-hover:bg-white group-hover:text-red-600 transition-colors duration-300 flex items-center justify-center font-black text-xs shrink-0">3</span>
                        <div className="relative z-10">
                          <span className="font-bold text-slate-900 group-hover:text-white transition-colors duration-300 text-sm block">Post-Press Finish &amp; Seal</span>
                          <span className="text-slate-500 group-hover:text-black transition-colors duration-300 text-xs block mt-0.5 font-medium">{currentFab.postPress}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h5 className="text-sm font-bold text-slate-900">Why Choose Our DTF Transfers?</h5>
                    
                    {/* Quality & Durability Badges */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1 leading-tight">Wash Durability</span>
                        <strong className="text-[11px] font-black text-slate-900 block truncate">{currentFab.washRating}</strong>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <Layers className="w-5 h-5 text-red-500 mx-auto mb-2" />
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1 leading-tight">Stretch Flex</span>
                        <strong className="text-[11px] font-black text-slate-900 block truncate">{currentFab.stretchRating}</strong>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1 leading-tight">Hand Feel</span>
                        <strong className="text-[11px] font-black text-slate-900 block truncate">{currentFab.handFeel}</strong>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        href="/gang-sheet-builder"
                        className="w-full sm:flex-1 py-3 px-5 rounded-full text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20 flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Build Gang Sheet for {currentFab.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/collections/all"
                        className="w-full sm:w-auto py-3 px-5 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all text-center"
                      >
                        Browse Transfers
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRENDING READY TO PRESS GRAPHICS                                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/40 px-3 py-1 rounded-full">
              Ready To Press Collection
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight font-heading mt-3">
              Trending Outdoor<br className="hidden sm:block" />
              <span className="text-red-600"> &amp; Camping Designs</span>
            </h2>
          </div>
          <Link
            href="/collections/camping"
            className="relative overflow-hidden border border-red-500/30 dark:border-red-500/20 rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 group transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-500/20 flex items-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              View All Transfers ({bestSellingTransfers.length})
            </span>
            <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellingTransfers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW IT WORKS 3-STEP TIMELINE                                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading">
            <span className="text-slate-950 dark:text-white whitespace-nowrap">3 Easy Steps to</span><br />
            <span className="text-red-600 whitespace-nowrap">Custom Apparel</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            From uploading your vector artwork to peeling the PET film, our Canadian DTF process is fast, clean, and repeatable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STEP 1 */}
          <div className="relative overflow-hidden rounded-3xl p-8 border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-950/80 shadow-lg group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/30 hover:border-red-500/60 cursor-pointer">
            {/* Smooth Left-to-Right Red Gradient Sweep Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 bg-red-600 group-hover:bg-slate-900 text-white font-black text-xs rounded-full inline-block shadow-md transition-colors duration-300">
                  STEP 01
                </span>
                <UploadCloud className="w-6 h-6 text-red-500 dark:text-red-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-black text-slate-950 dark:text-white group-hover:text-white font-heading transition-colors duration-300">
                Upload or Build Online
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                Upload your 300 DPI transparent PNG or arrange multiple designs on our interactive 2D Gang Sheet Builder with auto-nesting.
              </p>

              <div className="pt-2 flex items-center text-xs font-bold text-red-600 dark:text-red-400 group-hover:text-white transition-colors duration-300">
                <span>Auto-Resolution DPI Check</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="relative overflow-hidden rounded-3xl p-8 border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-950/80 shadow-lg group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/30 hover:border-red-500/60 cursor-pointer">
            {/* Smooth Left-to-Right Red Gradient Sweep Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 bg-slate-900 dark:bg-slate-800 group-hover:bg-slate-900 text-white font-black text-xs rounded-full inline-block shadow-md transition-colors duration-300">
                  STEP 02
                </span>
                <Layers className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-black text-slate-950 dark:text-white group-hover:text-white font-heading transition-colors duration-300">
                We Print &amp; Oven-Cure
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                We print on premium PET film using Japanese pigment inks and apply dense TPU adhesive powder in our Southwold, Ontario facility.
              </p>

              <div className="pt-2 flex items-center text-xs font-bold text-red-600 dark:text-red-400 group-hover:text-white transition-colors duration-300">
                <span>Dual Japanese Printheads</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="relative overflow-hidden rounded-3xl p-8 border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-950/80 shadow-lg group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/30 hover:border-red-500/60 cursor-pointer">
            {/* Smooth Left-to-Right Red Gradient Sweep Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 bg-emerald-600 group-hover:bg-slate-900 text-white font-black text-xs rounded-full inline-block shadow-md transition-colors duration-300">
                  STEP 03
                </span>
                <Flame className="w-6 h-6 text-emerald-500 dark:text-emerald-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-black text-slate-950 dark:text-white group-hover:text-white font-heading transition-colors duration-300">
                Press and Cold Peel
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                Heat press at 300°F for 10–15 seconds, let cool completely for a crisp cold peel, and enjoy ultra-vibrant 50+ wash longevity.
              </p>

              <div className="pt-2 flex items-center text-xs font-bold text-red-600 dark:text-red-400 group-hover:text-white transition-colors duration-300">
                <span>50+ Wash Longevity</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. REDESIGNED FAQ KNOWLEDGE CENTER                                        */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight font-heading">
            Frequently Asked<br />
            <span className="text-red-600">Questions?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Guide / Image */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* The "Not Disgusting" Left Visual Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group hidden dark:block">
              {/* Subtle inner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-red-500/20 transition-colors duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-900/50 transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <Flame className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white mb-2 font-heading">Master The Process</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our transfers are engineered for high-volume screen printers and premium apparel brands. Get the perfect press every time.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>50+ Wash Longevity</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-300">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>24-48h Dispatch from ON</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Light Mode Equivalent */}
            <div className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden group block dark:hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-red-500/20 transition-colors duration-500" />
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-900/50 transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <Flame className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 font-heading">Master The Process</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our transfers are engineered for high-volume screen printers and premium apparel brands. Get the perfect press every time.
                  </p>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>50+ Wash Longevity</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs font-bold text-slate-700">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>24-48h Dispatch from ON</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Support Mini-Card */}
            <div className="bg-white dark:bg-slate-950/80 rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/5">
                <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-950 dark:text-white">Still need help?</h4>
                <Link href="/pages/contact-us" className="text-xs font-bold text-red-600 hover:text-red-500 transition-colors">
                  Contact Support Team →
                </Link>
              </div>
            </div>

            {/* Satisfaction Guarantee Mini-Card (Balances Left/Right Heights) */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent dark:from-emerald-900/20 dark:to-transparent rounded-2xl p-5 border border-emerald-500/20 shadow-md flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mb-1">100% Quality Guarantee</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every print is double-inspected before dispatch. If it doesn't meet commercial standards, we reprint it free.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-8 space-y-6">

        {/* Search Bar Removed as requested */}

        {/* Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-red-500/40 shadow-lg shadow-red-950/10 dark:shadow-red-900/10 -translate-y-1'
                    : 'bg-white/80 dark:bg-slate-950/60 border-slate-200/90 dark:border-white/[0.06] shadow-sm hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-slate-900/80 hover:-translate-y-0.5'
                }`}
              >
                {/* Active Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-red-600 transition-transform duration-300 origin-top ${isOpen ? 'scale-y-100' : 'scale-y-0'}`} />

                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className={`w-full p-5 sm:px-6 text-left flex items-center justify-between font-extrabold text-sm sm:text-base transition-colors ${
                    isOpen ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <span className="pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-red-50 dark:bg-red-500/10' : 'bg-slate-50 dark:bg-white/5'
                  }`}>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-90 text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    />
                  </div>
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                      <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-white/5 shadow-inner">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CUSTOMER REVIEWS (INTERACTIVE SOCIAL PROOF HUB)                        */}
      {/* ========================================================================= */}
      <CustomerReviewsSection />

      {/* ========================================================================= */}
      {/* 9. CANADIAN QUALITY, SPEED & DURABILITY ASSURANCE (PRE-FOOTER)            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-800/40">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-black text-slate-950 dark:text-white block font-heading">
                Fast Ontario Dispatch
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
                24–48h printing &amp; express nationwide delivery via Canada Post and UPS.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800/40">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-black text-slate-950 dark:text-white block font-heading">
                50+ Wash Longevity
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
                Industrial TPU powder bond ensures graphics never crack, peel, or fade.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-black text-slate-950 dark:text-white block font-heading">
                Opaque White Base
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
                Solid high-density Japanese inks for vibrant pops on jet black garments.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-black text-slate-950 dark:text-white block font-heading">
                $0 MOQ &amp; Bulk Tiers
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-tight">
                No minimum order sizes. Automatic volume discounts up to 25% in cart.
              </p>
            </div>
          </div>
        </div>

        {/* 10. VIP DISCOUNT CTA BANNER (HIGH CONTRAST & CLEAR BUTTONS) */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden mt-16 sm:mt-24">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="inline-block px-3 py-0.5 bg-white/20 text-white font-black text-xs uppercase tracking-wider rounded-full backdrop-blur-xs">
              Instant Creator Savings
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-heading">
              Unlock 15% OFF Your Custom Order
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Apply coupon code <strong className="bg-white text-red-700 px-2 py-0.5 rounded-md font-black shadow-xs">WELCOME15</strong> at checkout for 15% OFF your gang sheets or ready-to-press transfers!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full md:w-auto">
            <Link
              href="/products/gang-sheet-builder"
              className="w-full sm:w-auto px-7 py-3.5 bg-black hover:bg-slate-900 text-white !text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 hover:scale-105 border-none"
            >
              <Flame className="w-4 h-4 text-yellow-300" />
              <span>Launch Studio Builder</span>
            </Link>
            <Link
              href="/products/upload-your-custom-dtf-gang-sheet"
              className="group relative w-full sm:w-auto px-6 py-3.5 bg-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl overflow-hidden flex items-center justify-center border-none"
            >
              {/* Hover Fill Effect (Left to Right) */}
              <div className="absolute inset-0 bg-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
              
              {/* Button Content */}
              <div className="relative z-10 flex items-center space-x-2 transition-colors duration-300">
                <UploadCloud className="w-4 h-4 !text-slate-900 group-hover:!text-white transition-colors duration-300" />
                <div className="!text-slate-900 group-hover:!text-white transition-colors duration-300">Upload Artwork</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
