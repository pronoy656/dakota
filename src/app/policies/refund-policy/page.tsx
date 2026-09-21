import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | HDtees&tops Canada',
  description: 'Refund terms, replacement guidelines, and customer satisfaction guarantee for HDtees&tops custom DTF orders.',
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Refund Policy</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900">Refund Policy</h1>
        <p className="text-xs text-slate-500">Your Satisfaction Is Our Top Priority</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. Custom Made Products</h2>
          <p>
            Because our custom DTF transfers, gang sheets, and custom printed apparel are custom-manufactured specifically to your artwork specifications, we cannot accept returns or exchanges for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Incorrect size selected by the customer.</li>
            <li>Customer change of mind after printing has begun.</li>
            <li>Low-resolution artwork or spelling mistakes uploaded by the customer.</li>
            <li>Minor color variations between digital monitor screens and cured textile inks.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. Printing Defects &amp; Replacements</h2>
          <p>
            If your order arrives with a printing defect, physical manufacturing flaw, or incorrect items, we will gladly reprint and replace your order free of charge or issue a store credit.
          </p>
          <p>
            To submit a claim, please email <strong>teesandtops@outlook.com</strong> within <strong>48 hours of delivery</strong> with your order number and clear photographs of the defect.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Order Cancellations</h2>
          <p>
            Orders can only be modified or cancelled before printing has commenced. Once files enter production queue, materials and inks are allocated and cancellations cannot be accepted.
          </p>
        </section>
      </div>
    </div>
  );
}
