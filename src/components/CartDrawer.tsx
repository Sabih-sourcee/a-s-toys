import React, { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, MessageCircle, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { config, shippingQuote } from '../config';
import { WhatsAppLink } from './WhatsAppLink';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onExploreShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreShop,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [couponOpen, setCouponOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = shippingQuote(subtotal);
  const shippingFee = cartItems.length === 0 ? 0 : shipping.fee;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const freeOver = shipping.freeOver;
  const amountNeededForFreeShipping = freeOver ? Math.max(0, freeOver - subtotal) : 0;
  const shippingProgress = freeOver ? Math.min(100, Math.round((subtotal / freeOver) * 100)) : 0;
  const freeShippingUnlocked = Boolean(freeOver && shippingFee === 0 && subtotal >= freeOver);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'WELCOME10' || clean === 'PAKISTAN' || clean === 'KARACHIJOY') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied successfully!');
    } else if (clean === 'TOYLOVE') {
      setDiscountPercent(15);
      setPromoSuccess('15% VIP discount applied!');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 or PAKISTAN');
    }
  };

  // WhatsApp Order formatted text
  const whatsappCartMessage =
    `Assalam-o-Alaikum! I want to order the following toys from A & S Toys:\n\n` +
      cartItems
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.product.title} (x${item.quantity}) - Rs. ${(
              item.product.price * item.quantity
            ).toLocaleString()}`
        )
        .join('\n') +
      `\n\nSubtotal: Rs. ${subtotal.toLocaleString()}` +
      `\nShipping: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`}` +
      (discountAmount > 0 ? `\nDiscount: -Rs. ${discountAmount.toLocaleString()}` : '') +
      `\n*Total Amount:* Rs. ${total.toLocaleString()}` +
      `\nPayment: cash on delivery, JazzCash, EasyPaisa, or bank transfer`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex h-full w-full max-w-md pl-3 sm:pl-10">
        <div
          className="flex h-full min-h-0 w-full flex-col bg-[#F6F3EC] border-l border-[#DCD7CC] shadow-[0px_4px_0px_rgba(24,34,50,0.2)]"
          id="cart-drawer-panel"
        >
          <div className="shrink-0 border-b border-[#DCD7CC] bg-[#F6F3EC] px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <ShoppingBag aria-hidden="true" className="h-5 w-5 shrink-0 text-[#182232]" />
                <h2 className="truncate font-headline text-lg font-bold text-[#182232]">
                  Your bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] text-[#5A6270] hover:bg-[#EDE8DD] hover:text-[#182232] transition-colors cursor-pointer"
                aria-label="Close cart"
                id="btn-close-cart"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          {cartItems.length > 0 && freeOver ? (
            <div className="shrink-0 border-b border-[#C8CFD8] bg-[#EDE8DD] px-4 py-2">
              <div className="mb-1 flex items-center gap-2 text-[11px] font-headline font-bold leading-tight text-[#182232]">
                <Truck aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                <p className="min-w-0 flex-1">
                  {freeShippingUnlocked ? (
                    'Free shipping unlocked'
                  ) : (
                    <>
                      Add{' '}
                      <span className="money">Rs. {amountNeededForFreeShipping.toLocaleString()}</span>
                      {' '}for free shipping
                    </>
                  )}
                </p>
                <span className="shrink-0 tabular-nums">{shippingProgress}%</span>
              </div>
              <div
                className="h-1 overflow-hidden rounded-full bg-[#C8CFD8]"
                role="progressbar"
                aria-valuenow={shippingProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progress toward free shipping"
              >
                <div
                  className="h-full rounded-full bg-[#182232] transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 p-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[6px] bg-[#EDE8DD] text-[#182232]">
                  <ShoppingBag aria-hidden="true" className="h-10 w-10 opacity-70" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#182232]">
                    Your basket is empty
                  </h3>
                  <p className="mt-1 max-w-xs font-body text-xs text-[#5A6270]">
                    Explore the catalog to start an order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreShop();
                  }}
                  className="btn-push-blue cursor-pointer rounded-[6px] px-6 py-2.5 font-headline text-xs font-bold text-white"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 rounded-[6px] border border-[#DCD7CC] bg-[#F6F3EC] p-3"
                    id={`cart-item-${item.product.id}`}
                  >
                    <div className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EDE8DD]/50 p-1.5">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="truncate font-headline text-xs font-bold text-[#182232] sm:text-sm">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="relative shrink-0 cursor-pointer p-1 text-gray-400 transition-colors hover:text-[#E84A27] before:absolute before:-inset-2.5 before:content-['']"
                            aria-label={`Remove ${item.product.title} from basket`}
                          >
                            <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="block text-[11px] text-[#5A6270]">
                          {item.product.ageLabel ? `${item.product.ageLabel} · ` : ''}{item.product.categoryName}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#EDE8DD] pt-1">
                        <div className="flex items-center rounded-[6px] border border-[#DCD7CC] bg-[#F6F3EC] p-0.5">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[6px] text-xs font-bold text-[#182232] hover:bg-[#F6F3EC] before:absolute before:-inset-2.5 before:content-['']"
                            aria-label={`Decrease quantity of ${item.product.title}`}
                          >
                            <span aria-hidden="true">-</span>
                          </button>
                          <span className="w-7 text-center font-headline text-xs font-bold text-[#182232]" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.product.stock}
                            className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[6px] text-xs font-bold text-[#182232] hover:bg-[#F6F3EC] disabled:opacity-30 before:absolute before:-inset-2.5 before:content-['']"
                            aria-label={`Increase quantity of ${item.product.title}`}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>

                        <span className="money font-headline text-sm font-extrabold text-[#182232]">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="shrink-0 space-y-2.5 border-t border-[#DCD7CC] bg-[#F6F3EC] px-4 py-3 sm:px-5">
              <div>
                <button
                  type="button"
                  id="btn-toggle-coupon"
                  aria-expanded={couponOpen}
                  aria-controls="cart-coupon-panel"
                  onClick={() => setCouponOpen((open) => !open)}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-headline text-sm font-bold text-[#182232] underline decoration-[#182232]/40 underline-offset-2"
                >
                  <Tag aria-hidden="true" className="h-3.5 w-3.5" />
                  Have a coupon?
                </button>

                {couponOpen && (
                  <form id="cart-coupon-panel" onSubmit={handleApplyPromo} className="mt-2 flex gap-2">
                    <div className="relative flex-1">
                      <label htmlFor="cart-promo-input" className="sr-only">Coupon code</label>
                      <Tag aria-hidden="true" className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#5A6270]" />
                      <input
                        id="cart-promo-input"
                        type="text"
                        placeholder="WELCOME10"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="h-11 w-full rounded-[6px] border border-[#DCD7CC] bg-white pl-8 pr-3 font-body text-base uppercase text-[#182232] outline-none focus:border-[#182232]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 cursor-pointer rounded-[6px] bg-[#182232] px-4 font-headline text-xs font-bold text-white transition-colors hover:bg-[#182232]"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoSuccess && (
                  <p className="mt-1.5 text-[11px] font-bold text-[#182232]">{promoSuccess}</p>
                )}
                {promoError && (
                  <p className="mt-1.5 text-[11px] font-bold text-[#E84A27]">{promoError}</p>
                )}
              </div>

              <div className="space-y-1 border-t border-[#EDE8DD] pt-2 font-body text-xs text-[#5A6270]">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0">Subtotal</span>
                  <span className="money font-bold text-[#182232]">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0">Nationwide Courier ({config.courier})</span>
                  <span className="money shrink-0 text-right font-bold">
                    {shippingFee === 0 ? (
                      <span className="font-headline uppercase text-[#182232]">FREE</span>
                    ) : (
                      shipping.label
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-baseline justify-between gap-3 font-bold text-[#182232]">
                    <span className="min-w-0">Discount ({discountPercent}%)</span>
                    <span className="money shrink-0">-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-3 border-t border-[#DCD7CC] pt-2 font-headline text-sm">
                  <span className="font-extrabold text-[#182232]">Total (PKR)</span>
                  <span className="money text-xl font-black text-[#182232]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onProceedToCheckout}
                  className="btn-push-red flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] py-2.5 font-headline text-sm font-bold text-white shadow-[0px_2px_0px_#182232]"
                  id="btn-proceed-to-checkout"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>

                <WhatsAppLink
                  message={whatsappCartMessage}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border-[1.5px] border-[#182232] bg-[#25D366] py-2.5 font-headline text-xs font-bold text-white shadow-[0px_3px_0px_#182232] transition-colors hover:bg-[#1EBE5D]"
                  id="btn-order-via-whatsapp-cart"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4 fill-white" />
                  <span>Order via WhatsApp</span>
                </WhatsAppLink>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] leading-tight text-[#5A6270]">
                <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#182232]" />
                <span>Cash on delivery, JazzCash, EasyPaisa, or bank transfer</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
