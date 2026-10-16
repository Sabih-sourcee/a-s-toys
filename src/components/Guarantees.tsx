import React from 'react';
import { ShieldCheck, Truck, MessageCircle, Banknote } from 'lucide-react';

const ITEMS = [
  { icon: Banknote, title: 'Cash on delivery', body: 'Pay the rider when the box opens.' },
  { icon: Truck, title: 'Free shipping over Rs. 3,500', body: 'Tracked TCS, Leopards & Trax.' },
  { icon: ShieldCheck, title: 'Inspected before packing', body: 'Real photos. No brittle plastics.' },
  { icon: MessageCircle, title: 'WhatsApp video demos', body: 'Ask for a clip from the shop floor.' },
];

export const Guarantees: React.FC = () => {
  return (
    <section className="bg-[#F6F3EC]" id="guarantee">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
        <div className="border-t border-[#182232]/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`flex items-start gap-3 py-6 px-0 sm:px-5 ${
                  i > 0 ? 'lg:border-l border-[#182232]/15' : ''
                } ${i % 2 === 1 ? 'sm:border-l sm:border-[#182232]/15 lg:border-l' : ''}`}
              >
                <item.icon aria-hidden="true" className="w-5 h-5 text-[#E84A27] shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#182232]">{item.title}</h3>
                  <p className="font-body text-xs text-[#5A6270] leading-relaxed mt-0.5">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
