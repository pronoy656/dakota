'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowLeft, 
  HelpCircle,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { STORE_INFO } from '@/data/storeData';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('gang-sheet');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-red-600 flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Contact Us</span>
      </div>

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
          <Phone className="w-3.5 h-3.5" />
          <span>Customer Support &amp; Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          We&apos;re Here to Help!
        </h1>
        <p className="text-sm sm:text-base text-slate-500">
          Whether you need assistance choosing the right gang sheet size, preparing artwork files, or tracking an existing order, our team is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Details & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xl font-extrabold text-white">
              Contact Information
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm font-bold">Facility Location</strong>
                  <p className="mt-0.5">{STORE_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm font-bold">Direct Phone</strong>
                  <a href={`tel:${STORE_INFO.phoneClean}`} className="text-red-400 hover:text-white font-extrabold mt-0.5 block text-sm">
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm font-bold">Email Support</strong>
                  <a href={`mailto:${STORE_INFO.email}`} className="text-blue-400 hover:text-white font-medium mt-0.5 block">
                    {STORE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm font-bold">Production &amp; Support Hours</strong>
                  <p className="mt-0.5">{STORE_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-2 text-xs text-slate-600">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
              Fast Response Guarantee
            </h4>
            <p>
              We respond to all customer emails and artwork review inquiries within 1 business day. For urgent production questions, please call us directly.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900">
              Send Us a Message
            </h3>

            {isSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-black text-lg">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out to HDtees&amp;tops. Our support team will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g. Michael Tremblay"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E.g. michael@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="E.g. (519) 555-0123"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold"
                    >
                      <option value="gang-sheet">Custom Gang Sheet Help</option>
                      <option value="artwork">Artwork / DPI File Check</option>
                      <option value="bulk">Bulk / Wholesale Pricing</option>
                      <option value="order-status">Existing Order Status</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Message / Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with your DTF transfer order today?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to HDtees&amp;tops</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
