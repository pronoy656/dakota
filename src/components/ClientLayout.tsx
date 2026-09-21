'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import QuickViewModal from '@/components/QuickViewModal';
import { Product } from '@/data/storeData';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen transition-colors duration-300">
              <Header onOpenSearch={() => setIsSearchOpen(true)} />
              
              <main className="flex-1 w-full">
                {children}
              </main>

              <Footer />

              {/* Global Modals & Drawers */}
              <CartDrawer />
              <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
              <QuickViewModal 
                product={quickViewProduct} 
                onClose={() => setQuickViewProduct(null)} 
              />
            </div>
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
