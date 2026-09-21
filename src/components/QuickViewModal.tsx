'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Check, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '@/data/storeData';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || null);
      setQuantity(1);
      setActiveImageIndex(0);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      variantId: selectedVariant?.id || 'default',
      title: product.title,
      variantTitle: selectedVariant?.title,
      price: currentPrice,
      image: product.images[activeImageIndex] || product.images[0],
      handle: product.handle,
      quantity,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      <div className="relative w-full max-w-3xl bg-[#0d121d] dark:bg-[#0d121d] light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-slate-200 animate-in zoom-in-95 duration-200 z-10 flex flex-col md:flex-row">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-200 shadow-md backdrop-blur-xs transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media */}
        <div className="w-full md:w-1/2 p-6 bg-[#080b12] dark:bg-[#080b12] light:bg-slate-50 flex flex-col justify-center items-center">
          <div className="relative aspect-square w-full max-w-xs rounded-2xl overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-white shadow-inner border border-white/5 dark:border-white/5 light:border-slate-200 p-4">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-900 dark:bg-slate-900 light:bg-white ${
                    activeImageIndex === i ? 'border-red-600 shadow-xs' : 'border-white/10 dark:border-white/10 light:border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-contain" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500 dark:text-red-400 light:text-red-600 bg-red-950/80 dark:bg-red-950/80 light:bg-red-50 border border-red-800/40 dark:border-red-800/40 light:border-red-200 px-2.5 py-0.5 rounded-full">
                {product.categoryTitle}
              </span>
              <h3 className="text-xl font-extrabold text-white dark:text-white light:text-slate-900 mt-2 leading-tight font-heading">
                {product.title}
              </h3>

              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white dark:text-white light:text-slate-900">{product.rating}</span>
                <span className="text-xs text-slate-400 light:text-slate-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white dark:text-white light:text-slate-900 font-heading">
                {formatPrice(currentPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Variant selector */}
            {product.variants.length > 1 && (
              <div>
                <label className="text-xs font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 block mb-1.5">
                  Select Size / Option:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all text-left ${
                        selectedVariant?.id === v.id
                          ? 'border-red-500 bg-red-950/50 dark:bg-red-950/50 light:bg-red-50 text-red-300 dark:text-red-300 light:text-red-700 shadow-xs'
                          : 'border-white/10 dark:border-white/10 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-white/20 dark:hover:border-white/20 light:hover:border-slate-300 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50'
                      }`}
                    >
                      <div className="text-white dark:text-white light:text-slate-900">{v.title}</div>
                      <div className="text-[11px] font-medium text-red-400 dark:text-red-400 light:text-red-600">{formatPrice(v.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
              {product.shortDescription || product.description.slice(0, 160) + '...'}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 space-y-3">
            {product.category === 'gang-sheet' ? (
              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition-all"
              >
                <Flame className="w-4 h-4 text-yellow-300" />
                <span>Open Gang Sheet Studio</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-white/10 dark:border-white/10 light:border-slate-200 rounded-xl overflow-hidden bg-slate-900 dark:bg-slate-900 light:bg-slate-100">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-white dark:text-white light:text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-950/50'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • {formatPrice(currentPrice * quantity)}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="text-center">
              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-red-500 font-semibold transition-colors"
              >
                View Full Product Specifications &amp; Instructions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
