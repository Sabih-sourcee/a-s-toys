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

const photo = (base: string, angle: number) =>
  `/images/products/${base}-${angle}.webp`;

/** Facts already on the shop record. Appended so every description stays inside those facts. */
const ORDER_NOTES =
  'A & S Toys sells this from Karachi and ships nationwide across Pakistan. Payment on the website is cash on delivery. A delivery charge applies, and delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards. The exchange note is a 7-day replacement for transit damage. There is no walk-in address listed. The material on the product record is plastic. The catalog does not give an age range, a piece count, or measurements, so check the box for the age grade and do not expect those specs on this page. Shop prices are from Rs 300.';

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
  /** Filename base for /images/products/${imageBase}-N.webp. Defaults to the slug. */
  imageBase?: string;
  /** Previous plain product name. */
  oldName?: string;
  /** Photo 1 alt detail from the product record. */
  altDetail?: string;
  /** Overrides the numbered image set. */
  image?: string;
  galleryImages?: string[];
}): Product {
  const { angles = 4, fullDescription, image, galleryImages, imageBase, oldName, altDetail, ...fields } = input;
  const base = imageBase || fields.slug;
  return {
    ...fields,
    oldName,
    altDetail,
    fullDescription: `${fullDescription.trim()} ${ORDER_NOTES}`,
    stock: 10,
    inStock: true,
    image: image ?? photo(base, 1),
    galleryImages: galleryImages ?? Array.from({ length: Math.max(0, angles - 1) }, (_, index) => photo(base, index + 2)),
    materials: 'Plastic',
    safetyNotes: 'Check the box for the age grade.',
  };
}

