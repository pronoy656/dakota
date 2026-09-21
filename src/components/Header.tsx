'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Heart, 
  ChevronDown,
  Flame,
  BookOpen,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Truck,
  RotateCcw,
  UploadCloud,
  Zap,
  Tag,
  Sun,
  Moon
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import { STORE_INFO } from '@/data/storeData';

interface HeaderProps {
  onOpenSearch: () => void;
}

const TICKER_PILLS = [
  {
    text: '50+ WASH DURABILITY',
    icon: <ShieldCheck className="w-3 h-3 text-red-500" />,
    href: '/pages/dtf-heat-press-instructions',
    isCta: false,
  },
  {
    text: 'SAME-DAY EXPRESS DISPATCH',
    icon: <Truck className="w-3 h-3 text-red-500" />,
    href: '/policies/shipping-policy',
    isCta: false,
  },
  {
    text: 'ZERO ORDER MINIMUMS',
    icon: <RotateCcw className="w-3 h-3 text-red-500" />,
    href: '/products/gang-sheet-builder',
    isCta: false,
  },
  {
    text: 'PREMIUM HEAT PRESS READY',
    icon: <Flame className="w-3 h-3 text-red-500" />,
    href: '/pages/dtf-heat-press-instructions',
    isCta: false,
  },
  {
    text: 'BUILD GANG SHEET',
    icon: <Zap className="w-3 h-3 text-yellow-300" />,
    href: '/products/gang-sheet-builder',
    isCta: true,
  },
  {
    text: 'UPLOAD READY ARTWORK',
    icon: <UploadCloud className="w-3 h-3 text-blue-400" />,
    href: '/products/upload-your-custom-dtf-gang-sheet',
    isCta: false,
  },
  {
    text: 'FREE CANADA SHIPPING $150+',
    icon: <span className="text-xs">🍁</span>,
    href: '/policies/shipping-policy',
    isCta: false,
  },
  {
    text: '15% OFF CODE: WELCOME15',
    icon: <Tag className="w-3 h-3 text-amber-400" />,
    href: '/products/gang-sheet-builder',
    isCta: false,
  },
];

