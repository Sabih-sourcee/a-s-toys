import React, { useEffect, useState } from 'react';
import { X, Check, ShieldCheck, Truck, Lock, ChevronDown } from 'lucide-react';
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

const PAYMENT_OPTIONS: { id: PaymentMethod; title: string; detail: string }[] = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    detail: `Pay cash to the ${config.courier} rider when the parcel arrives.`,
  },
  {
    id: 'jazzcash',
    title: 'JazzCash',
    detail: `Send to ${config.phone} (A & S Toys).`,
  },
  {
    id: 'easypaisa',
    title: 'EasyPaisa',
    detail: `Transfer to ${config.phone} (A & S Toys Pakistan).`,
  },
  {
    id: 'bank_transfer',
    title: 'Bank transfer',
    detail: `Meezan / HBL. We send the account details. Phone: ${config.phone}.`,
  },
];

const fieldClass = (invalid: boolean) =>
  `w-full min-h-11 rounded-[6px] border bg-white px-3.5 text-[16px] leading-normal text-[#182232] outline-none transition-colors ${
    invalid
      ? 'border-[#E84A27] bg-red-50'
      : 'border-[#182232]/45 focus:border-[#182232]'
  }`;

const labelClass = 'mb-1.5 block text-sm font-bold text-[#182232]';

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
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = shippingQuote(subtotal);
  const shippingFee = shipping.fee;
  const total = subtotal + shippingFee;
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
    if (!customer.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!customer.address.trim()) {
      errs.address = 'Detailed street address with house number is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      requestAnimationFrame(() => {
        document.querySelector('[data-field-error="true"]')?.scrollIntoView({ block: 'center' });
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const noteParts = [
      landmark.trim() ? `Landmark: ${landmark.trim()}` : '',
      customer.notes?.trim() || '',
    ].filter(Boolean);
    const notes = noteParts.join('\n');

    const orderId = `AST-${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cartItems],
      customer: { ...customer, notes },
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
        notes,
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

  const summaryLines = (
    <div className="space-y-2 text-xs text-[#3A4250]">
      <div className="flex items-baseline justify-between gap-3">
        <span>Subtotal</span>
        <span className="money font-bold text-[#182232]">Rs. {subtotal.toLocaleString()}</span>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1">
          <Truck aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#182232]" />
          <span>Nationwide Delivery</span>
        </span>
        <span className="money shrink-0 text-right font-bold text-[#182232]">
          {shipping.label === 'Free' ? (
            <span className="font-headline uppercase">FREE</span>
          ) : (
            shipping.label
          )}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-3 border-t border-[#DCD7CC] pt-2">
        <span className="font-headline text-sm font-extrabold text-[#182232]">Total Payable (PKR)</span>
        <span className="money font-headline text-xl font-black text-[#182232]">
          Rs. {total.toLocaleString()}
        </span>
      </div>
    </div>
  );

  const itemList = (
    <div className="max-h-56 space-y-2.5 overflow-y-auto pr-1">
      {cartItems.map((item) => (
        <div
          key={item.product.id}
          className="flex items-center gap-2.5 border-b border-[#EDE8DD] py-1 text-xs last:border-b-0"
        >
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#EDE8DD]/60 p-1">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-headline font-bold text-[#182232]">{item.product.title}</p>
            <p className="text-[11px] text-[#3A4250]">
              Qty: {item.quantity} × <span className="money">Rs. {item.product.price.toLocaleString()}</span>
            </p>
          </div>
          <span className="money shrink-0 font-headline font-bold text-[#182232]">
            Rs. {(item.product.price * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );

  const guarantee = (
    <div className="rounded-[6px] border border-[#182232]/20 bg-[#EDE8DD] p-3 text-xs text-[#182232]">
      <div className="flex items-center gap-1.5 font-headline font-bold">
        <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
        <span>A &amp; S Toys Customer Guarantee:</span>
      </div>
      <ul className="mt-1.5 list-disc list-inside space-y-0.5 text-[11px] text-[#182232]">
        <li>Karachi-based online store. Nationwide delivery.</li>
        {config.address ? <li>Address: {config.address}.</li> : null}
        <li>Exchange: {config.exchangePolicy}.</li>
        <li>
          Delivery: <span className="money">Rs. {Number(config.deliveryCharges).toLocaleString('en-PK')}</span>, free over{' '}
          <span className="money">Rs. {Number(config.freeShippingOver).toLocaleString('en-PK')}</span>. Courier: {config.courier}.
        </li>
        <li>Pay by cash on delivery, JazzCash, EasyPaisa, or bank transfer.</li>
      </ul>
    </div>
  );

  const placeOrderButton = (id: string) => (
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn-push-red flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] py-3 font-headline text-base font-bold text-white shadow-[0px_2px_0px_#182232] disabled:opacity-50"
      id={id}
    >
      {isSubmitting ? (
        <span>Processing Order...</span>
      ) : (
        <>
          <span className="money">Place Order (Rs. {total.toLocaleString()})</span>
          <Check aria-hidden="true" className="h-5 w-5 stroke-2" />
        </>
      )}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#F6F3EC] lg:overflow-y-auto lg:bg-black/60">
      <div className="flex h-full min-h-0 flex-col lg:min-h-full lg:items-center lg:justify-center lg:p-4">
      <div
        className="flex h-full min-h-0 w-full flex-col bg-[#F6F3EC] lg:my-auto lg:h-auto lg:max-w-4xl lg:overflow-hidden lg:rounded-[6px] lg:border lg:border-[#DCD7CC] lg:shadow-[0px_4px_0px_rgba(24,34,50,0.2)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        id="checkout-modal"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 bg-[#182232] px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] text-white lg:px-5 lg:py-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Lock aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E84A27]" />
            <div className="min-w-0">
              <h2 id="checkout-title" className="truncate font-headline text-lg font-extrabold tracking-tight sm:text-xl">
                Complete Your Order
              </h2>
              <p className="truncate text-xs text-[#C8CFD8]">
                Karachi-based online store · {config.courier} nationwide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[6px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cancel checkout"
            id="btn-close-checkout"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
          <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:max-h-[80vh] lg:grid-cols-12">
            <div className="border-b border-[#DCD7CC] bg-[#EDE8DD] lg:hidden">
              <button
                type="button"
                id="btn-toggle-order-summary"
                aria-expanded={summaryOpen}
                aria-controls="checkout-mobile-summary"
                onClick={() => setSummaryOpen((open) => !open)}
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left"
              >
                <span className="font-headline text-sm font-bold text-[#182232]">
                  Order summary ({itemCount} {itemCount === 1 ? 'toy' : 'toys'})
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="money font-headline text-sm font-black text-[#182232]">
                    Rs. {total.toLocaleString()}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 text-[#182232] transition-transform ${summaryOpen ? 'rotate-180' : ''}`}
                  />
                </span>
              </button>
              {summaryOpen && (
                <div id="checkout-mobile-summary" className="space-y-3 px-4 pb-4">
                  {itemList}
                  {summaryLines}
                  {guarantee}
                </div>
              )}
            </div>

            <div className="space-y-5 bg-[#F6F3EC] p-4 sm:p-6 lg:col-span-7">
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-wide text-[#182232]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-[#182232] text-[11px] font-bold text-white">
                    1
                  </span>
                  <span>Contact &amp; Delivery Address</span>
                </h3>

                <div className="space-y-3">
                  <div data-field-error={errors.fullName ? 'true' : undefined}>
                    <label htmlFor="checkout-input-name" className={labelClass}>
                      Full name *
                    </label>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Ayesha Khan"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className={fieldClass(Boolean(errors.fullName))}
                      id="checkout-input-name"
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm font-semibold text-[#E84A27]">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div data-field-error={errors.phone ? 'true' : undefined}>
                      <label htmlFor="checkout-input-phone" className={labelClass}>
                        WhatsApp / mobile phone *
                      </label>
                      <input
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="0300 1234567"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className={fieldClass(Boolean(errors.phone))}
                        id="checkout-input-phone"
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm font-semibold text-[#E84A27]">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="checkout-input-email" className={labelClass}>
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="ayesha@gmail.com"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className={fieldClass(false)}
                        id="checkout-input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div data-field-error={errors.city ? 'true' : undefined}>
                      <label htmlFor="checkout-select-city" className={labelClass}>
                        City *
                      </label>
                      <select
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className={`${fieldClass(Boolean(errors.city))} cursor-pointer font-headline font-bold`}
                        id="checkout-select-city"
                        aria-invalid={Boolean(errors.city)}
                      >
                        {PAKISTANI_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="mt-1 text-sm font-semibold text-[#E84A27]">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <span className={labelClass}>Fulfillment hub</span>
                      <div className="flex min-h-11 items-center rounded-[6px] border border-[#182232]/20 bg-[#EDE8DD] px-3.5 text-sm font-semibold text-[#182232]">
                        {customer.city === 'Karachi'
                          ? 'Same-day / next-day delivery'
                          : 'TCS Air Express (2–3 days)'}
                      </div>
                    </div>
                  </div>

                  <div data-field-error={errors.address ? 'true' : undefined}>
                    <label htmlFor="checkout-input-address" className={labelClass}>
                      Street address *
                    </label>
                    <textarea
                      rows={3}
                      autoComplete="street-address"
                      placeholder="House/Plot #, street name, sector or block"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className={`${fieldClass(Boolean(errors.address))} min-h-[88px] py-3`}
                      id="checkout-input-address"
                      aria-invalid={Boolean(errors.address)}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm font-semibold text-[#E84A27]">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="checkout-input-landmark" className={labelClass}>
                      Nearest landmark (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Near a known shop, masjid, or crossing"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className={fieldClass(false)}
                      id="checkout-input-landmark"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-input-notes" className={labelClass}>
                      Rider instructions (optional)
                    </label>
                    <input
                      id="checkout-input-notes"
                      type="text"
                      placeholder="Call before arrival, leave with security"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      className={fieldClass(false)}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#DCD7CC] pt-4" role="radiogroup" aria-labelledby="checkout-payment-label">
                <h3 id="checkout-payment-label" className="mb-3 flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-wide text-[#182232]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-[#182232] text-[11px] font-bold text-white">
                    2
                  </span>
                  <span>Payment</span>
                </h3>

                <div className="space-y-2">
                  {PAYMENT_OPTIONS.map((option) => {
                    const selected = paymentMethod === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-[6px] border bg-white p-3 transition-colors ${
                          selected
                            ? 'border-[#182232] shadow-[0px_2px_0px_#182232]'
                            : 'border-[#182232]/30 hover:border-[#182232]/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={option.id}
                          checked={selected}
                          onChange={() => setPaymentMethod(option.id)}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-[#182232]"
                        />
                        <span className="min-w-0">
                          <span className="block font-headline text-sm font-bold text-[#182232]">
                            {option.title}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-[#3A4250]">
                            {option.detail}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="hidden flex-col justify-between border-t border-[#DCD7CC] bg-[#F6F3EC] p-5 sm:p-6 lg:sticky lg:top-0 lg:col-span-5 lg:flex lg:max-h-[80vh] lg:self-start lg:overflow-y-auto lg:border-t-0 lg:border-l">
              <div>
                <h3 className="mb-3 font-headline text-sm font-bold uppercase tracking-wide text-[#182232]">
                  Order Summary ({itemCount} {itemCount === 1 ? 'toy' : 'toys'})
                </h3>
                {itemList}
                <div className="mt-4 border-t border-[#DCD7CC] pt-3">{summaryLines}</div>
                <div className="mt-5">{guarantee}</div>
              </div>

              <div className="mt-4 border-t border-[#DCD7CC] pt-5">
                {submitError && (
                  <p className="mb-3 text-sm font-bold text-[#E84A27]" role="alert" id="checkout-error">
                    {submitError}
                  </p>
                )}
                {placeOrderButton('btn-confirm-order')}
              </div>
            </aside>
          </div>

          <div className="checkout-sticky-cta shrink-0 border-t border-[#DCD7CC] bg-[#F6F3EC] px-4 pt-3 lg:hidden">
            {submitError && (
              <p className="mb-2 text-sm font-bold text-[#E84A27]" role="alert">
                {submitError}
              </p>
            )}
            {placeOrderButton('btn-confirm-order-mobile')}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};