export const CATEGORIES: Category[] = [
  {
    id: 'building-blocks',
    name: 'A & S Building Blocks',
    slug: 'building-blocks',
    description: 'Building block sets, in a carry case and a storage bag.',
    image: '/images/categories/building-blocks-cine.webp',
  },
  {
    id: 'pretend-play',
    name: 'A & S Pretend Play',
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
    title: 'A & S Building Blocks Set with Carry Case',
    oldName: 'Building Blocks Play Set',
    imageBase: 'a-s-building-blocks-set-carry-case',
    altDetail: 'colorful building blocks in a handled carry case',
    price: 600,
    slug: 'building-blocks-play-set',
    category: 'building-blocks',
    categoryName: 'A & S Building Blocks',
    shortDescription: 'A & S Building Blocks Set with Carry Case: a carry case of colorful building blocks.',
    fullDescription: 'A & S Building Blocks Set with Carry Case is a carry case of colorful building blocks. A handle is part of the case. Photos show the case closed and the blocks beside it, and the blocks are shown both inside and outside the case. It sits in the Building Blocks category. Use it for stacking and simple building play. Nothing on the record says how many blocks are in the case.',
    seoDescription: 'A & S Building Blocks Set with Carry Case. Colorful blocks in a handled carry case. Plastic. Check the box for the age grade. Cash on delivery in Pakistan.',
    features: ['Handled carry case', 'Colorful blocks', 'Blocks shown inside and outside the case'],
      }),
  item({
    id: 'ast-002',
    title: 'A & S Kitchen Set for Kids with Stove & Oven',
    oldName: 'Kitchen Play Set',
    imageBase: 'a-s-kitchen-set-for-kids-stove-oven',
    altDetail: 'toy kitchen set with stove, oven and utensils',
    price: 1400,
    slug: 'kitchen-play-set',
    category: 'pretend-play',
    categoryName: 'A & S Pretend Play',
    shortDescription: 'A & S Kitchen Set for Kids with Stove & Oven: a toy kitchen with a stove, oven, and utensils.',
    fullDescription: 'A & S Kitchen Set for Kids with Stove & Oven is a toy kitchen packed in a window box. The pack shows a stove, an oven, and utensils. It is in the Pretend Play category. Children can use the pictured stove, oven, and utensils for pretend cooking. The page does not list extra food pieces or a sound button, because those are not on the record.',
    seoDescription: 'A & S Kitchen Set for Kids with Stove & Oven. A toy kitchen in a window box with a stove, oven, and utensils. Plastic. Check the age on the box. COD in Pakistan.',
    features: ['Toy stove and oven', 'Utensils pictured with the set', 'Window box'],
      }),
  item({
    id: 'ast-003',
    title: 'A & S Web Shooter Glove Set for Kids',
    oldName: 'Web Shooter Glove Set',
    imageBase: 'a-s-web-shooter-glove-set',
    altDetail: 'glove and wrist launcher toy in a window box',
    price: 600,
    slug: 'web-shooter-glove-set',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A & S Web Shooter Glove Set for Kids: a glove and wrist launcher set.',
    fullDescription: 'A & S Web Shooter Glove Set for Kids is a glove and a wrist launcher packed together. The box shows the glove on a hand, and other photos show the pieces beside the box. It is in Gadgets and Music. It is a role-play glove set. The record does not say what the launcher shoots or whether it needs batteries.',
    seoDescription: 'A & S Web Shooter Glove Set for Kids. A glove and wrist launcher in a window box, shown on a hand. Plastic. Check the age on the box. COD in Pakistan.',
    features: ['Glove and wrist launcher', 'Shown on a hand on the box', 'Window box'],
  }),
  item({
    id: 'ast-004',
    title: 'A & S Mini Water Dispenser Toy',
    oldName: 'Mini Water Dispenser Toy',
    imageBase: 'a-s-mini-water-dispenser-toy',
    altDetail: 'small toy water dispenser in a window box',
    price: 380,
    slug: 'mini-water-dispenser-toy',
    category: 'pretend-play',
    categoryName: 'A & S Pretend Play',
    shortDescription: 'A & S Mini Water Dispenser Toy: a small toy water dispenser in a window box.',
    fullDescription: 'A & S Mini Water Dispenser Toy is a small toy water dispenser in a window box. One photo shows it out of the box, and the others show the pack. It is in Pretend Play. It is for pretend play beside a toy kitchen. The record does not say that it pumps real water or how much it holds.',
    seoDescription: 'A & S Mini Water Dispenser Toy. A small toy dispenser in a window box, shown in and out of the pack. Check the age on the box. COD in Pakistan.',
    features: ['Small toy water dispenser', 'Shown in and out of the box'],
  }),
  item({
    id: 'ast-005',
    title: 'A & S Big Building Blocks Set in Mesh Bag',
    oldName: 'Big Building Blocks Bag',
    imageBase: 'a-s-big-building-blocks-set-mesh-bag',
    altDetail: 'large colorful building blocks in a mesh storage bag',
    price: 1200,
    slug: 'big-building-blocks-bag',
    category: 'building-blocks',
    categoryName: 'A & S Building Blocks',
    shortDescription: 'A & S Big Building Blocks Set in Mesh Bag: large colorful building blocks in a mesh storage bag.',
    fullDescription: 'A & S Big Building Blocks Set in Mesh Bag is large colorful building blocks in a mesh storage bag. Photos show the bag from the front and from the side. The blocks come in several colors. It is in Building Blocks. Use the large blocks for floor building, then put them back in the mesh bag. The record does not give a block count.',
    seoDescription: 'A & S Big Building Blocks Set in Mesh Bag. Large colorful blocks in a mesh storage bag. Plastic. Check the box for the age grade. Cash on delivery in Pakistan.',
    features: ['Mesh storage bag', 'Large blocks', 'Several colors'],
      }),
  item({
    id: 'ast-006',
    title: 'A & S Crawling Baby Doll Toy',
    oldName: 'Crawling Baby Doll',
    imageBase: 'a-s-crawling-baby-doll',
    altDetail: 'baby doll in a crawling pose in pink packaging',
    price: 1200,
    slug: 'crawling-baby-doll',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A & S Crawling Baby Doll Toy: a baby doll in pink packaging, shown on its hands and knees.',
    fullDescription: 'A & S Crawling Baby Doll Toy is a baby doll in pink packaging, shown on its hands and knees. The open pack also shows a bottle and a small toy phone. It is in Dolls and Figures. It is for doll play with the pictured bottle and phone. The record does not say that the doll crawls on its own or makes a sound.',
    seoDescription: 'A & S Crawling Baby Doll Toy. A baby doll in a pink window box, with a bottle and toy phone pictured. Check the age on the box. COD in Pakistan.',
    features: ['Baby doll in a crawling pose', 'Bottle and toy phone pictured in the pack', 'Pink window box'],
  }),
  item({
    id: 'ast-007',
    title: 'A & S Gatling Bubble Gun for Kids',
    oldName: 'Gatling Bubble Gun',
    imageBase: 'a-s-gatling-bubble-gun',
    altDetail: 'multi-barrel gatling bubble gun in a colorful box',
    price: 550,
    slug: 'gatling-bubble-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A & S Gatling Bubble Gun for Kids: a multi-barrel bubble gun in a colorful box.',
    fullDescription: 'A & S Gatling Bubble Gun for Kids is a multi-barrel bubble gun in a colorful window box. Photos show the box and the gun held in a hand with bubbles. It is in Bubble and Water. It is for bubble play. The record says several barrels, not a numbered count, and it does not list a bubble-solution bottle with this gun.',
    seoDescription: 'A & S Gatling Bubble Gun for Kids. A multi-barrel bubble gun in a colorful window box, shown with bubbles. Check the age on the box. COD in Pakistan.',
    features: ['Multi-barrel bubble gun', 'Colorful window box'],
  }),
  item({
    id: 'ast-008',
    title: 'A & S Dancing Cactus Toy with Remote',
    oldName: 'Dancing Cactus Toy',
    imageBase: 'a-s-dancing-cactus-toy',
    altDetail: 'cactus-shaped toy shown with a small remote',
    price: 1100,
    slug: 'dancing-cactus-toy',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A & S Dancing Cactus Toy with Remote: a cactus-shaped toy in a box, shown with a small remote.',
    fullDescription: 'A & S Dancing Cactus Toy with Remote is a cactus-shaped toy in a box, shown with a small remote. The box calls it a dancing cactus. It is in Gadgets and Music. The pictured remote is part of what the pack shows. The record does not list songs, volumes, or a battery size.',
    seoDescription: 'A & S Dancing Cactus Toy with Remote. A cactus-shaped toy in a box with a small remote pictured. Plastic. Check the age on the box. Cash on delivery in Pakistan.',
    features: ['Cactus-shaped toy', 'Small remote pictured on the box'],
  }),
  item({
    id: 'ast-009',
    title: 'A & S Duck Slide Track Toy',
    oldName: 'Duck Slide Track',
    imageBase: 'a-s-duck-slide-track-toy',
    altDetail: 'slide track toy with duck figures',
    price: 1100,
    slug: 'duck-slide-track',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A & S Duck Slide Track Toy: a small slide track with duck figures.',
    fullDescription: 'A & S Duck Slide Track Toy is a small slide track with duck figures, packed in a window box. Photos show the front of the box and the track from other sides. It is in Dolls and Figures. The ducks and the track are the play pieces shown. The record does not say how many ducks or how the track is assembled.',
    seoDescription: 'A & S Duck Slide Track Toy. A small slide track with duck figures in a window box. Plastic. Check the box for the age grade. COD in Pakistan.',
    features: ['Duck figures', 'Slide track', 'Window box'],
  }),
  item({
    id: 'ast-010',
    title: 'A & S Animal Water Dispenser Toy',
    oldName: 'Animal Water Dispenser',
    imageBase: 'a-s-animal-water-dispenser-toy',
    altDetail: 'toy water dispenser with an animal face',
    price: 580,
    slug: 'animal-water-dispenser',
    category: 'pretend-play',
    categoryName: 'A & S Pretend Play',
    shortDescription: 'A & S Animal Water Dispenser Toy: a toy water dispenser with an animal face on the front.',
    fullDescription: 'A & S Animal Water Dispenser Toy is a toy water dispenser with an animal face on the front of the pack. Other photos show the box from the side and the back. It is in Pretend Play, in a window box. Use it as a pretend dispenser. The record does not name the animal or say that it dispenses real water.',
    seoDescription: 'A & S Animal Water Dispenser Toy. A toy dispenser with an animal face on the window box. Plastic. Check the age on the box. COD in Pakistan.',
    features: ['Toy water dispenser', 'Animal face on the front', 'Window box'],
  }),
  item({
    id: 'ast-011',
    title: 'A & S Kitchen Water Dispenser Toy',
    oldName: 'Kitchen Water Dispenser',
    imageBase: 'a-s-kitchen-water-dispenser-toy',
    altDetail: 'toy water dispenser with a tap and kitchen-style body',
    price: 390,
    slug: 'kitchen-water-dispenser',
    category: 'pretend-play',
    categoryName: 'A & S Pretend Play',
    shortDescription: 'A & S Kitchen Water Dispenser Toy: a toy water dispenser styled like a small kitchen appliance.',
    fullDescription: 'A & S Kitchen Water Dispenser Toy is a toy water dispenser with a tap, packed like a small kitchen appliance. Photos show the box from four sides. It is in Pretend Play and comes in a window box. The tap and the kitchen-style body are what the pack shows. The record does not list a tank size.',
    seoDescription: 'A & S Kitchen Water Dispenser Toy. A toy dispenser with a tap, styled like a small kitchen appliance. Check the age on the box. COD in Pakistan.',
    features: ['Toy tap', 'Kitchen-style body', 'Window box'],
  }),
  item({
    id: 'ast-012',
    title: 'A & S Toy Flip Phone for Kids',
    oldName: 'Toy Flip Phone',
    imageBase: 'a-s-toy-flip-phone',
    altDetail: 'flip-style toy phone with its box',
    price: 300,
    slug: 'toy-flip-phone',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A & S Toy Flip Phone for Kids: a flip-style toy phone shown with its box.',
    fullDescription: 'A & S Toy Flip Phone for Kids is a flip-style toy phone that folds open, shown with its box. The photos are four angles of the same set. It is in Gadgets and Music. It is a pretend phone. The record does not say that it places real calls or name any sounds.',
    seoDescription: 'A & S Toy Flip Phone for Kids. A flip-style toy phone that folds open, shown with its box. Plastic. Check the age on the box. Cash on delivery in Pakistan.',
    features: ['Flip-style toy phone', 'Shown with its box'],
  }),
  item({
    id: 'ast-013',
    title: 'A & S Friction Off-Road Jeep Toy',
    oldName: 'Friction Off-Road Vehicle',
    imageBase: 'a-s-friction-off-road-jeep-toy',
    altDetail: 'friction-powered off-road jeep toy',
    price: 500,
    slug: 'friction-off-road-vehicle',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A & S Friction Off-Road Jeep Toy: an off-road toy vehicle in a window box.',
    fullDescription: 'A & S Friction Off-Road Jeep Toy is an off-road toy vehicle in a window box. Photos show the front of the pack and the truck from other sides. It is in Vehicles. It is a push-along style vehicle sold as a friction toy. The record does not list a motor, remote, or scale.',
    seoDescription: 'A & S Friction Off-Road Jeep Toy. An off-road toy vehicle in a window box. Plastic. Check the box for the age grade. Cash on delivery in Pakistan.',
    features: ['Off-road toy vehicle', 'Window box'],
    image: '/images/products/a-s-friction-off-road-jeep-toy-1.webp',
    galleryImages: ['/images/products/a-s-friction-off-road-jeep-toy-2.webp'],
  }),
  item({
    id: 'ast-014',
    title: 'A & S Karaoke Speaker Set with 2 Mics',
    oldName: 'Karaoke Speaker Set',
    imageBase: 'a-s-karaoke-speaker-set',
    altDetail: 'toy karaoke speaker with two microphones',
    price: 1200,
    slug: 'karaoke-speaker-set',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A & S Karaoke Speaker Set with 2 Mics: a toy speaker set with two microphones.',
    fullDescription: 'A & S Karaoke Speaker Set with 2 Mics is a toy speaker with two microphones. The photos are four angles of the same set. It is in Gadgets and Music. The set is for pretend singing with the two pictured microphones and the toy speaker. The record does not list songs or a battery size.',
    seoDescription: 'A & S Karaoke Speaker Set with 2 Mics. A toy speaker with two microphones, shown from four angles. Plastic. Check the age on the box. Cash on delivery in Pakistan.',
    features: ['Toy speaker', 'Two microphones'],
  }),
  item({
    id: 'ast-015',
    title: 'A & S Light & Music Car Toy Set',
    oldName: 'Light and Music Car Set',
    imageBase: 'a-s-light-music-car-toy-set',
    altDetail: 'toy car set with lights and music',
    price: 950,
    slug: 'light-music-car-set',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A & S Light & Music Car Toy Set: a toy car set in a window box, with lights and music on the pack.',
    fullDescription: 'A & S Light & Music Car Toy Set is a toy car set in a window box. The pack shows lights and music. Photos are four sides of the same box. It is in Vehicles. The lights and music are claims printed on the pack, not extra specs measured here. The record does not say how many cars are in the set.',
    seoDescription: 'A & S Light & Music Car Toy Set. A toy car set in a window box with lights and music on the pack. Check the age on the box. COD in Pakistan.',
    features: ['Toy car set', 'Lights and music shown on the pack', 'Window box'],
  }),
  item({
    id: 'ast-016',
    title: 'A & S RC Flying Helicopter Toy',
    oldName: 'RC Flying Helicopter Toy',
    imageBase: 'a-s-rc-flying-helicopter-toy',
    altDetail: 'remote-control flying helicopter toy with hand controller',
    price: 960,
    slug: 'rc-flying-helicopter-toy',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A & S RC Flying Helicopter Toy: a remote-control flying toy with a hand controller.',
    fullDescription: 'A & S RC Flying Helicopter Toy is a remote-control flying toy in a window box, with a hand controller pictured on the pack. It is sold as an RC flying helicopter toy and sits in Vehicles. The hand controller is what the box shows. The record does not list a range, a channel count, or a charge time.',
    seoDescription: 'A & S RC Flying Helicopter Toy. A remote-control flying toy with a hand controller on the box. Check the age on the box. COD in Pakistan.',
    features: ['Hand controller pictured on the box', 'Remote-control flying toy', 'Window box'],
  }),
  item({
    id: 'ast-017',
    title: 'A & S Friction Construction Trucks Toy Set',
    oldName: 'Friction Construction Trucks',
    imageBase: 'a-s-friction-construction-trucks-toy-set',
    altDetail: 'friction construction toy trucks in a window box',
    price: 1000,
    slug: 'friction-construction-trucks',
    category: 'vehicles',
    categoryName: 'Vehicles',
    shortDescription: 'A & S Friction Construction Trucks Toy Set: construction toy trucks in a window box.',
    fullDescription: 'A & S Friction Construction Trucks Toy Set are construction toy trucks in a window box. Photos show the front of the pack and the trucks from other sides. They are in Vehicles. They are friction trucks for push play. The record does not say how many trucks are in the box or name each truck body.',
    seoDescription: 'A & S Friction Construction Trucks Toy Set. Construction toy trucks in a window box. Plastic. Check the box for the age grade. Cash on delivery in Pakistan.',
    features: ['Construction toy trucks', 'Window box'],
  }),
  item({
    id: 'ast-018',
    title: 'A & S Water Bullet Gun Toy',
    oldName: 'Water Bullet Gun',
    imageBase: 'a-s-water-bullet-gun-toy',
    altDetail: 'water bullet gun toy in a window box',
    price: 750,
    slug: 'water-bullet-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A & S Water Bullet Gun Toy: a water bullet gun in a window box.',
    fullDescription: 'A & S Water Bullet Gun Toy is a water bullet gun in a window box. Photos show the front of the pack and the gun from other sides. It is in Bubble and Water. It is a toy gun sold under that name. The record does not say it is a bubble gun, and it does not list a water capacity or pellet count.',
    seoDescription: 'A & S Water Bullet Gun Toy. A water bullet gun in a window box, shown from several sides. Plastic. Check the age on the box. Cash on delivery in Pakistan.',
    features: ['Water bullet gun', 'Window box'],
  }),
  item({
    id: 'ast-019',
    title: 'A & S Dinosaur Figure Set for Kids',
    oldName: 'Dinosaur Figure Set',
    imageBase: 'a-s-dinosaur-figure-set',
    altDetail: 'dinosaur figures in a mesh bag',
    price: 700,
    slug: 'dinosaur-figure-set',
    category: 'dolls-figures',
    categoryName: 'Dolls & Figures',
    shortDescription: 'A & S Dinosaur Figure Set for Kids: dinosaur figures in a mesh bag, packed in a window box.',
    fullDescription: 'A & S Dinosaur Figure Set for Kids is dinosaur figures in a mesh bag, packed in a window box. Photos show the bag inside the box and the bag on its own. It is in Dolls and Figures. The figures stay in the mesh bag for storage. The record does not name the dinosaur species or give a figure count.',
    seoDescription: 'A & S Dinosaur Figure Set for Kids. Dinosaur figures in a mesh bag, packed in a window box. Plastic. Check the age on the box. COD in Pakistan.',
    features: ['Dinosaur figures', 'Mesh bag', 'Window box'],
  }),
  item({
    id: 'ast-020',
    title: 'A & S Battery Bubble Gun with Solution',
    oldName: 'Battery Bubble Gun',
    imageBase: 'a-s-battery-bubble-gun',
    altDetail: 'battery bubble gun with a bottle of bubble solution',
    price: 500,
    slug: 'battery-bubble-gun',
    category: 'bubble-water',
    categoryName: 'Bubble & Water',
    shortDescription: 'A & S Battery Bubble Gun with Solution: a bubble gun with bubble solution, in a window box.',
    fullDescription: 'A & S Battery Bubble Gun with Solution is a bubble gun with a bottle of bubble solution, packed in a window box. The photos are four angles of the same set. It is in Bubble and Water and is sold as a battery bubble gun. The record shows the gun and the solution bottle. It does not name a battery size or a bubble count.',
    seoDescription: 'A & S Battery Bubble Gun with Solution. A bubble gun with a bottle of bubble solution in a window box. Check the age on the box. COD in Pakistan.',
    features: ['Bubble gun', 'Bubble solution bottle', 'Window box'],
  }),
  item({
    id: 'ast-021',
    title: 'A & S Mini Handheld Fan for Kids',
    oldName: 'Mini Handheld Fan',
    imageBase: 'a-s-mini-handheld-fan',
    altDetail: 'small handheld fan in a blister pack',
    price: 440,
    slug: 'mini-handheld-fan',
    category: 'gadgets-music',
    categoryName: 'Gadgets & Music',
    shortDescription: 'A & S Mini Handheld Fan for Kids: a small handheld fan in a blister pack.',
    fullDescription: 'A & S Mini Handheld Fan for Kids is a small fan made to hold in the hand, packed in a blister. Photos show the blister from the front, the back, and the side. It is in Gadgets and Music. It is a handheld fan toy. The record does not say whether it is battery powered or how strong the airflow is.',
    seoDescription: 'A & S Mini Handheld Fan for Kids. A small fan in a blister pack, shown from the front, back, and side. Check the age on the box. COD in Pakistan.',
    features: ['Handheld fan', 'Blister pack'],
  }),
  item({
    id: 'ast-022',
    title: 'A & S Hungry Turtle Game for Kids',
    oldName: 'Hungry Turtle Game',
    imageBase: 'a-s-hungry-turtle-game',
    altDetail: 'tray game with turtle pieces and yellow balls',
    price: 2300,
    slug: 'hungry-turtle-game',
    category: 'games',
    categoryName: 'Games',
    shortDescription: 'A & S Hungry Turtle Game for Kids: a tray game with colorful turtle pieces and yellow balls.',
    fullDescription: 'A & S Hungry Turtle Game for Kids is a green plastic tray with colorful turtle pieces around the edge and yellow balls in the middle. The photos are three angles of the same set, so this product has three photos rather than four. It is in Games. Play uses the turtle pieces, the yellow balls, and the tray. The record does not explain the rules or give a piece count.',
    seoDescription: 'A & S Hungry Turtle Game for Kids. A green tray with colorful turtle pieces and yellow balls. Plastic. Check the age on the box. COD in Pakistan.',
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
