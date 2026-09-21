'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Search, ChevronDown, ArrowLeft, Phone, Mail, Flame, MessageCircle, MapPin, Zap, ShieldCheck } from 'lucide-react';
import { FAQS, STORE_INFO } from '@/data/storeData';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Ambient Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white">Canadian Support Active</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Knowledge Base <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">
              &amp; Support Hub
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our premium DTF transfers, gang sheet preparation, optimal pressing parameters, and lightning-fast Canadian shipping.
          </p>
        </div>

        {/* Main Content: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Premium Info / Visuals */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* The "Not Disgusting" Left Visual Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
              {/* Subtle inner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-red-500/20 transition-colors duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-900/50 transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                  <Flame className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Master The DTF Process</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Our transfers are engineered for high-volume screen printers and premium apparel brands. Get the perfect press every time.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 text-sm font-bold text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>50+ Wash Longevity</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm font-bold text-slate-300">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>24-48h Dispatch from ON</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#11141D] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-xl space-y-6">
              <h4 className="text-lg font-black text-white">Need immediate help?</h4>
              
              <div className="space-y-3">
                <a href={`mailto:${STORE_INFO.email}`} className="flex items-center p-4 bg-slate-900/80 hover:bg-slate-800 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mr-4 group-hover:bg-red-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email Support</div>
                    <div className="text-sm font-bold text-white">{STORE_INFO.email}</div>
                  </div>
                </a>

                <a href={`tel:${STORE_INFO.phoneClean}`} className="flex items-center p-4 bg-slate-900/80 hover:bg-slate-800 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mr-4 group-hover:bg-red-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Call Us (Mon-Fri)</div>
                    <div className="text-sm font-bold text-white">{STORE_INFO.phone}</div>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Satisfaction Guarantee Mini-Card (Balances Left/Right Heights) */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white mb-2">100% Quality Guarantee</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every print is double-inspected before dispatch. If it doesn't meet commercial standards, we reprint it free.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ Accordion & Search */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Search Box Removed as requested */}

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQS.length === 0 ? (
                <div className="bg-[#11141D] rounded-3xl p-12 text-center border border-white/5 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mx-auto border border-white/10">
                    <Search className="w-8 h-8 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-white">No exact matches found</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Try a different keyword or contact our support team directly.
                    </p>
                  </div>
                </div>
              ) : (
                FAQS.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={index}
                      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#151923] border-red-500/40 shadow-lg shadow-red-900/10 -translate-y-1'
                          : 'bg-[#0B0D14] border-white/5 hover:border-white/10 hover:bg-[#11141D] hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Active Accent Line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-rose-600 transition-transform duration-300 origin-top ${isOpen ? 'scale-y-100' : 'scale-y-0'}`} />

                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className={`w-full p-5 sm:p-6 text-left flex items-center justify-between font-extrabold text-sm sm:text-base transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <span className="pr-4">{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen ? 'bg-red-500/20' : 'bg-white/5 group-hover:bg-white/10'
                        }`}>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-red-400' : 'text-slate-500'
                            }`}
                          />
                        </div>
                      </button>

                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-6 pt-2">
                            <div className="bg-[#07090E] p-5 rounded-xl border border-white/5 shadow-inner">
                              <p className="text-sm text-slate-400 leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