export default function Header({ onOpenSearch }: HeaderProps) {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setGuidesOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Studio Builder', href: '/products/gang-sheet-builder', highlight: true },
    { name: 'Upload Artwork', href: '/products/upload-your-custom-dtf-gang-sheet' },
    { name: 'Continuous Rolls', href: '/products/rolling-gang-sheet-builder' },
    { name: 'Ready-to-Press', href: '/collections/camping' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full font-sans transition-all duration-300 shadow-2xl">
      
      {/* ========================================================================= */}
      {/* 1. CONTINUOUS SLIDING SUB-NAVBAR TICKER WITH PILLS (ANIMATED MARQUEE)     */}
      {/* ========================================================================= */}
      <div className="bg-[#05070a] border-y border-red-600/40 py-2 relative overflow-hidden select-none">
        <div className="flex items-center">
          {/* Infinite Continuous Sliding Row */}
          <div className="animate-marquee whitespace-nowrap flex items-center space-x-4">
            {TICKER_PILLS.concat(TICKER_PILLS).concat(TICKER_PILLS).map((pill, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                {/* Red separator dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.8)] shrink-0" />

                {/* Pill item */}
                <Link
                  href={pill.href}
                  className={`inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-[11px] font-black tracking-wider transition-all duration-200 ${
                    pill.isCta
                      ? 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-950/80 hover:scale-105'
                      : 'bg-[#0b101b] hover:bg-[#121929] text-slate-200 hover:text-white border border-white/10 hover:border-red-500/40'
                  }`}
                >
                  <span className="shrink-0">{pill.icon}</span>
                  <span>{pill.text}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Right Edge: Subtle Floating Currency Switcher */}
          <div className="hidden sm:flex items-center absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-[#07090e]/95 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/15 text-[10px] font-extrabold shadow-md space-x-1">
            <button
              onClick={() => setCurrency('CAD')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                currency === 'CAD'
                  ? 'bg-red-600 text-white font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CAD $
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-1.5 py-0.5 rounded transition-all ${
                currency === 'USD'
                  ? 'bg-red-600 text-white font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD $
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN LUXURY NAVBAR WITH LARGER TEXT & THEME TOGGLE (DARK/LIGHT)        */}
      {/* ========================================================================= */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-[#07090e]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 py-3.5 shadow-lg' 
            : 'bg-white/80 dark:bg-[#07090e]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/[0.06] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label={STORE_INFO.name}>
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/10 p-1 group-hover:border-red-500/50 group-hover:scale-105 transition-all shadow-md">
              <Image
                src={STORE_INFO.logo}
                alt={STORE_INFO.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 44px, 48px"
                priority
              />
            </div>
          </Link>

          {/* Clean Navigation Menu - LARGER, BOLD, ULTRA-READABLE TEXT */}
          <nav className="hidden lg:flex items-center space-x-2 text-[15px] font-extrabold text-slate-800 dark:text-slate-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl transition-all duration-200 relative group overflow-hidden ${
                    isActive
                      ? 'text-red-600 bg-red-50 dark:bg-red-600/20 dark:text-red-400 font-black shadow-sm'
                      : link.highlight
                      ? 'text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-100 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl z-0" />
                  )}
                </Link>
              );
            })}

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                onBlur={() => setTimeout(() => setGuidesOpen(false), 200)}
                className="px-4 py-2.5 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-white/5 flex items-center space-x-1.5 text-slate-700 dark:text-slate-200 font-extrabold hover:text-red-600 dark:hover:text-red-400"
              >
                <span>Guides</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${guidesOpen ? 'rotate-180 text-red-600 dark:text-red-400' : ''}`} />
              </button>

              {guidesOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0d121d] rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1.5">
                  <Link
                    href="/pages/dtf-heat-press-instructions"
                    className="flex items-center px-3.5 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
                  >
                    <Flame className="w-4 h-4 mr-2.5 text-red-500 shrink-0" />
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Heat Press Guide</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">300°F time &amp; cold peel</div>
                    </div>
                  </Link>

                  <Link
                    href="/pages/file-preparation-artwork-guidelines"
                    className="flex items-center px-3.5 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <BookOpen className="w-4 h-4 mr-2.5 text-blue-500 shrink-0" />
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Artwork Guidelines</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">300 DPI &amp; transparent PNG</div>
                    </div>
                  </Link>

                  <Link
                    href="/pages/faq"
                    className="flex items-center px-3.5 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
                  >
                    <HelpCircle className="w-4 h-4 mr-2.5 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">FAQ Knowledge Hub</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Turnaround &amp; shipping</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Theme Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent dark:border-white/10 transition-all flex items-center justify-center group"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-blue-500 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-slate-500 hover:text-red-600 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title="Search catalog"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              href="/collections/camping"
              className="relative p-2.5 rounded-xl text-slate-500 hover:text-red-600 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors hidden sm:flex"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Pill Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-red-950/60 hover:shadow-red-900/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-black tracking-wide">Cart</span>
              <span className="bg-slate-950/90 text-white px-2 py-0.5 rounded-md text-xs font-black border border-white/20">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-200 hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDEOVER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14] border-b border-white/10 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold text-slate-400">Theme Preference</span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-white/10 text-white flex items-center space-x-2"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm font-extrabold text-slate-200 hover:bg-white/5 hover:text-red-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3 space-y-1.5">
            <Link
              href="/pages/dtf-heat-press-instructions"
              className="flex items-center px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/5 rounded-xl"
            >
              <Flame className="w-4 h-4 mr-2.5 text-red-500" />
              Heat Press Instructions
            </Link>
            <Link
              href="/pages/file-preparation-artwork-guidelines"
              className="flex items-center px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/5 rounded-xl"
            >
              <BookOpen className="w-4 h-4 mr-2.5 text-blue-400" />
              Artwork Guidelines
            </Link>
            <Link
              href="/pages/faq"
              className="flex items-center px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/5 rounded-xl"
            >
              <HelpCircle className="w-4 h-4 mr-2.5 text-amber-400" />
              FAQ Knowledge Hub
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
