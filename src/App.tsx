import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryRow } from './components/CategoryRow';
import { ProductCard } from './components/ProductCard';
import { ShopSection } from './components/ShopSection';
import { ToddlersEarlyYears } from './components/ToddlersEarlyYears';
import { Guarantees } from './components/Guarantees';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AboutView } from './components/AboutView';
import { StoryTeaser } from './components/StoryTeaser';
import { PRODUCTS } from './data/products';
import { CartItem, Product, Order } from './types';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';

const CART_STORAGE_KEY = 'as_toys_cart';
const ORDERS_STORAGE_KEY = 'as_toys_orders';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Quick feedback state
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setRecentlyAddedId(product.id);
    setToastMessage(`Added "${product.title}" to basket!`);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setLastPlacedOrder(order);
  };

  // View navigation helpers
  const navigateToShop = (category = 'all') => {
    setSelectedCategory(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#211F1C] flex flex-col font-body antialiased selection:bg-[#0F3D9C] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1D1B18] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs sm:text-sm font-headline font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#52D489] stroke-2" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-[#F0A63A] hover:text-white"
          >
            View Basket
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentView !== 'shop') {
            setCurrentView('shop');
          }
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* View Content */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero
              onShopClick={() => navigateToShop('all')}
              onExploreAgeClick={() => navigateToShop('all')}
            />

            <CategoryRow
              onSelectCategory={(slug) => navigateToShop(slug)}
              onViewAll={() => navigateToShop('all')}
              selectedCategory={selectedCategory}
            />

            {/* Top playtime picks — ivory, asymmetric heading, light cards */}
            <section className="bg-[#FBF9F4] border-t border-[#EBE5DA]" id="featured-toys">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
                <div className="flex items-baseline justify-between gap-4 mb-8">
                  <div>
                    <span className="text-[11px] font-body font-bold text-[#C4291F] tracking-[0.15em] uppercase">
                      This week
                    </span>
                    <h2 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#211F1C] mt-1">
                      Top playtime picks
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateToShop('all')}
                    className="hidden sm:inline-flex text-sm font-headline font-bold text-[#0F3D9C] hover:text-[#C4291F] transition-colors items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px]"
                    id="btn-view-all-shop-link"
                  >
                    See all picks
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {PRODUCTS.slice(0, 8).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      onQuickView={(p) => setActiveQuickViewProduct(p)}
                      isAdded={recentlyAddedId === product.id}
                    />
                  ))}
                </div>

                <div className="mt-8 sm:hidden">
                  <button
                    onClick={() => navigateToShop('all')}
                    className="btn-secondary w-full py-3 cursor-pointer"
                    id="btn-view-all-shop-link-mobile"
                  >
                    See all picks
                  </button>
                </div>
              </div>
            </section>

            <Guarantees />

            <ToddlersEarlyYears
              products={PRODUCTS}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onQuickView={(p) => setActiveQuickViewProduct(p)}
              onExploreBabyToys={() => navigateToShop('baby-toddler')}
              addedProductIds={recentlyAddedId ? [recentlyAddedId] : []}
            />

            <StoryTeaser
              onAboutClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onShopClick={() => navigateToShop('all')}
            />

            <Newsletter />
          </>
        )}

        {currentView === 'shop' && (
          <ShopSection
            products={PRODUCTS}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onQuickView={(p) => setActiveQuickViewProduct(p)}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            addedProductIds={recentlyAddedId ? [recentlyAddedId] : []}
          />
        )}

        {currentView === 'about' && (
          <AboutView onShopClick={() => navigateToShop('all')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => navigateToShop(cat)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Floating Bottom Sticky Cart Bar (Mobile/Tablet) */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#0F3D9C] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-between font-headline font-bold text-sm border-2 border-white/20 active:scale-95 transition-transform"
            id="mobile-sticky-cart-bar"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C4291F] flex items-center justify-center text-xs">
                {totalCartCount}
              </span>
              <span>View Basket</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Rs. {cartSubtotal.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Floating WhatsApp Live Help Widget */}
      <div className="fixed bottom-5 right-5 z-30 hidden sm:block">
        <a
          href="https://wa.me/923001234567?text=Assalam-o-Alaikum!%20I%20am%20browsing%20A%20%26%20S%20Toys%20and%20need%20help%20choosing%20a%20toy."
          target="_blank"
          rel="noreferrer"
          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-xl flex items-center gap-2 font-headline font-bold text-xs transition-all hover:scale-105 group border-2 border-white"
          title="Chat with our Lahore shop team"
          id="floating-whatsapp-widget"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
            Lahore Shop Live (15s Video)
          </span>
        </a>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreShop={() => {
          setIsCartOpen(false);
          navigateToShop('all');
        }}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={(product, qty) => {
          handleAddToCart(product, qty);
        }}
        isAdded={activeQuickViewProduct ? recentlyAddedId === activeQuickViewProduct.id : false}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmed / Success Modal */}
      <OrderSuccessModal
        order={lastPlacedOrder}
        onClose={() => setLastPlacedOrder(null)}
        onContinueShopping={() => {
          setLastPlacedOrder(null);
          navigateToShop('all');
        }}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        recentOrders={orders}
      />
    </div>
  );
}
