import React from 'react';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { productPath } from '../lib/router';

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
  const earlyToys = products.filter((p) => p.category === 'pretend-play');

  return (
    <section className="bg-[#EDE8DD]" id="toddlers">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14">
          <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
            <span className="font-mono text-[11px] font-medium text-[#E84A27] tracking-[0.05em] uppercase">
              Pretend play
            </span>
            <h2 className="font-headline text-[24px] sm:text-[28px] font-extrabold text-[#182232] leading-[1.08] tracking-[-0.03em]">
              Kitchens and dispensers
            </h2>
            <p className="font-body text-sm text-[#5A6270] leading-relaxed max-w-xs">
              Toy kitchens and water dispensers from the catalog. Check each box for the age grade.
            </p>
            <a
              href="/category/pretend-play"
              onClick={(event) => {
                event.preventDefault();
                onExploreBabyToys();
              }}
              className="inline-flex items-center gap-1.5 text-sm font-headline font-bold text-[#182232] hover:text-[#E84A27] transition-colors cursor-pointer mt-1 min-h-[44px]"
              id="btn-see-all-pretend-play"
            >
              See all pretend play
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>

          <div className="flex min-w-0 max-w-full gap-0 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory border border-[#DCD7CC]">
            {earlyToys.map((toy) => {
              const isAdded = addedProductIds.includes(toy.id);
              const href = productPath(toy.slug);
              const open = (event: React.MouseEvent) => {
                event.preventDefault();
                onQuickView(toy);
              };
              return (
                <div
                  key={toy.id}
                  className="shrink-0 w-40 sm:w-44 snap-start flex flex-col border-r border-[#DCD7CC] p-3 bg-[#F6F3EC]"
                >
                  <a
                    href={href}
                    onClick={open}
                    className="w-full aspect-square bg-[#EAE5D9] p-3 mb-2 overflow-hidden cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#182232]"
                  >
                    <img src={toy.image} alt={toy.title} className="w-full h-full object-contain" loading="lazy" />
                  </a>
                  {toy.ageLabel ? (
                    <span className="spec-stamp self-start mb-1.5 text-[9px]">{toy.ageLabel}</span>
                  ) : null}
                  <h3 className="font-headline text-xs sm:text-sm font-bold text-[#182232] line-clamp-2 min-h-[2.2rem]">
                    <a href={href} onClick={open} className="hover:text-[#E84A27]">
                      {toy.title}
                    </a>
                  </h3>
                  <p className="font-headline text-sm font-bold text-[#E84A27] mt-0.5 mb-2">
                    Rs. {toy.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => onAddToCart(toy)}
                    className={`text-xs font-headline font-bold px-3 py-2 rounded-[6px] min-h-[40px] inline-flex items-center justify-center gap-1 cursor-pointer border-[1.5px] border-[#182232] ${
                      isAdded
                        ? 'bg-[#182232] text-[#F6F3EC]'
                        : 'bg-[#E84A27] text-[#F6F3EC] shadow-[0px_2px_0px_#182232] hover:translate-y-[1px] hover:shadow-[0px_1px_0px_#182232]'
                    }`}
                    id={`btn-early-add-${toy.id}`}
                  >
                    {isAdded ? (
                      <>
                        <Check aria-hidden="true" className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus aria-hidden="true" className="w-3.5 h-3.5" />
                        Add to bag
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
