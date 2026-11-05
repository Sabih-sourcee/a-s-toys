import { HOME_FAQS, ORDER_STEPS } from '../data/homeFaq';
import { config, officialProfiles } from '../config';
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

export const ABOUT_TITLE = 'A & S Toys Shop Karachi | About, FAQ & Delivery in Pakistan';
export const ABOUT_DESCRIPTION =
  'A & S Toys is a Karachi toy shop with branded toys from Rs 300, cash on delivery and delivery across Pakistan in 2-5 business days. FAQ, policies and all toys.';

export const HOME_TITLE = 'A & S Toys | Toys Online in Karachi & Pakistan, from Rs 300';
export const HOME_DESCRIPTION =
  'A & S Toys is an online toy shop in Karachi with delivery across Pakistan in 2-5 days. Kitchen sets, building blocks, bubble guns, RC toys and more, from Rs 300.';

/**
 * What each photo shows, in image order. Details only; the product name is added in productPhotoAlt.
 * Search phrases appear once: kids kitchen set with oven and stove, toy oven, building blocks for kids, RC helicopter toy.
 */
const PHOTO_ALTS: Record<string, string[]> = {
  'building-blocks-play-set': [
    'building blocks for kids in a clear bag, front view',
    'three-quarter view of the colorful blocks in the bag',
    'side of the bag of colorful blocks',
    'other side of the bag, showing its depth',
  ],
  'kitchen-play-set': [
    'kids kitchen set with oven and stove, packed with utensils',
    'three-quarter view of the packed stove top and utensils',
    'other side of the packed toy oven and utensils',
    'lower angle of the packed stove top and utensils',
  ],
  'web-shooter-glove-set': [
    'glove and wrist launcher in a clear bag, front view',
    'three-quarter view of the glove and wrist launcher in the bag',
    'another angle of the glove and wrist launcher in the bag',
    'side angle of the packed glove and wrist launcher',
  ],
  'mini-water-dispenser-toy': [
    'small toy water dispenser in a clear bag, front view',
    'three-quarter view of the small dispenser in the bag',
    'other side of the packed small dispenser',
    'lower angle of the small dispenser in the bag',
  ],
  'big-building-blocks-bag': [
    'mesh bag of large colorful blocks, zipper on the right',
    'the mesh bag of large blocks from the other end',
    'zipper panel of the mesh bag of large colorful blocks',
    'top of the mesh bag with the zipper along the edge',
  ],
  'crawling-baby-doll': [
    'crawling doll in a clear bag, side view',
    'three-quarter front of the crawling doll in the bag',
    'back of the crawling doll in the bag',
    'front three-quarter of the crawling doll in the bag',
  ],
  'gatling-bubble-gun': [
    'front of the colorful box with the multi-barrel bubble gun',
    'left side of the gatling bubble gun box',
    'right side of the gatling bubble gun box',
    'top angle of the gatling bubble gun box',
  ],
  'dancing-cactus-toy': [
    'front of the box showing the cactus-shaped toy with a small remote',
    'side of the dancing cactus box',
    'other side of the dancing cactus box',
    'top of the dancing cactus box',
  ],
  'duck-slide-track': [
    'duck slide track and duck figures beside the box',
    'front view of the track and duck figures with the box',
    'the duck figures and slide track laid out by the box',
    'the slide track and duck figures shown with the box',
  ],
  'animal-water-dispenser': [
    'front of the box with the animal face on the dispenser',
    'left side of the animal water dispenser box',
    'right side of the animal water dispenser box',
    'top of the animal water dispenser box',
  ],
  'kitchen-water-dispenser': [
    'front of the kitchen-style dispenser box with a tap',
    'side panel of the kitchen water dispenser box',
    'dispenser out of the box beside the pack',
    'unpacked dispenser with the box beside it',
  ],
  'toy-flip-phone': [
    'open flip-style toy phone beside its box',
    'three-quarter view of the open flip phone and box',
    'side view of the open flip phone beside the box',
    'another three-quarter view of the flip phone and box',
  ],
  'friction-off-road-vehicle': [
    'friction off-road jeep on a sandy track',
    'the same off-road jeep on a white background',
  ],
  'karaoke-speaker-set': [
    'toy speaker with two microphones, out of the box',
    'side of the toy speaker with the two microphones',
    'other side of the speaker and two microphones',
    'top of the speaker with the two microphones',
  ],
  'light-music-car-set': [
    'front of the window boxes, with lights and music on the pack',
    'another front view of the boxed light and music car set',
    'the stacked window boxes of the car set',
    'the car set boxes from a lower front angle',
  ],
  'rc-flying-helicopter-toy': [
    'RC helicopter toy in a window box with the hand controller',
    'three-quarter view of the helicopter box and hand controller',
    'front of the helicopter window box',
    'another three-quarter view of the helicopter box',
  ],
  'friction-construction-trucks': [
    'friction construction trucks beside the header bag',
    'overhead view of the trucks and the bag',
    'the trucks and bag from above',
    'the loose trucks next to the packed bag',
  ],
  'water-bullet-gun': [
    'front of the window box with the water bullet gun',
    'the boxed water bullet gun from the front',
    'another front view of the water bullet gun box',
    'the water bullet gun in its window box',
  ],
  'dinosaur-figure-set': [
    'dinosaur figures beside the mesh bag',
    'overhead view of the dinosaur figures and mesh bag',
    'the figures and mesh bag from above',
    'another overhead view of the dinosaur figures and bag',
  ],
  'battery-bubble-gun': [
    'bubble gun and solution bottle out of the box',
    'the gun with the solution bottle on its side',
    'the gun and upright solution bottle with the box open',
    'the gun and solution bottle in front of the closed box',
  ],
  'mini-handheld-fan': [
    'front view of the small handheld fans',
    'the handheld fans straight on',
    'another front view of the mini fans',
    'lower front angle of the handheld fans',
  ],
  'hungry-turtle-game': [
    'green tray with colorful turtle pieces and yellow balls',
    'three-quarter view of the tray, turtle pieces, and yellow balls',
    'another angle of the tray with turtle pieces and yellow balls',
  ],
};

