'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyType = 'CAD' | 'USD';

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (amountInCad: number) => string;
  rate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyType>('CAD');
  const [isHydrated, setIsHydrated] = useState(false);

  // 1 CAD = 0.74 USD (1 USD = ~1.36 CAD)
  const rate = currency === 'CAD' ? 1.0 : 0.74;

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hdtees_currency') as CurrencyType;
      if (saved && (saved === 'CAD' || saved === 'USD')) {
        setCurrencyState(saved);
      }
    } catch (e) {
      console.error(e);
    }
    setIsHydrated(true);
  }, []);

  const setCurrency = (c: CurrencyType) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('hdtees_currency', c);
    } catch (e) {
      console.error(e);
    }
  };

  const formatPrice = (amountInCad: number): string => {
    const converted = amountInCad * rate;
    const formatted = converted.toFixed(2);
    return `${currency === 'CAD' ? 'CA$' : '$'}${formatted} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rate }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
