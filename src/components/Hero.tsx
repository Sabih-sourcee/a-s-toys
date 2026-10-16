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
      {/* Solid navy wash for type contrast — no soft gradients */}
      <div className="absolute inset-0 bg-[#182232]/40" aria-hidden="true" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <p className="font-headline text-[13px] sm:text-sm font-bold tracking-[0.12em] uppercase text-[#F6F3EC]/90 mb-4">
          A &amp; S Toys
        </p>
        <h1 className="font-headline text-[36px] sm:text-[52px] lg:text-[64px] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#F6F3EC] max-w-3xl">
          Precision play. Built to last.
        </h1>
        <p className="mt-4 font-body text-sm sm:text-base text-[#F6F3EC]/85 max-w-md leading-relaxed">
          Hand-inspected toys from our Karachi shop — beechwood, die-cast, and soft goods that survive siblings.
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