/** Each photo starts with the product name and says what that shot shows. */
export function productPhotoAlt(
  product: Pick<Product, 'title' | 'slug' | 'altDetail'>,
  index: number,
): string {
  const detail = PHOTO_ALTS[product.slug]?.[index] ?? (index <= 0 ? product.altDetail : undefined);
  return detail ? `${product.title} - ${detail}` : product.title;
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
    brand: { '@id': organizationId(siteUrl) },
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
      seller: { '@id': organizationId(siteUrl) },
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

export function organizationId(siteUrl: string): string {
  return `${siteUrl.replace(/\/+$/, '')}/#organization`;
}

/** One linked graph for every page. OnlineStore, not LocalBusiness. No street address. */
export function organizationJsonLd(siteUrl: string) {
  const origin = siteUrl.replace(/\/+$/, '');
  const id = organizationId(siteUrl);
  const sameAs = officialProfiles().map((profile) => profile.url);
  const store: Record<string, unknown> = {
    '@type': 'OnlineStore',
    '@id': id,
    name: 'A & S Toys',
    alternateName: ['A&S Toys', 'AS Toys', 'A and S Toys', 'Usmani Toys'],
    url: `${origin}/`,
    logo: absoluteAsset(siteUrl, '/images/logo.png'),
    telephone: '+92-331-7676995',
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    areaServed: [
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    disambiguatingDescription:
      'Pakistani toy shop based in Karachi that sells its own A & S toys at usmanitoys.com',
    hasMerchantReturnPolicy: merchantReturnPolicy(),
  };
  if (config.googleBusinessProfileUrl) store.hasMap = config.googleBusinessProfileUrl;
  if (sameAs.length) store.sameAs = sameAs;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      store,
      {
        '@type': 'WebSite',
        name: 'A & S Toys',
        alternateName: ['A&S Toys', 'usmanitoys.com'],
        url: `${origin}/`,
        publisher: { '@id': id },
      },
    ],
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

function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function howToOrderJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to order from A & S Toys',
    step: ORDER_STEPS.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text,
    })),
  };
}

/** Store and website live in organizationJsonLd. The homepage does not repeat them. */
export function homeJsonLd(_siteUrl: string) {
  return [];
}

/** FAQ and order steps live on /about, so this schema is only emitted there. */
export function aboutPageJsonLd() {
  return [faqPageJsonLd(), howToOrderJsonLd()];
}
