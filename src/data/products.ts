import { Product, Category } from '../types';

/**
 * Catalog. Add products in the PRODUCTS array.
 * Rebuild after edits so sitemap and prerendered pages update.
 *
 * Photos come from scripts/split-grids.mjs. Image 1 is the card.
 * galleryImages are angles 2–4. Pass angles (1 to 4) when a product has
 * fewer photos; the product page only renders the photos that exist.
 * Do not commit the source grids.
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
 * - shortDescription: one sentence for cards and search
 * - fullDescription: longer copy, at least 120 words with the shared order notes
 * - features: string[]
 * - materials: string
 * - safetyNotes: string
 * - dimensions?: string
 * - isTrending?: boolean — sorts first in the shop
 * - isEarlyYears?: boolean — shows in the ages 0–3 row
 * - seoTitle?: unused. The title is always "{title} Price in Pakistan | A & S Toys"
 * - seoDescription?: meta description, about 150 characters
 *
 * Do not add review counts, piece counts, or age ranges that are not on the box.
 * Category item counts on the homepage are counted from PRODUCTS.
 */

const photo = (slug: string, angle: number) =>
  `/images/products/${slug}-${angle}.webp`;

/** Facts already on the shop record. Appended so every description stays inside those facts. */
const ORDER_NOTES =
  'A & S Toys sells this from Karachi and ships nationwide across Pakistan. Payment is cash on delivery, JazzCash, EasyPaisa, or bank transfer. Delivery is Rs 250, takes 2-5 business days, and is free when the order total reaches Rs 3,500. The courier is TCS or Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in address listed. The material on the product record is plastic. The catalog does not give an age range, a piece count, or measurements, so check the box for the age grade and do not expect those specs on this page. Shop prices are from Rs 300.';

function item(input: {
  id: string;
  title: string;
  /** PKR. Never above 2300. */
  price: number;
  slug: string;
  category: string;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  seoDescription: string;
  angles?: number;
  /** Overrides the numbered /images/products/{slug}-N.webp set. */
  image?: string;
  galleryImages?: string[];
}): Product {
  const { angles = 4, fullDescription, image, galleryImages, ...fields } = input;
  return {
    ...fields,
    fullDescription: `${fullDescription.trim()} ${ORDER_NOTES}`,
    stock: 10,
    inStock: true,
    image: image ?? photo(fields.slug, 1),
    galleryImages: galleryImages ?? Array.from({ length: Math.max(0, angles - 1) }, (_, index) => photo(fields.slug, index + 2)),
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
    image: '/images/categories/building-blocks-cine.webp',
  },
  {
    id: 'pretend-play',
    name: 'Pretend Play',
    slug: 'pretend-play',
    description: 'Toy kitchens and water dispensers for pretend play.',
    image: '/images/categories/pretend-play-cine.webp',
  },
  {
    id: 'dolls-figures',
    name: 'Dolls & Figures',
    slug: 'dolls-figures',
    description: 'A crawling baby doll, a duck slide track, and dinosaur figures.',
    image: '/images/categories/dolls-figures-cine.webp',
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    slug: 'vehicles',
    description: 'Off-road and construction vehicles, a light-up car set, and an RC flying helicopter toy.',
    image: '/images/products/friction-off-road-vehicle-jeep-desert.webp',
  },
  {
    id: 'bubble-water',
    name: 'Bubble & Water',
    slug: 'bubble-water',
    description: 'Bubble guns and a water bullet gun.',
    image: '/images/categories/bubble-water-cine.webp',
  },
  {
    id: 'gadgets-music',
    name: 'Gadgets & Music',
    slug: 'gadgets-music',
    description: 'A web shooter glove set, a dancing cactus, a toy phone, a karaoke set, and a mini fan.',
    image: '/images/categories/gadgets-music-cine.webp',
  },
  {
    id: 'games',
    name: 'Games',
    slug: 'games',
    description: 'A tray game with turtle pieces and yellow balls.',
    image: photo('hungry-turtle-game', 1),
  },
];

