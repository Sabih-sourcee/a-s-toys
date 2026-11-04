import { config } from '../config';
import { CATEGORIES, PRODUCTS } from '../data/products';

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

export function categorySummaries() {
  return CATEGORIES.map((category) => {
    const items = PRODUCTS.filter((product) => product.category === category.slug);
    const cheapest = items.reduce((lowest, product) => Math.min(lowest, product.price), Number.POSITIVE_INFINITY);
    return {
      name: category.name,
      href: `/category/${category.slug}`,
      count: items.length,
      cheapest,
    };
  });
}

export function pricedAtMost(max: number, min = 0) {
  return [...PRODUCTS]
    .filter((product) => product.price >= min && product.price <= max)
    .sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
}
