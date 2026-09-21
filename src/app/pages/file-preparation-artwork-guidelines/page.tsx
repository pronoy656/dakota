'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowLeft, 
  Sparkles, 
  Calculator,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function ArtworkGuidelinesPage() {
  const [pixelWidth, setPixelWidth] = useState(3000);
  const [pixelHeight, setPixelHeight] = useState(3000);
  const [targetWidthInches, setTargetWidthInches] = useState(10);

  const calculatedDpi = targetWidthInches > 0 ? Math.round(pixelWidth / targetWidthInches) : 0;
  const calculatedHeightInches = calculatedDpi > 0 ? (pixelHeight / calculatedDpi).toFixed(1) : '0';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-red-600 flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Artwork Guidelines</span>
        </div>

        <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>File Preparation Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          File Preparation &amp; Artwork Guidelines
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Ensure your custom DTF gang sheets and ready-to-press transfers print with maximum clarity, vibrancy, and durability.
        </p>
      </div>

      {/* Core Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center font-black">
            300
          </div>
          <h3 className="font-extrabold text-base text-slate-900">300 DPI Resolution</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Submit files at full size at 300 DPI (dots per inch). Low resolution graphics (72 DPI web screenshots) will print blurry or pixelated.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Transparent PNG</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Transparent background is required for Direct-to-Film printing. Any solid white or black box around your art will print as solid ink.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">RGB Color Gamut</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We print in wide-gamut RGB with vibrant primary tones. Vector text should be converted to curves/outlines before export.
          </p>
        </div>
      </div>

      {/* Interactive DPI Calculator Tool */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-extrabold text-white">
            Interactive DPI &amp; Print Size Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Image Pixel Width (px):
            </label>
            <input
              type="number"
              value={pixelWidth}
              onChange={(e) => setPixelWidth(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Image Pixel Height (px):
            </label>
            <input
              type="number"
              value={pixelHeight}
              onChange={(e) => setPixelHeight(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">
              Desired Width on Shirt (Inches):
            </label>
            <input
              type="number"
              step="0.5"
              value={targetWidthInches}
              onChange={(e) => setTargetWidthInches(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-bold text-white"
            />
          </div>
        </div>

        {/* Calculation Result */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Print Resolution Output:</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-3xl font-black text-white">{calculatedDpi} DPI</span>
              {calculatedDpi >= 280 ? (
                <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold rounded-full">
                  ✓ High Quality (Pristine Print)
                </span>
              ) : calculatedDpi >= 150 ? (
                <span className="px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 text-xs font-bold rounded-full">
                  Medium Quality (Acceptable)
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 text-xs font-bold rounded-full">
                  Low Quality Warning (Pixelated)
                </span>
              )}
            </div>
          </div>

          <div className="text-right text-xs text-slate-400">
            <span>Printed Size: <strong>{targetWidthInches}&quot; W × {calculatedHeightInches}&quot; H</strong></span>
          </div>
        </div>
      </div>

      {/* CTA to Gang Sheet Builder */}
      <div className="bg-red-50 p-6 sm:p-8 rounded-3xl border border-red-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-extrabold text-slate-900">
            Ready to arrange and print your gang sheet?
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Use our online builder with live DPI validation and auto-nesting.
          </p>
        </div>
        <Link
          href="/products/gang-sheet-builder"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Flame className="w-4 h-4 text-yellow-300" />
          <span>Launch Gang Sheet Builder</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
