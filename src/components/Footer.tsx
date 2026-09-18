import React from 'react';
import { Phone, MapPin, Mail, MessageCircle, Truck } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { BrandMark } from './BrandMark';

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
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Shop all toys
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Lahore shop
                </button>
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
                  <button
                    onClick={() => {
                      onNavigate('shop');
                      onSelectCategory(cat.slug);
                    }}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-white">Follow us</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 text-[#25D366]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </li>
              <li><span className="text-[#DBE4FA]/70">Instagram</span></li>
              <li><span className="text-[#DBE4FA]/70">Facebook</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-white">Contact</h4>
            <ul className="space-y-2.5 text-sm font-body">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F0A63A] shrink-0 mt-0.5" />
                <span>Main Market, Gulberg III, Lahore</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F0A63A] shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F0A63A] shrink-0" />
                <span>salam@astoys.pk</span>
              </li>
            </ul>
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
