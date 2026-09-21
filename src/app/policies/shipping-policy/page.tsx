import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { STORE_INFO } from '@/data/storeData';

export const metadata: Metadata = {
  title: 'Shipping Policy | HDtees&tops Canada',
  description: 'Shipping terms, turnaround times, and delivery speeds across Canada for HDtees&tops custom DTF transfers.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Shipping Policy</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900">Shipping Policy</h1>
        <p className="text-xs text-slate-500">Fast, Secure &amp; Reliable Delivery Across Canada</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. Order Processing Time</h2>
          <p>
            We begin processing your order as soon as payment has been successfully received.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>Standard Processing Time:</strong> 1–3 Business Days from our Southwold, Ontario facility.</li>
            <li><strong>Large, Bulk, or Rolling Gang Sheets:</strong> May require 1 additional production day for curing and quality assurance.</li>
            <li>Orders are printed and shipped Monday through Friday, excluding Canadian public holidays.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. Canadian Shipping Methods &amp; Rates</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>Canada Post Expedited Parcel:</strong> 2–4 Business Days across most provinces. $15.00 flat rate or <strong>FREE on orders over $150 CAD</strong>.</li>
            <li><strong>Priority Express Courier:</strong> 1–2 Business Days with expedited queue jumping. $25.00 flat rate.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Order Tracking</h2>
          <p>
            Once your order has been packaged and handed over to the carrier, you will automatically receive a Shipping Confirmation Email with your tracking link to follow your parcel in real-time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">4. Shipping Address Accuracy</h2>
          <p>
            Please double-check your shipping address during checkout. HDtees&amp;tops is not responsible for delays or failed deliveries caused by incorrect or incomplete shipping details provided by the customer.
          </p>
        </section>
      </div>
    </div>
  );
}
