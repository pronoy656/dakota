import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Flame, 
  Award, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { STORE_INFO } from '@/data/storeData';

export const metadata: Metadata = {
  title: 'About Us | HDtees&tops Canada',
  description: 'Learn about HDtees&tops, Canada’s leading supplier of custom DTF transfers, gang sheets, and apparel printing based in Southwold, Ontario.',
};

export default function AboutUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">About Us</span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-red-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center space-x-1.5 bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proudly Canadian DTF Printing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About HDtees&amp;tops
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Based in Southwold, Ontario, we are dedicated to providing apparel decorators, clothing brands, small businesses, and DIY creators with the highest quality Direct-to-Film (DTF) transfers and custom gang sheets in Canada.
        </p>
      </div>

      {/* Mission & Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Our Commitment to Print Excellence
          </h2>
          <p>
            Traditional garment printing methods like screen printing involve high setup costs and messy screens, while vinyl requires hours of tedious weeding.
          </p>
          <p>
            At <strong>HDtees&amp;tops</strong>, we use commercial Japanese DTF printers, ultra-vibrant textile inks, and premium European TPU hot-melt adhesive powders to produce heat transfers that press in just 12 seconds with soft hand-feel and 50+ wash longevity.
          </p>
          <div className="pt-2 space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Minimum Orders — Print 1 transfer or 200 feet</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full Color &amp; Gradients with Solid White Underbase</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Works on 100% Cotton, Polyester, Blends, Denim &amp; Canvas</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
            alt="DTF Production Workshop"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Facility & Location Info */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 space-y-6">
        <h3 className="text-xl font-black text-slate-900">Our Ontario Facility &amp; Support</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Facility Address</span>
            </div>
            <p>{STORE_INFO.address}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Phone</span>
            </div>
            <a href={`tel:${STORE_INFO.phoneClean}`} className="text-red-600 hover:underline font-bold">
              {STORE_INFO.phone}
            </a>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Email</span>
            </div>
            <a href={`mailto:${STORE_INFO.email}`} className="text-red-600 hover:underline font-bold">
              {STORE_INFO.email}
            </a>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Operating Hours</span>
            </div>
            <p>{STORE_INFO.hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
