import React from 'react';
import { ShoppingBag, Search, MessageCircle, Truck, X } from 'lucide-react';
import { CartItem } from '../types';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigate: (view: 'home' | 'shop' | 'about') => void;
  currentView: 'home' | 'shop' | 'about';
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onNavigate,
  currentView,
  onSearchChange,
  searchQuery,
  onOpenTracker,
}) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const linkClass = (active: boolean) =>
    `px-4 py-2 rounded-full transition-colors cursor-pointer min-h-[44px] inline-flex items-center ${
      active
        ? 'bg-[#0F3D9C] text-white'
        : 'text-[#58554F] hover:text-[#0F3D9C] hover:bg-[#F4EFE6]'
    }`;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#EBE5DA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="shrink-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F3D9C] focus-visible:outline-offset-2 rounded-lg"
            id="nav-brand-logo"
            aria-label="A & S Toys home"
          >
            <BrandMark tone="on-light" size="md" />
          </button>

          <div className="hidden lg:flex items-center gap-1 font-headline text-sm font-bold">
            <button onClick={() => onNavigate('home')} className={linkClass(currentView === 'home')} id="nav-link-home">
              Home
            </button>
            <button onClick={() => onNavigate('shop')} className={linkClass(currentView === 'shop')} id="nav-link-shop">
              Shop
            </button>
            <button onClick={() => onNavigate('about')} className={linkClass(currentView === 'about')} id="nav-link-about">
              About
            </button>
            <button
              onClick={onOpenTracker}
              className="px-3 py-2 rounded-full text-[#58554F] hover:text-[#0F3D9C] hover:bg-[#F4EFE6] transition-colors flex items-center gap-1.5 cursor-pointer text-sm font-headline font-bold min-h-[44px]"
              id="nav-link-track"
            >
              <Truck className="w-4 h-4 text-[#0F3D9C]" />
              Track order
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-white border-2 border-[#0F3D9C] rounded-lg px-3 py-2 w-44 sm:w-64">
                  <Search className="w-4 h-4 text-[#58554F] shrink-0 mr-1.5" />
                  <input
                    type="text"
                    placeholder="Search toys…"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (currentView !== 'shop') onNavigate('shop');
                    }}
                    autoFocus
                    aria-label="Search toys"
                    className="w-full text-sm font-body text-[#211F1C] bg-transparent outline-none"
                    id="nav-search-input"
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      onSearchChange('');
                    }}
                    className="text-[#58554F] hover:text-[#211F1C] ml-1 min-h-[28px] min-w-[28px] flex items-center justify-center"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-full bg-[#F4EFE6] text-[#58554F] hover:text-[#0F3D9C] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  id="nav-search-trigger"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            <a
              href="https://wa.me/923001234567?text=Assalam-o-Alaikum!%20I%20am%20browsing%20A%26S%20Toys%20Pakistan%20and%20would%20like%20assistance."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-headline font-bold px-3.5 py-2.5 rounded-full transition-colors min-h-[44px]"
              id="header-wa-chat"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-white border border-[#EBE5DA] px-3.5 py-2.5 rounded-full hover:border-[#0F3D9C] transition-colors cursor-pointer min-h-[44px]"
              id="header-cart-button"
              aria-label={`Cart, ${totalCartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#0F3D9C]" />
              <span className="font-headline text-xs font-bold text-[#0F3D9C] hidden sm:inline">Cart</span>
              <span className="bg-[#C4291F] text-white text-[11px] font-headline font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        <div className="lg:hidden border-t border-[#EBE5DA] bg-[#FBF9F4] px-4 py-2 flex items-center justify-around text-xs font-headline font-bold">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-full cursor-pointer min-h-[44px] ${
              currentView === 'home' ? 'bg-[#0F3D9C] text-white' : 'text-[#58554F]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className={`px-3 py-2 rounded-full cursor-pointer min-h-[44px] ${
              currentView === 'shop' ? 'bg-[#0F3D9C] text-white' : 'text-[#58554F]'
            }`}
          >
            Shop
          </button>
          <button
            onClick={onOpenTracker}
            className="px-3 py-2 rounded-full text-[#58554F] flex items-center gap-1 cursor-pointer min-h-[44px]"
          >
            <Truck className="w-3.5 h-3.5" />
            Track
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-2 rounded-full cursor-pointer min-h-[44px] ${
              currentView === 'about' ? 'bg-[#0F3D9C] text-white' : 'text-[#58554F]'
            }`}
          >
            About
          </button>
        </div>
      </nav>
    </>
  );
};
