/**
 * Shop settings. Values prefixed VITE_ are baked in at `npm run build`.
 * Defaults below ship live so WhatsApp / Formspree / contact work without a .env.
 */
function env(key: keyof ImportMetaEnv, fallback = ''): string {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

export const config = {
  siteUrl: env('VITE_SITE_URL', 'https://usmanitoys.com').replace(/\/$/, ''),
  siteName: 'A&S Toys',
  /** Digits only, country code included, no plus. PK mobile 0314… → 92314… */
  whatsappNumber: env('VITE_WHATSAPP_NUMBER', '923143814591').replace(/\D/g, ''),
  /** Formspree form id for checkout orders. */
  orderFormId: env('VITE_ORDER_FORM_ID', 'mrpejgyd'),
  /** Formspree form id for wholesale / Contact Us. */
  contactFormId: env('VITE_CONTACT_FORM_ID', 'xqpenkga'),
  /** Google Search Console HTML-tag verification content value. */
  googleSiteVerification: env('VITE_GOOGLE_SITE_VERIFICATION'),
  phone: env('VITE_SHOP_PHONE', '0314 3814591'),
  /** Wholesale / brand inquiries only — not order auto-replies. */
  email: env('VITE_SHOP_EMAIL', 'atarehman@usmanitoys.com'),
  /** Optional. Hidden wherever it is empty. There is no walk-in address. */
  address: env('VITE_SHOP_ADDRESS'),
  exchangePolicy: env('VITE_EXCHANGE_POLICY', '7-day replacement for transit damage'),
  /** A number such as 250. A TODO placeholder adds no fee. */
  deliveryCharges: env('VITE_DELIVERY_CHARGES', '250'),
  courier: env('VITE_COURIER', 'TCS/Leopards'),
  /** Subtotal at which delivery becomes free. Empty disables the offer. */
  freeShippingOver: env('VITE_FREE_SHIPPING_OVER', '3500'),
};

export function shippingQuote(subtotal: number): {
  fee: number;
  label: string;
  freeOver: number | null;
} {
  const raw = config.deliveryCharges.trim();
  const parsedFree = Number(config.freeShippingOver);
  const freeOver = Number.isFinite(parsedFree) && parsedFree > 0 ? parsedFree : null;
  if (!raw || /^todo\b/i.test(raw)) {
    return { fee: 0, label: raw || 'TODO: delivery charges', freeOver };
  }
  const feeNum = Number(raw.replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(feeNum)) {
    return { fee: 0, label: raw, freeOver };
  }
  if (freeOver && subtotal >= freeOver) {
    return { fee: 0, label: 'Free', freeOver };
  }
  return { fee: feeNum, label: `Rs. ${feeNum.toLocaleString('en-PK')}`, freeOver };
}
