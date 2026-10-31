import { config } from '../config';

/** Facts already stated on the site. No street address is listed. */
export const SHOP = {
  brand: 'A & S Toys',
  url: 'https://usmanitoys.com',
  city: 'Karachi',
  country: 'Pakistan',
  phone: config.phone,
  phoneTel: config.phoneTel,
  whatsapp: config.whatsappPhone,
  email: config.email,
  deliveryFee: 'Rs 250',
  freeOver: 'Rs 3,500',
  deliveryTime: '2-5 days',
  courier: 'TCS/Leopards',
  payment: 'Cash on delivery. Checkout also lists JazzCash, EasyPaisa, and bank transfer.',
  returns: config.exchangePolicy,
  priceFrom: 'Rs 300',
  noWalkIn: 'No walk-in address is listed. Orders are delivered.',
};

export const HOME_FAQS = [
  {
    question: 'What is A & S Toys?',
    answer:
      'A & S Toys is a Karachi toy shop that sells its own A & S toys online and delivers them across Pakistan. Shop prices are from Rs 300.',
  },
  {
    question: 'How do I order from A & S Toys?',
    answer:
      'Open a product page, add the toy to the bag, and check out, or send a WhatsApp message from the product page. Payment on the website includes cash on delivery.',
  },
  {
    question: 'What does delivery cost?',
    answer:
      'A delivery charge applies. Delivery is free when the order total reaches Rs 3,500. The courier named by the shop is TCS/Leopards.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'The homepage states delivery across Pakistan in 2-5 days.',
  },
  {
    question: 'Can I pay cash on delivery?',
    answer: 'Yes. Payment on the website is cash on delivery. Checkout also lists JazzCash, EasyPaisa, and bank transfer.',
  },
  {
    question: 'What is the return policy?',
    answer: `The exchange note is a ${config.exchangePolicy}.`,
  },
  {
    question: 'What is the price range?',
    answer: 'Shop prices are from Rs 300. The catalog does not use one fixed price for every toy.',
  },
  {
    question: 'Do you list toys by age, such as 2, 3, or 5 years?',
    answer: 'No. The catalog does not give an age range. Check the box for the age grade.',
  },
  {
    question: 'How is A & S Toys different from Daraz?',
    answer:
      'A & S Toys is one Karachi shop selling toys it names A & S, from Rs 300, with delivery across Pakistan. Daraz is a marketplace with many sellers. This site does not rank itself against other shops.',
  },
  {
    question: 'Where is A & S Toys in Karachi?',
    answer: 'A & S Toys is a Karachi-based online shop. No walk-in address is listed. Orders are delivered across Pakistan.',
  },
  {
    question: 'How do I contact A & S Toys?',
    answer: `Call ${config.phone}, WhatsApp ${config.whatsappPhone}, or email ${config.email}.`,
  },
];

export const ORDER_STEPS = [
  'Open the product page for the toy you want.',
  'Add it to the bag and check out, or send the WhatsApp message on the product page.',
  'Pay by cash on delivery, or use JazzCash, EasyPaisa, or bank transfer if you choose those at checkout.',
  'The shop sends the order across Pakistan. Delivery is free when the order total reaches Rs 3,500.',
];
