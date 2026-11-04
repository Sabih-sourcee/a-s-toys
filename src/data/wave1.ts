import { PRODUCTS } from './products';
import type { LandingPage } from './landings';
import { LISTINGS, deliveryFee, findProduct, freeDeliveryOver, rupees } from '../lib/money';

const UPDATED = '2026-11-04';
const heli = findProduct('rc-flying-helicopter-toy');
const karaoke = findProduct('karaoke-speaker-set');
const cactus = findProduct('dancing-cactus-toy');
const car = findProduct('light-music-car-set');
const kitchen = findProduct('kitchen-play-set');
const mini = findProduct('mini-water-dispenser-toy');
const animal = findProduct('animal-water-dispenser');
const tap = findProduct('kitchen-water-dispenser');
const carry = findProduct('building-blocks-play-set');
const bag = findProduct('big-building-blocks-bag');
const priced = [...PRODUCTS].sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
const lowest = priced[0];
const highest = priced[priced.length - 1];

function payLine(): string {
  return `You can pay by cash on delivery, JazzCash, EasyPaisa, or bank transfer. Delivery is ${deliveryFee()}, and it is free over ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days.`;
}

export const helicopterGuide: LandingPage = {
  path: '/rc-helicopter-price-pakistan',
  navLabel: 'RC helicopter price',
  title: `RC Helicopter Price in Pakistan from ${rupees(heli.price)} | A & S Toys`,
  description: `RC helicopter price in Pakistan: what mini, 2-channel and 4-channel models cost, and the ${heli.title} at ${rupees(heli.price)}. COD, delivery in 2-5 days.`,
  h1: 'RC Helicopter Price in Pakistan',
  kind: 'guide',
  updated: UPDATED,
  paragraphs: [],
  productSlugs: [heli.slug],
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Toys price list', path: '/toys-price-list-pakistan' },
    { name: 'RC helicopter price', path: '/rc-helicopter-price-pakistan' },
  ],
  related: ['/toys-price-list-pakistan', '/kids-karaoke-mic-speaker-price-pakistan', '/toys-online-karachi'],
  intro: `The ${heli.title} is ${rupees(heli.price)}, with cash on delivery. Other shops, ${LISTINGS}, list a palm-sensor mini from about Rs 1,090, a 2-channel from about Rs 1,850, a 3.5-channel rechargeable around Rs 5,000, a 4-channel gyro around Rs 7,500, and large alloy models over Rs 13,000.`,
  sections: [
    {
      heading: 'Price by type',
      paragraphs: [
        `Parents ask for one number. There is not one. A palm-size toy and a large alloy model are different machines, and the listings treat them that way.`,
        `Use the table as a map of what other shops were asking. It is not a promise that those models match each other, and it is not a ranking of shops.`,
      ],
      table: {
        caption: `Other helicopter prices, ${LISTINGS}. These are not A & S Toys prices.`,
        columns: ['Type', 'About'],
        rows: [
          ['Palm-sensor mini', 'about Rs 1,090'],
          ['2-channel', 'about Rs 1,850'],
          ['3.5-channel rechargeable', 'about Rs 5,250'],
          ['4-channel gyro', 'about Rs 7,499'],
          ['Large alloy', 'about Rs 13,895'],
        ],
      },
    },
    {
      heading: 'What channel means, and IR versus 2.4 GHz',
      paragraphs: [
        `A channel is a direction the helicopter can be told to move. A simple 2-channel toy usually goes up and down, and turns. A 3.5-channel toy adds more steering. A 4-channel toy is the one people fly around a room on purpose.`,
        `IR means infrared. The controller has to see the helicopter, a bit like a TV remote. 2.4 GHz is a radio link. It does not need a clear view in the same way, and two children can fly at once without the signals fighting as hard.`,
        `Those words are how the listings sort toys. They are not a spec we print for every box in the market. When you compare two adverts, read the channel line and the radio line before you compare the rupees.`,
      ],
    },
    {
      heading: 'Which type suits which buyer',
      paragraphs: [
        `If the money you plan to spend is about Rs 900 to Rs 2,000, you are in learn-to-fly-and-survive-crashes territory. The toy will hit the sofa. That is the point of a first one.`,
        `A palm-sensor mini is a desk toy. It leaves the hand and comes back. A 2-channel or a simple 3.5-channel is the usual next step when a child wants to steer. A 4-channel gyro, and the large alloy models, are for someone who already likes the hobby and has the space.`,
        `Do not buy the expensive machine as a surprise for a first afternoon. A crash on a Rs 13,000 model hurts more than a crash on a small one. Start where a broken landing is a lesson, not a loss.`,
      ],
    },
    {
      heading: 'Our helicopter',
      paragraphs: [
        `The ${heli.title} is ${rupees(heli.price)}. It is a remote-control flying toy in a window box, with a hand controller pictured on the pack. It sits in Vehicles. The material on the record is plastic.`,
        `The photos are the shop photos of that box. The hand controller is what the box shows. Check the box for the channel count, the flight time, and the age.`,
        `We do not add a range, a charge time, or a radio type here, because those lines are not on the product record. If the carton prints them, the carton wins.`,
      ],
      productSlugs: [heli.slug],
      links: [
        { href: `/products/${heli.slug}`, label: heli.title },
        { href: '/category/vehicles', label: 'Vehicles' },
      ],
    },
    {
      heading: 'First flight',
      paragraphs: [
        `Charge or fit the batteries the way the box says, then go to a room with space above the furniture. Keep siblings out of the circle for the first minute.`,
        `Stand behind the child and let the helicopter rise only to head height. If it drifts, land it. A wall is not a lesson.`,
        `Short hops are enough on day one. Put it down before anyone is cross. A calm five minutes teaches more than a long crash.`,
      ],
    },
    {
      heading: 'Ordering',
      paragraphs: [
        `Add the ${heli.title} from its product page, or send the WhatsApp message there if you want the photo confirmed first.`,
        payLine(),
        `There is no walk-in counter. If the parcel is damaged in transit, the written note is a 7-day replacement for that damage. Read it on the return page before you need it.`,
      ],
      links: [
        { href: `/products/${heli.slug}`, label: heli.title },
        { href: '/toys-price-list-pakistan', label: 'Toys price list in Pakistan' },
        { href: '/return-policy', label: 'Return and replacement policy' },
        { href: '/toys-online-karachi', label: 'Toys online in Karachi' },
      ],
    },
  ],
  faqs: [
    {
      question: `What is the ${heli.title} price?`,
      answer: `The ${heli.title} is ${rupees(heli.price)}. That is the price on this site.`,
    },
    {
      question: 'What should a beginner child start with?',
      answer: 'A 2-channel, or a simple 3.5-channel, is the usual start. A palm-sensor mini is fine for a desk. Leave the 4-channel and the large alloy models until someone has already flown.',
    },
    {
      question: 'How long does a small helicopter fly?',
      answer: `Shop listings quote about 8-10 minutes for small rechargeable models, ${LISTINGS}. Check the box for the ${heli.title}.`,
    },
    {
      question: 'Can I pay cash on delivery?',
      answer: `Yes. Cash on delivery is on the site, and so are JazzCash, EasyPaisa, and bank transfer. Delivery is ${deliveryFee()}, free over ${freeDeliveryOver()}, with TCS or Leopards in 2-5 days.`,
    },
  ],
};

