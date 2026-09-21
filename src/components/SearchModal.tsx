'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/storeData';
import { useCurrency } from '@/context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setResults([]);
      return;
    }
    const filtered = PRODUCTS.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchCat = p.categoryTitle.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTags || matchCat;
    });
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const popularTags = [
    'Gang Sheet',
    'Camping',
    'Leopard Print',
    'Mountain',
    'Custom T-Shirt',
    'Hoodie',
    'Rolling Roll',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      <div className="relative mx-auto max-w-2xl bg-[#0d121d] dark:bg-[#0d121d] light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 flex items-center space-x-3 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search custom gang sheets, camping transfers, apparel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 light:placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800 text-xs font-bold rounded-lg transition-colors border border-white/10 dark:border-white/10 light:border-slate-300"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-red-950/60 dark:hover:bg-red-950/60 light:hover:bg-red-50 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-red-400 dark:hover:text-red-400 light:hover:text-red-600 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-medium rounded-xl transition-all flex items-center space-x-1"
                  >
                    <Sparkles className="w-3 h-3 text-red-500" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-white/5 dark:border-white/5 light:border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                Featured Tools
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/products/gang-sheet-builder"
                  onClick={onClose}
                  className="p-3 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 hover:bg-red-950/30 dark:hover:bg-red-950/30 light:hover:bg-red-50/70 border border-white/5 dark:border-white/5 light:border-slate-200 rounded-2xl flex items-center space-x-3 transition-colors group"
                >
                  <div className="p-2 bg-red-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                    <Flame className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white dark:text-white light:text-slate-900 group-hover:text-red-500">
                      Gang Sheet Studio
                    </h5>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">2D canvas layout tool</p>
                  </div>
                </Link>

                <Link
                  href="/products/upload-your-custom-dtf-gang-sheet"
                  onClick={onClose}
                  className="p-3 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 hover:bg-blue-950/30 dark:hover:bg-blue-950/30 light:hover:bg-blue-50/70 border border-white/5 dark:border-white/5 light:border-slate-200 rounded-2xl flex items-center space-x-3 transition-colors group"
                >
                  <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white dark:text-white light:text-slate-900 group-hover:text-blue-500">
                      Upload Print-Ready File
                    </h5>
                    <p className="text-[11px] text-slate-400 light:text-slate-500">Direct 300 DPI print queue</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 divide-y divide-white/5 dark:divide-white/5 light:divide-slate-100">
            {results.length === 0 ? (
              <div className="text-center py-12 text-slate-400 light:text-slate-500 text-xs">
                No products found matching &quot;<strong className="text-white dark:text-white light:text-slate-900">{query}</strong>&quot;. Try searching another keyword or browsing collections.
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  onClick={onClose}
                  className="p-3 hover:bg-slate-900/90 dark:hover:bg-slate-900/90 light:hover:bg-slate-50 rounded-2xl flex items-center space-x-4 transition-colors group"
                >
                  <div className="w-14 h-14 bg-[#080b12] dark:bg-[#080b12] light:bg-slate-100 rounded-xl overflow-hidden relative shrink-0 border border-white/10 dark:border-white/10 light:border-slate-200 p-2">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform"
                      sizes="56px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 dark:text-red-400 light:text-red-600">
                      {product.categoryTitle}
                    </span>
                    <h5 className="text-sm font-bold text-white dark:text-white light:text-slate-900 truncate group-hover:text-red-500 transition-colors">
                      {product.title}
                    </h5>
                    <p className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 mt-0.5">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
