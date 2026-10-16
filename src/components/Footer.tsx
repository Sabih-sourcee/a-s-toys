import React from 'react';
import { MessageCircle, Truck } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { BrandMark } from './BrandMark';
import { WhatsAppLink } from './WhatsAppLink';
import { TrustFacts } from './TrustFacts';
import { categoryPath } from '../lib/router';

interface FooterProps {
  onNavigate: (view: 'home' | 'shop' | 'about') => void;
  onSelectCategory: (cat: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenTracker,
}) => {
  return (
    <footer className="bg-[#0A2B70] text-[#DBE4FA] pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-white/15">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="font-headline text-sm font-bold text-white">Quick links</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a href="/" onClick={(event) => { event.preventDefault(); onNavigate('home'); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" onClick={(event) => { event.preventDefault(); onNavigate('shop'); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  Shop all toys
                </a>
              </li>
              <li>
                <a href="/about" onClick={(event) => { event.preventDefault(); onNavigate('about'); }} className="hover:text-white transition-colors cursor-pointer text-left">
                  About
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#F0A63A] font-bold"
                >
                  <Truck className="w-3.5 h-3.5" />
                  Track order
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-white">Collections</h4>
            <ul className="space-y-2 text-sm font-body">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <a
                    href={categoryPath(cat.slug)}
                    onClick={(event) => {
                      event.preventDefault();
                      onSelectCategory(cat.slug);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-white">Follow us</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <WhatsAppLink className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-[#25D366]">
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </WhatsAppLink>
              </li>
              <li><span className="text-[#DBE4FA]/70">Instagram</span></li>
              <li><span className="text-[#DBE4FA]/70">Facebook</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-white">Contact</h4>
            <TrustFacts className="space-y-2.5 text-sm font-body" />
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
          <p className="text-xs text-[#DBE4FA]/70 order-2 sm:order-1">
            © {new Date().getFullYear()} A &amp; S Toys Pakistan. All rights reserved.
          </p>
          <div className="order-1 sm:order-2 self-end sm:self-auto opacity-95">
            <BrandMark tone="on-dark" size="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
