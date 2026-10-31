import React from 'react';
import { HOME_FAQS, ORDER_STEPS, SHOP } from '../data/homeFaq';

export const HomeGuide: React.FC = () => {
  return (
    <section className="bg-[#F6F3EC] border-t border-[#DCD7CC]" id="shop-facts">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-headline text-[24px] sm:text-[28px] font-extrabold text-[#182232] tracking-[-0.03em]">
          About A &amp; S Toys
        </h2>
        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-[#211F1C]">
          A &amp; S Toys is a Karachi toy shop that sells its own A &amp; S toys online and delivers them across Pakistan.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <dt className="font-headline font-bold">Shop</dt>
            <dd>{SHOP.brand}, {SHOP.city}. {SHOP.noWalkIn}</dd>
          </div>
          <div>
            <dt className="font-headline font-bold">Prices</dt>
            <dd>From {SHOP.priceFrom}.</dd>
          </div>
          <div>
            <dt className="font-headline font-bold">Delivery</dt>
            <dd>{SHOP.deliveryFee}, free over {SHOP.freeOver}, in {SHOP.deliveryTime}, via {SHOP.courier}.</dd>
          </div>
          <div>
            <dt className="font-headline font-bold">Payment</dt>
            <dd>{SHOP.payment}</dd>
          </div>
          <div>
            <dt className="font-headline font-bold">Returns</dt>
            <dd>{SHOP.returns}</dd>
          </div>
          <div>
            <dt className="font-headline font-bold">Contact</dt>
            <dd>Call {SHOP.phone}. WhatsApp {SHOP.whatsapp}. {SHOP.email}</dd>
          </div>
        </dl>
        <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">A &amp; S Toys and other shops</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-[#DCD7CC]">
            <thead className="bg-[#EDE8DD]">
              <tr>
                <th className="text-left p-2">Topic</th>
                <th className="text-left p-2">A &amp; S Toys</th>
                <th className="text-left p-2">Other Pakistan toy shops</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-t border-[#DCD7CC]">Who sells</td>
                <td className="p-2 border-t border-[#DCD7CC]">One Karachi shop. Toys are named A &amp; S.</td>
                <td className="p-2 border-t border-[#DCD7CC]">Daraz and other shops sell toys online. Sellers and prices vary.</td>
              </tr>
              <tr>
                <td className="p-2 border-t border-[#DCD7CC]">Price</td>
                <td className="p-2 border-t border-[#DCD7CC]">From {SHOP.priceFrom}.</td>
                <td className="p-2 border-t border-[#DCD7CC]">Not listed here.</td>
              </tr>
              <tr>
                <td className="p-2 border-t border-[#DCD7CC]">Delivery</td>
                <td className="p-2 border-t border-[#DCD7CC]">{SHOP.deliveryFee}, free over {SHOP.freeOver}, {SHOP.deliveryTime}, {SHOP.courier}.</td>
                <td className="p-2 border-t border-[#DCD7CC]">Not listed here.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">Questions</h2>
        <div className="mt-4 space-y-4">
          {HOME_FAQS.map((faq) => (
            <section key={faq.question}>
              <h3 className="font-headline text-base font-bold text-[#182232]">{faq.question}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#211F1C]">{faq.answer}</p>
            </section>
          ))}
        </div>
        <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">How to order from A &amp; S Toys</h2>
        <ol className="mt-4 list-decimal pl-5 space-y-2 text-sm leading-relaxed">
          {ORDER_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};
