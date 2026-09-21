import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | HDtees&tops Canada',
  description: 'Terms of service and customer agreements for HDtees&tops website and custom DTF orders.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Terms of Service</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500">Welcome to HDtees&amp;tops</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By browsing, using, or placing an order on HDtees&amp;tops, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. Custom Artwork &amp; Copyright</h2>
          <p>
            Customers are solely responsible for ensuring they possess the appropriate copyright, trademark permissions, or licenses for all artwork, logos, and graphics uploaded for printing. HDtees&amp;tops assumes no liability for trademark or copyright infringement on customer-provided designs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Pricing &amp; Modifications</h2>
          <p>
            All prices are listed in Canadian Dollars (CAD) or USD where selected. HDtees&amp;tops reserves the right to modify prices, volume discount tiers, and product specifications at any time without prior notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">4. Governing Law</h2>
          <p>
            These terms and any separate agreements shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada.
          </p>
        </section>
      </div>
    </div>
  );
}
