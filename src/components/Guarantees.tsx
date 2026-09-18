import React from 'react';
import { ShieldCheck, Truck, MessageCircle, Banknote } from 'lucide-react';

const ITEMS = [
  { icon: Banknote, title: 'Cash on delivery', body: 'Pay the rider when it arrives.' },
  { icon: Truck, title: 'Free shipping over Rs. 3,500', body: 'Tracked TCS, Leopards & Trax.' },
  { icon: ShieldCheck, title: 'Inspected before packing', body: 'Real photos, no brittle plastics.' },
  { icon: MessageCircle, title: 'WhatsApp video demos', body: 'Ask for a clip from our shop floor.' },
];

export const Guarantees: React.FC = () => {
  return (
    <section className="bg-[#FBF9F4]" id="guarantee">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
        <div className="border-t border-[#211F1C]/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`flex items-start gap-3 py-6 px-0 sm:px-5 ${
                  i > 0 ? 'lg:border-l border-[#211F1C]/15' : ''
                } ${i % 2 === 1 ? 'sm:border-l sm:border-[#211F1C]/15 lg:border-l' : ''}`}
              >
                <item.icon className="w-5 h-5 text-[#C4291F] shrink-0 mt-0.5" strokeWidth={2} />
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#211F1C]">{item.title}</h3>
                  <p className="font-body text-xs text-[#58554F] leading-relaxed mt-0.5">
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
