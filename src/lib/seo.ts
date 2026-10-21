import { config } from '../config';
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
  'Toy prices in Karachi, Pakistan from A&S Toys, an online toy store with nationwide delivery. Browse building blocks, pretend play, vehicles, and more.';

/** Alt text for a catalog photo. Angle 1 is the card image. */
export function productPhotoAlt(title: string, index: number): string {
  if (index <= 0) return title;
  return `${title}, angle ${index + 1}`;
}

function absoluteAsset(siteUrl: string, src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteUrl}${src.startsWith('/') ? src : `/${src}`}`;
}

export function productJsonLd(product: Product, siteUrl: string) {
  const photos = [product.image, ...product.galleryImages.filter((src) => src !== product.image)];
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription,
    image: photos.map((src) => absoluteAsset(siteUrl, src)),
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
      seller: {
        '@type': 'Organization',
        name: BRAND,
        telephone: config.phoneTel,
        url: siteUrl,
      },
    },
  };
}

/** Store details for every page. telephone is the call line, never WhatsApp. */
export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: siteUrl,
    logo: absoluteAsset(siteUrl, '/favicon-512x512.png'),
    telephone: config.phoneTel,
    email: config.email,
  };
}
