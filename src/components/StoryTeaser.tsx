import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WaveDivider } from './WaveDivider';

interface StoryTeaserProps {
  onAboutClick: () => void;
  onShopClick: () => void;
}

export const StoryTeaser: React.FC<StoryTeaserProps> = ({ onAboutClick, onShopClick }) => {
  return (
    <section id="about-teaser">
      <WaveDivider variant="deep-on-ivory" />
      <div className="bg-[#0A2B70] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute top-3 left-3 w-full h-full border-2 border-[#F0A63A] rounded-lg hidden sm:block" aria-hidden="true" />
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1WbXAtmQrMhjeZX5UdpSLg8MdVF_qKx6Rz3UuhYUwKhqjtE7CgMKTH_0XhyWSUEhEpHuObmP5YbOUyjrylSStA60nNykroTHkhXxTj_87MK8T1zYeY9Hj-jV8umu-HjXMd2ByPlSnhw68kkAyTVTa6s-TAvk4VWEislhCYszgpYznuwXH1HhofzjnF9vjDrvP9hS8zuFJe5EnEgWfxUYHNU2bNGm5y0XJtoNccO-6RZvUtH5PuMWEg4DNE"
                  alt="Toys on display at A and S Toys Lahore shop"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 order-1 lg:order-2">
              <span className="text-[11px] font-body font-bold text-[#F0A63A] tracking-[0.15em] uppercase">
                Our story
              </span>
              <h2 className="font-headline text-[24px] sm:text-[30px] font-bold text-white leading-tight">
                Born from a Lahore toy shop
              </h2>
              <p className="font-body text-base text-[#DBE4FA] leading-relaxed max-w-lg">
                We started as a walk-in shop in Gulberg III — handpicking toys parents can trust.
                Now the same shelves ship nationwide with cash on delivery, WhatsApp demos, and
                real stock photos. No brittle plastics. No fake reviews.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={onAboutClick}
                  className="btn-on-dark px-6 py-3 inline-flex items-center gap-2 cursor-pointer"
                  id="btn-story-about"
                >
                  Our shop story
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onShopClick}
                  className="text-white font-headline text-sm font-bold underline underline-offset-4 decoration-white/40 hover:decoration-white cursor-pointer min-h-[44px] px-2"
                >
                  Browse toys
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WaveDivider variant="ivory-on-deep" />
    </section>
  );
};
