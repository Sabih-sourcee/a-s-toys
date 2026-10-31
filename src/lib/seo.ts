import { HOME_FAQS, ORDER_STEPS } from '../data/homeFaq';
import { config } from '../config';
import { Product } from '../types';

export const BRAND = 'A & S Toys';

export function productTitle(product: Pick<Product, 'title'>): string {
  return `${product.title} Price in Pakistan`;
}

export function productDescription(product: Pick<Product, 'title' | 'shortDescription' | 'seoDescription'>): string {
  if (product.seoDescription) return product.seoDescription;
  return `${product.title}. ${product.shortDescription} Plastic. Check the box for the age grade. Cash on delivery in Pakistan.`;
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

export const HOME_TITLE = 'A & S Toys Shop | Toys Online in Karachi & Pakistan, from Rs 300';
export const HOME_DESCRIPTION =
  'A & S Toys is an online toy shop in Karachi with delivery across Pakistan in 2-5 days. Kitchen sets, building blocks, bubble guns, RC toys and more, from Rs 300.';

/** Photo 1 uses the record detail. Later photos are numbered photo N of M. */
export function productPhotoAlt(
  product: Pick<Product, 'title' | 'altDetail' | 'galleryImages'>,
  index: number,
): string {
  const total = 1 + product.galleryImages.length;
  if (index <= 0) {
    return product.altDetail ? `${product.title} - ${product.altDetail}` : product.title;
  }
  return `${product.title}, photo ${index + 1} of ${total}`;
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
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    ...(product.oldName ? { alternateName: product.oldName } : {}),
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
  return [
    productLd,
    breadcrumbJsonLd(siteUrl, [
      { name: 'Home', path: '/' },
      { name: product.categoryName, path: `/category/${product.category}` },
      { name: product.title, path: `/products/${product.slug}` },
    ]),
  ];
}

/** Store details for every page. telephone is the call line, never WhatsApp. */
export function organizationJsonLd(siteUrl: string) {
  const origin = siteUrl.replace(/\/+$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'A & S Toys',
    alternateName: ['A&S Toys', 'AS Toys', 'A and S Toys', 'Usmani Toys'],
    knowsAbout: ['Toys', 'Building blocks', 'Kitchen play sets', 'Bubble guns', 'Remote-control toys'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-331-7676995',
      contactType: 'customer service',
      areaServed: 'PK',
      availableLanguage: ['en', 'ur'],
    },
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

export function breadcrumbJsonLd(siteUrl: string, crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolutePageUrl(siteUrl, crumb.path),
    })),
  };
}

export function categoryItemListJsonLd(
  siteUrl: string,
  name: string,
  products: { title: string; slug: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.title,
      url: absolutePageUrl(siteUrl, `/products/${product.slug}`),
    })),
  };
}

export function homeJsonLd(siteUrl: string) {
  const origin = siteUrl.replace(/\/+$/, '');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'A & S Toys',
      url: `${origin}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': ['OnlineStore', 'Store'],
      name: 'A & S Toys',
      url: `${origin}/`,
      image: absoluteAsset(siteUrl, '/images/logo.png'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HOME_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to order from A & S Toys',
      step: ORDER_STEPS.map((text, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text,
      })),
    },
  ];
}
