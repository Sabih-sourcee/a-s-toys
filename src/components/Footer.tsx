import React from 'react';
import { Mail, MapPin, MessageCircle, Truck } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { BrandMark } from './BrandMark';
import { ShopNumbers } from './ShopNumbers';
import { WhatsAppLink } from './WhatsAppLink';
import { LANDINGS } from '../data/landings';
import { categoryPath } from '../lib/router';
import { config } from '../config';

interface FooterProps {
  onNavigate: (view: 'home' | 'shop' | 'about' | 'contact') => void;
  onSelectCategory: (cat: string) => void;
  onOpenTracker: () => void;
  onOpenGuide: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenTracker,
  onOpenGuide,
}) => {
  return (
    <footer className="bg-[#182232] text-[#C8CFD8] pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 pb-10 border-b border-[#F6F3EC]/15">
          <div className="min-w-0 space-y-3">
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
                <a
                  href="/return-policy"
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenGuide('/return-policy');
                  }}
                  className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left"
                >
                  Return &amp; replacement
                </a>
              </li>
              {LANDINGS.map((page) => (
                <li key={page.path}>
                  <a
                    href={page.path}
                    onClick={(event) => {
                      event.preventDefault();
                      onOpenGuide(page.path);
                    }}
                    className="hover:text-[#F6F3EC] transition-colors cursor-pointer text-left"
                  >
                    {page.navLabel}
                  </a>
                </li>
              ))}
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

          <div className="min-w-0 space-y-3">
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

          <div className="min-w-0 space-y-3">
            <h4 className="font-headline text-sm font-bold text-[#F6F3EC]">Follow us</h4>
            <ul className="space-y-2 text-sm font-body">
              <li className="min-w-0">
                <WhatsAppLink className="inline-flex max-w-full items-start gap-2 font-headline font-bold text-sm text-[#25D366] hover:text-[#F6F3EC] transition-colors">
                  <MessageCircle aria-hidden="true" className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="min-w-0 break-words">WhatsApp {config.whatsappPhone}</span>
                </WhatsAppLink>
              </li>
              <li><span className="text-[#C8CFD8]/70">Instagram</span></li>
              <li><span className="text-[#C8CFD8]/70">Facebook</span></li>
            </ul>
          </div>

          <div className="min-w-0 space-y-3">
            <h4 className="font-headline text-sm font-bold text-[#F6F3EC]">Contact</h4>
            {config.address ? (
              <ul className="space-y-2.5 text-sm font-body">
                <li className="flex items-start gap-2 min-w-0">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-[#E84A27] shrink-0 mt-0.5" />
                  <span className="min-w-0 break-words">{config.address}</span>
                </li>
              </ul>
            ) : null}
            <ShopNumbers linkClassName="text-[#C8CFD8] hover:text-[#F6F3EC] transition-colors" />
            <ul className="space-y-2.5 text-sm font-body">
              <li className="flex items-center gap-2 min-w-0">
                <Mail aria-hidden="true" className="w-4 h-4 text-[#E84A27] shrink-0" />
                <a href={`mailto:${config.email}`} className="min-w-0 break-all hover:text-[#F6F3EC]">
                  {config.email}
                </a>
              </li>
              <li>Delivery takes 2-5 business days via TCS or Leopards.</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="order-1 lg:order-2 opacity-95">
            <BrandMark tone="on-dark" size="footer" />
          </div>
          <p className="text-xs text-[#C8CFD8]/70 order-2 lg:order-1 font-mono tracking-wider uppercase">
            © {new Date().getFullYear()} A &amp; S Toys Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};
