import { config } from '../config';
import { PaymentMethod } from '../types';

export function paymentLabel(method: PaymentMethod): string {
  if (method === 'jazzcash') return 'JazzCash';
  if (method === 'easypaisa') return 'EasyPaisa';
  if (method === 'bank_transfer') return 'Bank transfer';
  return 'COD';
}

export interface OrderPayload {
  orderId: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  email?: string;
  notes?: string;
  items: { id: string; title: string; quantity: number; price: number }[];
  total: number;
  payment: string;
}

interface OrderResult {
  ok?: boolean;
  error?: string;
}

/**
 * Sends the order to the Apps Script web app with JSONP so the browser
 * can read success or error without a CORS preflight.
 */
export function submitOrder(payload: OrderPayload): Promise<void> {
  const endpoint = config.orderEndpoint;
  if (!endpoint) {
    return Promise.reject(
      new Error('We could not place this order because the order form is not connected yet. Please WhatsApp us.')
    );
  }

  return new Promise((resolve, reject) => {
    const callback = `__asToysOrder_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const script = document.createElement('script');
    const win = window as unknown as Record<string, ((data: OrderResult) => void) | undefined>;

    const cleanup = () => {
      window.clearTimeout(timer);
      delete win[callback];
      script.remove();
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error('The order request timed out. Please try again.'));
    }, 20000);

    win[callback] = (data) => {
      cleanup();
      if (data?.ok) resolve();
      else reject(new Error(data?.error || 'We could not save your order. Please try again.'));
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('We could not reach the order service. Please try again or WhatsApp us.'));
    };

    const url = new URL(endpoint);
    url.searchParams.set('callback', callback);
    url.searchParams.set('payload', JSON.stringify(payload));
    script.src = url.toString();
    document.body.appendChild(script);
  });
}
