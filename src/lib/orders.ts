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

/**
 * Posts the order to Formspree so the shop gets customer + line-item details by email.
 */
export async function submitOrder(payload: OrderPayload): Promise<void> {
  const formId = config.orderFormId;
  if (!formId) {
    throw new Error(
      'We could not place this order because the order form is not connected yet. Please WhatsApp us.'
    );
  }

  const itemsText = payload.items
    .map(
      (item) =>
        `${item.quantity}x ${item.title} (Rs. ${item.price.toLocaleString('en-PK')}) [${item.id}]`
    )
    .join('\n');

  const body = {
    _subject: `New A&S Toys order ${payload.orderId}`,
    orderId: payload.orderId,
    name: payload.name,
    email: payload.email || 'no-email@customer.local',
    phone: payload.phone,
    city: payload.city,
    address: payload.address,
    notes: payload.notes || '',
    payment: payload.payment,
    total: `Rs. ${payload.total.toLocaleString('en-PK')}`,
    items: itemsText,
    message: [
      `Order ${payload.orderId}`,
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `City: ${payload.city}`,
      `Address: ${payload.address}`,
      `Payment: ${payload.payment}`,
      `Total: Rs. ${payload.total.toLocaleString('en-PK')}`,
      payload.notes ? `Notes: ${payload.notes}` : '',
      '',
      'Items:',
      itemsText,
    ]
      .filter(Boolean)
      .join('\n'),
  };

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const data = (await response.json()) as { error?: string; errors?: { message?: string }[] };
      detail = data.error || data.errors?.map((e) => e.message).filter(Boolean).join(' ') || '';
    } catch {
      /* ignore parse errors */
    }
    throw new Error(
      detail || 'We could not save your order. Please try again or WhatsApp us.'
    );
  }
}
