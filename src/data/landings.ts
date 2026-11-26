import { config } from '../config';
import { PRODUCTS } from './products';
import { deliveryFee, findProduct, freeDeliveryOver, rupees } from '../lib/money';
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
const gatlingGun = findProduct('gatling-bubble-gun');
const batteryGun = findProduct('battery-bubble-gun');
const catalogLow = Math.min(...PRODUCTS.map((product) => product.price));
const catalogHigh = Math.max(...PRODUCTS.map((product) => product.price));
const pricedSlugs = [...PRODUCTS]
  .sort((a, b) => a.price - b.price || a.title.localeCompare(b.title))
  .map((product) => product.slug);
const miniDispenser = findProduct('mini-water-dispenser-toy');
const animalDispenser = findProduct('animal-water-dispenser');
const kitchenDispenser = findProduct('kitchen-water-dispenser');

const waterDispenserPage: LandingPage = {
  path: '/water-dispenser-toys-pakistan',
  navLabel: 'Water dispenser toys',
  title: `Dispenser Toy for Kids Price in Pakistan from ${rupees(miniDispenser.price)} | A & S Toys`,
  description: `The ${miniDispenser.title} is ${rupees(miniDispenser.price)}. The ${kitchenDispenser.title} is ${rupees(kitchenDispenser.price)}. The ${animalDispenser.title} is ${rupees(animalDispenser.price)}. Cash on delivery from A & S Toys.`,
  h1: 'Dispenser toy for kids in Pakistan',
  kind: 'collection',
  updated: '2026-11-26',
  productSlugs: [miniDispenser.slug, animalDispenser.slug, kitchenDispenser.slug],
  paragraphs: [
    `A & S Toys lists three water dispenser toys. They are pretend-play pieces from a Karachi shop, and shop prices start from Rs 300. You can pay cash on delivery, and the parcel goes across Pakistan.`,
    `The ${miniDispenser.title} is ${rupees(miniDispenser.price)}. It is a mini water dispenser toy in a window box. One photo shows it out of the box. The other photos show the same pack. It sits in Pretend Play, beside a toy kitchen, not packed inside that kitchen.`,
    `The ${animalDispenser.title} is ${rupees(animalDispenser.price)}. It is a water dispenser toy with an animal face on the front of the pack. The other photos show that box from the side and the back. The record does not name the animal.`,
    `The ${kitchenDispenser.title} is ${rupees(kitchenDispenser.price)}. It is a water dispenser toy with a tap and a kitchen-style body, packed like a small appliance. The photos are four sides of the same window box. The record does not list a tank size.`,
    `All three are plastic. Treat them as pretend dispensers. The record does not say that they pump real water. Check the age on the box before you hand one to a child.`,
    `Pick the mini when you want the smallest of the three, including a photo of it outside the box. Pick the animal dispenser when the face on the front of the box is the look you want. Pick the kitchen dispenser when you want the tap and the appliance-shaped body. Each product page has the photos and the catalog price.`,
    `The water dispenser toy price in Pakistan on this page is the number beside each name. Those three prices are separate. You do not have to buy the kitchen set to order one dispenser.`,
    `You can pay by cash on delivery, JazzCash, EasyPaisa, or bank transfer. Delivery is ${deliveryFee()}, and it is free when the order reaches ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days. There is no walk-in counter.`,
    `If a toy is damaged in transit, the shop note is a ${config.exchangePolicy}. WhatsApp ${config.whatsappPhone} is the line on the product page if you want a photo checked before you pay.`,
    `Line a dispenser up with the toy kitchen if you want a pretend corner. Or keep the order to one toy. The mini, the animal face, and the tap are three looks, not three sizes of the same box.`,
  ],
  faqs: [
    {
      question: 'Can I pay cash on delivery?',
      answer: 'Yes. Cash on delivery is available. Checkout also lists JazzCash, EasyPaisa, and bank transfer.',
    },
    {
      question: 'What does shipping cost?',
      answer: `Delivery is ${deliveryFee()}. It is free when the order reaches ${freeDeliveryOver()}.`,
    },
    {
      question: 'How long does delivery take, and who carries it?',
      answer: 'Allow 2-5 days. The courier named by the shop is TCS or Leopards. Orders leave Karachi for the rest of Pakistan.',
    },
    {
      question: 'What if the dispenser arrives damaged?',
      answer: `The shop note is a ${config.exchangePolicy}. Send the photos on WhatsApp ${config.whatsappPhone}.`,
    },
  ],
};

