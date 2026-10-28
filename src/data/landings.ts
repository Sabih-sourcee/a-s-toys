import { PRODUCTS } from './products';
import { absolutePageUrl } from '../lib/seo';

export interface LandingFaq {
  question: string;
  answer: string;
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
}

const kitchenSlugs = [
  'kitchen-play-set',
  'mini-water-dispenser-toy',
  'animal-water-dispenser',
  'kitchen-water-dispenser',
];

const blockSlugs = ['building-blocks-play-set', 'big-building-blocks-bag'];

const bubbleSlugs = ['gatling-bubble-gun', 'battery-bubble-gun'];

export const LANDINGS: LandingPage[] = [
  {
    path: '/kitchen-set-toys-pakistan',
    navLabel: 'Kitchen set toys',
    title: 'Kitchen Set Toys in Pakistan | A & S Toys',
    description: 'Kitchen set toys in Pakistan from A & S Toys: a toy kitchen plus three toy water dispensers. Plastic pretend-play sets. Check the age on the box. COD.',
    h1: 'Kitchen set toys in Pakistan',
    productSlugs: kitchenSlugs,
    paragraphs: [
      'This page is the kitchen and toy-dispenser list from A & S Toys, a Karachi shop that delivers nationwide in Pakistan. Four pretend-play products belong here. They are the Kitchen Play Set, the Mini Water Dispenser Toy, the Animal Water Dispenser, and the Kitchen Water Dispenser. Each one is a plastic toy. The catalog does not print an age range, a piece count, or measurements, so check the box for the age grade. Shop prices are from Rs 300. Payment on the website is cash on delivery, a delivery charge applies under Rs 3,500, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in address listed.',
      'The Kitchen Play Set is a toy kitchen in a window box. The pack shows a stove, an oven, and utensils. Those pictured pieces are the ones to expect. The record does not add food toys, a sound button, or a water connection. Use it for pretend cooking with the stove, the oven, and the utensils that are shown. Photos are the shop photos of that set. Nothing on this page turns the box art into extra parts.',
      'The three dispensers are separate toys, not pieces packed inside the kitchen set. The Mini Water Dispenser Toy is the small one. It comes in a window box, and one photo shows it out of the box. The Animal Water Dispenser has an animal face on the front. The other photos show that box from the side and the back. The record does not name the animal. The Kitchen Water Dispenser has a tap and a kitchen-style body, packed like a small kitchen appliance. Its photos are four sides of the same window box. The record does not list a tank size, and it does not say that they pump real water. Treat them as pretend dispensers you can line up with the toy kitchen.',
      'Pick the Kitchen Play Set when you want the stove, oven, and utensils. Pick the mini dispenser when you want the smallest of the three, including a photo of it outside the box. Pick the animal dispenser when the front of the box, with the animal face, is the look you want. Pick the kitchen-style dispenser when you want the tap and the appliance-shaped body. All four are plastic and sit in Pretend Play. Open each product page for the photos, the short feature list, and the current catalog price. Shop prices are from Rs 300.',
      'Add the toy on its product page, or send a WhatsApp message from the shop. Read the box for the age grade before you hand the toy over, because that grade is not copied into the catalog. Piece counts, sizes, and whether a dispenser holds water are not on the product record, so they are not guessed on this page.',
    ],
    faqs: [
      {
        question: 'Which kitchen toys are listed on this page?',
        answer: 'The Kitchen Play Set, the Mini Water Dispenser Toy, the Animal Water Dispenser, and the Kitchen Water Dispenser.',
      },
      {
        question: 'What does the Kitchen Play Set show?',
        answer: 'A toy kitchen in a window box. The pack shows a stove, an oven, and utensils.',
      },
      {
        question: 'How do the water dispenser toys differ?',
        answer: 'The mini one is small and is shown in and out of the box. The animal one has an animal face on the front. The kitchen one has a tap and a kitchen-style body. The record does not say they dispense real water.',
      },
      {
        question: 'What age are these kitchen toys for?',
        answer: 'The catalog does not give an age range. Check the box for the age grade.',
      },
      {
        question: 'How do I pay and get delivery?',
        answer: 'Payment on the website is cash on delivery. A & S Toys is in Karachi and ships nationwide. Delivery is free when the order total reaches Rs 3,500. The exchange note is a 7-day replacement for transit damage.',
      },
    ],
  },
  {
    path: '/building-blocks-toys-pakistan',
    navLabel: 'Building block toys',
    title: 'Building Block Toys in Pakistan | A & S Toys',
    description: 'Building block toys in Pakistan from A & S Toys: a handled carry case and a mesh bag of large blocks. Plastic. Check the age on the box. Cash on delivery.',
    h1: 'Building block toys in Pakistan',
    productSlugs: blockSlugs,
    paragraphs: [
      'A & S Toys has two building-block products on this page, both plastic, both for shoppers in Pakistan. One is the Building Blocks Play Set. The other is the Big Building Blocks Bag. The shop is in Karachi and ships nationwide. Payment on the website is cash on delivery. A delivery charge applies below Rs 3,500, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in address. Shop prices are from Rs 300. The catalog does not give an age range, a block count, or measurements, so check the box for the age grade.',
      'The Building Blocks Play Set is a carry case of colorful building blocks. The case has a handle. Photos show the closed case and the blocks beside it. The blocks are also shown inside the case and outside it. The features on the record are the handled carry case, the colorful blocks, and those inside-and-outside views. Use the set for stacking and simple building, then close the case to carry it. The record never says how many blocks are inside. Do not treat a guess as a spec.',
      'The Big Building Blocks Bag is the larger-looking option. It is large colorful building blocks in a mesh storage bag. Photos show the bag from the front and from the side. The blocks come in several colors. The features are the mesh storage bag, the large blocks, and those colors. Use the blocks for floor building, then put them back in the mesh bag. This one is a bag, not a hard carry case. It is still in the Building Blocks category, and it is still plastic. The record does not give a block count for the bag either.',
      'Choose the carry case if you want a handled box you can close, with blocks shown both in the case and out of it. Choose the mesh bag if you want large blocks in several colors and a soft bag you can see from the front and the side. They are sold as two products, not as one combined kit. Open each product page for the photos and the current catalog price. Shop prices are from Rs 300.',
      'Stack them, sort them by color, and put them away in the case or the bag that the photos show. There is no claim here of electronic lights, motors, or numbered building plans, because none of that is on the record. If the box prints an age grade or a piece count, that print is the source. The catalog text does not copy it.',
    ],
    faqs: [
      {
        question: 'Which building block toys are on this page?',
        answer: 'The Building Blocks Play Set and the Big Building Blocks Bag.',
      },
      {
        question: 'What is the difference between the case and the bag?',
        answer: 'The play set is colorful blocks in a handled carry case, shown inside and outside the case. The bag is large blocks in several colors in a mesh storage bag, shown from the front and the side.',
      },
      {
        question: 'How many blocks are in each set?',
        answer: 'The catalog does not give a block count. Check the box.',
      },
      {
        question: 'What age are the blocks for?',
        answer: 'The catalog does not give an age range. Check the box for the age grade. The material on the record is plastic.',
      },
      {
        question: 'How does delivery work?',
        answer: 'A & S Toys is in Karachi and ships nationwide. Payment on the website is cash on delivery. Delivery is free when the order total reaches Rs 3,500.',
      },
    ],
  },
  {
    path: '/toys-online-karachi',
    navLabel: 'Toys online in Karachi',
    title: 'Toys Online in Karachi | A & S Toys',
    description: 'Order toys online in Karachi from A & S Toys. Nationwide delivery, cash on delivery, and a catalog of plastic toys. Check each box for the age grade.',
    h1: 'Toys online in Karachi',
    productSlugs: PRODUCTS.map((product) => product.slug),
    paragraphs: [
      'A & S Toys is a Karachi toy shop that sells online to the rest of Pakistan. This page is the plain guide to ordering from that catalog. There is no walk-in address listed, so the shop is set up as delivery, not as a store you visit. Payment on the website is cash on delivery. A delivery charge applies, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. Shop prices are from Rs 300. Every toy on the record is plastic, and the catalog does not copy an age range, so check the box for the age grade.',
      'The catalog is small and specific. Building blocks are two products: a handled carry case of colorful blocks, and a mesh bag of large blocks in several colors. Pretend play is the Kitchen Play Set, with a stove, an oven, and utensils in a window box, plus three toy water dispensers. One dispenser is small and shown out of the box. One has an animal face on the front. One has a tap and a kitchen-style body. Dolls and figures are a crawling baby doll in pink packaging with a bottle and a toy phone pictured, a duck slide track, and dinosaur figures in a mesh bag.',
      'Vehicles are an off-road friction toy, friction construction trucks, a light and music car set whose pack shows lights and music, and an RC flying helicopter toy with a hand controller pictured on the box. The record does not add a driving range or a channel count for that helicopter. Bubble and water toys are a multi-barrel gatling bubble gun shown with bubbles, a battery bubble gun packed with a bottle of bubble solution, and a water bullet gun. The water bullet gun is not described as a bubble gun. Gadgets are a web shooter glove and wrist launcher, a dancing cactus with a small remote, a flip phone, a karaoke set with two microphones, and a mini handheld fan in a blister. Games is the Hungry Turtle Game: a green tray, colorful turtle pieces, and yellow balls, with three photos.',
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
      'Two bubble guns are in the A & S Toys catalog, and both are on this page. They are the Gatling Bubble Gun and the Battery Bubble Gun. A third toy in the Bubble and Water category, the Water Bullet Gun, is not a bubble gun on the record, so it is not listed here. The shop is in Karachi and ships nationwide across Pakistan. Payment on the website is cash on delivery. A delivery charge applies, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in address. Both guns are plastic. Shop prices are from Rs 300. The catalog does not give an age range, so check the box for the age grade.',
      'The Gatling Bubble Gun is a multi-barrel bubble gun in a colorful window box. The record says several barrels. It does not give a number, so this page does not invent one. Photos show the box and the gun held in a hand with bubbles. That is the bubble play the photos support. The feature list is the multi-barrel gun and the colorful window box. The record does not pack a bubble-solution bottle with this gun. Do not assume a bottle is in the gatling set just because the other gun has one.',
      'The Battery Bubble Gun is a bubble gun with a bottle of bubble solution, packed in a window box. The photos are four angles of the same set. It is sold under that battery name. The record shows the gun and the solution bottle. It does not name a battery size, a battery count, or a bubble count. Those blanks stay blank. Use it as a bubble gun that is pictured with solution. Use the product page for the four angles.',
      'Pick the gatling gun if you want the multi-barrel shape in the colorful box, shown in a hand with bubbles, and you do not need a solution bottle on the feature list. Pick the battery bubble gun if you want the set that includes the solution bottle in the window box. They are separate products. Neither description claims a distance, a bubble size, or a motor speed, because the catalog does not measure those. Opening the product page does not add specs that the photos and the feature lines do not already state.',
      'The product page has the photos and the catalog price. Read the age grade on the box before play. If the parcel is damaged in transit, the written policy is a 7-day replacement for that transit damage. This page does not add reviews or star ratings, and it does not call the Water Bullet Gun a bubble gun. Open that water toy from the shop list instead of from this guide.',
    ],
    faqs: [
      {
        question: 'Which bubble guns does A & S Toys sell?',
        answer: 'The Gatling Bubble Gun and the Battery Bubble Gun. The Water Bullet Gun is a different toy and is not listed as a bubble gun.',
      },
      {
        question: 'What comes with the Gatling Bubble Gun?',
        answer: 'It is a multi-barrel bubble gun in a colorful window box. Photos show it held in a hand with bubbles. The record does not list a bubble-solution bottle with this gun, and it does not number the barrels.',
      },
      {
        question: 'What comes with the Battery Bubble Gun?',
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
