'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CartPage() {
  const { 
    cart, 
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
  const [orderNotes, setOrderNotes] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Your Cart is Empty</h1>
        <p className="text-slate-500 max-w-sm mx-auto text-sm">
          You haven&apos;t added any custom gang sheets or ready-to-press transfers to your cart yet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/products/gang-sheet-builder"
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
          >
            Build Custom Gang Sheet
          </Link>
          <Link
            href="/collections/camping"
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
          >
            Shop Ready-to-Press Designs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb & Header */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Continue Shopping
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Shopping Cart ({totalItemsCount})</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Your Shopping Cart
      </h1>

      {/* Free Shipping Progress */}
      <div className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 p-4 sm:p-5 rounded-2xl border border-red-200/80 shadow-xs">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2 text-slate-800">
          <span className="flex items-center">
            <Truck className="w-4 h-4 mr-2 text-red-600" />
            {freeShippingRemaining > 0 ? (
              <span>
                Add <strong className="text-red-600">{formatPrice(freeShippingRemaining)}</strong> more for <strong>FREE Canadian Shipping</strong>
              </span>
            ) : (
              <span className="text-emerald-700 font-extrabold flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-emerald-600" />
                You qualified for FREE Standard Shipping in Canada!
              </span>
            )}
          </span>
          <span className="text-slate-500">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              freeShippingProgress >= 100
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'bg-gradient-to-r from-red-500 to-rose-500'
            }`}
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs divide-y divide-slate-100">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.variantId}`}
                className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden relative shrink-0 border border-slate-200">
                    <Image
                      src={item.gangSheetDetails?.previewUrl || item.image || '/placeholder.png'}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    {item.isGangSheet && (
                      <span className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-[9px] font-bold text-center py-0.5 rounded">
                        Gang Sheet
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.handle}`}
                      className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-red-600 line-clamp-1 transition-colors"
                    >
                      {item.title}
                    </Link>
                    {item.variantTitle && (
                      <p className="text-xs font-semibold text-red-600 mt-0.5">
                        Option / Size: {item.variantTitle}
                      </p>
                    )}
                    {item.gangSheetDetails?.itemsCount ? (
                      <p className="text-xs text-slate-400">
                        {item.gangSheetDetails.itemsCount} custom designs placed
                      </p>
                    ) : null}
                    <div className="text-xs text-slate-500 mt-1">
                      Unit: {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total price for line */}
                  <span className="text-base font-black text-slate-900 min-w-[80px] text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id, item.variantId)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Notes */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Order Notes &amp; Special Handling Instructions:
            </label>
            <textarea
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Add any packaging or production requests for our Ontario printing team..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-black text-slate-900">Order Summary</h3>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>

              {discountCode && (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-xl border border-emerald-200">
                  <span className="flex items-center font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Code &quot;{discountCode}&quot; ({discountPercent}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-xs text-red-600 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoFeedback && !promoFeedback.success && (
                <p className="text-[11px] text-red-600">{promoFeedback.message}</p>
              )}
            </form>

            {/* Price lines */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-600 font-bold">FREE</strong>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (13% ON HST)</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>

              <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total</span>
                <span className="text-red-600">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="space-y-2 text-center text-xs text-slate-400">
              <div className="flex items-center justify-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <p className="text-[11px]">
                Taxes and exact shipping calculated at next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
