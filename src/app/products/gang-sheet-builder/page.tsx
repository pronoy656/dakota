import React from 'react';
import type { Metadata } from 'next';
import GangSheetBuilderCanvas from '@/components/GangSheetBuilderCanvas';
import { Sparkles, ShieldCheck, Flame, Award, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Build Your Custom DTF Gang Sheet | HDtees&tops Canada',
  description: 'Interactive 2D Gang Sheet Builder. Upload multiple designs, auto-nest to minimize waste, verify 300 DPI resolution, and order custom DTF rolls across Canada.',
};

export default function GangSheetBuilderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
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
          <span className="text-slate-900 font-bold">Build Your Custom DTF Gang Sheet</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              <span>Interactive 2D Canvas Studio</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Build Your Custom DTF Gang Sheet
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Arrange multiple designs on a continuous 22&quot; roll. Auto-nest to maximize space, check live print resolution, and order with 24-48 hour Ontario turnaround.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-slate-900">300 DPI Live Check</strong>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>1–2 Days Production</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Gang Sheet Builder Canvas */}
      <GangSheetBuilderCanvas initialHeight={24} />

      {/* Specifications & Instructions Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black">
            1
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Upload High-Res Artwork</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Upload transparent PNG, SVG, or PDF files. Our system evaluates pixel density in real-time so your prints arrive crystal clear.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">
            2
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Auto-Nest &amp; Arrange</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Use the Auto-Nest button to automatically pack your designs with 0.25&quot; safety margins, cutting down on wasted space and cost.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">
            3
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Cold Peel Heat Press</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Press at 300°F for 10–15 seconds with medium/firm pressure. Let it cool completely before peeling for a flawless finish.
          </p>
        </div>
      </div>
    </div>
  );
}
