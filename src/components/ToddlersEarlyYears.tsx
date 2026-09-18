import React from 'react';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ToddlersEarlyYearsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onExploreBabyToys: () => void;
  addedProductIds: string[];
}

export const ToddlersEarlyYears: React.FC<ToddlersEarlyYearsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onExploreBabyToys,
  addedProductIds,
}) => {
  const earlyToys = products.filter((p) => p.isEarlyYears);

  return (
    <section className="bg-[#F4EFE6]" id="toddlers">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14">
          {/* Left — intro copy, not centered */}
          <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
            <span className="text-[11px] font-body font-bold text-[#C4291F] tracking-[0.15em] uppercase">
              Ages 0–3
            </span>
            <h2 className="font-headline text-[24px] sm:text-[28px] font-bold text-[#211F1C] leading-tight">
              For the youngest hands
            </h2>
            <p className="font-body text-sm text-[#58554F] leading-relaxed max-w-xs">
              Extra-smooth edges, chunky graspable shapes, zero small choking parts.
            </p>
            <button
              onClick={onExploreBabyToys}
              className="inline-flex items-center gap-1.5 text-sm font-headline font-bold text-[#0F3D9C] hover:text-[#C4291F] transition-colors cursor-pointer mt-1 min-h-[44px]"
              id="btn-see-all-baby-toys"
            >
              See all baby toys
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right — horizontal scroll strip, distinct rhythm from the picks grid */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-thin">
            {earlyToys.map((toy) => {
              const isAdded = addedProductIds.includes(toy.id);
              return (
                <div
                  key={toy.id}
                  className="shrink-0 w-40 sm:w-44 snap-start flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => onQuickView(toy)}
                    className="w-full aspect-square rounded-lg bg-white border border-[#EBE5DA] p-3 mb-2 overflow-hidden cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F3D9C]"
                  >
                    <img src={toy.image} alt={toy.title} className="w-full h-full object-contain" loading="lazy" />
                  </button>
                  <h3 className="font-headline text-xs sm:text-sm font-bold text-[#211F1C] line-clamp-2 min-h-[2.2rem]">
                    {toy.title}
                  </h3>
                  <p className="font-headline text-sm font-bold text-[#0F3D9C] mt-0.5 mb-2">
                    Rs. {toy.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => onAddToCart(toy)}
                    className={`text-xs font-headline font-bold px-3 py-2 rounded-full min-h-[40px] inline-flex items-center justify-center gap-1 cursor-pointer ${
                      isAdded ? 'bg-[#258547] text-white' : 'bg-[#0F3D9C] hover:bg-[#0A2B70] text-white'
                    }`}
                    id={`btn-early-add-${toy.id}`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
