import { Product, Category } from '../types';

/**
 * Catalog. Add products in the PRODUCTS array.
 * Rebuild after edits so sitemap and prerendered pages update.
 *
 * Photos come from scripts/split-grids.mjs. Image 1 is the card.
 * galleryImages are angles 2–4. Do not commit the source grids.
 *
 * Product fields:
 * - id: unique, e.g. "ast-013"
 * - title: shop name
 * - slug: unique url slug, used at /products/:slug
 * - category: a CATEGORIES slug
 * - categoryName: that category's name
 * - ageRange: optional. Only when the age is printed on the box.
 * - ageLabel: optional short label, e.g. "Ages 3+"
 * - price: number, PKR
 * - originalPrice?: compare-at price, PKR
 * - discountBadge?: short ribbon text
 * - badgeType?: "new" | "sale" | "hot"
 * - stock: number
 * - inStock: boolean
 * - image: absolute image URL
 * - galleryImages: string[]
 * - shortDescription: one sentence, used in the meta description
 * - fullDescription: longer copy
 * - features: string[]
 * - materials: string
 * - safetyNotes: string
 * - dimensions?: string
 * - isTrending?: boolean — sorts first in the shop
 * - isEarlyYears?: boolean — shows in the ages 0–3 row
 * - seoTitle?: override. Default: "{title} Price in Karachi, Pakistan | A&S Toys"
 * - seoDescription?: override, about 160 characters
 *
 * Do not add review counts, piece counts, or age ranges that are not on the box.
 * Category item counts on the homepage are counted from PRODUCTS.
 */

const photo = (slug: string, angle: 1 | 2 | 3 | 4) =>
  `/images/products/${slug}-${angle}.webp`;

function item(input: {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
}): Product {
  return {
    ...input,
    price: 1200,
    stock: 10,
    inStock: true,
    image: photo(input.slug, 1),
    galleryImages: [photo(input.slug, 2), photo(input.slug, 3), photo(input.slug, 4)],
    materials: 'Plastic',
    safetyNotes: 'Check the box for the age grade.',
  };
}

export const CATEGORIES: Category[] = [
  {
    id: 'building-blocks',
    name: 'Building Blocks',
    slug: 'building-blocks',
    description: 'Building block sets, in a carry case and a storage bag.',
    image: photo('building-blocks-play-set', 1),
  },
  {
    id: 'pretend-play',
    name: 'Pretend Play',
    slug: 'pretend-play',
    description: 'Toy kitchens and water dispensers for pretend play.',
    image: photo('kitchen-play-set', 1),
  },
  {
    id: 'dolls-figures',
    name: 'Dolls & Figures',
    slug: 'dolls-figures',
    description: 'A crawling baby doll, a duck slide track, and dinosaur figures.',
    image: photo('crawling-baby-doll', 1),
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    slug: 'vehicles',
    description: 'Off-road and construction vehicles, a light-up car set, and an RC flying helicopter toy.',
    image: photo('friction-off-road-vehicle', 1),
  },
  {
    id: 'bubble-water',
    name: 'Bubble & Water',
    slug: 'bubble-water',
    description: 'Bubble guns and a water bullet gun.',
    image: photo('gatling-bubble-gun', 1),
  },
  {
    id: 'gadgets-music',
    name: 'Gadgets & Music',
    slug: 'gadgets-music',
    description: 'A web shooter glove set, a dancing cactus, a toy phone, a karaoke set, and a mini fan.',
    image: photo('web-shooter-glove-set', 1),
  },
];

