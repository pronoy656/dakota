'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Flame, 
  Layers, 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function RollingGangSheetPage() {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [rollLengthInches, setRollLengthInches] = useState(60); // Default 60 inches (5 feet)
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Price per inch decreases for longer rolls
  const getPricePerInch = (length: number) => {
    if (length >= 240) return 0.50;
    if (length >= 120) return 0.55;
    if (length >= 60) return 0.60;
    return 0.625;
  };

  const pricePerInch = getPricePerInch(rollLengthInches);
  const rollUnitPrice = Number((rollLengthInches * pricePerInch).toFixed(2));
  const totalFeet = (rollLengthInches / 12).toFixed(1);
  const totalPrice = Number((rollUnitPrice * quantity).toFixed(2));

  const handleAddToCart = () => {
    addToCart({
      id: '7871161729075',
      variantId: `roll-22x${rollLengthInches}`,
      title: `Rolling Gang Sheet (22" x ${rollLengthInches}" Roll)`,
      variantTitle: `22" x ${rollLengthInches}" (${totalFeet} ft)`,
      price: rollUnitPrice,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      handle: 'rolling-gang-sheet-builder',
      isGangSheet: true,
      gangSheetDetails: {
        size: `22" x ${rollLengthInches}" (${totalFeet} ft)`,
        itemsCount: 1,
      },
      quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <Link href="/collections/gang-sheet-builders" className="hover:text-red-600">
          Gang Sheet Builders
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Rolling Gang Sheet Builder</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Visual Roll Graphic & Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
                Continuous Roll Printing
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
                Rolling Gang Sheet Builder
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Need continuous rolls for high-volume brand production or big merchandising runs? Specify exact inch lengths up to 360 inches (30 feet) with automatic volume savings.
              </p>
            </div>

            <div className="relative aspect-16/9 w-full bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="Continuous DTF Roll"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Commercial Continuous Feed
                  </span>
                  <h3 className="text-xl font-black text-white">
                    22&quot; Width Continuous Master Roll
                  </h3>
                  <p className="text-xs text-slate-300">
                    Precision heat-cured PET film with dense hot-melt TPU backing.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <strong className="text-xs font-bold text-slate-900 block">Seamless Continuous</strong>
                <span className="text-[11px] text-slate-500">Up to 30 continuous feet per roll</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <strong className="text-xs font-bold text-slate-900 block">Tiered Length Discount</strong>
                <span className="text-[11px] text-slate-500">Starts at only $0.50 per inch</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <strong className="text-xs font-bold text-slate-900 block">Ontario Production</strong>
                <span className="text-[11px] text-slate-500">Fast 1–2 business day dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Length Slider & Price */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            {/* Custom Length Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center">
                  <Sliders className="w-4 h-4 mr-1.5 text-red-600" />
                  Select Roll Length:
                </label>
                <div className="text-right">
                  <span className="text-lg font-black text-red-600">{rollLengthInches}&quot; Inches</span>
                  <span className="text-xs text-slate-400 block font-medium">({totalFeet} Feet)</span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="24"
                max="360"
                step="12"
                value={rollLengthInches}
                onChange={(e) => setRollLengthInches(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[24, 60, 120, 240].map((len) => (
                  <button
                    key={len}
                    onClick={() => setRollLengthInches(len)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                      rollLengthInches === len
                        ? 'bg-red-600 text-white border-red-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {len}&quot; ({len / 12} ft)
                  </button>
                ))}
              </div>
            </div>

            {/* Price Per Inch Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Roll Dimensions:</span>
                <strong className="text-slate-900">22&quot; Wide × {rollLengthInches}&quot; Long</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Rate per inch:</span>
                <strong className="text-emerald-600">{formatPrice(pricePerInch)} / inch</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Roll Unit Price:</span>
                <strong className="text-slate-900">{formatPrice(rollUnitPrice)}</strong>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Quantity of Rolls:
              </label>
              <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 w-full sm:w-48">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center bg-transparent font-extrabold text-sm text-slate-900 focus:outline-hidden"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price & Add to Cart */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Total Price</span>
                  <span className="text-3xl font-black text-slate-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                {totalPrice >= 150 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ✓ FREE Canadian Shipping
                  </span>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-extrabold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{added ? 'Added to Cart!' : 'Add Rolling Sheet to Cart'}</span>
              </button>

              <div className="text-center">
                <Link
                  href="/products/gang-sheet-builder"
                  className="text-xs text-slate-500 hover:text-red-600 font-semibold hover:underline"
                >
                  Need to design online? Open our Visual Gang Sheet Builder
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
