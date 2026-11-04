import { PRODUCTS } from './products';
import { absolutePageUrl, organizationId } from '../lib/seo';
import { blocksGuide, helicopterGuide, karaokeGuide, kidsPillar, kitchenGuide, priceListGuide } from './wave1';

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
  /** Product slugs. Rendered as Product | Price | link from PRODUCTS. */
  priceTable?: string[];
  /** Photos and record lines for these products. */
  productSlugs?: string[];
  links?: { href: string; label: string }[];
  /** Cards for the real category pages, with count and cheapest price. */
  categoryCards?: boolean;
}

export interface LandingPage {
  path: string;
  navLabel: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
  faqs: LandingFaq[];
  productSlugs: string[];
  kind?: 'collection' | 'guide';
  /** Direct answer, 40-60 words, rendered first. */
  intro?: string;
  sections?: LandingSection[];
  /** Other landing paths, shown as Related guides. */
  related?: string[];
  /** ISO date. Rendered as Prices checked, and used as dateModified. */
  updated?: string;
  breadcrumb?: { name: string; path: string }[];
}

const bubbleSlugs = ['gatling-bubble-gun', 'battery-bubble-gun'];

export const LANDINGS: LandingPage[] = [
  kidsPillar,
  priceListGuide,
  helicopterGuide,
  karaokeGuide,
  kitchenGuide,
  blocksGuide,
  {
    path: '/toys-online-karachi',
    navLabel: 'Toys online in Karachi',
    title: 'Toys Online in Karachi | A & S Toys',
    description: 'Order toys online in Karachi from A & S Toys. Nationwide delivery, cash on delivery, and a catalog of plastic toys. Check each box for the age grade.',
    h1: 'Toys online in Karachi',
    productSlugs: PRODUCTS.map((product) => product.slug),
    paragraphs: [
      'A & S Toys is the maker\u2019s own name for the toys in this catalog. A & S Toys is a Karachi toy shop that sells online to the rest of Pakistan. This page is the plain guide to ordering from that catalog. There is no walk-in address listed, so the shop is set up as delivery, not as a store you visit. Payment on the website is cash on delivery. A delivery charge applies, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. Shop prices are from Rs 300. Every toy on the record is plastic, and the catalog does not copy an age range, so check the box for the age grade.',
      'The catalog is small and specific. Building blocks are two products: a handled carry case of colorful blocks, and a mesh bag of large blocks in several colors. Pretend play is the A & S Kitchen Set for Kids with Stove & Oven, with a stove, an oven, and utensils in a window box, plus three toy water dispensers. One dispenser is small and shown out of the box. One has an animal face on the front. One has a tap and a kitchen-style body. Dolls and figures are a crawling baby doll in pink packaging with a bottle and a toy phone pictured, a duck slide track, and dinosaur figures in a mesh bag.',
      'Vehicles are an off-road friction toy, friction construction trucks, a light and music car set whose pack shows lights and music, and an RC flying helicopter toy with a hand controller pictured on the box. The record does not add a driving range or a channel count for that helicopter. Bubble and water toys are a multi-barrel gatling bubble gun shown with bubbles, a battery bubble gun packed with a bottle of bubble solution, and a water bullet gun. The water bullet gun is not described as a bubble gun. Gadgets are a web shooter glove and wrist launcher, a dancing cactus with a small remote, a flip phone, a karaoke set with two microphones, and a mini handheld fan in a blister. Games is the A & S Hungry Turtle Game for Kids: a green tray, colorful turtle pieces, and yellow balls, with three photos.',
      'Use the product page when you want the photos and the feature list. WhatsApp and the call line are on the site. Wholesale notes live on the contact page. If a box prints a count or an age, the box is the source. The catalog text does not copy it, which is why every description says to check the box for the age grade.',
      'Karachi shoppers and buyers in other Pakistani cities use the same catalog. Cities named for checkout include Karachi, Lahore, Islamabad, and the other cities on the order form, plus an option for another Pakistan city. Place the order on the product page. If something arrives damaged in transit, the written note is a 7-day replacement for that transit damage. These pages do not publish review scores.',
    ],
    faqs: [
      {
        question: 'Can I buy toys online from Karachi?',
        answer: 'Yes. A & S Toys is based in Karachi and ships nationwide in Pakistan. There is no walk-in address listed.',
      },
      {
        question: 'How do I pay?',
        answer: 'Payment on the website is cash on delivery.',
      },
      {
        question: 'When is delivery free?',
        answer: 'Delivery is free when the order total reaches Rs 3,500. A delivery charge applies below that. The courier named by the shop is TCS/Leopards.',
      },
      {
        question: 'What if the toy is damaged in transit?',
        answer: 'The exchange note is a 7-day replacement for transit damage.',
      },
      {
        question: 'Do the product pages list ages and piece counts?',
        answer: 'No. The catalog does not give an age range or a piece count. Check the box for the age grade. Shop prices are from Rs 300.',
      },
    ],
  },
  {
    path: '/bubble-guns-pakistan',
    navLabel: 'Bubble guns',
    title: 'Bubble Guns in Pakistan | A & S Toys',
    description: 'Bubble guns in Pakistan from A & S Toys: a multi-barrel gatling bubble gun and a battery bubble gun with solution. Check the age on the box. COD.',
    h1: 'Bubble guns in Pakistan',
    productSlugs: bubbleSlugs,
    paragraphs: [
      'A & S Toys is the maker\u2019s own name for the guns on this page. Two bubble guns are in the A & S Toys catalog, and both are on this page. They are the A & S Gatling Bubble Gun for Kids and the A & S Battery Bubble Gun with Solution. A third toy in the Bubble and Water category, the A & S Water Bullet Gun Toy, is not a bubble gun on the record, so it is not listed here. The shop is in Karachi and ships nationwide across Pakistan. Payment on the website is cash on delivery. A delivery charge applies, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in address. Both guns are plastic. Shop prices are from Rs 300. The catalog does not give an age range, so check the box for the age grade.',
      'The A & S Gatling Bubble Gun for Kids is a multi-barrel bubble gun in a colorful window box. The record says several barrels. It does not give a number, so this page does not invent one. Photos show the box and the gun held in a hand with bubbles. That is the bubble play the photos support. The feature list is the multi-barrel gun and the colorful window box. The record does not pack a bubble-solution bottle with this gun. Do not assume a bottle is in the gatling set just because the other gun has one.',
      'The A & S Battery Bubble Gun with Solution is a bubble gun with a bottle of bubble solution, packed in a window box. The photos are four angles of the same set. It is sold under that battery name. The record shows the gun and the solution bottle. It does not name a battery size, a battery count, or a bubble count. Those blanks stay blank. Use it as a bubble gun that is pictured with solution. Use the product page for the four angles.',
      'Pick the gatling gun if you want the multi-barrel shape in the colorful box, shown in a hand with bubbles, and you do not need a solution bottle on the feature list. Pick the battery bubble gun if you want the set that includes the solution bottle in the window box. They are separate products. Neither description claims a distance, a bubble size, or a motor speed, because the catalog does not measure those. Opening the product page does not add specs that the photos and the feature lines do not already state.',
      'The product page has the photos and the catalog price. Read the age grade on the box before play. If the parcel is damaged in transit, the written policy is a 7-day replacement for that transit damage. This page does not add reviews or star ratings, and it does not call the A & S Water Bullet Gun Toy a bubble gun. Open that water toy from the shop list instead of from this guide.',
    ],
    faqs: [
      {
        question: 'Which bubble guns does A & S Toys sell?',
        answer: 'The A & S Gatling Bubble Gun for Kids and the A & S Battery Bubble Gun with Solution. The A & S Water Bullet Gun Toy is a different toy and is not listed as a bubble gun.',
      },
      {
        question: 'What comes with the A & S Gatling Bubble Gun for Kids?',
        answer: 'It is a multi-barrel bubble gun in a colorful window box. Photos show it held in a hand with bubbles. The record does not list a bubble-solution bottle with this gun, and it does not number the barrels.',
      },
      {
        question: 'What comes with the A & S Battery Bubble Gun with Solution?',
        answer: 'A bubble gun and a bottle of bubble solution in a window box, shown from four angles. The record does not name a battery size.',
      },
      {
        question: 'What age are the bubble guns for?',
        answer: 'The catalog does not give an age range. Check the box for the age grade. The material on the record is plastic.',
      },
      {
        question: 'How do I order?',
        answer: 'Order on the product page. Payment on the website is cash on delivery. A & S Toys ships nationwide from Karachi. Delivery is free when the order total reaches Rs 3,500. Prices are from Rs 300.',
      },
    ],
  },
];

