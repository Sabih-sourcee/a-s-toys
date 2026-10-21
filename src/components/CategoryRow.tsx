import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { categoryPath } from '../lib/router';

interface CategoryRowProps {
  onSelectCategory: (categorySlug: string) => void;
  onViewAll: () => void;
  selectedCategory?: string;
}

const CARD_TAG: Record<string, string> = {
  'building-blocks': 'Blocks',
  'pretend-play': 'Pretend',
  'dolls-figures': 'Figures',
  vehicles: 'Vehicles',
  'bubble-water': 'Outdoor',
  'gadgets-music': 'Gadgets',
  games: 'Games',
};

export const CategoryRow: React.FC<CategoryRowProps> = ({
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section className="bg-[#F6F3EC]" id="categories-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div>
            <h2 className="font-headline text-[26px] sm:text-[32px] font-extrabold text-[#182232] tracking-[-0.03em]">
              Shop by type.
            </h2>
            <p className="font-body text-sm text-[#5A6270] mt-1.5 max-w-md">
              {CATEGORIES.length} collections from a Karachi-based online store. Pick a type and see everything in it.
            </p>
          </div>
          <a
            href="/shop"
            onClick={(event) => {
              event.preventDefault();
              onViewAll();
            }}
            className="hidden sm:inline-flex text-sm font-headline font-bold text-[#182232] hover:text-[#E84A27] transition-colors items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px]"
            id="btn-view-all-collections"
          >
            Shop all
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </div>

        <div className="blueprint-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const tag = CARD_TAG[cat.slug] ?? 'Collection';
            return (
              <a
                key={cat.id}
                href={categoryPath(cat.slug)}
                onClick={(event) => {
                  event.preventDefault();
                  onSelectCategory(cat.slug);
                }}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer text-left bg-[#EAE5D9] block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#182232] focus-visible:outline-offset-[-2px]"
                id={`cat-card-${cat.slug}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#182232]/90 via-[#182232]/50 to-transparent sm:h-28"
                  aria-hidden="true"
                />

                <span className="spec-stamp absolute top-3 left-3 z-10">
                  {tag}
                  <span aria-hidden="true">|</span>
                  {PRODUCTS.filter((product) => product.category === cat.slug).length} PCS
                </span>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex items-end justify-between gap-3">
                  <h3 className="font-headline text-lg sm:text-xl font-extrabold text-[#F6F3EC] leading-tight tracking-[-0.02em]">
                    {cat.name}
                  </h3>
                  <span className="shrink-0 w-9 h-9 rounded-[6px] bg-[#F6F3EC] text-[#182232] border-[1.5px] border-[#182232] shadow-[0px_2px_0px_#182232] flex items-center justify-center group-hover:bg-[#E84A27] group-hover:text-[#F6F3EC] transition-colors">
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden">
          <button
            onClick={onViewAll}
            className="btn-secondary w-full py-3 cursor-pointer"
            id="btn-view-all-collections-mobile"
          >
            Shop all collections
          </button>
        </div>
      </div>
    </section>
  );
};
