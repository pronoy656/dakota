'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  ArrowLeft, 
  CheckCircle2, 
  Flame, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, discountPercent, discountCode, total, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const [email, setEmail] = useState('customer@example.com');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Smith');
  const [address, setAddress] = useState('123 Queen Street West');
  const [city, setCity] = useState('Toronto');
  const [province, setProvince] = useState('ON');
  const [postalCode, setPostalCode] = useState('M5V 2A8');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'shoppay' | 'interac'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = shippingMethod === 'express' ? 25.0 : subtotal >= 150 ? 0 : 15.0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxRate = province === 'ON' ? 0.13 : province === 'BC' ? 0.12 : province === 'AB' ? 0.05 : 0.13;
  const taxAmount = Number((taxableAmount * taxRate).toFixed(2));
  const finalTotal = Number((taxableAmount + shippingCost + taxAmount).toFixed(2));

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error(e);
    }

    const orderData = {
      orderId: `HD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: cart,
      subtotal,
      discountAmount,
      shippingCost,
      taxAmount,
      total: finalTotal,
      customer: {
        name: `${firstName} ${lastName}`,
        email,
        address: `${address}, ${city}, ${province} ${postalCode}, Canada`,
      },
    };

    localStorage.setItem('hdtees_last_order', JSON.stringify(orderData));

    setTimeout(() => {
      clearCart();
      router.push('/order-confirmation');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-red-600 text-white font-extrabold text-sm rounded-xl"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-8">
        <Link href="/cart" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Cart
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Secure Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Customer Info, Shipping & Payment */}
        <form onSubmit={handleCompleteOrder} className="lg:col-span-7 space-y-8">
          {/* Express Checkout Mockup */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Express Checkout
            </span>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="py-3 px-2 bg-[#5a31f4] hover:bg-[#4b27d4] text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
              >
                Shop Pay
              </button>
              <button
                type="button"
                className="py-3 px-2 bg-black hover:bg-slate-900 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
              >
                Apple Pay
              </button>
              <button
                type="button"
                className="py-3 px-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-extrabold rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
              >
                G Pay
              </button>
            </div>
            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-slate-50 px-3 text-[11px] text-slate-400 font-bold uppercase absolute">
                Or Pay with Credit Card
              </span>
            </div>
          </div>

          {/* 1. Contact Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              1. Contact Information
            </h3>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address for Order Confirmation &amp; Tracking:
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
              />
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              2. Shipping Address
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Province</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold"
                >
                  <option value="ON">Ontario (13% HST)</option>
                  <option value="BC">British Columbia (12% GST/PST)</option>
                  <option value="AB">Alberta (5% GST)</option>
                  <option value="QC">Quebec (14.975% QST)</option>
                  <option value="NS">Nova Scotia (15% HST)</option>
                  <option value="MB">Manitoba (12% GST/PST)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* 3. Shipping Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              3. Delivery Method
            </h3>

            <div className="space-y-3">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-red-600 bg-red-50/70 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-red-600" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Canada Post Expedited Parcel (2–4 Business Days)
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      Standard tracked delivery across all provinces
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                  {subtotal >= 150 ? 'FREE' : formatPrice(15.0)}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-red-600 bg-red-50/70 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Priority Express Courier (1–2 Business Days)
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      Next-day dispatch with priority production slot
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                  {formatPrice(25.0)}
                </span>
              </label>
            </div>
          </div>

          {/* 4. Payment */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">
                4. Payment Details
              </h3>
              <div className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Expires (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Security Code (CVV)</label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-4 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isProcessing ? 'Processing Order...' : `Pay & Complete Order • ${formatPrice(finalTotal)}`}</span>
            </button>
          </div>
        </form>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-lg font-black text-slate-900">
              Order Items ({cart.length})
            </h3>

            <div className="divide-y divide-slate-200 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={`${item.id}-${item.variantId}`} className="py-3 first:pt-0 last:pb-0 flex items-center space-x-3">
                  <div className="w-14 h-14 bg-white rounded-xl overflow-hidden relative shrink-0 border border-slate-200">
                    <Image
                      src={item.gangSheetDetails?.previewUrl || item.image || '/placeholder.png'}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </h5>
                    {item.variantTitle && (
                      <p className="text-[11px] text-red-600">{item.variantTitle}</p>
                    )}
                  </div>

                  <span className="text-xs font-extrabold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({discountCode} - {discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({shippingMethod === 'express' ? 'Priority Express' : 'Standard'})</span>
                <span>{shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingCost)}</span>
              </div>

              <div className="flex justify-between">
                <span>Sales Tax ({province})</span>
                <span>{formatPrice(taxAmount)}</span>
              </div>

              <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total</span>
                <span className="text-red-600">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-500 space-y-1">
              <div className="font-bold text-slate-800">Ontario Facility Guarantee:</div>
              <p>Every gang sheet &amp; transfer is printed with commercial-grade Japanese ink and tested for wash durability before shipment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
