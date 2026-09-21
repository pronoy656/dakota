'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Flame, 
  CheckCircle2, 
  ArrowLeft, 
  Shirt, 
  RotateCcw,
  Sparkles,
  Share2,
  ChevronDown
} from 'lucide-react';
import { PRODUCTS, REVIEWS, Product, ProductVariant, STORE_INFO } from '@/data/storeData';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params?.handle as string;
  const product = PRODUCTS.find((p) => p.handle === handle);

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] || null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return notFound();
  }

  const isWishlisted = isInWishlist(product.handle);
  const currentPrice = selectedVariant?.price || product.price;

  // Bulk tier discount
  let discountPercent = 0;
  if (quantity >= 25) discountPercent = 25;
  else if (quantity >= 10) discountPercent = 15;
  else if (quantity >= 5) discountPercent = 10;

  const discountedPrice = currentPrice * (1 - discountPercent / 100);
  const totalPrice = discountedPrice * quantity;

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
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewTitle || !reviewBody) {
      alert('Please fill out all review fields.');
      return;
    }
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewName('');
      setReviewTitle('');
      setReviewBody('');
    }, 1500);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 text-slate-100 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-red-400 flex items-center transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span className="text-white/20">/</span>
        <Link 
          href={`/collections/${product.category === 'ready-to-press' ? 'camping' : product.category === 'gang-sheet' ? 'gang-sheet-builders' : 'custom-t-shirt'}`} 
          className="hover:text-red-400 transition-colors"
        >
          {product.categoryTitle}
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white font-bold truncate max-w-xs">{product.title}</span>
      </div>

      {/* Product Primary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Photo View */}
          <div className="relative aspect-square w-full bg-[#080b12] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl p-6">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.badge && (
                <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-lg shadow-red-950/60">
                  {product.badge}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="px-2.5 py-1 bg-emerald-600/90 text-white text-xs font-black rounded-full border border-emerald-500/30">
                  SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.handle)}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-md backdrop-blur-md transition-all z-10 ${
                isWishlisted
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/10'
              }`}
              title={isWishlisted ? 'Saved' : 'Save to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all p-2 bg-[#080b12] ${
                    activeImageIndex === idx
                      ? 'border-red-600 shadow-lg shadow-red-950/50 scale-105'
                      : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <Image src={img} alt="thumbnail" fill className="object-contain p-1" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details, Variants, Price, & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-red-400 bg-red-950/80 border border-red-800/40 px-3 py-1 rounded-full">
              {product.categoryTitle}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-3 leading-tight font-heading">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-emerald-400 font-bold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                In Stock (Ontario Facility)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-3 pb-4 border-b border-white/[0.08]">
            <span className="text-3xl sm:text-4xl font-black text-white font-heading">
              {formatPrice(discountedPrice)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-slate-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                {discountPercent}% Bulk Tier Applied
              </span>
            )}
          </div>

          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 block">
                Select Size / Print Dimension:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedVariant?.id === v.id
                        ? 'border-red-500 bg-red-950/40 text-red-300 shadow-md shadow-red-950/40'
                        : 'border-white/10 text-slate-300 hover:border-white/20 bg-slate-900/80'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-white">{v.title}</div>
                    <div className="text-xs text-red-400 font-semibold mt-0.5">{formatPrice(v.price)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Bulk Savings */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 block">
              Quantity:
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-white/10 rounded-2xl overflow-hidden bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent font-extrabold text-sm text-white focus:outline-hidden"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-slate-400">
                Subtotal: <strong className="text-white font-extrabold text-sm">{formatPrice(totalPrice)}</strong>
              </div>
            </div>

            {/* Volume Discounts Helper */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-white/10 text-[11px] text-slate-300 flex justify-between">
              <span>5+ items: <strong className="text-red-400 font-bold">10% OFF</strong></span>
              <span>10+ items: <strong className="text-red-400 font-bold">15% OFF</strong></span>
              <span>25+ items: <strong className="text-red-400 font-bold">25% OFF</strong></span>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-extrabold text-base shadow-xl transition-all flex items-center justify-center space-x-2 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-950/60 hover:shadow-red-900/90'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{added ? 'Added to Cart!' : `Add to Cart • ${formatPrice(totalPrice)}`}</span>
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center space-x-2 bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <Truck className="w-4 h-4 text-red-500 shrink-0" />
                <span>Fast 1-2 Days Canada Post Express</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/80 p-3 rounded-xl border border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>50+ Commercial Wash Guarantee</span>
              </div>
            </div>
          </div>

          {/* Heat Press Parameters Card */}
          {product.pressSettings && (
            <div className="gradient-border-card p-5 shadow-lg space-y-3">
              <div className="flex items-center space-x-2 text-red-400 font-extrabold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>Heat Press Application Parameters</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Temperature</span>
                  <strong className="text-white font-extrabold">{product.pressSettings.temp}</strong>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pressure</span>
                  <strong className="text-white font-extrabold">{product.pressSettings.pressure}</strong>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Press Time</span>
                  <strong className="text-white font-extrabold">{product.pressSettings.time}</strong>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Peel Type</span>
                  <strong className="text-emerald-400 font-extrabold">{product.pressSettings.peel}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Product Overview &amp; Specifications:
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-8 border-t border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              Customer Reviews ({product.reviewCount})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified feedback from Canadian printers, decorators, and clothing brands.
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-white/10 shadow-xs transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-surface p-6 rounded-3xl border border-white/[0.08] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500">{rev.date}</span>
              </div>
              <h4 className="text-sm font-extrabold text-white">&quot;{rev.title}&quot;</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{rev.body}</p>
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>By <strong className="text-white">{rev.author}</strong> ({rev.location})</span>
                <span className="text-emerald-400 font-bold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-white/[0.08] space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            onClick={() => setIsReviewModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative bg-[#0d121d] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-white/10 z-10 space-y-4 text-white">
            <h3 className="text-lg font-extrabold text-white">
              Write a Review for {product.title}
            </h3>

            {reviewSubmitted ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-base text-white">Thank You!</h4>
                <p className="text-xs text-emerald-300">
                  Your review has been submitted and will appear shortly after approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Your Rating:
                  </label>
                  <div className="flex space-x-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1"
                      >
                        <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Your Name (Displayed Publicly):
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="E.g. Sarah M. (Toronto, ON)"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Review Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="E.g. Excellent color vibrancy and fast peel!"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Review Content:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    placeholder="Share your experience pressing this transfer or building your gang sheet..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  >
                    Submit Review
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
