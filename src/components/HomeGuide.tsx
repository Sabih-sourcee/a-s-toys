import React from 'react';
import { HOME_FAQS, ORDER_STEPS, SHOP } from '../data/homeFaq';

/** Shop facts, FAQ, and order steps. Rendered on /about. */
export const HomeGuide: React.FC = () => {
  return (
    <section className="border-t border-[#DCD7CC] pt-8" id="shop-facts">
      <h2 className="font-headline text-lg font-bold text-[#182232]">About A &amp; S Toys</h2>
      <div className="mt-3 space-y-2 max-w-3xl text-sm leading-relaxed text-[#211F1C]">
        <p>
          {SHOP.brand} is a {SHOP.city} toy shop. {SHOP.noWalkIn} Prices from {SHOP.priceFrom}.
        </p>
        <p>
          Delivery is {SHOP.deliveryFee}, free over {SHOP.freeOver}, in {SHOP.deliveryTime}, via {SHOP.courier}. {SHOP.payment}
        </p>
        <p>
          {SHOP.returns} Call {SHOP.phone}. WhatsApp {SHOP.whatsapp}. {SHOP.email}.
        </p>
      </div>

      <h2 className="font-headline text-lg font-bold text-[#182232] mt-8">Questions</h2>
      <div className="mt-3 border-t border-[#DCD7CC]">
        {HOME_FAQS.map((faq) => (
          <details key={faq.question} className="border-b border-[#DCD7CC] group">
            <summary className="font-headline text-sm font-bold text-[#182232] cursor-pointer py-3 pr-2 list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span aria-hidden="true" className="text-[#E84A27] font-mono text-xs shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="pb-3 text-sm leading-relaxed text-[#211F1C]">{faq.answer}</p>
          </details>
        ))}
      </div>

      <h2 className="font-headline text-lg font-bold text-[#182232] mt-8">How to order from A &amp; S Toys</h2>
      <ol className="mt-3 list-decimal pl-5 space-y-1.5 text-sm leading-relaxed max-w-3xl">
        {ORDER_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
};
