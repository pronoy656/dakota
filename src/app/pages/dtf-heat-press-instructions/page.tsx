'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Clock, 
  Thermometer, 
  RotateCcw, 
  ShieldCheck, 
  Play, 
  Pause, 
  Volume2, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { STORE_INFO } from '@/data/storeData';

export default function HeatPressInstructionsPage() {
  // Interactive Timer
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      setTimerCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = (sec: number = 15) => {
    setIsTimerRunning(false);
    setTimerSeconds(sec);
    setTimerCompleted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-red-600 flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">DTF Heat Press Instructions</span>
        </div>

        <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
          <Flame className="w-3.5 h-3.5" />
          <span>Application &amp; Pressing Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          DTF Heat Press Instructions
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          Follow these recommended heat press settings to ensure vivid colors, ultra-soft hand feel, and 50+ wash durability on any fabric.
        </p>
      </div>

      {/* Recommended Heat Press Settings Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Optimal Machine Settings
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Standard Pressing Parameters
            </h2>
          </div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold">
            Cold Peel Formula
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 flex items-center">
              <Thermometer className="w-4 h-4 mr-1 text-red-500" />
              Temperature
            </span>
            <strong className="text-xl sm:text-2xl font-black text-white block">
              300°F <span className="text-xs text-slate-400 font-medium">(150°C)</span>
            </strong>
            <span className="text-[11px] text-slate-400">Polyester: 280°F (140°C)</span>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-blue-500" />
              Pressure
            </span>
            <strong className="text-xl sm:text-2xl font-black text-white block">
              Medium to Firm
            </strong>
            <span className="text-[11px] text-slate-400">Approx. 60 PSI</span>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 flex items-center">
              <Clock className="w-4 h-4 mr-1 text-amber-500" />
              Press Time
            </span>
            <strong className="text-xl sm:text-2xl font-black text-white block">
              10–15 Seconds
            </strong>
            <span className="text-[11px] text-slate-400">Pre-press garment 5s</span>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 flex items-center">
              <RotateCcw className="w-4 h-4 mr-1 text-emerald-500" />
              Peel Type
            </span>
            <strong className="text-xl sm:text-2xl font-black text-emerald-400 block">
              Cold Peel
            </strong>
            <span className="text-[11px] text-slate-400">Cool 20-30s before peeling</span>
          </div>
        </div>
      </div>

      {/* Interactive Press Countdown Timer Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1 text-red-600 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Interactive Press Timer</span>
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Heat Press Countdown Helper
          </h3>
          <p className="text-xs text-slate-500">
            Use this live timer while pressing your transfers at your machine.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`text-4xl sm:text-5xl font-black tabular-nums transition-colors ${
            timerCompleted ? 'text-emerald-600 animate-pulse' : 'text-slate-900'
          }`}>
            00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
            </button>
            <button
              onClick={() => resetTimer(15)}
              className="px-3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Step by Step Guide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">
          Step-by-Step Pressing Procedure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <span className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Pre-Press Fabric</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Press bare garment for 5 seconds at 300°F to flatten fabric and remove trapped moisture and wrinkles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Position Transfer</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Place the DTF film with the printed textured side facing down onto the garment in the desired position.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Main Press</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Press at 300°F (150°C) with medium-to-firm pressure for 10–15 seconds using protective parchment paper.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
              4
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Cold Peel Film</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Allow transfer to cool down completely (20-30s). Smoothly peel the PET film starting from a corner.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              5
            </span>
            <h4 className="font-extrabold text-sm text-slate-900">Post-Press Finish</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cover with parchment or Teflon paper and press again for 5 seconds to lock in wash durability and soft hand.
            </p>
          </div>
        </div>
      </div>

      {/* Washing & Garment Care */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-4">
        <h3 className="font-extrabold text-lg text-slate-900">
          Washing &amp; Garment Longevity Instructions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-bold">1.</span>
            <span>Wait 24 hours before first machine washing.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-bold">2.</span>
            <span>Turn garments inside-out before loading.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-bold">3.</span>
            <span>Machine wash cold with mild detergent.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-bold">4.</span>
            <span>Do not use chlorine bleach or fabric softener.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-bold">5.</span>
            <span>Tumble dry on low heat or hang dry.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-600 font-bold">6.</span>
            <span>Never iron directly on the printed graphic.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
