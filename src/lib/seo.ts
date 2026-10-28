import { config } from '../config';
import { Product } from '../types';

export const BRAND = 'A&S Toys';

export function productTitle(product: Pick<Product, 'title'>): string {
  return `${product.title} Price in Pakistan | A & S Toys`;
}

export function productDescription(product: Pick<Product, 'title' | 'shortDescription' | 'seoDescription'>): string {
  if (product.seoDescription) return product.seoDescription;
  return `${product.title} from A & S Toys. ${product.shortDescription} Plastic. Check the box for the age grade. Cash on delivery in Pakistan.`;
}

export function categoryTitle(name: string): string {
  return `${name} Price in Karachi, Pakistan | ${BRAND}`;
}

export function categoryDescription(name: string, blurb: string): string {
  const text = `${name} price in Karachi, Pakistan. ${blurb} Cash on delivery from ${BRAND} in Karachi.`;
  return text.length > 160 ? `${text.slice(0, 157)}...` : text;
}

export const ABOUT_TITLE = 'A & S Toys Shop | Online Toy Store in Karachi, Pakistan';
export const ABOUT_DESCRIPTION =
  'A & S Toys is an online toy shop in Karachi with delivery across Pakistan. Kitchen sets, building blocks, RC toys and more, from Rs 300. Cash on delivery.';

export const HOME_TITLE = 'A & S Toys | Toy Prices in Karachi, Pakistan';
export const HOME_DESCRIPTION =
  'Toy prices in Karachi, Pakistan from A&S Toys, an online toy store with nationwide delivery. Browse building blocks, pretend play, vehicles, and more.';

/** Alt text for a catalog photo. Angle 1 is the card image. */
export function productPhotoAlt(title: string, index: number): string {
  if (index <= 0) return title;
  return `${title}, angle ${index + 1}`;
}

/** Path with no trailing slash. The homepage stays "/". */
export function canonicalPath(path: string): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  if (withLeading === '/') return '/';
  return withLeading.replace(/\/+$/, '') || '/';
}

/** Absolute page URL. Root is https://host/; every other path has no trailing slash. */
export function absolutePageUrl(siteUrl: string, path: string): string {
  const origin = siteUrl.replace(/\/+$/, '');
  const canon = canonicalPath(path);
  return canon === '/' ? `${origin}/` : `${origin}${canon}`;
}

function absoluteAsset(siteUrl: string, src: string): string {
  const origin = siteUrl.replace(/\/+$/, '');
  if (/^https?:\/\//i.test(src)) return src;
  return `${origin}${src.startsWith('/') ? src : `/${src}`}`;
}

/** Flat delivery charge. Free delivery over Rs 3,500 is a cart rule; Google only accepts a MonetaryAmount here. */
function shippingRateValue(): number {
  const raw = config.deliveryCharges.trim();
  const parsed = Number(raw.replace(/[^0-9.]/g, ''));
  if (!raw || /^todo\b/i.test(raw) || !Number.isFinite(parsed) || parsed < 0) return 250;
  return parsed;
}

function isoUtcDate(now: Date, yearsAhead = 0): string {
  const date = new Date(Date.UTC(now.getUTCFullYear() + yearsAhead, now.getUTCMonth(), now.getUTCDate()));
  return date.toISOString().slice(0, 10);
}

function merchantReturnPolicy() {
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'PK',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 7,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };
}

function offerShippingDetails() {
  return {
    '@type': 'OfferShippingDetails',
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'PK',
    },
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: shippingRateValue(),
      currency: 'PKR',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 1,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 5,
        unitCode: 'DAY',
      },
    },
  };
}

export function productJsonLd(product: Product, siteUrl: string) {
  const photos = [product.image, ...product.galleryImages.filter((src) => src !== product.image)];
  const description = product.shortDescription || product.fullDescription;
  const pricedOn = new Date();
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description,
    image: photos.map((src) => absoluteAsset(siteUrl, src)),
    ...(product.id ? { sku: product.id } : {}),
    brand: { '@type': 'Brand', name: BRAND },
    offers: {
      '@type': 'Offer',
      url: absolutePageUrl(siteUrl, `/products/${product.slug}`),
      priceCurrency: 'PKR',
      price: String(product.price),
      validFrom: isoUtcDate(pricedOn),
      priceValidUntil: isoUtcDate(pricedOn, 1),
      availability: product.inStock && product.stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      shippingDetails: offerShippingDetails(),
      hasMerchantReturnPolicy: merchantReturnPolicy(),
      seller: {
        '@type': 'Organization',
        name: BRAND,
        telephone: config.phoneTel,
        url: absolutePageUrl(siteUrl, '/'),
      },
    },
  };
}

/** Store details for every page. telephone is the call line, never WhatsApp. */
export function organizationJsonLd(siteUrl: string) {
  const origin = siteUrl.replace(/\/+$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'A & S Toys',
    alternateName: ['A&S Toys', 'AS Toys', 'Usmani Toys'],
    url: origin,
    logo: absoluteAsset(siteUrl, '/images/logo.png'),
    telephone: '+92-331-7676995',
    email: config.email,
    areaServed: [
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    sameAs: ['https://www.facebook.com/profile.php?id=61595591558717'],
    hasMerchantReturnPolicy: merchantReturnPolicy(),
  };
}