const flipPhone = findProduct('toy-flip-phone');
const handheldFan = findProduct('mini-handheld-fan');
const offRoadJeep = findProduct('friction-off-road-vehicle');
const blocksCarry = findProduct('building-blocks-play-set');
const webShooter = findProduct('web-shooter-glove-set');
const dinosaurSet = findProduct('dinosaur-figure-set');
const crawlingDoll = findProduct('crawling-baby-doll');
const duckTrack = findProduct('duck-slide-track');

const returnGiftSlugs = [
  flipPhone.slug,
  miniDispenser.slug,
  kitchenDispenser.slug,
  handheldFan.slug,
  offRoadJeep.slug,
  batteryGun.slug,
  gatlingGun.slug,
  animalDispenser.slug,
  blocksCarry.slug,
  webShooter.slug,
  dinosaurSet.slug,
];

const under500Slugs = [
  flipPhone.slug,
  miniDispenser.slug,
  kitchenDispenser.slug,
  handheldFan.slug,
  offRoadJeep.slug,
  batteryGun.slug,
];

const returnGiftsPage: LandingPage = {
  path: '/return-gifts-for-kids-pakistan',
  navLabel: 'Return gifts',
  title: `Return Gifts for Kids in Pakistan from ${rupees(catalogLow)} | Cash on Delivery | A & S Toys`,
  description: `Return gifts for kids in Pakistan from ${rupees(catalogLow)}. Flip phone, mini fan, water dispensers, bubble guns and more, with cash on delivery from A & S Toys in Karachi.`,
  h1: 'Return gifts for kids in Pakistan',
  kind: 'collection',
  updated: '2026-11-26',
  paragraphs: [],
  productSlugs: returnGiftSlugs,
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Return gifts for kids', path: '/return-gifts-for-kids-pakistan' },
  ],
  related: [
    '/toys-under-500-pakistan',
    '/toys-cash-on-delivery-pakistan',
    '/toys-price-list-pakistan',
    '/toys-online-karachi',
  ],
  intro: `Return gifts for kids in Pakistan on this page are single toys from the catalog, from ${rupees(flipPhone.price)}, with cash on delivery. There is no walk-in address and no return-gift bundle. Wholesale questions go to the contact page or WhatsApp. Check the age on the box.`,
  sections: [
    {
      heading: 'Toys at or under Rs 700',
      paragraphs: [
        'Each row is one catalog toy, from the cheapest to the dearest. The price is the price on that product page.',
      ],
      priceTable: returnGiftSlugs,
    },
    {
      heading: 'How the delivery math works',
      paragraphs: [
        `The ${flipPhone.title} is ${rupees(flipPhone.price)}.`,
        `10 of them come to ${rupees(flipPhone.price * 10)}. That is under ${freeDeliveryOver()}, so the ${deliveryFee()} delivery charge still applies.`,
        `The ${miniDispenser.title} is ${rupees(miniDispenser.price)}.`,
        `10 of them come to ${rupees(miniDispenser.price * 10)}. That meets ${freeDeliveryOver()}, so delivery is free.`,
        'These are separate toys at the catalog price. This page does not sell a bundle, and it does not offer a wholesale discount.',
        `Wholesale questions go to the contact page or WhatsApp ${config.whatsappPhone}.`,
        'Check the age on the box. The catalog does not copy an age range.',
      ],
      links: [{ href: '/contact', label: 'Contact and wholesale' }],
    },
  ],
  faqs: [
    {
      question: 'Do you sell a return-gift bundle?',
      answer: `No. Each toy keeps its catalog price. Wholesale questions go to the contact page or WhatsApp ${config.whatsappPhone}.`,
    },
    {
      question: 'Can I pay cash on delivery?',
      answer: 'Yes. You pay the rider. Checkout also lists JazzCash, EasyPaisa, and bank transfer.',
    },
    {
      question: 'When is delivery free?',
      answer: `Delivery is ${deliveryFee()}. It is free when the order reaches ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days.`,
    },
  ],
};

