'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Phone, Mail, MapPin, Heart, ChevronRight, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '@/data/storeData';

const SOCIAL = [
  { label: 'Facebook',  href: '#', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', href: '#', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { label: 'TikTok',    href: '#', path: 'M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5' },
  { label: 'YouTube',   href: '#', path: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  { label: 'Pinterest', href: '#', path: 'M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.52-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.11-2.39 3.11-5.22 0-2.16-1.46-3.77-4.1-3.77-2.99 0-4.85 2.23-4.85 4.72 0 .86.25 1.46.64 1.93.18.22.21.3.14.56-.05.18-.16.62-.2.79-.07.26-.28.36-.51.26-1.43-.59-2.09-2.17-2.09-3.95 0-2.93 2.48-6.45 7.41-6.45 3.97 0 6.59 2.88 6.59 5.98 0 4.1-2.27 7.16-5.6 7.16-1.12 0-2.18-.6-2.54-1.28l-.69 2.64c-.25.96-.93 2.17-1.38 2.9.04.01.07.02.11.02C17.52 22 22 17.52 22 12 22 6.48 17.52 2 12 2z' },
];

export default function Footer() {
  return (
    <footer
      className="footer-dark"
      style={{
        background: '#0B0D14', // Very dark blue/black from the image
        color: '#8A94A6',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Ambient red glow – bottom left */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '-150px', left: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Ambient red glow – top right */}
      <div aria-hidden style={{
        position: 'absolute', top: '-150px', right: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Main grid ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '60px 40px 30px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1.5fr 1fr 1fr',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* ─── Col 1: Brand ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: '#ff1133', // Bright red from image
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(255,17,51,0.3)',
              }}>
                <Flame style={{ width: '24px', height: '24px', color: '#ffffff' }} />
              </div>
              <span style={{
                fontSize: '28px', fontWeight: 800, color: '#ffffff',
                letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)',
              }}>
                HDtees<span style={{ fontSize: '14px', verticalAlign: 'super' }}>®</span>
              </span>
            </Link>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#8A94A6', margin: 0, maxWidth: '280px' }}>
              Canada&apos;s #1 custom DTF transfer supplier. Premium gang sheets, ready-to-press graphics—zero minimums, shipped fast from Ontario.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: Phone, text: STORE_INFO.phone, href: `tel:${STORE_INFO.phoneClean}` },
                { icon: Mail, text: STORE_INFO.email, href: `mailto:${STORE_INFO.email}` },
                { icon: MapPin, text: STORE_INFO.address },
              ].map(({ icon: Icon, text, href }: any) => {
                const inner = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon style={{ width: '16px', height: '16px', color: '#ff1133', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: '#8A94A6' }}>{text}</span>
                  </div>
                );
                return href
                  ? <a key={text} href={href} style={{ textDecoration: 'none' }}>{inner}</a>
                  : <div key={text}>{inner}</div>;
              })}
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              {SOCIAL.map(({ label, href, path }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#1A1E29', // Dark container
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#2A3040')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#1A1E29')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ─── Col 2: Hero product visual ───────────────── */}
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '200px', // Fixed height for alignment
          }}>
             {/* 3D Card Stack Illusion */}
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
               {/* Back card */}
              <div style={{
                position: 'absolute', top: '10px', left: '-20px', width: '100%', height: '100%',
                background: '#151923', borderRadius: '16px',
                transform: 'rotate(-15deg)', border: '1px solid #2A3040',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }} />
               {/* Middle card */}
              <div style={{
                position: 'absolute', top: '5px', left: '-10px', width: '100%', height: '100%',
                background: '#1A1E29', borderRadius: '16px',
                transform: 'rotate(-5deg)', border: '1px solid #333A4D',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }} />
              {/* Front card (Glowing) */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(135deg, #1A1E29 0%, #0B0D14 100%)',
                borderRadius: '16px',
                transform: 'rotate(5deg)',
                border: '1px solid rgba(255,17,51,0.3)',
                boxShadow: '0 15px 40px rgba(255,17,51,0.2), inset 0 0 20px rgba(255,17,51,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '8px', zIndex: 10,
              }}>
                 {/* Inner Red Glow behind flame */}
                <div style={{
                    position: 'absolute', width: '80px', height: '80px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,17,51,0.5) 0%, transparent 70%)',
                    zIndex: -1,
                }} />
                <Flame style={{ width: '60px', height: '60px', color: '#ff5533', fill: '#ff1133' }} />
                <span style={{
                    fontSize: '16px', fontWeight: 800, color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.1em', transform: 'rotate(-45deg) translateY(20px) translateX(-20px)',
                    position: 'absolute', bottom: 10, right: -10,
                }}>
                    HDtees
                </span>
              </div>
            </div>
          </div>

          {/* ─── Col 3: Tagline + checkmarks ──────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
            <p style={{
              fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#ff1133', margin: 0,
            }}>
              PREMIUM QUALITY
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{
                fontSize: '32px', fontWeight: 900, lineHeight: 1.1,
                color: '#ffffff', margin: 0,
                letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)',
              }}>
                Print Your Ideas.
              </h2>
              <h2 style={{
                fontSize: '32px', fontWeight: 900, lineHeight: 1.1,
                color: '#ff1133', margin: 0,
                letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)',
              }}>
                Wear the Difference.
              </h2>
              {/* Red underline */}
              <div style={{ width: '30px', height: '3px', background: '#ff1133', borderRadius: '2px', marginTop: '16px', marginBottom: '8px' }} />
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['High-Quality DTF Transfers', 'Vibrant & Long-Lasting Prints', 'Fast & Reliable Shipping'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: '#ff1133',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                      <CheckCircle2 style={{ width: '14px', height: '14px', color: '#ffffff' }} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#8A94A6', fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Col 4: Products ──────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
            <p style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#8A94A6', margin: 0,
            }}>
              PRODUCTS
            </p>
             <div style={{ width: '24px', height: '2px', background: '#ff1133', borderRadius: '2px', marginTop: '-10px' }} />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Gang Sheet Builder', href: '/products/gang-sheet-builder' },
                { label: 'Upload Gang Sheet', href: '/products/upload-your-custom-dtf-gang-sheet' },
                { label: 'Rolling Gang Sheet', href: '/products/rolling-gang-sheet-builder' },
                { label: 'Ready-to-Press', href: '/collections/camping' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontSize: '14px', fontWeight: 500,
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ff1133')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                  >
                    {label}
                    <ChevronRight style={{ width: '16px', height: '16px', color: '#8A94A6' }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Col 5: Help ──────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
            <p style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#8A94A6', margin: 0,
            }}>
              HELP
            </p>
            <div style={{ width: '24px', height: '2px', background: '#ff1133', borderRadius: '2px', marginTop: '-10px' }} />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Heat Press Guide', href: '/pages/dtf-heat-press-instructions' },
                { label: 'FAQ', href: '/pages/faq' },
                { label: 'Contact Us', href: '/pages/contact-us' },
                { label: 'Privacy Policy', href: '/policies/privacy-policy' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontSize: '14px', fontWeight: 500,
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ff1133')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#ffffff')}
                  >
                    {label}
                    <ChevronRight style={{ width: '16px', height: '16px', color: '#8A94A6' }} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div style={{
          marginTop: '60px',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: '#8A94A6', margin: 0 }}>
            © {new Date().getFullYear()} HDtees&tops. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#8A94A6', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            Made with <Heart style={{ width: '12px', height: '12px', color: '#ff1133', fill: '#ff1133' }} /> in Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
