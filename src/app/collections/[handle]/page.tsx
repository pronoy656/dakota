'use client';

import React, { useState, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, COLLECTIONS, Product } from '@/data/storeData';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function CollectionPage() {
  const params = useParams();
  const handle = params?.handle as string;

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Find collection details
  const collection = COLLECTIONS.find((c) => c.handle === handle) || {
    id: handle,
    title: handle === 'all' ? 'All Products' : handle.replace(/-/g, ' ').toUpperCase(),
    handle: handle,
    description: 'Explore our premium DTF transfers, gang sheets, and custom apparel.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    itemCount: PRODUCTS.length,
  };

  // Filter products by collection category / tags
  const filteredProducts = useMemo(() => {
    let list: Product[] = [];
    if (handle === 'all' || handle === 'dtf-transfers') {
      list = [...PRODUCTS];
    } else if (handle === 'gang-sheet-builders') {
      list = PRODUCTS.filter((p) => p.category === 'gang-sheet');
    } else if (handle === 'camping') {
      list = PRODUCTS.filter((p) => p.category === 'ready-to-press');
    } else if (handle === 'custom-t-shirt' || handle === 'hoodies') {
      list = PRODUCTS.filter((p) => p.category === 'apparel');
    } else {
      list = PRODUCTS.filter(
        (p) =>
          p.tags.some((t) => t.toLowerCase() === handle.toLowerCase()) ||
          p.categoryTitle.toLowerCase().includes(handle.replace(/-/g, ' '))
      );
    }

    if (selectedTag !== 'all') {
      list = list.filter((p) => p.tags.includes(selectedTag));
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [handle, selectedTag, sortBy]);

  // Extract unique tags in this collection
  const allTags = useMemo(() => {
    const set = new Set<string>();
    filteredProducts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [filteredProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-slate-100 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-red-400 flex items-center transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span className="text-white/20">/</span>
        <Link href="/collections" className="hover:text-red-400 transition-colors">
          Collections
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white font-bold">{collection.title}</span>
      </div>

      {/* Collection Header Banner */}
      <div className="gradient-border-card p-8 sm:p-12 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center space-x-1.5 bg-red-950/80 text-red-400 border border-red-800/40 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Canadian DTF Laboratory Collection</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          {collection.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          {collection.description}
        </p>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/collections/dtf-transfers"
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all border ${
            handle === 'dtf-transfers' || handle === 'all'
              ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/50'
              : 'bg-slate-900/80 text-slate-300 border-white/5 hover:border-white/20 hover:bg-slate-850'
          }`}
        >
          All DTF Products
        </Link>
        {COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.handle}`}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all border ${
              handle === col.handle
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-950/50'
                : 'bg-slate-900/80 text-slate-300 border-white/5 hover:border-white/20 hover:bg-slate-850'
            }`}
          >
            {col.title} ({col.itemCount})
          </Link>
        ))}
      </div>

      {/* Controls Bar (Filter by Tag & Sort By) */}
      <div className="glass-surface p-4 rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tags filter */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-400 flex items-center shrink-0">
            <Filter className="w-3.5 h-3.5 mr-1 text-red-500" />
            Filter:
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedTag === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {allTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedTag === tag
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
          <span className="text-xs font-bold text-slate-400 flex items-center">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-red-500" />
            Sort By:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-white/10 text-xs font-bold text-white rounded-xl px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-red-500"
          >
            <option value="featured">Featured / Best Match</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass-surface rounded-3xl p-12 text-center border border-white/10 space-y-3">
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400">
            Try resetting your tag filters or check another collection category.
          </p>
          <button
            onClick={() => setSelectedTag('all')}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