export const PRODUCTS: Product[] = [
  item({
    id: 'ast-001',
    title: 'Building Blocks Play Set',
    slug: 'building-blocks-play-set',
    category: 'building-blocks',
    categoryName: 'Building Blocks',
    shortDescription: 'A carry case of colorful building blocks.',
    fullDescription: 'Colorful building blocks packed in a handled carry case. The photos show the closed case and the blocks beside it.',
    features: ['Handled carry case', 'Colorful blocks', 'Blocks shown inside and outside the case'],
  }),
  item({
    id: 'ast-002',
    title: 'Kitchen Play Set',
    slug: 'kitchen-play-set',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A toy kitchen with a stove, oven, and utensils.',
    fullDescription: 'A toy kitchen in a window box. The pack shows a stove, an oven, and utensils.',
    features: ['Toy stove and oven', 'Utensils pictured with the set', 'Window box'],
  }),
  item({
    id: 'ast-003',
    title: 'Web Shooter Glove Set',
    slug: 'web-shooter-glove-set',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A glove and wrist launcher set.',
    fullDescription: 'A glove worn on the hand and a wrist launcher, packed together. The photos show the box and the pieces beside it.',
    features: ['Glove and wrist launcher', 'Shown on a hand on the box', 'Window box'],
  }),
  item({
    id: 'ast-004',
    title: 'Mini Water Dispenser Toy',
    slug: 'mini-water-dispenser-toy',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A small toy water dispenser in a window box.',
    fullDescription: 'A compact toy water dispenser. One photo shows it out of the box, and the others show the pack.',
    features: ['Small toy water dispenser', 'Shown in and out of the box'],
  }),
  item({
    id: 'ast-005',
    title: 'Big Building Blocks Bag',
    slug: 'big-building-blocks-bag',
    category: 'building-blocks',
    categoryName: 'Building Blocks',
    shortDescription: 'Large colorful building blocks in a mesh storage bag.',
    fullDescription: 'Large building blocks packed in a mesh bag. The photos show the bag from the front and from the side.',
    features: ['Mesh storage bag', 'Large blocks', 'Several colors'],
  }),
  item({
    id: 'ast-006',
    title: 'Crawling Baby Doll',
    slug: 'crawling-baby-doll',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A baby doll in pink packaging, shown on its hands and knees.',
    fullDescription: 'A baby doll packed on its hands and knees. The open pack also shows a bottle and a small toy phone.',
    features: ['Baby doll in a crawling pose', 'Bottle and toy phone pictured in the pack', 'Pink window box'],
  }),
  item({
    id: 'ast-007',
    title: 'Gatling Bubble Gun',
    slug: 'gatling-bubble-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A multi-barrel bubble gun in a colorful box.',
    fullDescription: 'A bubble gun with several barrels. The photos show the box and the gun held in a hand with bubbles.',
    features: ['Multi-barrel bubble gun', 'Colorful window box'],
  }),
  item({
    id: 'ast-008',
    title: 'Dancing Cactus Toy',
    slug: 'dancing-cactus-toy',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A cactus-shaped toy in a box, shown with a small remote.',
    fullDescription: 'A cactus-shaped toy. The box shows it with a small remote and calls it a dancing cactus.',
    features: ['Cactus-shaped toy', 'Small remote pictured on the box'],
  }),
  item({
    id: 'ast-009',
    title: 'Duck Slide Track',
    slug: 'duck-slide-track',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A small slide track with duck figures.',
    fullDescription: 'A slide track packed with duck figures. The photos show the front of the box and the track from other sides.',
    features: ['Duck figures', 'Slide track', 'Window box'],
  }),
  item({
    id: 'ast-010',
    title: 'Animal Water Dispenser',
    slug: 'animal-water-dispenser',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A toy water dispenser with an animal face on the front.',
    fullDescription: 'A toy water dispenser. The front of the pack shows an animal face, and the other photos show the box from the side and back.',
    features: ['Toy water dispenser', 'Animal face on the front', 'Window box'],
  }),
  item({
    id: 'ast-011',
    title: 'Kitchen Water Dispenser',
    slug: 'kitchen-water-dispenser',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A toy water dispenser styled like a small kitchen appliance.',
    fullDescription: 'A toy water dispenser with a tap, packed like a small kitchen appliance. The photos show the box from four sides.',
    features: ['Toy tap', 'Kitchen-style body', 'Window box'],
  }),
  item({
    id: 'ast-012',
    title: 'Toy Flip Phone',
    slug: 'toy-flip-phone',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A flip-style toy phone in a blister pack.',
    fullDescription: 'A toy phone that folds closed. The photos show the blister pack closed, open, and from the side.',
    features: ['Flip-style toy phone', 'Blister pack'],
  }),
  item({
    id: 'ast-013',
    title: 'Friction Off-Road Vehicle',
    slug: 'friction-off-road-vehicle',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'An off-road toy vehicle in a window box.',
    fullDescription: 'An off-road toy vehicle in a window box. The photos show the front of the pack and the truck from other sides.',
    features: ['Off-road toy vehicle', 'Window box'],
  }),
  item({
    id: 'ast-014',
    title: 'Karaoke Speaker Set',
    slug: 'karaoke-speaker-set',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A toy speaker set shown with microphones.',
    fullDescription: 'A toy speaker packed with microphones. The photos show the closed box and the speaker and microphones out of the box.',
    features: ['Toy speaker', 'Microphones pictured with the set'],
  }),
  item({
    id: 'ast-015',
    title: 'Light and Music Car Set',
    slug: 'light-music-car-set',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A toy car set in a window box, with lights and music on the pack.',
    fullDescription: 'A toy car set in a window box. The pack shows lights and music. The photos are four sides of the same box.',
    features: ['Toy car set', 'Lights and music shown on the pack', 'Window box'],
  }),
  item({
    id: 'ast-016',
    title: 'RC Flying Helicopter Toy',
    slug: 'rc-flying-helicopter-toy',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A remote-control flying toy with a hand controller.',
    fullDescription: 'A remote-control flying toy in a window box, with a hand controller pictured on the pack. Sold as an RC flying helicopter toy.',
    features: ['Hand controller pictured on the box', 'Remote-control flying toy', 'Window box'],
  }),
  item({
    id: 'ast-017',
    title: 'Friction Construction Trucks',
    slug: 'friction-construction-trucks',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'Construction toy trucks in a window box.',
    fullDescription: 'Construction toy trucks in a window box. The photos show the front of the pack and the trucks from other sides.',
    features: ['Construction toy trucks', 'Window box'],
  }),
  item({
    id: 'ast-018',
    title: 'Water Bullet Gun',
    slug: 'water-bullet-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A water bullet gun in a window box.',
    fullDescription: 'A water bullet gun in a window box. The photos show the front of the pack and the gun from other sides.',
    features: ['Water bullet gun', 'Window box'],
  }),
  item({
    id: 'ast-019',
    title: 'Dinosaur Figure Set',
    slug: 'dinosaur-figure-set',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'Dinosaur figures in a mesh bag, packed in a window box.',
    fullDescription: 'Dinosaur figures in a mesh bag. The photos show the bag inside the box and the bag on its own.',
    features: ['Dinosaur figures', 'Mesh bag', 'Window box'],
  }),
  item({
    id: 'ast-020',
    title: 'Battery Bubble Gun',
    slug: 'battery-bubble-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A bubble gun in a window box.',
    fullDescription: 'A bubble gun in a window box. The photos show the front of the pack and the gun from other sides.',
    features: ['Bubble gun', 'Window box'],
  }),
  item({
    id: 'ast-021',
    title: 'Mini Handheld Fan',
    slug: 'mini-handheld-fan',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A small handheld fan in a blister pack.',
    fullDescription: 'A small fan made to hold in the hand. The photos show the blister pack from the front, back, and side.',
    features: ['Handheld fan', 'Blister pack'],
  }),
];

export const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Quetta',
  'Hyderabad',
  'Abbottabad',
  'Sargodha',
  'Bahawalpur',
  'Sukkur',
  'Mirpur (AJK)',
  'Mardan',
  'Gujrat',
  'Other Pakistan City'
];
