import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryRowProps {
  onSelectCategory: (categorySlug: string) => void;
  onViewAll: () => void;
  selectedCategory?: string;
}

/** Per-category tag + gradient wash, built from A&S brand tokens (not random colors) */
const CARD_STYLE: Record<string, { tag: string; from: string; to: string }> = {
  'soft-dolls': { tag: 'Cuddly', from: 'rgba(196,41,31,0.55)', to: 'rgba(196,41,31,0.05)' },
  'die-cast': { tag: 'Fast', from: 'rgba(15,61,156,0.6)', to: 'rgba(15,61,156,0.05)' },
  'wooden-montessori': { tag: 'Learning', from: 'rgba(37,133,71,0.55)', to: 'rgba(37,133,71,0.05)' },
  'arts-craft': { tag: 'Creative', from: 'rgba(240,166,58,0.6)', to: 'rgba(240,166,58,0.05)' },
  'puzzles-brains': { tag: 'Brainy', from: 'rgba(10,43,112,0.6)', to: 'rgba(10,43,112,0.05)' },
  'baby-toddler': { tag: 'Gentle', from: 'rgba(196,41,31,0.5)', to: 'rgba(196,41,31,0.05)' },
};

export const CategoryRow: React.FC<CategoryRowProps> = ({
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section className="bg-[#FBF9F4]" id="categories-section">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div>
            <h2 className="font-headline text-[26px] sm:text-[32px] font-bold text-[#211F1C]">
              Browse by play style.
            </h2>
            <p className="font-body text-sm text-[#58554F] mt-1.5 max-w-md">
              Six ways to shop our shelves — pick a style, see everything in it.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:inline-flex text-sm font-headline font-bold text-[#0F3D9C] hover:text-[#C4291F] transition-colors items-center gap-1 cursor-pointer whitespace-nowrap min-h-[44px]"
            id="btn-view-all-collections"
          >
            Shop all
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const style = CARD_STYLE[cat.slug] ?? CARD_STYLE['die-cast'];
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F3D9C] focus-visible:outline-offset-2"
                id={`cat-card-${cat.slug}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${style.from}, ${style.to} 55%, transparent 75%)` }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" aria-hidden="true" />

                <span className="absolute top-4 left-4 text-[10px] font-body font-bold text-white/90 uppercase tracking-[0.15em]">
                  {style.tag}
                </span>
                <span className="absolute top-4 right-4 text-[11px] font-body font-bold text-white/80">
                  {cat.itemCount} items
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-white leading-tight">
                    {cat.name}
                  </h3>
                  <span className="shrink-0 w-9 h-9 rounded-full bg-white text-[#0F3D9C] flex items-center justify-center group-hover:bg-[#F0A63A] group-hover:text-[#211F1C] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
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
