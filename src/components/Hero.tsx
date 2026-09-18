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
      {/* Contrast wash so bold white type stays readable over the sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2B70]/35 via-transparent to-[#0A2B70]/45" aria-hidden="true" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="font-headline text-[36px] sm:text-[52px] lg:text-[64px] font-bold tracking-tight leading-[1.05] text-white max-w-3xl [text-shadow:0_2px_18px_rgba(10,43,112,0.45)]">
          Shop joy with your mobile.
        </h1>

        <button
          onClick={onShopClick}
          className="mt-8 btn-urgency px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer text-base"
          id="hero-shop-all-btn"
        >
          <span>Shop now</span>
          <ArrowRight className="w-4 h-4 stroke-2" />
        </button>
      </div>

    </section>
  );
};
