import { Product } from '../types';

export const BRAND = 'A&S Toys';

export function productTitle(product: Pick<Product, 'title' | 'seoTitle'>): string {
  return product.seoTitle || `${product.title} Price in Karachi, Pakistan | ${BRAND}`;
}

export function productDescription(product: Pick<Product, 'title' | 'price' | 'shortDescription' | 'seoDescription'>): string {
  if (product.seoDescription) return product.seoDescription;
  const text = `${product.title} price in Karachi, Pakistan is Rs. ${product.price.toLocaleString('en-PK')}. ${product.shortDescription} Cash on delivery from ${BRAND} in Karachi.`;
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

export function categoryTitle(name: string): string {
  return `${name} Price in Karachi, Pakistan | ${BRAND}`;
}

export function categoryDescription(name: string, blurb: string): string {
  const text = `${name} price in Karachi, Pakistan. ${blurb} Cash on delivery from ${BRAND} in Karachi.`;
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

export const HOME_TITLE = `Toy Prices in Karachi, Pakistan | ${BRAND}`;
export const HOME_DESCRIPTION =
  'Toy prices in Karachi, Pakistan from A&S Toys, an online toy store with nationwide delivery. Browse wooden toys, die-cast cars, plush, and baby toys.';

export function productJsonLd(product: Product, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: [product.image, ...product.galleryImages.filter((src) => src !== product.image)],
    sku: product.id,
    brand: { '@type': 'Brand', name: BRAND },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: 'PKR',
      price: String(product.price),
      availability: product.inStock && product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };
}
