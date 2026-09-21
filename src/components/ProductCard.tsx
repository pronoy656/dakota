'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Flame, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/data/storeData';
import { useCurrency } from '@/context/CurrencyContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.handle);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultVariant = product.variants[0];
    addToCart({
      id: product.id,
      variantId: defaultVariant?.id || 'default',
      title: product.title,
      variantTitle: defaultVariant?.title,
      price: defaultVariant?.price || product.price,
      image: product.images[0],
      handle: product.handle,
      quantity: 1,
    });
  };

  return (
    <div className="group relative bg-white dark:bg-[#0e1320]/90 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/[0.08] hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300 flex flex-col overflow-hidden shadow-sm dark:shadow-none">
      {/* Top Media Container */}
      <div className="relative h-48 w-full bg-slate-100 dark:bg-[#080b12] overflow-hidden p-3 border-b border-slate-200/50 dark:border-white/[0.04]">
        <Link href={`/products/${product.handle}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-contain object-center group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Ambient Subtle Glow on Hover */}
        <div className="absolute inset-0 bg-radial from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-950/60">
              {product.badge}
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="px-2 py-0.5 bg-emerald-600/90 text-white text-[9px] font-black rounded-full border border-emerald-500/30">
              SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.handle);
            }}
            className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-red-600 text-white'
                : 'bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="p-2 rounded-full shadow-md bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md"
              title="Quick view"
              aria-label="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider text-[10px]">
              {product.categoryTitle}
            </span>
            <div className="flex items-center space-x-1 text-amber-400 font-bold text-xs">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product.handle}`}
            className="font-bold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-500 text-sm line-clamp-2 leading-snug transition-colors"
          >
            {product.title}
          </Link>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {product.category === 'gang-sheet' && (
              <span className="text-[10px] font-medium text-slate-400 block">
                Starts at 22&quot; x 12&quot;
              </span>
            )}
          </div>

          {/* Action button */}
          {product.category === 'gang-sheet' ? (
            <Link
              href={`/products/${product.handle}`}
              className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-950/40 flex items-center space-x-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-yellow-300" />
              <span>Build</span>
            </Link>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="px-3.5 py-2 bg-slate-100 dark:bg-white/5 hover:bg-red-600 dark:hover:bg-red-600 text-slate-800 dark:text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-white/10 hover:border-red-500 flex items-center space-x-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
