import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { COLLECTIONS } from '@/data/storeData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All DTF Collections | HDtees&tops Canada',
  description: 'Browse all custom DTF transfer collections, Gang Sheet Builders, camping graphics, and custom apparel blanks.',
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 text-slate-100 font-sans">
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-red-950/80 text-red-400 border border-red-800/40 px-3.5 py-1 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Catalog Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
          All DTF Collections
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl">
          Discover our full catalog of custom gang sheets, ready-to-press transfers, continuous rolls, and blank apparel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.handle}`}
            className="group glass-surface glass-surface-hover rounded-3xl overflow-hidden border border-white/[0.08] flex flex-col"
          >
            <div className="relative aspect-4/3 w-full bg-[#080b12] overflow-hidden p-6">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-400">
                  {col.itemCount} Products
                </span>
                <h3 className="text-xl font-black text-white leading-tight mt-0.5 font-heading">
                  {col.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {col.description}
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
