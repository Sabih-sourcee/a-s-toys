import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, MessageCircle, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onExploreShop: () => void;
}

const FREE_SHIPPING_THRESHOLD = 3500;
const STANDARD_SHIPPING_FEE = 250;

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

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'WELCOME10' || clean === 'PAKISTAN' || clean === 'LAHOREJOY') {
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
  const whatsappCartMessage = encodeURIComponent(
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
      `\nPayment: Cash on Delivery (COD)`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#FBF9F4] border-l border-[#EBE5DA] shadow-2xl flex flex-col justify-between"
          id="cart-drawer-panel"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#EBE5DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0F3D9C]" />
              <h2 className="font-headline text-lg font-bold text-[#1D1B18]">
                Your Toy Basket ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#58554F] hover:text-[#1D1B18] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              title="Close cart"
              id="btn-close-cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cartItems.length > 0 && (
            <div className="bg-[#EBF3FF] px-4 py-3 border-b border-[#DBE4FA]">
              <div className="flex items-center justify-between text-xs font-headline font-bold mb-1.5">
                <span className="flex items-center gap-1 text-[#0F3D9C]">
                  <Truck className="w-3.5 h-3.5" />
                  {isFreeShipping ? (
                    <span className="text-[#258547]">Free Shipping unlocked nationwide!</span>
                  ) : (
                    <span>Add Rs. {amountNeededForFreeShipping.toLocaleString()} for Free Shipping</span>
                  )}
                </span>
                <span className="text-[#0F3D9C]">{shippingProgress}%</span>
              </div>
              <div className="w-full bg-[#DBE4FA] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#258547] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F4EFE6] text-[#0F3D9C] flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 opacity-70" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#1D1B18]">
                    Your basket is empty
                  </h3>
                  <p className="font-body text-xs text-[#58554F] mt-1 max-w-xs">
                    Explore our handpicked wooden, die-cast, and Montessori toys to start an order.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreShop();
                  }}
                  className="btn-push-blue text-white font-headline text-xs font-bold px-6 py-2.5 rounded-full cursor-pointer shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl border border-[#EBE5DA] p-3 flex gap-3 shadow-xs"
                  id={`cart-item-${item.product.id}`}
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 bg-[#F4EFE6]/50 rounded-lg shrink-0 p-1.5 flex items-center justify-center overflow-hidden">
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
                        <h4 className="font-headline text-xs sm:text-sm font-bold text-[#1D1B18] truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-[#C4291F] transition-colors p-1 cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#58554F] block">
                        {item.product.ageLabel} • {item.product.categoryName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F4EFE6]">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#EBE5DA] rounded-full bg-[#FBF9F4] p-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-xs font-bold text-[#1D1B18] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-headline text-xs font-bold text-[#1D1B18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white text-xs font-bold text-[#1D1B18] disabled:opacity-30 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-headline text-sm font-extrabold text-[#0F3D9C]">
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
            <div className="p-4 sm:p-5 bg-white border-t border-[#EBE5DA] space-y-3">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#58554F] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#FBF9F4] border border-[#EBE5DA] rounded-full text-xs font-body uppercase outline-none focus:border-[#0F3D9C]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0F3D9C] hover:bg-[#0A2B70] text-white text-xs font-headline font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <p className="text-[11px] font-bold text-[#258547]">{promoSuccess}</p>
              )}
              {promoError && (
                <p className="text-[11px] font-bold text-[#C4291F]">{promoError}</p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-body text-[#58554F] pt-2 border-t border-[#F4EFE6]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1D1B18] font-bold">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nationwide Courier (TCS/Leopards)</span>
                  <span className="font-bold">
                    {shippingFee === 0 ? (
                      <span className="text-[#258547] uppercase font-headline">FREE</span>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#258547] font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-[#EBE5DA] text-sm font-headline">
                  <span className="font-extrabold text-[#1D1B18]">Total (PKR)</span>
                  <span className="text-xl font-black text-[#0F3D9C]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full btn-push-red text-white font-headline text-sm font-bold py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  id="btn-proceed-to-checkout"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/923001234567?text=${whatsappCartMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  id="btn-order-via-whatsapp-cart"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order Basket via WhatsApp (COD)</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#58554F] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#258547]" />
                <span>Cash on Delivery available • No advance required</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
