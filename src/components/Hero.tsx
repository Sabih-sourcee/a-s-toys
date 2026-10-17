import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onExploreAgeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative w-full h-screen min-h-[560px] overflow-hidden" id="hero">
      <img
        src="/images/hero-shop-joy.png"
        alt="A child holding a colorful toy in a bright, open green landscape under a blue sky"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#182232]/50" aria-hidden="true" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <p className="font-headline text-[42px] sm:text-[64px] lg:text-[80px] font-extrabold tracking-[-0.04em] leading-[0.95] text-[#F6F3EC] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
          A &amp; S Toys
        </p>
        <h1 className="mt-4 sm:mt-5 font-headline text-[22px] sm:text-[32px] lg:text-[40px] font-bold tracking-[-0.02em] leading-[1.15] text-[#F6F3EC] max-w-3xl">
          Precision play. Built to last.
        </h1>
        <p className="mt-4 font-body text-sm sm:text-base text-[#F6F3EC]/90 max-w-md leading-relaxed">
          A Karachi-based online toy store. Beechwood, die-cast, and soft goods, delivered nationwide.
        </p>

        <button
          onClick={onShopClick}
          className="mt-8 btn-urgency px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer text-base"
          id="hero-shop-all-btn"
        >
          <span>Shop the catalog</span>
          <ArrowRight aria-hidden="true" className="w-4 h-4 stroke-2" />
        </button>
      </div>
    </section>
  );
};
