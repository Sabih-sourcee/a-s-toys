/**
 * Shop settings. Values prefixed VITE_ are baked in at `npm run build`.
 * See `.env.example` and README for what Sabih must fill in.
 */
function env(key: keyof ImportMetaEnv, fallback = ''): string {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

export const config = {
  siteUrl: env('VITE_SITE_URL', 'https://usmanitoys.com').replace(/\/$/, ''),
  siteName: 'A&S Toys',
  /** Digits only, country code included, no plus. Empty until VITE_WHATSAPP_NUMBER is set. */
  whatsappNumber: env('VITE_WHATSAPP_NUMBER').replace(/\D/g, ''),
  /** Google Apps Script web app /exec URL. */
  orderEndpoint: env('VITE_ORDER_ENDPOINT'),
  /** Google Search Console HTML-tag verification content value. */
  googleSiteVerification: env('VITE_GOOGLE_SITE_VERIFICATION'),
  phone: env('VITE_SHOP_PHONE', 'TODO: shop phone'),
  address: env('VITE_SHOP_ADDRESS', 'TODO: shop address'),
  exchangePolicy: env('VITE_EXCHANGE_POLICY', 'TODO: 7-day exchange policy'),
  /** A number such as 250, or leave the TODO placeholder to hide a fee. */
  deliveryCharges: env('VITE_DELIVERY_CHARGES', 'TODO: delivery charges'),
  courier: env('VITE_COURIER', 'TODO: courier'),
  /** Subtotal at which delivery becomes free. Empty disables the offer. */
  freeShippingOver: env('VITE_FREE_SHIPPING_OVER'),
  orderNotifyEmail: 'bookspower218@gmail.com',
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
