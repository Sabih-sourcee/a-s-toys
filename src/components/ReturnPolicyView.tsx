import React from 'react';
import { MessageCircle } from 'lucide-react';
import { config } from '../config';
import { WhatsAppLink } from './WhatsAppLink';

const CLAIM_MESSAGE =
  'Assalam-o-Alaikum! I want to claim a return or replacement within 7 days of delivery. The item is different from my order, or it arrived with significant damage. I will send photos on WhatsApp.';

interface ReturnPolicyViewProps {
  onOpenContact: () => void;
}

export const ReturnPolicyView: React.FC<ReturnPolicyViewProps> = ({ onOpenContact }) => {
  const delivery = Number(config.deliveryCharges).toLocaleString('en-PK');
  const freeOver = Number(config.freeShippingOver).toLocaleString('en-PK');

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="return-policy">
      <div className="bg-[#F6F3EC] rounded-[6px] border border-[#DCD7CC] p-6 sm:p-12 space-y-8">
        <header className="max-w-2xl">
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#182232] tracking-tight">
            Return &amp; Replacement Policy
          </h1>
          <p className="font-body text-base text-[#5A6270] mt-3 leading-relaxed">
            A &amp; S Toys accepts a return or replacement only in the two cases below. The claim window is 7 days, counted from delivery.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-headline text-lg font-bold text-[#182232]">When a return or replacement is accepted</h2>
          <ol className="list-decimal pl-5 space-y-2 font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            <li>The item received is different from what was ordered.</li>
            <li>
              The item arrived with significant damage, such as cracked or broken pieces. For example, cracked blocks in a block set.
            </li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline text-lg font-bold text-[#182232]">What is not eligible</h2>
          <p className="font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            Minor cosmetic damage, such as small scratches, scuffs, or box dents, is not eligible. There are no returns for change of mind.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline text-lg font-bold text-[#182232]">How to claim</h2>
          <p className="font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            Within 7 days of delivery, contact us via{' '}
            <a
              href="/contact"
              onClick={(event) => {
                event.preventDefault();
                onOpenContact();
              }}
              className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
            >
              usmanitoys.com
            </a>{' '}
            or send photos of the item on WhatsApp at {config.whatsappPhone}.
          </p>
          <WhatsAppLink
            message={CLAIM_MESSAGE}
            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-xs font-bold px-4 py-2.5 rounded-[6px]"
          >
            <MessageCircle aria-hidden="true" className="w-4 h-4 fill-white" />
            <span>WhatsApp {config.whatsappPhone}</span>
          </WhatsAppLink>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline text-lg font-bold text-[#182232]">Payment</h2>
          <p className="font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            Payment is cash on delivery, JazzCash, EasyPaisa, or bank transfer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-headline text-lg font-bold text-[#182232]">Shipping</h2>
          <p className="font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            Delivery is Rs {delivery} across Pakistan, and it is free on orders of Rs {freeOver} or more.
            Delivery takes 2-5 business days via TCS or Leopards.
          </p>
        </section>
      </div>
    </article>
  );
};