const dinosaurPage: LandingPage = {
  path: '/dinosaur-toys-pakistan',
  navLabel: 'Dinosaur toys',
  title: `Dinosaur Toys Price in Pakistan from ${rupees(dinosaurSet.price)} | Cash on Delivery | A & S Toys`,
  description: `The ${dinosaurSet.title} is ${rupees(dinosaurSet.price)}. Dinosaur figures in a mesh bag, packed in a window box. Cash on delivery from A & S Toys in Karachi.`,
  h1: 'Dinosaur toys price in Pakistan',
  kind: 'guide',
  updated: '2026-11-26',
  paragraphs: [],
  productSlugs: [dinosaurSet.slug, crawlingDoll.slug, duckTrack.slug],
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Dolls & Figures', path: '/category/dolls-figures' },
    { name: 'Dinosaur toys', path: '/dinosaur-toys-pakistan' },
  ],
  related: [
    '/return-gifts-for-kids-pakistan',
    '/toys-price-list-pakistan',
    '/toys-for-kids-pakistan',
  ],
  intro: `The ${dinosaurSet.title} is ${rupees(dinosaurSet.price)}. It is dinosaur figures in a mesh bag, packed in a window box. Cash on delivery from A & S Toys in Karachi, with delivery across Pakistan in 2-5 days.`,
  sections: [
    {
      heading: 'The dinosaur set',
      paragraphs: [
        `The ${dinosaurSet.title} is ${rupees(dinosaurSet.price)}.`,
        'Open the product page for the photos and the catalog price.',
      ],
      links: [{ href: `/products/${dinosaurSet.slug}`, label: dinosaurSet.title }],
    },
    {
      heading: 'What the photos show',
      paragraphs: [
        'The photos show dinosaur figures in a mesh bag, packed in a window box, and the bag on its own.',
        'The record does not give a piece count or a species list. Check the age on the box.',
      ],
      productSlugs: [dinosaurSet.slug],
    },
    {
      heading: 'Cash on delivery',
      paragraphs: [
        `You can pay by cash on delivery, JazzCash, EasyPaisa, or bank transfer. Delivery is ${deliveryFee()}, and it is free when the order reaches ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days.`,
        'There is no walk-in address.',
      ],
    },
    {
      heading: 'Related toys in Dolls & Figures',
      paragraphs: [
        'These two are other toys on the Dolls & Figures shelf. They are not extra dinosaur sets.',
        `The ${crawlingDoll.title} is ${rupees(crawlingDoll.price)}. It is a baby doll in pink packaging, with a bottle and a toy phone pictured.`,
        `The ${duckTrack.title} is ${rupees(duckTrack.price)}. It is a small slide track with duck figures in a window box.`,
      ],
      productSlugs: [crawlingDoll.slug, duckTrack.slug],
      links: [{ href: '/category/dolls-figures', label: 'Dolls & Figures' }],
    },
  ],
  faqs: [
    {
      question: 'What is the dinosaur toy price?',
      answer: `The ${dinosaurSet.title} is ${rupees(dinosaurSet.price)}.`,
    },
    {
      question: 'How many dinosaurs are in the set?',
      answer: 'The record does not give a piece count or a species list. Check the box.',
    },
    {
      question: 'Can I pay cash on delivery?',
      answer: `Yes. Delivery is ${deliveryFee()}, and it is free when the order reaches ${freeDeliveryOver()}.`,
    },
  ],
};