export function guidesForProduct(slug: string): { href: string; label: string }[] {
  return LANDINGS.filter((page) => (
    page.path !== '/toys-online-karachi'
    && page.path !== '/toys-for-kids-pakistan'
    && page.productSlugs.includes(slug)
  ))
    .map((page) => ({ href: page.path, label: page.navLabel }));
}

export function landingByPath(path: string): LandingPage | undefined {
  return LANDINGS.find((page) => page.path === path);
}

export function landingProducts(page: LandingPage) {
  return page.productSlugs.map((slug) => {
    const product = PRODUCTS.find((item) => item.slug === slug);
    if (!product) throw new Error(`Missing product for ${page.path}: ${slug}`);
    return product;
  });
}

export function pricesCheckedLabel(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `Prices checked ${day} ${months[month - 1]} ${year}`;
}

export function landingJsonLd(page: LandingPage, siteUrl: string) {
  const products = landingProducts(page);
  const pageUrl = absolutePageUrl(siteUrl, page.path);
  const crumbs = page.breadcrumb ?? [
    { name: 'Home', path: '/' },
    { name: page.h1, path: page.path },
  ];
  const nodes: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absolutePageUrl(siteUrl, crumb.path),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: page.h1,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        url: absolutePageUrl(siteUrl, `/products/${product.slug}`),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];
  if (page.kind) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': page.kind === 'collection' ? 'CollectionPage' : 'Article',
      headline: page.h1,
      name: page.h1,
      dateModified: page.updated,
      publisher: { '@id': organizationId(siteUrl) },
      mainEntityOfPage: pageUrl,
    });
  }
  return nodes;
}
