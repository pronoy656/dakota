'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Printer, 
  ArrowRight, 
  Download, 
  Mail, 
  ShieldCheck,
  Flame
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function OrderConfirmationPage() {
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const lastOrder = localStorage.getItem('hdtees_last_order');
      if (lastOrder) {
        setOrder(JSON.parse(lastOrder));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fallbackOrder = {
    orderId: 'HD-893214',
    date: 'Today',
    subtotal: 37.50,
    shippingCost: 0,
    taxAmount: 4.88,
    total: 42.38,
    customer: {
      name: 'Valued Canadian Customer',
      email: 'customer@example.com',
      address: '113 Bodkin Road, Southwold, ON N0L 2G0, Canada',
    },
    items: [
      {
        title: 'Build Your Custom DTF Gang Sheet (22" x 24")',
        variantTitle: '22" x 24"',
        quantity: 1,
        price: 15.00,
      }
    ]
  };

  const displayOrder = order || fallbackOrder;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Success Badge Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Order Successfully Placed
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Thank You For Your Order!
        </h1>

        <p className="text-sm text-slate-500 max-w-md mx-auto">
          We received your order <strong className="text-slate-900">#{displayOrder.orderId}</strong>. A confirmation email has been sent to <strong>{displayOrder.customer?.email}</strong>.
        </p>

        {/* Live Order Production Tracker */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 max-w-xl mx-auto text-left space-y-4 mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Production Status:</span>
            <span className="text-emerald-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              In Ontario Print Queue
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-emerald-600 text-white rounded-xl font-bold shadow-xs">
              <Printer className="w-4 h-4 mx-auto mb-1" />
              <span>1. Printing &amp; Curing</span>
            </div>
            <div className="p-3 bg-slate-200 text-slate-700 rounded-xl font-medium">
              <Package className="w-4 h-4 mx-auto mb-1 text-slate-500" />
              <span>2. Quality Check</span>
            </div>
            <div className="p-3 bg-slate-200 text-slate-700 rounded-xl font-medium">
              <Truck className="w-4 h-4 mx-auto mb-1 text-slate-500" />
              <span>3. Shipped</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Order #{displayOrder.orderId}
            </h3>
            <span className="text-xs text-slate-400">Placed on {displayOrder.date}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Shipping details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
          <div>
            <strong className="text-slate-900 block font-bold mb-1">Shipping To:</strong>
            <p className="font-semibold text-slate-800">{displayOrder.customer?.name}</p>
            <p>{displayOrder.customer?.address}</p>
          </div>

          <div>
            <strong className="text-slate-900 block font-bold mb-1">Production Facility:</strong>
            <p>HDtees&amp;tops Canada</p>
            <p>113 Bodkin Road, Southwold, ON N0L 2G0</p>
            <p className="text-slate-400 mt-1">Support: teesandtops@outlook.com</p>
          </div>
        </div>

        {/* Items */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <strong className="text-xs text-slate-900 block font-bold">Items in Order:</strong>
          <div className="divide-y divide-slate-100">
            {displayOrder.items?.map((item: any, idx: number) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{item.title}</span>
                  {item.variantTitle && (
                    <span className="text-red-600 block text-[11px]">{item.variantTitle}</span>
                  )}
                  <span className="text-slate-400">Qty: {item.quantity}</span>
                </div>
                <span className="font-extrabold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total calculation */}
        <div className="border-t border-slate-200 pt-4 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-bold text-slate-900">{formatPrice(displayOrder.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{displayOrder.shippingCost === 0 ? 'FREE' : formatPrice(displayOrder.shippingCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Tax:</span>
            <span>{formatPrice(displayOrder.taxAmount)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
            <span>Total Paid:</span>
            <span className="text-red-600">{formatPrice(displayOrder.total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all text-center"
          >
            Back to Homepage
          </Link>
          <Link
            href="/pages/dtf-heat-press-instructions"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all text-center"
          >
            View Heat Press Instructions
          </Link>
        </div>
      </div>
    </div>
  );
}
