import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Lock, DollarSign, CreditCard, Building } from 'lucide-react';
import { CartItem, CustomerDetails, Order, PaymentMethod } from '../types';
import { PAKISTANI_CITIES } from '../data/products';
import { config, shippingQuote } from '../config';
import { paymentLabel, submitOrder } from '../lib/orders';

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
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Karachi',
    address: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = shippingQuote(subtotal);
  const shippingFee = shipping.fee;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const orderId = `AST-${Date.now().toString().slice(-8)}`;
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
      trackingNumber: '',
      courier: config.courier,
    };

    try {
      await submitOrder({
        orderId,
        name: customer.fullName.trim(),
        phone: customer.phone.trim(),
        city: customer.city.trim(),
        address: customer.address.trim(),
        email: customer.email.trim(),
        notes: customer.notes?.trim(),
        items: cartItems.map((item) => ({
          id: item.product.id,
          title: item.product.title,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total,
        payment: paymentLabel(paymentMethod),
      });
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : 'We could not save your order. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-[#F6F3EC] rounded-[6px] max-w-4xl w-full border border-[#DCD7CC] shadow-[0px_4px_0px_rgba(24,34,50,0.2)] overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        id="checkout-modal"
      >
        {/* Header */}
        <div className="bg-[#182232] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock aria-hidden="true" className="w-5 h-5 text-[#E84A27]" />
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-extrabold tracking-tight">
                Complete Your Order
              </h2>
              <p className="text-xs text-[#C8CFD8]">
                Karachi-based online store · {config.courier} nationwide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-[6px] text-white/80 hover:text-white hover:bg-[#F6F3EC]/10 transition-colors cursor-pointer"
            aria-label="Cancel checkout"
            id="btn-close-checkout"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left Form: Customer & Delivery Details */}
            <div className="lg:col-span-7 p-5 sm:p-6 space-y-5 bg-[#F6F3EC]">
              {/* Step 1: Customer Info */}
              <div>
                <h3 className="font-headline text-sm font-bold text-[#182232] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-[6px] bg-[#182232] text-white text-[11px] flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Contact &amp; Delivery Address</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ayesha Khan"
                      value={customer.fullName}
                      onChange={(e) =>
                        setCustomer({ ...customer, fullName: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-[6px] bg-[#F6F3EC] border text-xs sm:text-sm font-body outline-none transition-colors ${
                        errors.fullName
                          ? 'border-[#E84A27] bg-red-50/50'
                          : 'border-[#DCD7CC] focus:border-[#182232]'
                      }`}
                      id="checkout-input-name"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-[#E84A27] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                        WhatsApp / Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="0300 1234567"
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer({ ...customer, phone: e.target.value })
                        }
                        className={`w-full px-3.5 py-2 rounded-[6px] bg-[#F6F3EC] border text-xs sm:text-sm font-body outline-none transition-colors ${
                          errors.phone
                            ? 'border-[#E84A27] bg-red-50/50'
                            : 'border-[#DCD7CC] focus:border-[#182232]'
                        }`}
                        id="checkout-input-phone"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-[#E84A27] mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="ayesha@gmail.com"
                        value={customer.email}
                        onChange={(e) =>
                          setCustomer({ ...customer, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-[6px] bg-[#F6F3EC] border border-[#DCD7CC] focus:border-[#182232] text-xs sm:text-sm font-body outline-none"
                        id="checkout-input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                        City *
                      </label>
                      <select
                        value={customer.city}
                        onChange={(e) =>
                          setCustomer({ ...customer, city: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-[6px] bg-[#F6F3EC] border border-[#DCD7CC] focus:border-[#182232] text-xs sm:text-sm font-headline font-bold outline-none cursor-pointer"
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
                      <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                        Fulfillment Hub
                      </label>
                      <div className="px-3 py-2 rounded-[6px] bg-[#EDE8DD] border border-[#DCD7CC] text-xs font-body text-[#5A6270]">
                        {customer.city === 'Karachi'
                          ? 'Same-Day / Next-Day Delivery'
                          : 'TCS Air Express (2-3 days)'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                      Complete Street Address &amp; Nearest Landmark *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="House/Plot #, Street name, Sector/Block, near famous landmark..."
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer({ ...customer, address: e.target.value })
                      }
                      className={`w-full px-3.5 py-2 rounded-[6px] bg-[#F6F3EC] border text-xs sm:text-sm font-body outline-none transition-colors ${
                        errors.address
                          ? 'border-[#E84A27] bg-red-50/50'
                          : 'border-[#DCD7CC] focus:border-[#182232]'
                      }`}
                      id="checkout-input-address"
                    />
                    {errors.address && (
                      <p className="text-[11px] text-[#E84A27] mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-headline font-bold text-[#182232] mb-1">
                      Delivery Rider Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Call before arrival, leave with security guard, do not ring bell if baby is sleeping"
                      value={customer.notes}
                      onChange={(e) =>
                        setCustomer({ ...customer, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-[6px] bg-[#F6F3EC] border border-[#DCD7CC] focus:border-[#182232] text-xs font-body outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method Selection */}
              <div className="pt-4 border-t border-[#DCD7CC]">
                <h3 className="font-headline text-sm font-bold text-[#182232] uppercase tracking-wide flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-[6px] bg-[#182232] text-white text-[11px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Select Payment Method</span>
                </h3>

                <div className="space-y-2">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-[6px] border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#182232] bg-[#F6F3EC] ring-2 ring-[#182232]/15'
                        : 'border-[#DCD7CC] bg-[#F6F3EC]/70 hover:bg-[#F6F3EC]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-[#182232] accent-[#182232]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#182232] flex items-center gap-1.5">
                          <DollarSign aria-hidden="true" className="w-4 h-4 text-[#182232]" />
                          Cash on Delivery (COD)
                        </span>
                        <span className="bg-[#EDE8DD] text-[#182232] text-[10px] font-headline font-bold px-2 py-0.5 rounded">
                          0% Advance Needed
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6270] font-body mt-0.5">
                        Pay cash to the {config.courier} rider when the parcel arrives.
                      </p>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-[6px] border cursor-pointer transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#182232] bg-[#F6F3EC] ring-2 ring-[#182232]/15 '
                        : 'border-[#DCD7CC] bg-[#F6F3EC]/70 hover:bg-[#F6F3EC]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="jazzcash"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="mt-1 text-[#182232] accent-[#182232]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#182232] flex items-center gap-1.5">
                          <CreditCard aria-hidden="true" className="w-4 h-4 text-[#E84A27]" />
                          JazzCash Mobile Account
                        </span>
                        <span className="bg-orange-50 text-orange-700 text-[10px] font-headline font-bold px-2 py-0.5 rounded">
                          Instant Transfer
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6270] font-body mt-0.5">
                        Send to: <strong>{config.phone}</strong> (A &amp; S Toys).
                      </p>
                    </div>
                  </label>

                  {/* EasyPaisa */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-[6px] border cursor-pointer transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#182232] bg-[#F6F3EC] ring-2 ring-[#182232]/15 '
                        : 'border-[#DCD7CC] bg-[#F6F3EC]/70 hover:bg-[#F6F3EC]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="easypaisa"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="mt-1 text-[#182232] accent-[#182232]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#182232] flex items-center gap-1.5">
                          <CreditCard aria-hidden="true" className="w-4 h-4 text-[#182232]" />
                          EasyPaisa
                        </span>
                        <span className="bg-green-50 text-green-700 text-[10px] font-headline font-bold px-2 py-0.5 rounded">
                          Direct App Transfer
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6270] font-body mt-0.5">
                        Transfer to <strong>{config.phone}</strong> (Title: A &amp; S Toys Pakistan).
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-[6px] border cursor-pointer transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#182232] bg-[#F6F3EC] ring-2 ring-[#182232]/15 '
                        : 'border-[#DCD7CC] bg-[#F6F3EC]/70 hover:bg-[#F6F3EC]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="mt-1 text-[#182232] accent-[#182232]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-headline text-sm font-bold text-[#182232] flex items-center gap-1.5">
                          <Building aria-hidden="true" className="w-4 h-4 text-[#182232]" />
                          Online Bank Transfer (Meezan / HBL)
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6270] font-body mt-0.5">
                        We send the account details. Phone: {config.phone}.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-5 p-5 sm:p-6 bg-[#F6F3EC] border-t lg:border-t-0 lg:border-l border-[#DCD7CC] flex flex-col justify-between">
              <div>
                <h3 className="font-headline text-sm font-bold text-[#182232] uppercase tracking-wide mb-3">
                  Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} toys)
                </h3>

                {/* Items Mini List */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-2.5 text-xs py-1 border-b border-[#EDE8DD] last:border-b-0"
                    >
                      <div className="w-12 h-12 bg-[#EDE8DD]/60 rounded-lg p-1 shrink-0 overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline font-bold text-[#182232] truncate">
                          {item.product.title}
                        </p>
                        <p className="text-[#5A6270] text-[11px]">
                          Qty: {item.quantity} × Rs. {item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="font-headline font-bold text-[#182232] shrink-0">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="mt-4 pt-3 border-t border-[#DCD7CC] space-y-2 text-xs text-[#5A6270]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#182232] font-bold">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Truck aria-hidden="true" className="w-3.5 h-3.5 text-[#182232]" />
                      <span>Nationwide Delivery</span>
                    </span>
                    <span className="font-bold text-right">
                      {shipping.label === 'Free' ? (
                        <span className="text-[#182232] uppercase font-headline">
                          FREE
                        </span>
                      ) : (
                        shipping.label
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#DCD7CC]">
                    <span className="font-headline text-base font-extrabold text-[#182232]">
                      Total Payable (PKR)
                    </span>
                    <span className="font-headline text-2xl font-black text-[#182232]">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-5 p-3 rounded-[6px] bg-[#EDE8DD] text-[#182232] text-xs space-y-1.5 border border-[#182232]/20">
                  <div className="flex items-center gap-1.5 font-headline font-bold">
                    <ShieldCheck aria-hidden="true" className="w-4 h-4 shrink-0" />
                    <span>A &amp; S Toys Customer Guarantee:</span>
                  </div>
                  <ul className="text-[11px] list-disc list-inside space-y-0.5 text-[#182232]">
                    <li>Karachi-based online store. Nationwide delivery.</li>
                    {config.address ? <li>Address: {config.address}.</li> : null}
                    <li>Exchange: {config.exchangePolicy}.</li>
                    <li>Delivery: Rs. {Number(config.deliveryCharges).toLocaleString('en-PK')}, free over Rs. {Number(config.freeShippingOver).toLocaleString('en-PK')}. Courier: {config.courier}.</li>
                    <li>Pay by cash on delivery, JazzCash, EasyPaisa, or bank transfer.</li>
                  </ul>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-5 border-t border-[#DCD7CC] mt-4">
                {submitError && (
                  <p className="mb-3 text-sm font-bold text-[#E84A27]" role="alert" id="checkout-error">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-push-red text-white font-headline text-base font-bold py-3.5 rounded-[6px] flex items-center justify-center gap-2 cursor-pointer shadow-[0px_2px_0px_#182232] disabled:opacity-50"
                  id="btn-confirm-order"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>
                        Place Order (Rs. {total.toLocaleString()})
                      </span>
                      <Check aria-hidden="true" className="w-5 h-5 stroke-2" />
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
