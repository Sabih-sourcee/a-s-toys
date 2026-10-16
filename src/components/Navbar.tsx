import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react';
import { ShoppingBag, Search, Truck, X, Menu, Home, Store, Info } from 'lucide-react';
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

const SCROLL_THRESHOLD = 72;

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onNavigate,
  currentView,
  onSearchChange,
  searchQuery,
  onOpenTracker,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const pillTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 340, damping: 32, mass: 0.9 };
  const fadeTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.18 };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrolled = latest > SCROLL_THRESHOLD;
    setIsScrolled(scrolled);
    if (!scrolled) setManualOpen(false);
  });

  const expanded = manualOpen || !isScrolled;

  const navLinks = [
    { label: 'Home', href: '/', icon: Home, onClick: () => onNavigate('home'), active: currentView === 'home' },
    { label: 'Shop', href: '/shop', icon: Store, onClick: () => onNavigate('shop'), active: currentView === 'shop' },
    { label: 'About', href: '/about', icon: Info, onClick: () => onNavigate('about'), active: currentView === 'about' },
  ];

  const goto = (fn: () => void) => {
    fn();
    setShowSearch(false);
    if (isScrolled) setManualOpen(false);
  };

  return (
    <>
      <div className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
        <motion.div
          layout
          transition={pillTransition}
          className="pointer-events-auto rounded-[6px] border-[1.5px] border-[#182232] bg-[#F6F3EC] shadow-[0px_3px_0px_#182232] overflow-hidden"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {expanded ? (
              <motion.div
                key="full"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fadeTransition}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5"
              >
                <a
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    goto(() => onNavigate('home'));
                  }}
                  className="shrink-0 pl-1 pr-1.5 sm:pr-2 cursor-pointer"
                  aria-label="A & S Toys home"
                  id="nav-brand-logo"
                >
                  <BrandMark tone="on-light" size="sm" />
                </a>

                <div className="hidden sm:flex items-center gap-1 font-headline text-sm font-bold border-l border-[#DCD7CC] pl-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        goto(link.onClick);
                      }}
                      className={`px-3 py-2.5 rounded-[6px] transition-colors cursor-pointer min-h-[44px] inline-flex items-center gap-1.5 ${
                        link.active
                          ? 'bg-[#182232] text-[#F6F3EC]'
                          : 'text-[#5A6270] hover:text-[#182232] hover:bg-[#EDE8DD]'
                      }`}
                      id={`nav-link-${link.label.toLowerCase()}`}
                      aria-current={link.active ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                  <button
                    onClick={() => goto(onOpenTracker)}
                    className="px-3 py-2.5 rounded-[6px] text-[#5A6270] hover:text-[#182232] hover:bg-[#EDE8DD] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                    id="nav-link-track"
                    aria-label="Track order"
                  >
                    <Truck aria-hidden="true" className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex sm:hidden items-center gap-0.5 border-l border-[#DCD7CC] pl-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          goto(link.onClick);
                        }}
                        className={`w-11 h-11 rounded-[6px] flex items-center justify-center transition-colors cursor-pointer ${
                          link.active ? 'bg-[#182232] text-[#F6F3EC]' : 'text-[#5A6270] hover:bg-[#EDE8DD]'
                        }`}
                        aria-label={link.label}
                        aria-current={link.active ? 'page' : undefined}
                      >
                        <Icon aria-hidden="true" className="w-4 h-4" />
                      </a>
                    );
                  })}
                  <button
                    onClick={() => goto(onOpenTracker)}
                    className="w-11 h-11 rounded-[6px] flex items-center justify-center text-[#5A6270] hover:bg-[#EDE8DD] transition-colors cursor-pointer"
                    aria-label="Track order"
                  >
                    <Truck aria-hidden="true" className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 border-l border-[#DCD7CC] pl-1 sm:pl-1.5">
                  <AnimatePresence initial={false}>
                    {showSearch && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 150, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center bg-[#EDE8DD] border border-[#DCD7CC] rounded-[6px] pl-3 pr-1 h-11 w-[150px]">
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
                            className="w-full text-xs font-body text-[#182232] bg-transparent outline-none"
                            id="nav-search-input"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => {
                      if (showSearch) onSearchChange('');
                      setShowSearch((v) => !v);
                    }}
                    className="w-11 h-11 shrink-0 rounded-[6px] bg-[#EDE8DD] text-[#5A6270] hover:text-[#182232] transition-colors cursor-pointer flex items-center justify-center"
                    id="nav-search-trigger"
                    aria-label={showSearch ? 'Close search' : 'Search'}
                    aria-pressed={showSearch}
                  >
                    {showSearch ? <X aria-hidden="true" className="w-4 h-4" /> : <Search aria-hidden="true" className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={onOpenCart}
                    className="flex items-center gap-1.5 bg-[#E84A27] hover:translate-y-[2px] text-[#F6F3EC] pl-3 pr-2.5 h-11 rounded-[6px] border-[1.5px] border-[#182232] shadow-[0px_3px_0px_#182232] hover:shadow-[0px_1px_0px_#182232] transition-all cursor-pointer shrink-0"
                    id="header-cart-button"
                    aria-label={`Cart, ${totalCartCount} item${totalCartCount === 1 ? '' : 's'}`}
                  >
                    <ShoppingBag aria-hidden="true" className="w-4 h-4" />
                    <span aria-hidden="true" className="bg-[#182232] text-[#F6F3EC] text-[10px] font-mono font-medium tracking-wider rounded-[4px] w-5 h-5 flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fadeTransition}
                onClick={() => setManualOpen(true)}
                className="w-12 h-12 flex items-center justify-center cursor-pointer text-[#182232] relative"
                aria-label={totalCartCount > 0 ? `Open menu, ${totalCartCount} item${totalCartCount === 1 ? '' : 's'} in cart` : 'Open menu'}
                id="nav-collapsed-trigger"
              >
                <Menu aria-hidden="true" className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span aria-hidden="true" className="absolute top-1.5 right-1.5 bg-[#E84A27] text-[#F6F3EC] text-[9px] font-mono font-medium rounded-[3px] w-4 h-4 flex items-center justify-center border border-[#182232]">
                    {totalCartCount}
                  </span>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
