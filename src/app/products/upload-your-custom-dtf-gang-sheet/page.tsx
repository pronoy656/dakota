'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UploadCloud, 
  CheckCircle2, 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  FileText, 
  Flame, 
  Clock, 
  Info,
  ArrowLeft
} from 'lucide-react';
import { GANG_SHEET_SIZES, PRODUCTS } from '@/data/storeData';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function UploadGangSheetPage() {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Default to 22" x 24" ($15.00)
  const [quantity, setQuantity] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; preview: string } | null>(null);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSize = GANG_SHEET_SIZES[selectedSizeIndex];
  const unitPrice = currentSize.price;

  // Volume discount calculation
  let discountPercent = 0;
  if (quantity >= 25) discountPercent = 25;
  else if (quantity >= 10) discountPercent = 15;
  else if (quantity >= 5) discountPercent = 10;

  const discountedUnitPrice = unitPrice * (1 - discountPercent / 100);
  const totalPrice = discountedUnitPrice * quantity;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedFile({
        name: file.name,
        size: sizeFormatted,
        preview: event.target?.result as string || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!uploadedFile) {
      alert('Please upload your print-ready gang sheet file before adding to cart.');
      return;
    }

    addToCart({
      id: '7907253682227',
      variantId: `upload-gs-${currentSize.width}x${currentSize.height}`,
      title: `Upload Your Custom DTF Gang Sheet (${currentSize.size})`,
      variantTitle: currentSize.size,
      price: unitPrice,
      image: uploadedFile.preview,
      handle: 'upload-your-custom-dtf-gang-sheet',
      isGangSheet: true,
      gangSheetDetails: {
        size: currentSize.size,
        itemsCount: 1,
        uploadedFileName: uploadedFile.name,
        previewUrl: uploadedFile.preview,
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
        <span className="text-slate-900 font-bold">Upload Your Custom DTF Gang Sheet</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: File Uploader & Guidelines */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
                Print-Ready Artwork Uploader
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Upload Your Custom DTF Gang Sheet
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Have your artwork already prepared? Upload your transparent background file and select your sheet size.
              </p>
            </div>

            {/* Drag & Drop Upload Zone */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/svg+xml, application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {!uploadedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-3xl p-8 sm:p-12 text-center cursor-pointer bg-slate-50 hover:bg-red-50/30 transition-all group"
              >
                <div className="w-16 h-16 bg-red-100/70 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Click to Browse or Drag &amp; Drop Artwork File
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Accepted formats: <strong>PNG, PDF, SVG, AI, PSD</strong>. Transparent background at 300 DPI recommended.
                </p>
                <div className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-red-600 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200">
                  <span>Select File from Computer</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden relative shrink-0 border border-slate-200">
                    <Image
                      src={uploadedFile.preview}
                      alt="Uploaded artwork preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Artwork Uploaded</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                      {uploadedFile.name}
                    </h4>
                    <span className="text-xs text-slate-400">{uploadedFile.size}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Special Instructions / Notes */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Printing Notes &amp; Special Instructions (Optional):
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g. Please leave 1 inch margin at the top, or special color alignment instructions..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
              />
            </div>
          </div>

          {/* Artwork Specs Box */}
          <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center">
              <FileText className="w-4 h-4 mr-2 text-red-500" />
              Artwork Checklist for Perfect Prints
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Transparent Background:</strong> Ensure design is transparent so no background rectangle prints.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>300 DPI Resolution:</strong> Low-resolution artwork may appear pixelated or blurry.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>RGB Color Mode:</strong> For optimal neon and vibrant color gamut rendering.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Exact Sizing:</strong> Ensure file width matches exactly 22 inches.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Size Selection & Pricing */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            {/* Sheet Size Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                1. Select Gang Sheet Size:
              </label>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {GANG_SHEET_SIZES.map((size, idx) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedSizeIndex === idx
                        ? 'border-red-600 bg-red-50/80 text-red-700 shadow-2xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <span className="font-extrabold text-xs sm:text-sm">
                      {size.size}
                    </span>
                    <span className="font-bold text-xs sm:text-sm">
                      {formatPrice(size.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Bulk Discounts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">
                  2. Select Quantity:
                </label>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {discountPercent}% Bulk Discount Applied!
                  </span>
                )}
              </div>

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

              {/* Bulk Tier Helper Table */}
              <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Automatic Volume Discounts:</div>
                <div className="flex justify-between">
                  <span>5 – 9 sheets:</span>
                  <strong className="text-red-600">10% OFF</strong>
                </div>
                <div className="flex justify-between">
                  <span>10 – 24 sheets:</span>
                  <strong className="text-red-600">15% OFF</strong>
                </div>
                <div className="flex justify-between">
                  <span>25+ sheets:</span>
                  <strong className="text-red-600">25% OFF</strong>
                </div>
              </div>
            </div>

            {/* Total Calculation & CTA */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span>{quantity} × {formatPrice(discountedUnitPrice)}</span>
                </div>
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
                <span>{added ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>

              <div className="text-center">
                <Link
                  href="/products/gang-sheet-builder"
                  className="text-xs text-slate-500 hover:text-red-600 font-semibold hover:underline"
                >
                  Don&apos;t have a gang sheet ready? Use our Visual Builder
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
