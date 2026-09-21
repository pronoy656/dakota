'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    discountAmount, 
    discountCode, 
    discountPercent, 
    applyPromoCode, 
    removePromoCode, 
    shippingCost, 
    taxAmount, 
    total, 
    totalItemsCount,
    freeShippingRemaining,
    freeShippingProgress
  } = useCart();

  const { formatPrice } = useCurrency();
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0d16] dark:bg-[#0a0d16] light:bg-white text-slate-100 dark:text-slate-100 light:text-slate-900 border-l border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 flex items-center justify-between bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-extrabold text-white dark:text-white light:text-slate-900">Your Cart</h2>
              <span className="bg-red-950/80 dark:bg-red-950/80 light:bg-red-50 text-red-500 dark:text-red-400 light:text-red-600 border border-red-800/40 dark:border-red-800/40 light:border-red-200 text-[10px] font-black px-2 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/40 dark:from-red-950/60 dark:via-slate-900 dark:to-amber-950/40 light:from-red-50 light:via-slate-50 light:to-amber-50 border-b border-white/[0.08] dark:border-white/[0.08] light:border-slate-200">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center text-slate-300 dark:text-slate-300 light:text-slate-700 text-[11px]">
                <Truck className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                {freeShippingRemaining > 0 ? (
                  <span>
                    Add <strong className="text-red-500 font-bold">{formatPrice(freeShippingRemaining)}</strong> more for <strong>Free Shipping</strong> in Canada!
                  </span>
                ) : (
                  <span className="text-emerald-500 dark:text-emerald-400 light:text-emerald-600 font-bold flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    Unlocked Free Canadian Shipping ($150+)!
                  </span>
                )}
              </span>
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-[11px] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-200 rounded-full h-2 overflow-hidden border border-white/5 dark:border-white/5 light:border-slate-200">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  freeShippingProgress >= 100 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                    : 'bg-gradient-to-r from-red-600 to-rose-500'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-500 border border-white/5 dark:border-white/5 light:border-slate-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white dark:text-white light:text-slate-900">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 max-w-xs mx-auto">
                    Looks like you haven&apos;t added any custom gang sheets or transfers yet.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href="/products/gang-sheet-builder"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                  >
                    Build Custom Gang Sheet
                  </Link>
                  <Link
                    href="/collections/camping"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-800 rounded-xl text-xs font-semibold transition-all border border-white/10 dark:border-white/10 light:border-slate-200"
                  >
                    Shop Ready To Press
                  </Link>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.id}-${item.variantId}`}
                  className="flex space-x-3 p-3 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-50 border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 rounded-2xl shadow-xs hover:border-white/20 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#080b12] dark:bg-[#080b12] light:bg-slate-100 rounded-xl overflow-hidden relative shrink-0 border border-white/10 dark:border-white/10 light:border-slate-200 p-1">
                    <Image
                      src={item.gangSheetDetails?.previewUrl || item.image || '/placeholder.png'}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                    {item.isGangSheet && (
                      <span className="absolute bottom-1 left-1 right-1 bg-red-950/90 text-red-300 text-[8px] font-black text-center py-0.5 rounded border border-red-800/40">
                        Gang Sheet
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900 hover:text-red-500 line-clamp-1 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id, item.variantId)}
                          className="text-slate-500 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variantTitle && (
                        <p className="text-[11px] font-semibold text-red-500 dark:text-red-400 light:text-red-600 mt-0.5">
                          Size: {item.variantTitle}
                        </p>
                      )}

                      {item.gangSheetDetails?.itemsCount ? (
                        <p className="text-[10px] text-slate-400 light:text-slate-500">
                          {item.gangSheetDetails.itemsCount} designs placed
                        </p>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-white/10 dark:border-white/10 light:border-slate-200 rounded-lg overflow-hidden bg-slate-900 dark:bg-slate-900 light:bg-slate-100">
                        <button
                          onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                          className="px-2 py-1 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-white dark:text-white light:text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                          className="px-2 py-1 text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-white dark:text-white light:text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-slate-400 light:text-slate-500">
                            {formatPrice(item.price)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Box */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 space-y-3">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 dark:bg-slate-900 light:bg-white text-white dark:text-white light:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium placeholder:text-slate-500 light:placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {discountCode && (
                  <div className="flex items-center justify-between bg-emerald-950/80 dark:bg-emerald-950/80 light:bg-emerald-50 text-emerald-300 dark:text-emerald-300 light:text-emerald-800 text-xs px-2.5 py-1 rounded-lg border border-emerald-800/40 dark:border-emerald-800/40 light:border-emerald-200">
                    <span className="flex items-center font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                      Promo &quot;{discountCode}&quot; ({discountPercent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs text-red-500 dark:text-red-400 light:text-red-600 hover:underline font-bold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoFeedback && !promoFeedback.success && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 light:text-red-600">{promoFeedback.message}</p>
                )}
              </form>

              {/* Subtotal & Calculations */}
              <div className="space-y-1.5 text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white dark:text-white light:text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 dark:text-emerald-400 light:text-emerald-600 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-500 dark:text-emerald-400 light:text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (13% ON HST)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white dark:text-white light:text-slate-900 pt-2 border-t border-white/10 dark:border-white/10 light:border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-red-500 dark:text-red-400 light:text-red-600 font-black font-heading">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-950/60 hover:shadow-red-900/80 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-xs px-1 text-slate-400 dark:text-slate-400 light:text-slate-600">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="hover:text-red-500 font-semibold transition-colors"
                  >
                    View Full Cart
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