export const karaokeGuide: LandingPage = {
  path: '/kids-karaoke-mic-speaker-price-pakistan',
  navLabel: 'Kids karaoke price',
  title: 'Kids Karaoke Mic Speaker Price in Pakistan | A & S Toys',
  description: `Kids karaoke speaker with mics: prices in Pakistan from Rs 1,700 to Rs 4,895 elsewhere, and the ${karaoke.title} at ${rupees(karaoke.price)}. COD.`,
  h1: 'Kids Karaoke Mic and Speaker Price in Pakistan',
  kind: 'guide',
  updated: UPDATED,
  paragraphs: [],
  productSlugs: [karaoke.slug, cactus.slug, car.slug],
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Toys price list', path: '/toys-price-list-pakistan' },
    { name: 'Kids karaoke price', path: '/kids-karaoke-mic-speaker-price-pakistan' },
  ],
  related: ['/toys-price-list-pakistan', '/rc-helicopter-price-pakistan', '/toys-online-karachi'],
  intro: `Other shops list a kids karaoke speaker with mics from about Rs 1,700 to about Rs 4,895, ${LISTINGS}. The ${karaoke.title} is ${rupees(karaoke.price)}, with cash on delivery. Read what each box actually includes before you compare those numbers.`,
  sections: [
    {
      heading: 'What other shops ask',
      paragraphs: [
        `The table is a range from other Pakistani shop listings. It is not our price list, and it is not a ranking. A higher price can mean lights and Bluetooth. It can also mean a louder photo.`,
      ],
      table: {
        caption: `Other karaoke speaker prices, ${LISTINGS}.`,
        columns: ['Listing', 'About'],
        rows: [
          ['1-mic Bluetooth', 'about Rs 1,700'],
          ['2-mic K12', 'about Rs 1,850'],
          ['Rechargeable Bluetooth', 'about Rs 1,950'],
          ['LED party speaker', 'about Rs 4,895'],
        ],
      },
    },
    {
      heading: 'What to check before you buy',
      paragraphs: [
        `Ask four plain questions. Is the link Bluetooth or a wire? Does it recharge, or does it take AA cells? How is the volume limited? How many mics are actually in the box?`,
        `A cable matters in a Pakistani living room, because a Bluetooth drop in the middle of a song makes a small child think the toy is broken. A rechargeable pack is convenient until nobody charged it. AA cells are boring and easy to replace.`,
        `Count the mics with your eyes on the photo, not on the headline. Some adverts say karaoke and show one mic. Some show two. The number changes how siblings share the toy.`,
      ],
    },
    {
      heading: 'Our set',
      paragraphs: [
        `The ${karaoke.title} is ${rupees(karaoke.price)}. It is a toy speaker with two microphones. The photos are four angles of that same set. It sits in Gadgets and Music. The material on the record is plastic.`,
        `It is for pretend singing with the two pictured microphones and the toy speaker. Check the box for the battery size, any song list, and the age. We do not print those here.`,
      ],
      productSlugs: [karaoke.slug],
      links: [{ href: `/products/${karaoke.slug}`, label: karaoke.title }],
    },
    {
      heading: 'Siblings and parties',
      paragraphs: [
        `Two mics means two children will both want a turn in the same minute. Keep the volume low and stay in the room. A party is louder than a Tuesday afternoon, so start lower than you think.`,
        `The speaker is a toy. It is not a wedding sound system. If you need the neighbours not to hear, that is your hand on the volume, not a feature we claim.`,
        `Put the mics back in the box when the song is over. A loose mic on the floor is the piece that gets stepped on.`,
      ],
    },
    {
      heading: 'Related toys on this site',
      paragraphs: [
        `If the child likes sound more than singing, look at the ${cactus.title}. It is ${rupees(cactus.price)}, a cactus-shaped toy shown with a small remote. The ${car.title} is ${rupees(car.price)}. The pack shows lights and music. Both are separate toys, not parts of the karaoke set.`,
      ],
      productSlugs: [cactus.slug, car.slug],
      links: [
        { href: `/products/${cactus.slug}`, label: cactus.title },
        { href: `/products/${car.slug}`, label: car.title },
        { href: '/category/gadgets-music', label: 'Gadgets and music' },
      ],
    },
    {
      heading: 'Ordering',
      paragraphs: [
        `Open the product page, look at the four photos, and add the set if it is the one you want.`,
        payLine(),
        `Read the return page if you want the transit-damage note before the parcel moves. There is no walk-in counter in Karachi.`,
      ],
      links: [
        { href: `/products/${karaoke.slug}`, label: karaoke.title },
        { href: '/toys-price-list-pakistan', label: 'Toys price list in Pakistan' },
        { href: '/return-policy', label: 'Return and replacement policy' },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is the A & S karaoke set price?',
      answer: `The ${karaoke.title} is ${rupees(karaoke.price)}.`,
    },
    {
      question: 'What batteries does it take?',
      answer: 'Check the box. The product record does not name a battery size.',
    },
    {
      question: 'How many mics are in the set?',
      answer: `Two. The ${karaoke.title} is a toy speaker with two microphones.`,
    },
    {
      question: 'Do you deliver, and can I pay cash on delivery?',
      answer: `Yes. ${payLine()}`,
    },
  ],
};

