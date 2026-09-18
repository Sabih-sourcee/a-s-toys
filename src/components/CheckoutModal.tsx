import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Lock, CreditCard, DollarSign, Building } from 'lucide-react';
import { CartItem, CustomerDetails, Order, PaymentMethod } from '../types';
import { PAKISTANI_CITIES } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 3500 ? 0 : 250;
  const total = subtotal + shippingFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customer.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }
    if (!customer.phone.trim()) {
      errs.phone = 'Active WhatsApp or mobile phone is required for courier delivery.';
    } else if (customer.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Please enter a valid Pakistani phone number (e.g. 0300 1234567).';
    }
    if (!customer.address.trim()) {
      errs.address = 'Detailed street address with house number is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate realistic Pakistani order ID
      const orderId = `AST-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const newOrder: Order = {
        id: orderId,
        items: [...cartItems],
        customer: { ...customer },
        paymentMethod,
        subtotal,
        shippingFee,
        discount: 0,
        total,
        status: 'Received',
        createdAt: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        trackingNumber,
        courier: customer.city.toLowerCase() === 'lahore' ? 'Express Rider / Leopards' : 'TCS Courier',
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#FBF9F4] rounded-2xl max-w-4xl w-full border border-[#EBE5DA] shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        id="checkout-modal"
      >
        {/* Header */}
        <div className="bg-[#0F3D9C] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#F0A63A]" />
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-extrabold tracking-tight">
                Complete Your Order
              </h2>
              <p className="text-xs text-[#DBE4FA]">
                Inspected in Lahore • Nationwide Express Delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Cancel"
            id="btn-close-checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left Form: Customer & Delivery Details */}
            <div className="lg:col-span-7 p-5 sm:p-6 space-y-5 bg-[#FBF9F4]">
              {/* Step 1: Customer Info */}
              <div>
                <h3 className="font-headline text-sm font-bold text-[#1D1B18] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#0F3D9C] text-white text-[11px] flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Contact &amp; Delivery Address</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ayesha Khan"
                      value={customer.fullName}
                      onChange={(e) =>
                        setCustomer({ ...customer, fullName: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl bg-white border text-xs sm:text-sm font-body outline-none transition-colors ${
                        errors.fullName
                          ? 'border-[#C4291F] bg-red-50/50'
                          : 'border-[#EBE5DA] focus:border-[#0F3D9C]'
                      }`}
                      id="checkout-input-name"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#C4291F] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                        WhatsApp / Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="0300 1234567"
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer({ ...customer, phone: e.target.value })
                        }
                        className={`w-full px-3.5 py-2 rounded-xl bg-white border text-xs sm:text-sm font-body outline-none transition-colors ${
                          errors.phone
                            ? 'border-[#C4291F] bg-red-50/50'
                            : 'border-[#EBE5DA] focus:border-[#0F3D9C]'
                        }`}
                        id="checkout-input-phone"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-[#C4291F] mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="ayesha@gmail.com"
                        value={customer.email}
                        onChange={(e) =>
                          setCustomer({ ...customer, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#EBE5DA] focus:border-[#0F3D9C] text-xs sm:text-sm font-body outline-none"
                        id="checkout-input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                        City *
                      </label>
                      <select
                        value={customer.city}
                        onChange={(e) =>
                          setCustomer({ ...customer, city: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#EBE5DA] focus:border-[#0F3D9C] text-xs sm:text-sm font-headline font-bold outline-none cursor-pointer"
                        id="checkout-select-city"
                      >
                        {PAKISTANI_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                        Fulfillment Hub
                      </label>
                      <div className="px-3 py-2 rounded-xl bg-[#F4EFE6] border border-[#EBE5DA] text-xs font-body text-[#58554F]">
                        {customer.city === 'Lahore'
                          ? 'Same-Day / Next-Day Delivery'
                          : 'TCS Air Express (2-3 days)'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                      Complete Street Address &amp; Nearest Landmark *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="House/Plot #, Street name, Sector/Block, near famous landmark..."
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer({ ...customer, address: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-xl bg-white border text-xs sm:text-sm font-body outline-none transition-colors ${
                        errors.address
                          ? 'border-[#C4291F] bg-red-50/50'
                          : 'border-[#EBE5DA] focus:border-[#0F3D9C]'
                      }`}
                      id="checkout-input-address"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[#C4291F] mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-headline font-bold text-[#1D1B18] mb-1">
                      Delivery Rider Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call before arrival, leave with security guard, do not ring bell if baby is sleeping"
                      value={customer.notes}
                      onChange={(e) =>
                        setCustomer({ ...customer, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#EBE5DA] focus:border-[#0F3D9C] text-xs font-body outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method Selection */}
              <div className="pt-4 border-t border-[#EBE5DA]">
                <h3 className="font-headline text-sm font-bold text-[#1D1B18] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#0F3D9C] text-white text-[11px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Select Payment Method</span>
                </h3>

                <div className="space-y-2">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#0F3D9C] bg-white ring-2 ring-[#0F3D9C]/15 shadow-xs'
                        : 'border-[#EBE5DA] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-[#0F3D9C] accent-[#0F3D9C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#1D1B18] flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-[#258547]" />
                          Cash on Delivery (COD)
                        </span>
                        <span className="bg-[#EBF7EE] text-[#258547] text-[10px] font-headline font-bold px-2 py-0.5 rounded">
                          0% Advance Needed
                        </span>
                      </div>
                      <p className="text-xs text-[#58554F] font-body mt-0.5">
                        Pay cash directly to TCS/rider when parcel is handed over at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#0F3D9C] bg-white ring-2 ring-[#0F3D9C]/15 shadow-xs'
                        : 'border-[#EBE5DA] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="mt-1 text-[#0F3D9C] accent-[#0F3D9C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#1D1B18] flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#C4291F]" />
                          JazzCash Mobile Account
                        </span>
                        <span className="bg-orange-50 text-orange-700 text-[10px] font-headline font-bold px-2 py-0.5 rounded">
                          Instant Transfer
                        </span>
                      </div>
                      <p className="text-xs text-[#58554F] font-body mt-0.5">
                        Send to shop till: <strong>0300 1234567</strong> (A &amp; S Toys).
                      </p>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#0F3D9C] bg-white ring-2 ring-[#0F3D9C]/15 shadow-xs'
                        : 'border-[#EBE5DA] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="easypaisa"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="mt-1 text-[#0F3D9C] accent-[#0F3D9C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#1D1B18] flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#258547]" />
                          EasyPaisa
                        </span>
                        <span className="bg-green-50 text-green-700 text-[10px] font-headline font-bold px-2 py-0.5 rounded">
                          Direct App Transfer
                        </span>
                      </div>
                      <p className="text-xs text-[#58554F] font-body mt-0.5">
                        Transfer to <strong>0300 1234567</strong> (Title: A &amp; S Toys Pakistan).
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#0F3D9C] bg-white ring-2 ring-[#0F3D9C]/15 shadow-xs'
                        : 'border-[#EBE5DA] bg-white/70 hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-1 text-[#0F3D9C] accent-[#0F3D9C]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#1D1B18] flex items-center gap-1.5">
                          <Building className="w-4 h-4 text-[#0F3D9C]" />
                          Online Bank Transfer (Meezan / HBL)
                        </span>
                      </div>
                      <p className="text-xs text-[#58554F] font-body mt-0.5">
                        IBAN &amp; account details provided on the confirmation screen.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-white border-t lg:border-t-0 lg:border-l border-[#EBE5DA] flex flex-col justify-between">
              <div>
                <h3 className="font-headline text-sm font-bold text-[#1D1B18] uppercase tracking-wide mb-3">
                  Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} toys)
                </h3>

                {/* Items Mini List */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-2.5 text-xs py-1 border-b border-[#F4EFE6] last:border-b-0"
                    >
                      <div className="w-12 h-12 bg-[#F4EFE6]/60 rounded-lg p-1 shrink-0 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline font-bold text-[#1D1B18] truncate">
                          {item.product.title}
                        </p>
                        <p className="text-[#58554F] text-[11px]">
                          Qty: {item.quantity} × Rs. {item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="font-headline font-bold text-[#0F3D9C] shrink-0">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="mt-4 pt-3 border-t border-[#EBE5DA] space-y-2 text-xs text-[#58554F]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1D1B18] font-bold">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#0F3D9C]" />
                      <span>Nationwide Delivery</span>
                    </span>
                    <span className="font-bold">
                      {shippingFee === 0 ? (
                        <span className="text-[#258547] uppercase font-headline">
                          FREE
                        </span>
                      ) : (
                        `Rs. ${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#EBE5DA]">
                    <span className="font-headline text-base font-extrabold text-[#1D1B18]">
                      Total Payable (PKR)
                    </span>
                    <span className="font-headline text-2xl font-black text-[#0F3D9C]">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-5 p-3 rounded-xl bg-[#EBF7EE] text-[#258547] text-xs space-y-1.5 border border-[#258547]/20">
                  <div className="flex items-center gap-1.5 font-headline font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>A &amp; S Toys Customer Guarantee:</span>
                  </div>
                  <ul className="text-[11px] list-disc list-inside space-y-0.5 text-[#1D1B18]">
                    <li>Dispatched from Lahore fulfillment desk within 24 hrs.</li>
                    <li>7-day no-questions replacement for transit damage.</li>
                    <li>Pay only after opening parcel with rider if requested.</li>
                  </ul>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-5 border-t border-[#EBE5DA] mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-push-red text-white font-headline text-base font-bold py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  id="btn-confirm-order"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>
                        Place Order (Rs. {total.toLocaleString()})
                      </span>
                      <Check className="w-5 h-5 stroke-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