const cashOnDeliveryPage: LandingPage = {
  path: '/toys-cash-on-delivery-pakistan',
  navLabel: 'Cash on delivery',
  title: `Toys Online in Pakistan with Cash on Delivery | From ${rupees(catalogLow)} | A & S Toys`,
  description: `Order toys online in Pakistan with cash on delivery from A & S Toys in Karachi. Prices from ${rupees(catalogLow)} to ${rupees(catalogHigh)}. Delivery across Pakistan in 2-5 days.`,
  h1: 'Toys online in Pakistan with cash on delivery',
  kind: 'guide',
  updated: '2026-11-26',
  paragraphs: [],
  productSlugs: pricedSlugs,
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Cash on delivery', path: '/toys-cash-on-delivery-pakistan' },
  ],
  related: [
    '/toys-online-karachi',
    '/toys-for-kids-pakistan',
    '/return-gifts-for-kids-pakistan',
    '/toys-under-500-pakistan',
  ],
  intro: `Cash on delivery on this website means you pay the rider when the parcel arrives. JazzCash, EasyPaisa, and bank transfer are also on the checkout. Catalog prices run from ${rupees(catalogLow)} to ${rupees(catalogHigh)}.`,
  sections: [
    {
      heading: 'What cash on delivery means here',
      paragraphs: [
        'You place the order on the website and pay the rider in cash. You do not have to pay before the parcel leaves.',
        'Checkout also lists JazzCash, EasyPaisa, and bank transfer if you would rather pay first.',
      ],
    },
    {
      heading: 'Delivery charge',
      paragraphs: [
        `Delivery is ${deliveryFee()}. It is free when the order reaches ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days.`,
        'There is no walk-in address. The order is delivered.',
      ],
    },
    {
      heading: 'How to order',
      paragraphs: [
        `Open a product page and check out, or send a WhatsApp message to ${config.whatsappPhone}. The call line is ${config.phone}.`,
      ],
      links: [
        { href: '/shop', label: 'Shop all toys' },
        { href: '/toys-price-list-pakistan', label: 'Toys price list in Pakistan' },
      ],
    },
    {
      heading: 'Every toy by price',
      paragraphs: [
        `The table is every toy in the catalog, sorted by price, from ${rupees(catalogLow)} to ${rupees(catalogHigh)}.`,
      ],
      priceTable: pricedSlugs,
    },
  ],
  faqs: [
    {
      question: 'Can I pay the rider?',
      answer: 'Yes. Cash on delivery means you pay the rider. JazzCash, EasyPaisa, and bank transfer are also on the checkout.',
    },
    {
      question: 'What does delivery cost?',
      answer: `Delivery is ${deliveryFee()}. It is free when the order reaches ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days.`,
    },
    {
      question: 'Is there a shop to visit?',
      answer: 'No walk-in address is listed. Order from a product page or on WhatsApp.',
    },
  ],
};

const under500Page: LandingPage = {
  path: '/toys-under-500-pakistan',
  navLabel: 'Toys under Rs 500',
  title: 'Toys Under Rs 500 in Pakistan | Cash on Delivery | A & S Toys',
  description: `Toys under Rs 500 at A & S Toys: flip phone ${rupees(flipPhone.price)}, mini water dispenser ${rupees(miniDispenser.price)}, kitchen water dispenser ${rupees(kitchenDispenser.price)}, mini handheld fan ${rupees(handheldFan.price)}, off-road jeep ${rupees(offRoadJeep.price)}, battery bubble gun ${rupees(batteryGun.price)}. Cash on delivery.`,
  h1: 'Toys under Rs 500 in Pakistan',
  kind: 'collection',
  updated: '2026-11-26',
  paragraphs: [],
  productSlugs: under500Slugs,
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Toys under Rs 500', path: '/toys-under-500-pakistan' },
  ],
  related: [
    '/return-gifts-for-kids-pakistan',
    '/toys-cash-on-delivery-pakistan',
    '/toys-price-list-pakistan',
  ],
  intro: `Six toys in the catalog are at or under Rs 500, with cash on delivery. The lowest is ${rupees(flipPhone.price)}. Delivery is ${deliveryFee()} unless the order reaches ${freeDeliveryOver()}.`,
  sections: [
    {
      heading: 'The six toys',
      paragraphs: [
        'Each row links to the product page. The price is the catalog price.',
      ],
      priceTable: under500Slugs,
    },
    {
      heading: 'What the photos show',
      paragraphs: [
        `The ${flipPhone.title} is ${rupees(flipPhone.price)}. The photos show a flip-style toy phone that folds open, beside its box.`,
        `The ${miniDispenser.title} is ${rupees(miniDispenser.price)}. The photos show a small toy water dispenser in a window box, including one photo out of the box.`,
        `The ${kitchenDispenser.title} is ${rupees(kitchenDispenser.price)}. The photos show a toy dispenser with a tap and a kitchen-style body, in a window box.`,
        `The ${handheldFan.title} is ${rupees(handheldFan.price)}. The photos show a small handheld fan in a blister pack, from the front, the back, and the side.`,
        `The ${offRoadJeep.title} is ${rupees(offRoadJeep.price)}. The photos show an off-road toy vehicle in a window box.`,
        `The ${batteryGun.title} is ${rupees(batteryGun.price)}. The photos show a bubble gun with a bottle of bubble solution, in a window box.`,
      ],
    },
    {
      heading: 'Delivery on a small order',
      paragraphs: [
        `Delivery is ${deliveryFee()} unless the order reaches ${freeDeliveryOver()}.`,
        `The ${flipPhone.title} is ${rupees(flipPhone.price)}. One of them still has the delivery charge, because that order is under the free-delivery line.`,
      ],
    },
  ],
  faqs: [
    {
      question: 'Which toys are at or under Rs 500?',
      answer: `The ${flipPhone.title} is ${rupees(flipPhone.price)}. The ${miniDispenser.title} is ${rupees(miniDispenser.price)}. The ${kitchenDispenser.title} is ${rupees(kitchenDispenser.price)}. The ${handheldFan.title} is ${rupees(handheldFan.price)}. The ${offRoadJeep.title} is ${rupees(offRoadJeep.price)}. The ${batteryGun.title} is ${rupees(batteryGun.price)}.`,
    },
    {
      question: 'Is delivery included in a Rs 300 toy?',
      answer: `No. The ${flipPhone.title} is ${rupees(flipPhone.price)}. Delivery is ${deliveryFee()} unless the order reaches ${freeDeliveryOver()}.`,
    },
  ],
};