export const priceListGuide: LandingPage = {
  path: '/toys-price-list-pakistan',
  navLabel: 'Toys price list',
  title: 'Toys Price List in Pakistan 2026 | A & S Toys',
  description: `Full A & S Toys price list from ${rupees(lowest.price)} to ${rupees(highest.price)}, plus what kitchen sets, blocks, RC toys, bubble guns and dolls usually cost in Pakistan in November 2026.`,
  h1: 'Toys Price List in Pakistan (November 2026)',
  kind: 'collection',
  updated: UPDATED,
  paragraphs: [],
  productSlugs: priced.map((product) => product.slug),
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Toys price list', path: '/toys-price-list-pakistan' },
  ],
  related: [
    '/rc-helicopter-price-pakistan',
    '/kids-karaoke-mic-speaker-price-pakistan',
    '/kitchen-set-toys-pakistan',
    '/building-blocks-toys-pakistan',
    '/bubble-guns-pakistan',
    '/toys-online-karachi',
  ],
  intro: `Toys for kids on this site run from ${rupees(lowest.price)} to ${rupees(highest.price)}. That is the A & S Toys list, not every shop in Pakistan. Other listings, ${LISTINGS}, sit in wider bands, and those bands are labelled below so you can see which number is ours.`,
  sections: [
    {
      heading: 'Toys for kids by price',
      paragraphs: [
        `The table under this heading is every toy we sell, sorted by price. The ${lowest.title} is ${rupees(lowest.price)}. The ${highest.title} is ${rupees(highest.price)}. Nothing on the list is hidden in a WhatsApp chat.`,
        `Shop prices start from ${rupees(300)}. That phrase means the lowest price in our own catalog, not a claim about other shops. Open a row when you want the photos.`,
      ],
      priceTable: priced.map((product) => product.slug),
    },
    {
      heading: 'What other shops were listing',
      paragraphs: [
        `These ranges are other people's prices. They help a parent see the market. They are not our prices, and they are not a promise that a Rs 199 kitchen matches a Rs 1,400 one.`,
      ],
      table: {
        caption: `Market ranges, ${LISTINGS}.`,
        columns: ['Toy', 'Range seen elsewhere'],
        rows: [
          ['Kitchen sets, basic', 'Rs 199 to Rs 1,250'],
          ['Kitchen sets, 20-29 piece', 'Rs 1,750 to Rs 3,149'],
          ['Kitchen sets, spray, steam or light', 'Rs 3,950 to Rs 19,999'],
          ['Blocks, 51-150 piece bags', 'Rs 249 to Rs 525'],
          ['Blocks, 90-110 piece', 'Rs 579 to Rs 1,899'],
          ['Blocks, large or themed', 'Rs 3,449 to Rs 6,999'],
          ['RC helicopters', 'Rs 1,090 to Rs 13,895'],
          ['Karaoke speakers', 'Rs 1,700 to Rs 4,895'],
          ['Bubble guns', 'Rs 449 to Rs 2,499'],
          ['Water guns', 'Rs 775 to Rs 5,900'],
          ['Toy phones', 'Rs 250 to Rs 799'],
          ['Baby dolls, simple', 'Rs 750 to Rs 1,595'],
          ['Baby dolls, larger', 'Rs 2,000 and up'],
          ['Dinosaur figures', 'Rs 495 to Rs 1,390'],
          ['Friction trucks, single', 'Rs 299 to Rs 399'],
          ['Friction truck packs', 'Rs 1,499 to Rs 2,199'],
        ],
      },
    },
    {
      heading: 'How to read a toy price',
      paragraphs: [
        `A low number is often a smaller box, fewer claimed features, or a single piece instead of a set. A high number is often lights, a remote, or a bigger carton. Sometimes it is only a louder advert.`,
        `On our pages, the price next to the name is the price we charge. If a sentence says it was ${LISTINGS}, that number belongs to someone else.`,
        `Piece counts and ages are not copied into this catalog. Check the age on the box. Compare our photos with the other shop's photos before you decide a bag of blocks is the same toy.`,
      ],
    },
    {
      heading: 'Delivery and payment',
      paragraphs: [
        payLine(),
        `There is no walk-in address. Orders leave Karachi for the rest of Pakistan. The return note for transit damage is on /return-policy.`,
      ],
      links: [
        { href: '/return-policy', label: 'Return and replacement policy' },
        { href: '/kitchen-set-toys-pakistan', label: 'Kitchen set price guide' },
        { href: '/building-blocks-toys-pakistan', label: 'Building blocks price guide' },
        { href: '/rc-helicopter-price-pakistan', label: 'RC helicopter price guide' },
        { href: '/kids-karaoke-mic-speaker-price-pakistan', label: 'Kids karaoke price guide' },
        { href: '/bubble-guns-pakistan', label: 'Bubble guns' },
        { href: '/category/building-blocks', label: 'A & S Building Blocks' },
        { href: '/category/pretend-play', label: 'A & S Pretend Play' },
        { href: '/category/vehicles', label: 'Vehicles' },
        { href: '/category/bubble-water', label: 'Bubble and water' },
        { href: '/category/dolls-figures', label: 'Dolls and figures' },
        { href: '/category/gadgets-music', label: 'Gadgets and music' },
        { href: '/category/games', label: 'Games' },
      ],
    },
    {
      heading: 'Prices checked 4 November 2026',
      paragraphs: [
        `The A & S Toys column was taken from the catalog on 4 November 2026. The other ranges were taken from Pakistani shop listings in early November 2026. If we change a price, this page should change with it, because the numbers are read from the product list.`,
        `A parent in Karachi usually asks three things at the counter. What is the price today? What is in the photo? How does it get to the house? This page answers those in that order. The photo is on the product page. The delivery line is the same for every toy: cash on delivery if you want it, or JazzCash, EasyPaisa, or a bank transfer if you would rather pay first.`,
        `Do not add the other shops' piece counts onto our boxes. A 90-piece claim on someone else's advert is their claim. Our carry case and our mesh bag do not publish a count. Hold the two photos next to each other if you are choosing between our sets. One has a handle and a hard case. One is a soft mesh bag of larger blocks.`,
        `The guides linked under this page go deeper on helicopters, karaoke, kitchens, and blocks. The bubble-gun page stays on the two guns we actually sell. Use those pages when you want the longer explanation. Use this table when you only want the number.`,
      ],
    },
  ],
  faqs: [
    {
      question: 'Which A & S toy costs the least, and which costs the most?',
      answer: `The ${lowest.title} is ${rupees(lowest.price)}. The ${highest.title} is ${rupees(highest.price)}.`,
    },
    {
      question: 'What is the delivery fee?',
      answer: `Delivery is ${deliveryFee()}. It is free when the order reaches ${freeDeliveryOver()}. The courier is TCS or Leopards, in 2-5 days.`,
    },
    {
      question: 'How can I pay?',
      answer: 'Cash on delivery, JazzCash, EasyPaisa, or bank transfer.',
    },
    {
      question: 'Are the other ranges your prices?',
      answer: `No. Rows marked as ${LISTINGS} are other shops. Our prices are the ones in the A & S Toys table.`,
    },
  ],
};

