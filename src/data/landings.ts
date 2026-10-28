import { PRODUCTS } from './products';
import { absolutePageUrl } from '../lib/seo';

export interface LandingFaq {
  question: string;
  answer: string;
}

export type LandingBlock =
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string };

export interface LandingPage {
  path: string;
  navLabel: string;
  /** Homepage anchor, as specified in the keyword brief. */
  homeAnchor: string;
  /** Anchor used when another landing links here. */
  crossAnchor: string;
  title: string;
  description: string;
  h1: string;
  blocks: LandingBlock[];
  faqs: LandingFaq[];
  productSlugs: string[];
}

const kitchenSlugs = [
  'kitchen-play-set',
  'mini-water-dispenser-toy',
  'animal-water-dispenser',
  'kitchen-water-dispenser',
];

const blockSlugs = ['building-blocks-play-set', 'big-building-blocks-bag'];

const bubbleSlugs = ['gatling-bubble-gun', 'battery-bubble-gun'];

const dispenserSlugs = [
  'mini-water-dispenser-toy',
  'animal-water-dispenser',
  'kitchen-water-dispenser',
];

export const LANDINGS: LandingPage[] = [
  {
    path: '/kitchen-set-toys-pakistan',
    navLabel: 'Kitchen set toys',
    homeAnchor: 'kitchen set toys in Pakistan',
    crossAnchor: 'kitchen set toys',
    title: 'Kitchen Set Toys in Pakistan | Price in Karachi | A & S Toys',
    description:
      'Kitchen set toys in Pakistan and Karachi from A & S Toys: toy kitchen play set and toy dispensers from Rs 300. COD, 7-day replacement.',
    h1: 'Kitchen set toys in Pakistan',
    productSlugs: kitchenSlugs,
    blocks: [
      {
        kind: 'p',
        text: 'Looking for a kitchen set toy price in Pakistan? A & S Toys in Karachi sells a Kitchen Play Set and three toy water dispensers. The Kitchen Play Set is a toy kitchen in a window box. The pack shows a stove, an oven, and utensils. Those pictured pieces are what you use for pretend cooking. Shop prices are from Rs 300. Payment on the website is cash on delivery. Delivery is Rs 250, and delivery is free when the order total reaches Rs 3,500. The exchange note is a 7-day replacement for transit damage. Check the box for the age grade.',
      },
      { kind: 'h2', text: 'Kids kitchen set in Karachi' },
      {
        kind: 'p',
        text: 'The kids kitchen set on this page is the Kitchen Play Set. A & S Toys is a Karachi shop and sends orders across Pakistan with TCS/Leopards. There is no walk-in counter. The set is plastic and sits in Pretend Play. Photos are the shop photos of the window box. Expect the stove, the oven, and the utensils shown on the pack. Check the box for the age grade before you hand it over.',
      },
      {
        kind: 'p',
        text: 'The Mini Water Dispenser Toy, the Animal Water Dispenser, and the Kitchen Water Dispenser are separate toys, not pieces packed inside the kitchen set. The mini one is the small dispenser, shown in the box and out of it. The animal one has an animal face on the front of the pack. The kitchen one has a tap and a kitchen-style body. See [water dispenser toys](/water-dispenser-toys-pakistan) for those three together. All four toys on this page are plastic.',
      },
    ],
    faqs: [
      {
        question: 'Which kitchen toys are listed on this page?',
        answer:
          'The Kitchen Play Set, the Mini Water Dispenser Toy, the Animal Water Dispenser, and the Kitchen Water Dispenser.',
      },
      {
        question: 'What does the Kitchen Play Set show?',
        answer: 'A toy kitchen in a window box. The pack shows a stove, an oven, and utensils.',
      },
      {
        question: 'How do the water dispenser toys differ?',
        answer:
          'The mini one is small and is shown in and out of the box. The animal one has an animal face on the front. The kitchen one has a tap and a kitchen-style body.',
      },
      {
        question: 'What age are these kitchen toys for?',
        answer: 'Check the box for the age grade. The catalog does not print an age range.',
      },
      {
        question: 'How do I pay and get delivery?',
        answer:
          'Payment on the website is cash on delivery. A & S Toys is in Karachi and ships nationwide. Delivery is Rs 250, and it is free when the order total reaches Rs 3,500. The exchange note is a 7-day replacement for transit damage.',
      },
    ],
  },
  {
    path: '/water-dispenser-toys-pakistan',
    navLabel: 'Water dispenser toys',
    homeAnchor: 'water dispenser toys',
    crossAnchor: 'water dispenser toy price in Pakistan',
    title: 'Water Dispenser Toy Price in Pakistan | A & S Toys',
    description:
      'Water dispenser toy in Pakistan from A & S Toys: mini, animal and kitchen dispenser toys, from Rs 300. Karachi shop, COD, 7-day replacement.',
    h1: 'Water dispenser toys in Pakistan',
    productSlugs: dispenserSlugs,
    blocks: [
      {
        kind: 'p',
        text: 'Water dispenser toy price in Pakistan is what this page is for. A & S Toys in Karachi sells three toy water dispensers: the Mini Water Dispenser Toy, the Animal Water Dispenser, and the Kitchen Water Dispenser. Each one is plastic and sits in Pretend Play. Shop prices are from Rs 300. Payment on the website is cash on delivery. Delivery is Rs 250, and delivery is free when the order total reaches Rs 3,500. The exchange note is a 7-day replacement for transit damage. The courier is TCS/Leopards. There is no walk-in counter. Check the box for the age grade.',
      },
      {
        kind: 'p',
        text: 'The Mini Water Dispenser Toy is the smallest of the three. It comes in a window box, and one photo shows the toy out of the box while the others show the pack. It is the mini dispenser toy in the catalog. Use it for pretend play beside a toy kitchen. The photos are the shop photos of that set.',
      },
      {
        kind: 'p',
        text: 'The Animal Water Dispenser is a toy water dispenser with an animal face on the front of the pack. Other photos show that box from the side and the back. Choose it when that face is the look you want. It is its own product, not a piece inside the Kitchen Play Set.',
      },
      {
        kind: 'p',
        text: 'The Kitchen Water Dispenser has a tap and a kitchen-style body, packed like a small kitchen appliance. Photos show four sides of the same window box. It is the one to pick when you want the tap. The [kitchen set toys](/kitchen-set-toys-pakistan) page has the Kitchen Play Set, a toy kitchen with a stove, an oven, and utensils in a window box.',
      },
      {
        kind: 'p',
        text: 'Pick the mini dispenser when you want the small one pictured outside the box. Pick the animal dispenser when you want the face on the front of the pack. Pick the kitchen-style dispenser when you want the tap. Open each product page for the photos and the catalog price. A & S Toys delivers these from Karachi across Pakistan. Check the box for the age grade before play.',
      },
    ],
    faqs: [
      {
        question: 'What is a water dispenser toy on this page?',
        answer:
          'A plastic pretend-play toy from A & S Toys. The catalog has a mini dispenser, one with an animal face on the pack, and one with a tap and a kitchen-style body.',
      },
      {
        question: 'Which water dispenser toy is the smallest?',
        answer:
          'The Mini Water Dispenser Toy. It is the small one, shown in a window box and in a photo out of the box.',
      },
      {
        question: 'How do delivery, cash on delivery, and replacement work?',
        answer:
          'Payment on the website is cash on delivery. A & S Toys is in Karachi and ships nationwide. Delivery is Rs 250, and it is free when the order total reaches Rs 3,500. The exchange note is a 7-day replacement for transit damage.',
      },
    ],
  },
  {
    path: '/building-blocks-toys-pakistan',
    navLabel: 'Building blocks toys',
    homeAnchor: 'building blocks toys',
    crossAnchor: 'building blocks toys price in Pakistan',
    title: 'Building Blocks Toys in Pakistan | Price | A & S Toys',
    description:
      'Building blocks toys in Pakistan: handled carry case set and big blocks bag from A & S Toys, from Rs 300. COD, 7-day replacement.',
    h1: 'Building blocks toys in Pakistan',
    productSlugs: blockSlugs,
    blocks: [
      {
        kind: 'p',
        text: 'Looking for building blocks toys price in Pakistan? A & S Toys in Karachi has two plastic building-block toys. One is the Building Blocks Play Set. The other is the Big Building Blocks Bag. Shop prices are from Rs 300. Payment on the website is cash on delivery. Delivery is Rs 250, and delivery is free when the order total reaches Rs 3,500. The courier is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in counter. Check the box for the age grade.',
      },
      {
        kind: 'p',
        text: 'The Building Blocks Play Set is a carry case of colorful building blocks. The case has a handle. Photos show the closed case and the blocks beside it, and the blocks inside the case and outside it. Use it for stacking and simple building, then close the case to carry it. Check the box if you need a piece count.',
      },
      {
        kind: 'p',
        text: 'The Big Building Blocks Bag is large colorful building blocks in a mesh storage bag. Photos show the bag from the front and from the side. The blocks come in several colors. Use them for floor building, then put them back in the mesh bag. This one is a bag, not a hard carry case. It is still plastic.',
      },
      {
        kind: 'p',
        text: 'Choose the carry case if you want a handled box you can close. Choose the mesh bag if you want large blocks in several colors and a soft bag. They are two products, not one combined kit. Open each product page for the photos and the catalog price. A & S Toys delivers nationwide from Karachi.',
      },
    ],
    faqs: [
      {
        question: 'Which building blocks toys are on this page?',
        answer: 'The Building Blocks Play Set and the Big Building Blocks Bag.',
      },
      {
        question: 'What is the difference between the case and the bag?',
        answer:
          'The play set is colorful blocks in a handled carry case, shown inside and outside the case. The bag is large blocks in several colors in a mesh storage bag, shown from the front and the side.',
      },
      {
        question: 'How many blocks are in each set?',
        answer: 'Check the box. This page does not guess a piece count.',
      },
      {
        question: 'What age are the blocks for?',
        answer: 'Check the box for the age grade. The material on the product record is plastic.',
      },
      {
        question: 'How does delivery work?',
        answer:
          'A & S Toys is in Karachi and ships nationwide. Payment on the website is cash on delivery. Delivery is Rs 250, and it is free when the order total reaches Rs 3,500.',
      },
    ],
  },
  {
    path: '/toys-online-karachi',
    navLabel: 'Toys online in Karachi',
    homeAnchor: 'toys online in Karachi',
    crossAnchor: 'buy toys online in Karachi',
    title: 'Toys Online in Karachi | Buy Kids Toys, COD | A & S Toys',
    description:
      'Buy toys online in Karachi from A & S Toys. Kitchen sets, blocks, bubble guns, RC toys from Rs 300. COD, 7-day replacement, Rs 250 delivery.',
    h1: 'Toys online in Karachi',
    productSlugs: PRODUCTS.map((product) => product.slug),
    blocks: [
      {
        kind: 'p',
        text: 'A & S Toys is a Karachi toy shop that sells online to the rest of Pakistan. There is no walk-in address, so you order for delivery. Payment on the website is cash on delivery. Delivery is Rs 250, and delivery is free when the order total reaches Rs 3,500. The courier is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. Shop prices are from Rs 300. Every toy on the record is plastic. Check the box for the age grade.',
      },
      { kind: 'h2', text: 'Online toys shop in Karachi' },
      {
        kind: 'p',
        text: 'This online toys shop in Karachi lists the full A & S Toys catalog on one page. Building blocks are a handled carry case of colorful blocks and a mesh bag of large blocks in several colors. Pretend play is the Kitchen Play Set, with a stove, an oven, and utensils in a window box, plus three toy water dispensers: a small one shown out of the box, one with an animal face on the front, and one with a tap and a kitchen-style body. Dolls and figures are a crawling baby doll in pink packaging with a bottle and a toy phone pictured, a duck slide track, and dinosaur figures in a mesh bag.',
      },
      { kind: 'h2', text: 'Kids toys online in Karachi' },
      {
        kind: 'p',
        text: 'Kids toys online in Karachi from this shop also include vehicles and small gadgets. Vehicles are an off-road friction toy, friction construction trucks, a light and music car set whose pack shows lights and music, and an RC flying helicopter toy with a hand controller pictured on the box. Bubble and water toys are a multi-barrel gatling bubble gun shown with bubbles, a battery bubble gun packed with a bottle of bubble solution, and a water bullet gun. The water bullet gun is a water gun, not a bubble gun. Gadgets are a web shooter glove and wrist launcher, a dancing cactus with a small remote, a flip phone, a karaoke set with two microphones, and a mini handheld fan in a blister. Games is the Hungry Turtle Game: a green tray, colorful turtle pieces, and yellow balls.',
      },
      {
        kind: 'p',
        text: 'Place the order on the product page. Cities on the order form include Karachi, Lahore, Islamabad, and the other listed Pakistan cities. WhatsApp and the call line are on the site. If a parcel is damaged in transit, the written note is a 7-day replacement for that transit damage. Check the box for the age grade.',
      },
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
        answer:
          'Delivery is Rs 250. It is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards.',
      },
      {
        question: 'What if the toy is damaged in transit?',
        answer: 'The exchange note is a 7-day replacement for transit damage.',
      },
      {
        question: 'Bachon ke khilone online Karachi mein kahan se order karein?',
        answer:
          'A & S Toys se yahin order karein. Yeh Karachi ki online toy shop hai aur Pakistan bhar delivery karti hai. Payment cash on delivery hai. Delivery Rs 250 hai, aur order Rs 3,500 se upar ho to delivery free hai. Transit damage par 7 din ka replacement hai.',
      },
    ],
  },
  {
    path: '/bubble-guns-pakistan',
    navLabel: 'Bubble guns',
    homeAnchor: 'bubble guns in Pakistan',
    crossAnchor: 'bubble gun price in Pakistan',
    title: 'Bubble Gun Price in Pakistan | A & S Toys',
    description:
      'Bubble gun in Pakistan from A & S Toys: gatling and battery bubble guns from Rs 300. Karachi shop, COD, 7-day replacement.',
    h1: 'Bubble guns in Pakistan',
    productSlugs: bubbleSlugs,
    blocks: [
      {
        kind: 'p',
        text: 'Bubble gun price in Pakistan, for the two guns A & S Toys actually sells, is on this page. They are the Gatling Bubble Gun and the Battery Bubble Gun. The [water gun](/products/water-bullet-gun) in the same Bubble and Water category is not a bubble gun, so it is not in the list below. The shop is in Karachi and ships nationwide. Payment on the website is cash on delivery. Delivery is Rs 250, and delivery is free when the order total reaches Rs 3,500. The exchange note is a 7-day replacement for transit damage. Both guns are plastic. Shop prices are from Rs 300. Check the box for the age grade.',
      },
      {
        kind: 'p',
        text: 'The Gatling Bubble Gun is a multi-barrel bubble gun in a colorful window box. Photos show the box and the gun held in a hand with bubbles. The feature list is the multi-barrel gun and the colorful window box. This set does not list a bubble-solution bottle. Check the box for a barrel count rather than guessing one.',
      },
      {
        kind: 'p',
        text: 'The Battery Bubble Gun is a bubble gun with a bottle of bubble solution, packed in a window box. The photos are four views of the same set. It is sold under that battery name. The listing shows the gun and the solution bottle. Check the box for battery details. Use the product page for those photos.',
      },
      {
        kind: 'p',
        text: 'Pick the gatling gun for the multi-barrel shape in the colorful box, shown in a hand with bubbles. Pick the battery bubble gun for the set that includes the solution bottle. They are separate products. A & S Toys delivers from Karachi. If the parcel is damaged in transit, the written policy is a 7-day replacement for that transit damage.',
      },
    ],
    faqs: [
      {
        question: 'Which bubble guns does A & S Toys sell?',
        answer:
          'The Gatling Bubble Gun and the Battery Bubble Gun. The water gun, the Water Bullet Gun, is a different toy and is not a bubble gun.',
      },
      {
        question: 'What comes with the Gatling Bubble Gun?',
        answer:
          'It is a multi-barrel bubble gun in a colorful window box. Photos show it held in a hand with bubbles. A bubble-solution bottle is not on this gun’s feature list. Check the box for a barrel count.',
      },
      {
        question: 'What comes with the Battery Bubble Gun?',
        answer:
          'A bubble gun and a bottle of bubble solution in a window box, shown from four views. Check the box for battery details.',
      },
      {
        question: 'What age are the bubble guns for?',
        answer: 'Check the box for the age grade. The material on the product record is plastic.',
      },
      {
        question: 'How do I order?',
        answer:
          'Order on the product page. Payment on the website is cash on delivery. A & S Toys ships nationwide from Karachi. Delivery is Rs 250, and it is free when the order total reaches Rs 3,500. Prices are from Rs 300.',
      },
    ],
  },
];