export const LANDINGS: LandingPage[] = [
  kidsPillar,
  waterDispenserPage,
  priceListGuide,
  helicopterGuide,
  karaokeGuide,
  kitchenGuide,
  blocksGuide,
  {
    path: '/toys-online-karachi',
    navLabel: 'Toys online in Karachi',
    title: `Toys Online in Karachi from ${rupees(catalogLow)} | Cash on Delivery | A & S Toys`,
    description: `Toys online in Karachi from ${rupees(catalogLow)} with cash on delivery from A & S Toys. Delivery across Pakistan in 2-5 days.`,
    h1: 'Toys online in Karachi',
    kind: 'collection',
    updated: '2026-11-26',
    productSlugs: PRODUCTS.map((product) => product.slug),
    related: [
      '/return-gifts-for-kids-pakistan',
      '/dinosaur-toys-pakistan',
      '/toys-cash-on-delivery-pakistan',
      '/toys-under-500-pakistan',
    ],
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
    title: `Bubble Guns in Pakistan from ${rupees(batteryGun.price)} | Cash on Delivery | A & S Toys`,
    description: `The ${batteryGun.title} is ${rupees(batteryGun.price)}. The ${gatlingGun.title} is ${rupees(gatlingGun.price)}. Cash on delivery from A & S Toys in Karachi.`,
    h1: 'Bubble guns in Pakistan',
    kind: 'collection',
    updated: '2026-11-26',
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
  returnGiftsPage,
  dinosaurPage,
  cashOnDeliveryPage,
  under500Page,
];

const CATEGORY_GUIDES: Record<string, string[]> = {
  'building-blocks': ['/building-blocks-toys-pakistan'],
  'pretend-play': [
    '/water-dispenser-toys-pakistan',
    '/kitchen-set-toys-pakistan',
    '/return-gifts-for-kids-pakistan',
  ],
  'dolls-figures': ['/dinosaur-toys-pakistan'],
  vehicles: ['/rc-helicopter-price-pakistan'],
  'bubble-water': ['/bubble-guns-pakistan', '/return-gifts-for-kids-pakistan'],
  'gadgets-music': [
    '/kids-karaoke-mic-speaker-price-pakistan',
    '/return-gifts-for-kids-pakistan',
  ],
  games: ['/toys-price-list-pakistan'],
};

const SHOP_GUIDES = [
  '/toys-price-list-pakistan',
  '/return-gifts-for-kids-pakistan',
  '/toys-cash-on-delivery-pakistan',
  '/toys-under-500-pakistan',
  '/toys-for-kids-pakistan',
];

function linksFor(paths: string[]): { href: string; label: string }[] {
  return paths.map((path) => {
    const page = LANDINGS.find((item) => item.path === path);
    if (!page) throw new Error(`Missing landing ${path}`);
    return { href: page.path, label: page.navLabel };
  });
}

export function categoryGuideLinks(slug: string): { href: string; label: string }[] {
  return linksFor(CATEGORY_GUIDES[slug] ?? []);
}

export function shopGuideLinks(): { href: string; label: string }[] {
  return linksFor(SHOP_GUIDES);
}

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