export const kitchenGuide: LandingPage = {
  path: '/kitchen-set-toys-pakistan',
  navLabel: 'Kitchen set price',
  title: 'Kitchen Set for Kids Price in Pakistan | A & S Toys',
  description: `Kids kitchen set price in Pakistan: basic sets Rs 199 to 1,250, 20-piece sets Rs 1,750+, spray kitchens Rs 3,950+. ${kitchen.title} is ${rupees(kitchen.price)}. COD.`,
  h1: 'Kitchen Set for Kids Price in Pakistan',
  kind: 'guide',
  updated: UPDATED,
  paragraphs: [],
  productSlugs: [kitchen.slug, mini.slug, animal.slug, tap.slug],
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Toys price list', path: '/toys-price-list-pakistan' },
    { name: 'Kitchen set price', path: '/kitchen-set-toys-pakistan' },
  ],
  related: ['/toys-price-list-pakistan', '/building-blocks-toys-pakistan', '/toys-online-karachi'],
  intro: `Other shops list a kids kitchen set from about Rs 199 to past Rs 3,950, ${LISTINGS}. The ${kitchen.title} is ${rupees(kitchen.price)}. The pack shows a stove, an oven, and utensils in a window box.`,
  sections: [
    {
      heading: 'Price tiers',
      paragraphs: [
        `Read the tier before you read the rupee. A basic set is pots and a small hob. A 20-piece set is a fuller box. A spray or steam kitchen is a different toy, with a higher asking price on other sites.`,
      ],
      table: {
        caption: `Other kitchen prices, ${LISTINGS}.`,
        columns: ['Tier', 'About'],
        rows: [
          ['Basic sets', 'Rs 199 to Rs 1,250'],
          ['20-piece and similar sets', 'Rs 1,750 and up'],
          ['Spray, steam, or light kitchens', 'Rs 3,950 and up'],
        ],
      },
    },
    {
      heading: 'What each tier is for',
      paragraphs: [
        `A basic set suits a child who wants to pretend to stir. You are buying the idea of cooking, not a fitted kitchen. The box is small. The play is short and close to the floor.`,
        `A larger piece-count set suits a child who lines toys up and wants more pots. Other shops use the piece count as the reason for the jump toward Rs 1,750. We do not print a piece count for our own set.`,
        `Spray, steam, and light kitchens suit a parent who already knows they want those extras and is ready for the Rs 3,950 band. Do not assume a cheaper box has them because the photo is bright.`,
      ],
    },
    {
      heading: 'Where our set sits',
      paragraphs: [
        `The ${kitchen.title} is ${rupees(kitchen.price)}. The pack shows a stove, an oven, and utensils. It is a window box in Pretend Play. The material on the record is plastic.`,
        `The record does not list lights, steam, or a water connection. It also does not list food toys or a sound button. Kitchens are not only for girls. Any child who wants to pretend to cook can use this one.`,
        `Check the age on the box. The photos are the shop photos. If the carton prints a piece count, that print is the source.`,
      ],
      productSlugs: [kitchen.slug],
      links: [{ href: `/products/${kitchen.slug}`, label: kitchen.title }],
    },
    {
      heading: 'Water dispensers as add-ons',
      paragraphs: [
        `Three dispensers sit beside the kitchen. They are not packed inside it. The ${mini.title} is ${rupees(mini.price)}. It is the small one, in a window box, with a photo out of the box. The ${animal.title} is ${rupees(animal.price)}. It has an animal face on the front. The record does not name the animal. The ${tap.title} is ${rupees(tap.price)}. It has a tap and a kitchen-style body.`,
        `Treat them as pretend dispensers. The record does not say they pump real water, and it does not list a tank size.`,
      ],
      productSlugs: [mini.slug, animal.slug, tap.slug],
    },
    {
      heading: 'Safety',
      paragraphs: [
        `The utensils are small. Stay in the room while they are out of the box. This is pretend cooking, not a hot stove, but small pieces still go in mouths.`,
        `Check the age on the box once, before you hand the set over. That line is enough. You do not need a lecture in every photo.`,
      ],
    },
    {
      heading: 'Ordering',
      paragraphs: [
        `Pick the kitchen, or one dispenser, from its own page. They are separate lines in the bag.`,
        payLine(),
        `The return page covers transit damage. There is no shop floor to visit.`,
      ],
      links: [
        { href: `/products/${kitchen.slug}`, label: kitchen.title },
        { href: '/toys-price-list-pakistan', label: 'Toys price list in Pakistan' },
        { href: '/return-policy', label: 'Return and replacement policy' },
        { href: '/category/pretend-play', label: 'A & S Pretend Play' },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is a kids kitchen set in Pakistan?',
      answer: `Other shops list basic sets from about Rs 199 to Rs 1,250, and spray or steam kitchens from about Rs 3,950, ${LISTINGS}. The ${kitchen.title} is ${rupees(kitchen.price)}.`,
    },
    {
      question: 'Which kitchen toys does A & S Toys list?',
      answer: `The ${kitchen.title}, the ${mini.title}, the ${animal.title}, and the ${tap.title}.`,
    },
    {
      question: 'What does the A & S kitchen set show?',
      answer: `A stove, an oven, and utensils in a window box. The ${kitchen.title} does not list lights, steam, or a water connection.`,
    },
    {
      question: 'How do the water dispensers differ?',
      answer: `The ${mini.title} is the small one. The ${animal.title} has an animal face on the front. The ${tap.title} has a tap and a kitchen-style body. They are pretend toys, sold separately from the kitchen.`,
    },
    {
      question: 'How do I pay and get delivery?',
      answer: payLine(),
    },
  ],
};

