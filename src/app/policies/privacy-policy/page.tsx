import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | HDtees&tops Canada',
  description: 'Privacy terms and customer data protection policy for HDtees&tops.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Privacy Policy</span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Your Privacy Matters to Us</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">1. Information We Collect</h2>
          <p>
            When you purchase custom DTF transfers or interact with our website, we collect necessary customer details including your name, email address, shipping destination, phone number, and uploaded artwork files to fulfill your order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>To print and ship your custom gang sheets and transfers.</li>
            <li>To send automated tracking notifications and order confirmations.</li>
            <li>To provide timely customer service and resolve inquiries.</li>
          </ul>
          <p className="font-semibold text-slate-900 mt-2">
            We never sell, trade, or rent your personal information to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">3. Payment Security</h2>
          <p>
            All financial transactions are processed securely through certified PCI-DSS compliant payment gateways. We do not store or process your full credit card numbers on our local servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-slate-900">4. Contact Privacy Officer</h2>
          <p>
            If you have questions regarding your data or wish to request data removal, please contact us at <strong>teesandtops@outlook.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
