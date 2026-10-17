import React from 'react';
import { Mail, MapPin, MessageCircle, Phone, Truck } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { BrandMark } from './BrandMark';
import { WhatsAppLink } from './WhatsAppLink';
import { categoryPath } from '../lib/router';
import { config } from '../config';

interface FooterProps {
  onNavigate: (view: 'home' | 'shop' | 'about' | 'contact') => void;
  onSelectCategory: (cat: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenTracker,
}) => {
  return (
    <footer className="bg-[#182232] text-[#C8CFD8] pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-[#F6F3EC]/15">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="font-headline text-sm font-bold text-[#F6F3EC]">Quick links</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <a href="/" onClick={(event) => { event.preventDefault(); onNavigate('home'); }} className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" onClick={(event) => { event.preventDefault(); onNavigate('shop'); }} className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left">
                  Shop all toys
                </a>
              </li>
              <li>
                <a href="/about" onClick={(event) => { event.preventDefault(); onNavigate('about'); }} className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(event) => { event.preventDefault(); onNavigate('contact'); }} className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left">
                  Contact / Wholesale
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#E84A27] font-bold"
                >
                  <Truck aria-hidden="true" className="w-3.5 h-3.5" />
                  Track order
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-[#F6F3EC]">Collections</h4>
            <ul className="space-y-2 text-sm font-body">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={categoryPath(cat.slug)}
                    onClick={(event) => {
                      event.preventDefault();
                      onSelectCategory(cat.slug);
                    }}
                    className="hover:text-[#F6F3EC] transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-[#F6F3EC]">Follow us</h4>
            <ul className="space-y-2 text-sm font-body">
              <li>
                <WhatsAppLink className="inline-flex items-center gap-2 font-headline font-bold text-sm text-[#25D366] hover:text-[#F6F3EC] transition-colors">
                  <MessageCircle aria-hidden="true" className="w-4 h-4" />
                  WhatsApp {config.phone}
                </WhatsAppLink>
              </li>
              <li><span className="text-[#C8CFD8]/70">Instagram</span></li>
              <li><span className="text-[#C8CFD8]/70">Facebook</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-headline text-sm font-bold text-[#F6F3EC]">Contact</h4>
            <ul className="space-y-2.5 text-sm font-body">
              {config.address ? (
                <li className="flex items-start gap-2">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-[#E84A27] shrink-0 mt-0.5" />
                  <span>{config.address}</span>
                </li>
              ) : null}
              <li className="flex items-center gap-2">
                <Phone aria-hidden="true" className="w-4 h-4 text-[#E84A27] shrink-0" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail aria-hidden="true" className="w-4 h-4 text-[#E84A27] shrink-0" />
                <a href={`mailto:${config.email}`} className="hover:text-[#F6F3EC] break-all">
                  {config.email}
                </a>
              </li>
              <li>Courier: {config.courier}. Nationwide delivery.</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
          <p className="text-xs text-[#C8CFD8]/70 order-2 sm:order-1 font-mono tracking-wider uppercase">
            © {new Date().getFullYear()} A &amp; S Toys Pakistan
          </p>
          <div className="order-1 sm:order-2 self-end sm:self-auto opacity-95">
            <BrandMark tone="on-dark" size="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