export const blocksGuide: LandingPage = {
  path: '/building-blocks-toys-pakistan',
  navLabel: 'Building blocks price',
  title: 'Building Blocks Price in Pakistan | A & S Toys',
  description: `Building blocks price in Pakistan: bags from Rs 249, big sets Rs 3,449+. ${carry.title} is ${rupees(carry.price)}. ${bag.title} is ${rupees(bag.price)}. COD.`,
  h1: 'Building Blocks Price in Pakistan',
  kind: 'guide',
  updated: UPDATED,
  paragraphs: [],
  productSlugs: [carry.slug, bag.slug],
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Toys price list', path: '/toys-price-list-pakistan' },
    { name: 'Building blocks price', path: '/building-blocks-toys-pakistan' },
  ],
  related: ['/toys-price-list-pakistan', '/kitchen-set-toys-pakistan', '/toys-online-karachi'],
  intro: `Other listings run from Rs 249 for a block bag to past Rs 3,449 for a large set, ${LISTINGS}. The ${carry.title} is ${rupees(carry.price)}. The ${bag.title} is ${rupees(bag.price)}. Compare the photos, not a piece count.`,
  sections: [
    {
      heading: 'Price tiers',
      paragraphs: [
        `Other shops sort blocks by how many pieces they claim. A small bag is cheap. A 90-piece box costs more. A themed set costs more again. That is their shelf, not ours.`,
        `Tiny bags can be cheaper per piece elsewhere. That is an honest reading of those listings. It does not make two bags the same toy. Look at the size of the block in the photo before you call a price high or low.`,
      ],
      table: {
        caption: `Other block prices, ${LISTINGS}.`,
        columns: ['Listing', 'About'],
        rows: [
          ['51-150 piece bags', 'Rs 249 to Rs 525'],
          ['90-110 piece sets', 'Rs 579 to Rs 1,899'],
          ['Large or themed sets', 'Rs 3,449 to Rs 6,999'],
        ],
      },
    },
    {
      heading: 'Carry case or mesh bag',
      paragraphs: [
        `The carry case is a handled box you can close. Photos show the blocks inside the case and outside it. Pick it if you want the blocks to travel in a hard case.`,
        `The mesh bag is large colorful blocks in a soft bag. Photos show the bag from the front and from the side. Pick it if you want bigger blocks for the floor and a bag you can see through.`,
        `They are two products. They are not one kit. Both are plastic. Both are in A & S Building Blocks.`,
      ],
    },
    {
      heading: 'Our two sets',
      paragraphs: [
        `The ${carry.title} is ${rupees(carry.price)}. The ${bag.title} is ${rupees(bag.price)}. Check the age on the box. We are not going to guess a piece count from the photo.`,
      ],
      priceTable: [carry.slug, bag.slug],
      productSlugs: [carry.slug, bag.slug],
      links: [
        { href: `/products/${carry.slug}`, label: carry.title },
        { href: `/products/${bag.slug}`, label: bag.title },
        { href: '/category/building-blocks', label: 'A & S Building Blocks' },
      ],
    },
    {
      heading: 'Play and safety',
      paragraphs: [
        `Blocks are for stacking and simple building. The case closes. The bag holds the large ones. That is the play the photos support.`,
        `Small pieces still exist in a block set. Stay nearby with younger children. Check the age on the box before you tip the pieces onto the floor. One look at the box is the right check. You do not need the same warning under every picture.`,
        `If you are comparing a cheap bag from another shop with one of ours, put the photos side by side. A lower price per piece only helps when the pieces are the size you want. A handful of tiny blocks and a bag of large floor blocks are not the same afternoon.`,
        `Sort them by color if that is the game your child likes. Put them back in the case or the bag when you are done, so the next play starts with a closed set instead of a hunt under the sofa.`,
      ],
    },
    {
      heading: 'Ordering',
      paragraphs: [
        `Open the set you want. The price on the product page is the price in the table.`,
        payLine(),
        `Transit damage is covered in the return note. Read /return-policy if you want it in writing. There is no walk-in counter.`,
      ],
      links: [
        { href: '/toys-price-list-pakistan', label: 'Toys price list in Pakistan' },
        { href: '/return-policy', label: 'Return and replacement policy' },
        { href: '/kitchen-set-toys-pakistan', label: 'Kitchen set price guide' },
      ],
    },
  ],
  faqs: [
    {
      question: 'What do the two A & S block sets cost?',
      answer: `The ${carry.title} is ${rupees(carry.price)}. The ${bag.title} is ${rupees(bag.price)}.`,
    },
    {
      question: 'Should I pick the case or the bag?',
      answer: 'Pick the carry case for a handled box and blocks shown inside and outside it. Pick the mesh bag for large blocks in several colors. They are sold separately.',
    },
    {
      question: 'How many pieces are in the sets?',
      answer: 'Check the box. This page does not guess a piece count.',
    },
    {
      question: 'How does delivery work?',
      answer: payLine(),
    },
  ],
};
