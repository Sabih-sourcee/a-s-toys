import React from 'react';
import { MessageCircle } from 'lucide-react';
import { config } from '../config';
import { WhatsAppLink } from './WhatsAppLink';

const CLAIM_MESSAGE =
  'Assalam-o-Alaikum! I want to claim a replacement for an item damaged in transit. I will send photos of the item.';

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
            A &amp; S Toys offers a 7-day replacement, counted from delivery, for items damaged in transit.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="font-headline text-lg font-bold text-[#182232]">How to claim</h2>
          <p className="font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            Contact us via{' '}
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
            or WhatsApp at {config.whatsappPhone} with photos of the item, and we send a replacement at no cost.
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
          <h2 className="font-headline text-lg font-bold text-[#182232]">Change of mind</h2>
          <p className="font-body text-sm sm:text-base text-[#211F1C] leading-relaxed">
            No returns for change of mind.
          </p>
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
