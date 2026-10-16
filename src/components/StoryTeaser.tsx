import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StoryTeaserProps {
  onAboutClick: () => void;
  onShopClick: () => void;
}

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ onAboutClick, onShopClick }) => {
  return (
    <section id="about-teaser" className="bg-[#182232] text-[#F6F3EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute top-3 left-3 w-full h-full border-[1.5px] border-[#E84A27] rounded-[6px] hidden sm:block" aria-hidden="true" />
            <div className="relative rounded-[6px] overflow-hidden border-[1.5px] border-[#F6F3EC]/20">
              <img
                src="/images/karachi-shop-floor.png"
                alt="Toys on display at A and S Toys Karachi shop"
                className="w-full h-56 sm:h-72 lg:h-80 object-cover object-center"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 order-1 lg:order-2">
            <span className="font-mono text-[11px] font-medium text-[#E84A27] tracking-[0.05em] uppercase">
              Shop floor · Tariq Road
            </span>
            <h2 className="font-headline text-[22px] sm:text-[26px] lg:text-[30px] font-extrabold text-[#F6F3EC] leading-[1.08] tracking-[-0.03em]">
              Born from a Karachi toy shop
            </h2>
            <p className="font-body text-sm sm:text-base text-[#C8CFD8] leading-relaxed max-w-lg">
              We started as a walk-in shop on Tariq Road — handpicking toys parents can trust.
              Same shelves now ship nationwide with cash on delivery, WhatsApp demos, and
              real stock photos. No brittle plastics. No fake reviews.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={onAboutClick}
                className="btn-on-dark px-6 py-3 inline-flex items-center gap-2 cursor-pointer"
                id="btn-story-about"
              >
                Our shop story
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </button>
              <button
                onClick={onShopClick}
                className="text-[#F6F3EC] font-headline text-sm font-bold underline underline-offset-4 decoration-[#F6F3EC]/40 hover:decoration-[#F6F3EC] cursor-pointer min-h-[44px] px-2"
              >
                Browse the catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
