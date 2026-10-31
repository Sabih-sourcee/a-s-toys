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
import { LandingPage } from './components/LandingPage';
import { landingByPath, landingJsonLd } from './data/landings';
import { CartDrawer } from './components/CartDrawer';
import { ProductPage } from './components/ProductPage';
import { Seo } from './components/Seo';
import { WhatsAppLink } from './components/WhatsAppLink';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { StoryTeaser } from './components/StoryTeaser';
import { CATEGORIES, PRODUCTS } from './data/products';
import { CartItem, Product, Order } from './types';
import { MessageCircle, ArrowRight, Check } from 'lucide-react';
import { categoryPath, useRoute } from './lib/router';
import { WHATSAPP_HELP_MESSAGE } from './lib/whatsapp';
import { config } from './config';
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  HOME_DESCRIPTION,
  HOME_TITLE,
  categoryDescription,
  categoryItemListJsonLd,
  aboutPageJsonLd,
  categoryTitle,
  homeJsonLd,
  productDescription,
  productJsonLd,
  productTitle,
} from './lib/seo';

const CART_STORAGE_KEY = 'as_toys_cart';
const ORDERS_STORAGE_KEY = 'as_toys_orders';

export default function App() {
  const { route, navigate } = useRoute();
  const currentView: 'home' | 'shop' | 'about' | 'contact' =
    route.name === 'about'
      ? 'about'
      : route.name === 'contact'
        ? 'contact'
        : route.name === 'home'
          ? 'home'
          : 'shop';
  const selectedCategory = route.name === 'category' ? route.slug : 'all';
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
    navigate(categoryPath(category));
  };

  const openProduct = (product: Product) => {
    navigate(`/products/${product.slug}`);
  };

  const activeCategory = CATEGORIES.find((category) => category.slug === selectedCategory);
  const activeProduct = route.name === 'product'
    ? PRODUCTS.find((product) => product.slug === route.slug)
    : undefined;

  const activeLanding = route.name === 'landing' ? landingByPath(route.path) : undefined;

  const seo = route.name === 'landing' && activeLanding
    ? {
        title: activeLanding.title,
        description: activeLanding.description,
        path: activeLanding.path,
        jsonLd: landingJsonLd(activeLanding, config.siteUrl),
      }
    : route.name === 'product' && activeProduct
    ? {
        title: productTitle(activeProduct),
        description: productDescription(activeProduct),
        path: `/products/${activeProduct.slug}`,
        image: activeProduct.image,
        jsonLd: productJsonLd(activeProduct, config.siteUrl),
      }
    : route.name === 'category' && activeCategory
      ? {
          title: categoryTitle(activeCategory.name),
          description: categoryDescription(activeCategory.name, activeCategory.description),
          path: `/category/${activeCategory.slug}`,
          jsonLd: categoryItemListJsonLd(
            config.siteUrl,
            activeCategory.name,
            PRODUCTS.filter((product) => product.category === activeCategory.slug),
          ),
        }
      : route.name === 'about'
        ? {
            title: ABOUT_TITLE,
            description: ABOUT_DESCRIPTION,
            path: '/about',
            jsonLd: aboutPageJsonLd(),
          }
        : route.name === 'contact'
          ? {
              title: 'Contact & Wholesale | A & S Toys Pakistan',
              description:
                'Wholesale and partnership inquiries for A & S Toys. Sourcing toys for wholesalers for more than 10 years. Karachi-based, nationwide.',
              path: '/contact',
            }
        : route.name === 'shop'
          ? {
              title: 'All Toys Price in Karachi, Pakistan | A & S Toys',
              description: 'All toy prices in Karachi, Pakistan from A & S Toys. Cash on delivery.',
              path: '/shop',
            }
          : {
              title: HOME_TITLE,
              description: HOME_DESCRIPTION,
              path: '/',
              jsonLd: homeJsonLd(config.siteUrl),
            };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen min-w-0 bg-[#F6F3EC] text-[#182232] flex flex-col font-body antialiased selection:bg-[#182232] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 z-50 flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 rounded-[6px] bg-[#182232] px-5 py-2.5 text-xs font-headline font-bold text-white shadow-[0px_3px_0px_#182232] animate-in fade-in slide-in-from-bottom-3 duration-200 sm:text-sm">
          <Check className="w-4 h-4 text-[#E84A27] stroke-2" />
          <span className="min-w-0">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-[#E84A27] hover:text-white"
          >
            View bag
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Seo title={seo.title} description={seo.description} path={seo.path} image={'image' in seo ? seo.image : undefined} jsonLd={seo.jsonLd} />

      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          navigate(
            view === 'home'
              ? '/'
              : view === 'about'
                ? '/about'
                : view === 'contact'
                  ? '/contact'
                  : '/shop'
          );
        }}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && route.name !== 'shop' && route.name !== 'category') {
            navigate('/shop');
          }
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* View Content */}
      <main className="min-w-0 flex-1">
        {route.name === 'home' && (
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
            <section className="bg-[#F6F3EC] border-t border-[#DCD7CC]" id="featured-toys">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
                <div className="flex items-baseline justify-between gap-4 mb-8">
                  <div>
                    <span className="font-mono text-[11px] font-medium text-[#E84A27] tracking-[0.05em] uppercase">
                      Floor picks · In stock
                    </span>
                    <h2 className="font-headline text-[24px] sm:text-[28px] font-extrabold text-[#182232] mt-1 tracking-[-0.03em]">
                      Built for real play
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateToShop('all')}
                    className="hidden sm:inline-flex text-sm font-headline font-bold text-[#182232] hover:text-[#E84A27] transition-colors items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px]"
                    id="btn-view-all-shop-link"
                  >
                    See all picks
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="blueprint-grid grid-cols-2 md:grid-cols-3 wide:grid-cols-4">
                  {PRODUCTS.slice(0, 8).map((product) => (
                    <div key={product.id} className="p-2 sm:p-3 wide:p-4 bg-[#F6F3EC]">
                      <ProductCard
                        product={product}
                        onAddToCart={(p) => handleAddToCart(p, 1)}
                        onQuickView={openProduct}
                        isAdded={recentlyAddedId === product.id}
                      />
                    </div>
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
              onQuickView={openProduct}
              onExploreBabyToys={() => navigateToShop('pretend-play')}
              addedProductIds={recentlyAddedId ? [recentlyAddedId] : []}
            />

            <StoryTeaser
              onAboutClick={() => navigate('/about')}
              onShopClick={() => navigateToShop('all')}
            />

            <Newsletter />
          </>
        )}

        {route.name === 'landing' && activeLanding && (
          <div className="wide:pt-24">
            <LandingPage
              page={activeLanding}
              onOpenProduct={(slug) => navigate(`/products/${slug}`)}
            />
          </div>
        )}

        {(route.name === 'shop' || route.name === 'category') && (
          <div className="wide:pt-24">
            <ShopSection
              products={PRODUCTS}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onQuickView={openProduct}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => navigate(categoryPath(cat))}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
              addedProductIds={recentlyAddedId ? [recentlyAddedId] : []}
            />
          </div>
        )}

        {route.name === 'about' && (
          <div className="wide:pt-24">
            <AboutView
              onShopClick={() => navigateToShop('all')}
              onOpenProduct={(slug) => navigate(`/products/${slug}`)}
              onOpen={(path) => navigate(path)}
            />
          </div>
        )}

        {route.name === 'contact' && (
          <div className="wide:pt-24">
            <ContactView />
          </div>
        )}

        {route.name === 'product' && activeProduct && (
          <ProductPage
            product={activeProduct}
            onAddToCart={handleAddToCart}
            onBack={() => navigate(categoryPath(activeProduct.category))}
            onOpenProduct={(slug) => navigate(`/products/${slug}`)}
            isAdded={recentlyAddedId === activeProduct.id}
          />
        )}

        {route.name === 'product' && !activeProduct && (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 className="font-headline text-2xl font-bold">This toy is not in the catalog</h1>
            <button type="button" onClick={() => navigate('/shop')} className="btn-primary mt-6 cursor-pointer">
              Browse toys
            </button>
          </div>
        )}

        {route.name === 'notfound' && (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 className="font-headline text-2xl font-bold">Page not found</h1>
            <button type="button" onClick={() => navigate('/')} className="btn-primary mt-6 cursor-pointer">
              Back home
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          navigate(
            view === 'home'
              ? '/'
              : view === 'about'
                ? '/about'
                : view === 'contact'
                  ? '/contact'
                  : '/shop'
          );
        }}
        onSelectCategory={(cat) => navigateToShop(cat)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenGuide={(path) => navigate(path)}
      />

      {/* Floating Bottom Sticky Cart Bar (Mobile/Tablet) */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#E84A27] text-[#F6F3EC] p-3.5 rounded-[6px] shadow-[0px_3px_0px_#182232] flex items-center justify-between font-headline font-bold text-sm border-[1.5px] border-[#182232] active:translate-y-[2px] active:shadow-[0px_1px_0px_#182232] transition-all"
            id="mobile-sticky-cart-bar"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-[4px] bg-[#182232] text-[#F6F3EC] flex items-center justify-center text-xs font-mono">
                {totalCartCount}
              </span>
              <span>View bag</span>
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
        <WhatsAppLink
          message={WHATSAPP_HELP_MESSAGE}
          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3.5 rounded-[6px] shadow-[0px_3px_0px_#182232] flex items-center gap-2 font-headline font-bold text-xs transition-all border-[1.5px] border-[#182232]"
          id="floating-whatsapp-widget"
        >
          <MessageCircle className="w-5 h-5 fill-current shrink-0" />
          <span>WhatsApp</span>
        </WhatsAppLink>
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