export const PRODUCTS: Product[] = [
  item({
    id: 'ast-001',
    title: 'Building Blocks Play Set',
    price: 600,
    slug: 'building-blocks-play-set',
    category: 'building-blocks',
    categoryName: 'Building Blocks',
    shortDescription: 'A carry case of colorful building blocks.',
    fullDescription: 'The Building Blocks Play Set is a carry case of colorful building blocks. A handle is part of the case. Photos show the case closed and the blocks beside it, and the blocks are shown both inside and outside the case. It sits in the Building Blocks category. Use it for stacking and simple building play. Nothing on the record says how many blocks are in the case.',
    seoDescription: 'Building Blocks Play Set from A & S Toys. Colorful blocks in a handled carry case. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Handled carry case', 'Colorful blocks', 'Blocks shown inside and outside the case'],
  }),
  item({
    id: 'ast-002',
    title: 'Kitchen Play Set',
    price: 1400,
    slug: 'kitchen-play-set',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A toy kitchen with a stove, oven, and utensils.',
    fullDescription: 'The Kitchen Play Set is a toy kitchen packed in a window box. The pack shows a stove, an oven, and utensils. It is in the Pretend Play category. Children can use the pictured stove, oven, and utensils for pretend cooking. The page does not list extra food pieces or a sound button, because those are not on the record.',
    seoDescription: 'Kitchen Play Set from A & S Toys. A toy kitchen in a window box with a stove, oven, and utensils. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Toy stove and oven', 'Utensils pictured with the set', 'Window box'],
  }),
  item({
    id: 'ast-003',
    title: 'Web Shooter Glove Set',
    price: 600,
    slug: 'web-shooter-glove-set',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A glove and wrist launcher set.',
    fullDescription: 'The Web Shooter Glove Set is a glove and a wrist launcher packed together. The box shows the glove on a hand, and other photos show the pieces beside the box. It is in Gadgets and Music. It is a role-play glove set. The record does not say what the launcher shoots or whether it needs batteries.',
    seoDescription: 'Web Shooter Glove Set from A & S Toys. A glove and wrist launcher in a window box, shown on a hand. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Glove and wrist launcher', 'Shown on a hand on the box', 'Window box'],
  }),
  item({
    id: 'ast-004',
    title: 'Mini Water Dispenser Toy',
    price: 380,
    slug: 'mini-water-dispenser-toy',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A small toy water dispenser in a window box.',
    fullDescription: 'The Mini Water Dispenser Toy is a small toy water dispenser in a window box. One photo shows it out of the box, and the others show the pack. It is in Pretend Play. It is for pretend play beside a toy kitchen. The record does not say that it pumps real water or how much it holds.',
    seoDescription: 'Mini Water Dispenser Toy from A & S Toys. A small toy dispenser in a window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Small toy water dispenser', 'Shown in and out of the box'],
  }),
  item({
    id: 'ast-005',
    title: 'Big Building Blocks Bag',
    price: 1200,
    slug: 'big-building-blocks-bag',
    category: 'building-blocks',
    categoryName: 'Building Blocks',
    shortDescription: 'Large colorful building blocks in a mesh storage bag.',
    fullDescription: 'The Big Building Blocks Bag is large colorful building blocks in a mesh storage bag. Photos show the bag from the front and from the side. The blocks come in several colors. It is in Building Blocks. Use the large blocks for floor building, then put them back in the mesh bag. The record does not give a block count.',
    seoDescription: 'Big Building Blocks Bag from A & S Toys. Large colorful blocks in a mesh storage bag. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Mesh storage bag', 'Large blocks', 'Several colors'],
  }),
  item({
    id: 'ast-006',
    title: 'Crawling Baby Doll',
    price: 1200,
    slug: 'crawling-baby-doll',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A baby doll in pink packaging, shown on its hands and knees.',
    fullDescription: 'The Crawling Baby Doll is a baby doll in pink packaging, shown on its hands and knees. The open pack also shows a bottle and a small toy phone. It is in Dolls and Figures. It is for doll play with the pictured bottle and phone. The record does not say that the doll crawls on its own or makes a sound.',
    seoDescription: 'Crawling Baby Doll from A & S Toys. A baby doll in a pink window box, with a bottle and toy phone pictured. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Baby doll in a crawling pose', 'Bottle and toy phone pictured in the pack', 'Pink window box'],
  }),
  item({
    id: 'ast-007',
    title: 'Gatling Bubble Gun',
    price: 550,
    slug: 'gatling-bubble-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A multi-barrel bubble gun in a colorful box.',
    fullDescription: 'The Gatling Bubble Gun is a multi-barrel bubble gun in a colorful window box. Photos show the box and the gun held in a hand with bubbles. It is in Bubble and Water. It is for bubble play. The record says several barrels, not a numbered count, and it does not list a bubble-solution bottle with this gun.',
    seoDescription: 'Gatling Bubble Gun from A & S Toys. A multi-barrel bubble gun in a colorful window box, shown with bubbles. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Multi-barrel bubble gun', 'Colorful window box'],
  }),
  item({
    id: 'ast-008',
    title: 'Dancing Cactus Toy',
    price: 1100,
    slug: 'dancing-cactus-toy',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A cactus-shaped toy in a box, shown with a small remote.',
    fullDescription: 'The Dancing Cactus Toy is a cactus-shaped toy in a box, shown with a small remote. The box calls it a dancing cactus. It is in Gadgets and Music. The pictured remote is part of what the pack shows. The record does not list songs, volumes, or a battery size.',
    seoDescription: 'Dancing Cactus Toy from A & S Toys. A cactus-shaped toy in a box with a small remote pictured. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Cactus-shaped toy', 'Small remote pictured on the box'],
  }),
  item({
    id: 'ast-009',
    title: 'Duck Slide Track',
    price: 1100,
    slug: 'duck-slide-track',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A small slide track with duck figures.',
    fullDescription: 'The Duck Slide Track is a small slide track with duck figures, packed in a window box. Photos show the front of the box and the track from other sides. It is in Dolls and Figures. The ducks and the track are the play pieces shown. The record does not say how many ducks or how the track is assembled.',
    seoDescription: 'Duck Slide Track from A & S Toys. A small slide track with duck figures in a window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Duck figures', 'Slide track', 'Window box'],
  }),
  item({
    id: 'ast-010',
    title: 'Animal Water Dispenser',
    price: 580,
    slug: 'animal-water-dispenser',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A toy water dispenser with an animal face on the front.',
    fullDescription: 'The Animal Water Dispenser is a toy water dispenser with an animal face on the front of the pack. Other photos show the box from the side and the back. It is in Pretend Play, in a window box. Use it as a pretend dispenser. The record does not name the animal or say that it dispenses real water.',
    seoDescription: 'Animal Water Dispenser from A & S Toys. A toy dispenser with an animal face on the window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Toy water dispenser', 'Animal face on the front', 'Window box'],
  }),
  item({
    id: 'ast-011',
    title: 'Kitchen Water Dispenser',
    price: 390,
    slug: 'kitchen-water-dispenser',
    category: 'pretend-play',
    categoryName: 'Pretend Play',
    shortDescription: 'A toy water dispenser styled like a small kitchen appliance.',
    fullDescription: 'The Kitchen Water Dispenser is a toy water dispenser with a tap, packed like a small kitchen appliance. Photos show the box from four sides. It is in Pretend Play and comes in a window box. The tap and the kitchen-style body are what the pack shows. The record does not list a tank size.',
    seoDescription: 'Kitchen Water Dispenser from A & S Toys. A toy dispenser with a tap, styled like a small kitchen appliance. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Toy tap', 'Kitchen-style body', 'Window box'],
  }),
  item({
    id: 'ast-012',
    title: 'Toy Flip Phone',
    price: 300,
    slug: 'toy-flip-phone',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A flip-style toy phone shown with its box.',
    fullDescription: 'The Toy Flip Phone is a flip-style toy phone that folds open, shown with its box. The photos are four angles of the same set. It is in Gadgets and Music. It is a pretend phone. The record does not say that it places real calls or name any sounds.',
    seoDescription: 'Toy Flip Phone from A & S Toys. A flip-style toy phone that folds open, shown with its box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Flip-style toy phone', 'Shown with its box'],
  }),
  item({
    id: 'ast-013',
    title: 'Friction Off-Road Vehicle',
    price: 500,
    slug: 'friction-off-road-vehicle',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'An off-road toy vehicle in a window box.',
    fullDescription: 'The Friction Off-Road Vehicle is an off-road toy vehicle in a window box. Photos show the front of the pack and the truck from other sides. It is in Vehicles. It is a push-along style vehicle sold as a friction toy. The record does not list a motor, remote, or scale.',
    seoDescription: 'Friction Off-Road Vehicle from A & S Toys. An off-road toy vehicle in a window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Off-road toy vehicle', 'Window box'],
    image: '/images/products/friction-off-road-vehicle-jeep-desert.webp',
    galleryImages: ['/images/products/friction-off-road-vehicle-jeep-white.webp'],
  }),
  item({
    id: 'ast-014',
    title: 'Karaoke Speaker Set',
    price: 1200,
    slug: 'karaoke-speaker-set',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A toy speaker set with two microphones.',
    fullDescription: 'The Karaoke Speaker Set is a toy speaker with two microphones. The photos are four angles of the same set. It is in Gadgets and Music. The set is for pretend singing with the two pictured microphones and the toy speaker. The record does not list songs or a battery size.',
    seoDescription: 'Karaoke Speaker Set from A & S Toys. A toy speaker with two microphones, shown from four angles. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Toy speaker', 'Two microphones'],
  }),
  item({
    id: 'ast-015',
    title: 'Light and Music Car Set',
    price: 950,
    slug: 'light-music-car-set',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A toy car set in a window box, with lights and music on the pack.',
    fullDescription: 'The Light and Music Car Set is a toy car set in a window box. The pack shows lights and music. Photos are four sides of the same box. It is in Vehicles. The lights and music are claims printed on the pack, not extra specs measured here. The record does not say how many cars are in the set.',
    seoDescription: 'Light and Music Car Set from A & S Toys. A toy car set in a window box with lights and music on the pack. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Toy car set', 'Lights and music shown on the pack', 'Window box'],
  }),
  item({
    id: 'ast-016',
    title: 'RC Flying Helicopter Toy',
    price: 960,
    slug: 'rc-flying-helicopter-toy',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A remote-control flying toy with a hand controller.',
    fullDescription: 'The RC Flying Helicopter Toy is a remote-control flying toy in a window box, with a hand controller pictured on the pack. It is sold as an RC flying helicopter toy and sits in Vehicles. The hand controller is what the box shows. The record does not list a range, a channel count, or a charge time.',
    seoDescription: 'RC Flying Helicopter Toy from A & S Toys. A remote-control flying toy with a hand controller on the box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Hand controller pictured on the box', 'Remote-control flying toy', 'Window box'],
  }),
  item({
    id: 'ast-017',
    title: 'Friction Construction Trucks',
    price: 1000,
    slug: 'friction-construction-trucks',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'Construction toy trucks in a window box.',
    fullDescription: 'The Friction Construction Trucks are construction toy trucks in a window box. Photos show the front of the pack and the trucks from other sides. They are in Vehicles. They are friction trucks for push play. The record does not say how many trucks are in the box or name each truck body.',
    seoDescription: 'Friction Construction Trucks from A & S Toys. Construction toy trucks in a window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Construction toy trucks', 'Window box'],
  }),
  item({
    id: 'ast-018',
    title: 'Water Bullet Gun',
    price: 750,
    slug: 'water-bullet-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A water bullet gun in a window box.',
    fullDescription: 'The Water Bullet Gun is a water bullet gun in a window box. Photos show the front of the pack and the gun from other sides. It is in Bubble and Water. It is a toy gun sold under that name. The record does not say it is a bubble gun, and it does not list a water capacity or pellet count.',
    seoDescription: 'Water Bullet Gun from A & S Toys. A water bullet gun in a window box, shown from several sides. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Water bullet gun', 'Window box'],
  }),
  item({
    id: 'ast-019',
    title: 'Dinosaur Figure Set',
    price: 700,
    slug: 'dinosaur-figure-set',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'Dinosaur figures in a mesh bag, packed in a window box.',
    fullDescription: 'The Dinosaur Figure Set is dinosaur figures in a mesh bag, packed in a window box. Photos show the bag inside the box and the bag on its own. It is in Dolls and Figures. The figures stay in the mesh bag for storage. The record does not name the dinosaur species or give a figure count.',
    seoDescription: 'Dinosaur Figure Set from A & S Toys. Dinosaur figures in a mesh bag, packed in a window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Dinosaur figures', 'Mesh bag', 'Window box'],
  }),
  item({
    id: 'ast-020',
    title: 'Battery Bubble Gun',
    price: 500,
    slug: 'battery-bubble-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A bubble gun with bubble solution, in a window box.',
    fullDescription: 'The Battery Bubble Gun is a bubble gun with a bottle of bubble solution, packed in a window box. The photos are four angles of the same set. It is in Bubble and Water and is sold as a battery bubble gun. The record shows the gun and the solution bottle. It does not name a battery size or a bubble count.',
    seoDescription: 'Battery Bubble Gun from A & S Toys. A bubble gun with a bottle of bubble solution in a window box. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Bubble gun', 'Bubble solution bottle', 'Window box'],
  }),
  item({
    id: 'ast-021',
    title: 'Mini Handheld Fan',
    price: 440,
    slug: 'mini-handheld-fan',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A small handheld fan in a blister pack.',
    fullDescription: 'The Mini Handheld Fan is a small fan made to hold in the hand, packed in a blister. Photos show the blister from the front, the back, and the side. It is in Gadgets and Music. It is a handheld fan toy. The record does not say whether it is battery powered or how strong the airflow is.',
    seoDescription: 'Mini Handheld Fan from A & S Toys. A small fan in a blister pack, shown from the front, back, and side. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Handheld fan', 'Blister pack'],
  }),
  item({
    id: 'ast-022',
    title: 'Hungry Turtle Game',
    price: 2300,
    slug: 'hungry-turtle-game',
    category: 'games',
    categoryName: 'Games',
    shortDescription: 'A tray game with colorful turtle pieces and yellow balls.',
    fullDescription: 'The Hungry Turtle Game is a green plastic tray with colorful turtle pieces around the edge and yellow balls in the middle. The photos are three angles of the same set, so this product has three photos rather than four. It is in Games. Play uses the turtle pieces, the yellow balls, and the tray. The record does not explain the rules or give a piece count.',
    seoDescription: 'Hungry Turtle Game from A & S Toys. A green tray with colorful turtle pieces and yellow balls. Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    features: ['Turtle pieces', 'Yellow balls', 'Green tray'],
    angles: 3,
  }),
];

/** Kitchen set and both building-block products, linked from the about page. */
export const ABOUT_FEATURED_SLUGS = [
  'kitchen-play-set',
  'building-blocks-play-set',
  'big-building-blocks-bag',
] as const;

/** Same-category toys first, then the rest of the catalog. */
export function relatedProducts(product: Pick<Product, 'slug' | 'category'>, limit = 4): Product[] {
  const others = PRODUCTS.filter((item) => item.slug !== product.slug);
  const same = others.filter((item) => item.category === product.category);
  const rest = others.filter((item) => item.category !== product.category);
  return [...same, ...rest].slice(0, limit);
}

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
