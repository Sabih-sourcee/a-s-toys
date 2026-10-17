import React, { useState } from 'react';
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
      `\nPayment: Cash on Delivery (COD)`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#F6F3EC] border-l border-[#DCD7CC] shadow-[0px_4px_0px_rgba(24,34,50,0.2)] flex flex-col justify-between"
          id="cart-drawer-panel"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F6F3EC] border-b border-[#DCD7CC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag aria-hidden="true" className="w-5 h-5 text-[#182232]" />
              <h2 className="font-headline text-lg font-bold text-[#182232]">
                Your bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="relative w-11 h-11 flex items-center justify-center rounded-[6px] text-[#5A6270] hover:text-[#182232] hover:bg-[#EDE8DD] transition-colors cursor-pointer"
              aria-label="Close cart"
              id="btn-close-cart"
            >
              <X aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cartItems.length > 0 && freeOver ? (
            <div className="bg-[#EDE8DD] px-4 py-3 border-b border-[#C8CFD8]">
              <div className="flex items-center justify-between text-xs font-headline font-bold mb-1.5">
                <span className="flex items-center gap-1 text-[#182232]">
                  <Truck aria-hidden="true" className="w-3.5 h-3.5" />
                  {shippingFee === 0 && subtotal >= freeOver ? (
                    <span className="text-[#182232]">Free Shipping unlocked nationwide!</span>
                  ) : (
                    <span>Add Rs. {amountNeededForFreeShipping.toLocaleString()} for Free Shipping</span>
                  )}
                </span>
                <span className="text-[#182232]">{shippingProgress}%</span>
              </div>
              <div className="w-full bg-[#C8CFD8] h-2 rounded-[6px] overflow-hidden">
                <div
                  className="bg-[#182232] h-full transition-all duration-300 rounded-[6px]"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          ) : null}

          {/* Items List (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-[6px] bg-[#EDE8DD] text-[#182232] flex items-center justify-center">
                  <ShoppingBag aria-hidden="true" className="w-10 h-10 opacity-70" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#182232]">
                    Your basket is empty
                  </h3>
                  <p className="font-body text-xs text-[#5A6270] mt-1 max-w-xs">
                    Explore our handpicked wooden, die-cast, and Montessori toys to start an order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreShop();
                  }}
                  className="btn-push-blue text-white font-headline text-xs font-bold px-6 py-2.5 rounded-[6px] cursor-pointer "
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-3 flex gap-3 "
                  id={`cart-item-${item.product.id}`}
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 bg-[#EDE8DD]/50 rounded-lg shrink-0 p-1.5 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details & Qty */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-headline text-xs sm:text-sm font-bold text-[#182232] truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="relative p-1 text-gray-400 hover:text-[#E84A27] transition-colors cursor-pointer shrink-0 before:absolute before:-inset-2.5 before:content-['']"
                          aria-label={`Remove ${item.product.title} from basket`}
                        >
                          <Trash2 aria-hidden="true" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#5A6270] block">
                        {item.product.ageLabel} • {item.product.categoryName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EDE8DD]">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#DCD7CC] rounded-[6px] bg-[#F6F3EC] p-0.5">
                        {/* Visual glyph stays compact (24px); ::before expands the real tap target to 44px per WCAG touch target guidance */}
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="relative w-6 h-6 rounded-[6px] flex items-center justify-center hover:bg-[#F6F3EC] text-xs font-bold text-[#182232] cursor-pointer before:absolute before:-inset-2.5 before:content-['']"
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
                          className="relative w-6 h-6 rounded-[6px] flex items-center justify-center hover:bg-[#F6F3EC] text-xs font-bold text-[#182232] disabled:opacity-30 cursor-pointer before:absolute before:-inset-2.5 before:content-['']"
                          aria-label={`Increase quantity of ${item.product.title}`}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>

                      <span className="font-headline text-sm font-extrabold text-[#182232]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#F6F3EC] border-t border-[#DCD7CC] space-y-3">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <label htmlFor="cart-promo-input" className="sr-only">Coupon code</label>
                  <Tag aria-hidden="true" className="w-3.5 h-3.5 text-[#5A6270] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cart-promo-input"
                    type="text"
                    placeholder="Coupon code (e.g. WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full h-11 pl-8 pr-3 bg-[#F6F3EC] border border-[#DCD7CC] rounded-[6px] text-xs font-body uppercase outline-none focus:border-[#182232]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 bg-[#182232] hover:bg-[#182232] text-white text-xs font-headline font-bold px-4 rounded-[6px] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <p className="text-[11px] font-bold text-[#182232]">{promoSuccess}</p>
              )}
              {promoError && (
                <p className="text-[11px] font-bold text-[#E84A27]">{promoError}</p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-body text-[#5A6270] pt-2 border-t border-[#EDE8DD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#182232] font-bold">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nationwide Courier ({config.courier})</span>
                  <span className="font-bold text-right">
                    {shippingFee === 0 ? (
                      <span className="text-[#182232] uppercase font-headline">FREE</span>
                    ) : (
                      shipping.label
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#182232] font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-[#DCD7CC] text-sm font-headline">
                  <span className="font-extrabold text-[#182232]">Total (PKR)</span>
                  <span className="text-xl font-black text-[#182232]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full btn-push-red text-white font-headline text-sm font-bold py-3 rounded-[6px] flex items-center justify-center gap-2 cursor-pointer shadow-[0px_2px_0px_#182232]"
                  id="btn-proceed-to-checkout"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </button>

                <WhatsAppLink
                  message={whatsappCartMessage}
                  className="w-full min-h-[44px] bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-xs font-bold py-2.5 rounded-[6px] border-[1.5px] border-[#182232] shadow-[0px_3px_0px_#182232] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  id="btn-order-via-whatsapp-cart"
                >
                  <MessageCircle aria-hidden="true" className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp</span>
                </WhatsAppLink>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#5A6270] pt-1">
                <ShieldCheck aria-hidden="true" className="w-3.5 h-3.5 text-[#182232]" />
                <span>Cash on Delivery available • No advance required</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
