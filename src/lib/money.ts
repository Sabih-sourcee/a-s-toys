import { config } from '../config';
import { PRODUCTS } from '../data/products';

export function rupees(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export function findProduct(slug: string) {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) throw new Error(`Missing product ${slug}`);
  return product;
}

export function deliveryFee(): string {
  return rupees(Number(String(config.deliveryCharges).replace(/[^0-9.]/g, '')));
}

export function freeDeliveryOver(): string {
  return rupees(Number(String(config.freeShippingOver).replace(/[^0-9.]/g, '')));
}

export const LISTINGS = 'seen on Pakistani shop listings, early November 2026';