const PRODUCT_LANDING: Record<string, { href: string; anchor: string }> = {
  'kitchen-play-set': { href: '/kitchen-set-toys-pakistan', anchor: 'kitchen set toys in Pakistan' },
  'mini-water-dispenser-toy': { href: '/water-dispenser-toys-pakistan', anchor: 'more water dispenser toys' },
  'animal-water-dispenser': { href: '/water-dispenser-toys-pakistan', anchor: 'water dispenser toys' },
  'kitchen-water-dispenser': { href: '/water-dispenser-toys-pakistan', anchor: 'water dispenser toy in Pakistan' },
  'building-blocks-play-set': { href: '/building-blocks-toys-pakistan', anchor: 'building blocks toys in Pakistan' },
  'big-building-blocks-bag': { href: '/building-blocks-toys-pakistan', anchor: 'building blocks toys' },
  'gatling-bubble-gun': { href: '/bubble-guns-pakistan', anchor: 'bubble gun price in Pakistan' },
  'battery-bubble-gun': { href: '/bubble-guns-pakistan', anchor: 'bubble guns in Pakistan' },
  'water-bullet-gun': { href: '/bubble-guns-pakistan', anchor: 'bubble guns in Pakistan' },
};

const KARACHI_ANCHORS = [
  'toys online in Karachi',
  'buy toys online in Karachi',
  'kids toys online in Karachi',
  'online toys shop in Karachi',
];

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

export function landingMoreLinks(page: LandingPage): { href: string; anchor: string }[] {
  return [
    ...LANDINGS.filter((item) => item.path !== page.path).map((item) => ({
      href: item.path,
      anchor: item.crossAnchor,
    })),
    { href: '/shop', anchor: 'Shop all toys' },
  ];
}

export function productGuideLinks(slug: string): { href: string; anchor: string }[] {
  const index = Math.max(0, PRODUCTS.findIndex((item) => item.slug === slug));
  const links = [];
  const specific = PRODUCT_LANDING[slug];
  if (specific) links.push(specific);
  links.push({
    href: '/toys-online-karachi',
    anchor: KARACHI_ANCHORS[index % KARACHI_ANCHORS.length],
  });
  return links;
}

export type LandingTextPart =
  | { type: 'text'; value: string }
  | { type: 'link'; label: string; href: string };

export function splitLandingText(text: string): LandingTextPart[] {
  const parts: LandingTextPart[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ type: 'text', value: text.slice(last, index) });
    parts.push({ type: 'link', label: match[1], href: match[2] });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export function landingJsonLd(page: LandingPage, siteUrl: string) {
  const products = landingProducts(page);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
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
  ];
}
