'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORE_INFO } from '@/data/storeData';

export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  variantTitle?: string;
  price: number;
  quantity: number;
  image: string;
  handle: string;
  isGangSheet?: boolean;
  gangSheetDetails?: {
    size: string;
    itemsCount: number;
    previewUrl?: string;
    uploadedFileName?: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string, variantId: string) => void;
  updateQuantity: (id: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discountAmount: number;
  discountCode: string;
  discountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingCost: number;
  taxAmount: number;
  total: number;
  totalItemsCount: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('hdtees_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCode = localStorage.getItem('hdtees_promo');
      if (savedCode) {
        const parsed = JSON.parse(savedCode);
        setDiscountCode(parsed.code);
        setDiscountPercent(parsed.percent);
      }
    } catch (e) {
      console.error('Error hydrating cart', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('hdtees_cart', JSON.stringify(cart));
      localStorage.setItem(
        'hdtees_promo',
        JSON.stringify({ code: discountCode, percent: discountPercent })
      );
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart, discountCode, discountPercent, isHydrated]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qtyToAdd = item.quantity && item.quantity > 0 ? item.quantity : 1;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.id === item.id && ci.variantId === item.variantId
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qtyToAdd,
        };
        return next;
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, variantId: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.variantId === variantId)));
  };

  const updateQuantity = (id: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a discount code' };
    }
    if (cleanCode === 'HD10' || cleanCode === 'SAVE10') {
      setDiscountCode(cleanCode);
      setDiscountPercent(10);
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'WELCOME15' || cleanCode === 'DTF15') {
      setDiscountCode(cleanCode);
      setDiscountPercent(15);
      return { success: true, message: '15% VIP discount applied!' };
    }
    if (cleanCode === 'FREESHIP') {
      setDiscountCode(cleanCode);
      setDiscountPercent(5);
      return { success: true, message: 'Free standard shipping discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "WELCOME15" or "HD10"' };
  };

  const removePromoCode = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Volume tiered discount:
  // If > 25 total items => 25% off, > 10 items => 15% off, > 5 items => 10% off (if promo percent is lower)
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  let effectiveDiscountPercent = discountPercent;
  if (totalItemsCount >= 25 && effectiveDiscountPercent < 25) {
    effectiveDiscountPercent = 25;
  } else if (totalItemsCount >= 10 && effectiveDiscountPercent < 15) {
    effectiveDiscountPercent = 15;
  } else if (totalItemsCount >= 5 && effectiveDiscountPercent < 10) {
    effectiveDiscountPercent = 10;
  }

  const discountAmount = Number(((subtotal * effectiveDiscountPercent) / 100).toFixed(2));
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  const freeShippingThreshold = STORE_INFO.freeShippingThreshold;
  const isFreeShipping = subtotalAfterDiscount >= freeShippingThreshold || discountCode === 'FREESHIP';
  const shippingCost = cart.length === 0 ? 0 : isFreeShipping ? 0 : 15.0;

  // Canadian HST/GST average estimation (13% ON)
  const taxAmount = Number(((subtotalAfterDiscount) * 0.13).toFixed(2));
  const total = Number((subtotalAfterDiscount + shippingCost + taxAmount).toFixed(2));

  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalAfterDiscount / freeShippingThreshold) * 100)
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        discountCode,
        discountPercent: effectiveDiscountPercent,
        applyPromoCode,
        removePromoCode,
        shippingCost,
        taxAmount,
        total,
        totalItemsCount,
        freeShippingRemaining,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
