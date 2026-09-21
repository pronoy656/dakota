import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { STORE_INFO } from '@/data/storeData';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${STORE_INFO.name} | Custom DTF Transfers & Gang Sheets in Canada`,
  description: 'Order premium ready-to-press DTF transfers and custom gang sheets in Canada. Fast Ontario turnaround, 300 DPI high-definition, and 50+ wash durability. No pretreatment required.',
  keywords: [
    'DTF transfers Canada',
    'Custom DTF gang sheet',
    'Gang sheet builder',
    'Direct to film transfers Ontario',
    'Ready to press transfers',
    'Custom t-shirt printing Canada',
    'Wholesale DTF transfers'
  ],
  authors: [{ name: 'HDtees&tops' }],
  creator: 'HDtees&tops',
  publisher: 'HDtees&tops',
  openGraph: {
    title: 'Custom DTF Transfers & Gang Sheets in Canada | HDtees&tops',
    description: 'Order ready-to-press DTF transfers and custom gang sheets from a Canadian supplier. Upload, build, or shop ready-made designs.',
    url: 'https://hdteesandtops.com/',
    siteName: 'HDtees&tops',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom DTF Transfers & Gang Sheets in Canada | HDtees&tops',
    description: 'Order ready-to-press DTF transfers and custom gang sheets from a Canadian supplier.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${syne.variable} light scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
