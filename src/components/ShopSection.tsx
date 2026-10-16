import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ShopSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  addedProductIds: string[];
}

const AGE_FILTERS = [
  { label: 'All ages', value: 'all' },
  { label: '0–2', value: '0-12m' },
  { label: '1–3', value: '1-3y' },
  { label: '3–5', value: '3-5y' },
  { label: '6–9', value: '6-8y' },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price ↑', value: 'price-low' },
  { label: 'Price ↓', value: 'price-high' },
  { label: 'Top rated', value: 'rating' },
];

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  addedProductIds,
}) => {
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedAge !== 'all' && p.ageRange !== selectedAge) return false;
      if (onlyInStock && (!p.inStock || p.stock <= 0)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCat = p.categoryName.toLowerCase().includes(q);
        const matchDesc = p.shortDescription.toLowerCase().includes(q);
        const matchAge = p.ageLabel.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchDesc && !matchAge) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [products, selectedCategory, selectedAge, onlyInStock, searchQuery, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedAge('all');
    setSortBy('featured');
    setOnlyInStock(false);
    onSearchChange('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedAge !== 'all' ||
    onlyInStock ||
    searchQuery.trim() !== '';

  const filterChip = (active: boolean) =>
    `px-3.5 py-2 rounded-[6px] text-xs font-headline font-bold whitespace-nowrap transition-colors cursor-pointer border-[1.5px] ${
      active
        ? 'bg-[#E84A27] text-[#F6F3EC] border-[#182232] shadow-[0px_2px_0px_#182232]'
        : 'bg-[#F6F3EC] text-[#5A6270] border-[#DCD7CC] hover:border-[#182232] hover:text-[#182232]'
    }`;

  const navChip = (active: boolean) =>
    `px-3.5 py-2 rounded-[6px] text-xs font-headline font-bold whitespace-nowrap transition-colors cursor-pointer border-[1.5px] inline-flex items-center gap-1.5 ${
      active
        ? 'bg-[#182232] text-[#F6F3EC] border-[#182232]'
        : 'bg-[#F6F3EC] text-[#5A6270] border-[#DCD7CC] hover:border-[#182232] hover:text-[#182232]'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="shop-catalog">
      <div className="border-[1.5px] border-[#182232] rounded-[6px] bg-[#F6F3EC] p-6 sm:p-8 mb-8 shadow-[0px_3px_0px_#182232]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="spec-stamp mb-3">Catalog · Karachi QA</span>
            <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#182232] tracking-[-0.03em] mt-3">
              Shop by age, material &amp; build.
            </h1>
            <p className="font-body text-sm sm:text-base text-[#5A6270] mt-2 max-w-2xl">
              Every piece inspected on our Karachi floor — smooth edges, safe dyes, cash on delivery nationwide.
            </p>
          </div>

          <div className="w-full md:w-80 relative">
            <label htmlFor="shop-search-input" className="sr-only">Search toys by name, material, or type</label>
            <Search aria-hidden="true" className="w-4 h-4 text-[#5A6270] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search beechwood, die-cast…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-11 pl-10 pr-9 bg-[#EDE8DD] border-[1.5px] border-[#182232] rounded-[6px] text-xs sm:text-sm font-body text-[#182232] focus:border-[#E84A27] outline-none"
              id="shop-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-[#5A6270] hover:text-[#182232] cursor-pointer"
                aria-label="Clear search"
              >
                <X aria-hidden="true" className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#DCD7CC] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={navChip(selectedCategory === 'all')}
            id="cat-pill-all"
          >
            All ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={navChip(isSelected)}
                id={`cat-pill-${cat.slug}`}
              >
                <span>{cat.name}</span>
                <span className="font-mono text-[10px] tracking-wider opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#EDE8DD] p-4 rounded-[6px] border border-[#DCD7CC]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] font-medium text-[#5A6270] tracking-[0.05em] uppercase mr-1 hidden sm:inline">
              Shop by age
            </span>
            {AGE_FILTERS.map((age) => (
              <button
                key={age.value}
                onClick={() => setSelectedAge(age.value)}
                className={filterChip(selectedAge === age.value)}
                id={`age-pill-${age.value}`}
              >
                {age.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-headline font-bold text-[#182232]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#182232] accent-[#E84A27] cursor-pointer"
                id="toggle-in-stock"
              />
              <span className="hidden sm:inline">In stock</span>
              <span className="sm:hidden">Stock</span>
            </label>

            <div className="flex items-center gap-1.5">
              <SlidersHorizontal aria-hidden="true" className="w-3.5 h-3.5 text-[#5A6270]" />
              <label htmlFor="shop-sort-select" className="sr-only">Sort toys by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 bg-[#F6F3EC] border-[1.5px] border-[#182232] rounded-[6px] px-3 text-xs font-headline font-bold text-[#182232] outline-none cursor-pointer"
                id="shop-sort-select"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-medium text-[#182232] tracking-[0.05em] uppercase">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'set' : 'sets'}
            </span>
            <span className="text-xs text-[#5A6270] font-body">· COD across Pakistan</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-headline font-bold text-[#E84A27] hover:underline flex items-center gap-1 cursor-pointer"
              id="btn-reset-filters"
            >
              <RotateCcw aria-hidden="true" className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="blueprint-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 sm:p-5 bg-[#F6F3EC]">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isAdded={addedProductIds.includes(product.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="border-[1.5px] border-[#182232] rounded-[6px] bg-[#F6F3EC] p-12 text-center my-8 shadow-[0px_3px_0px_#182232]">
            <span className="spec-stamp mb-4">0 results</span>
            <h3 className="font-headline text-xl font-extrabold text-[#182232] mt-4">
              Nothing matches these filters
            </h3>
            <p className="font-body text-sm text-[#5A6270] mt-2 max-w-md mx-auto">
              Clear age or category, or search a material — beechwood, die-cast, plush.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 btn-primary px-6 py-2.5 cursor-pointer"
            >
              Show all toys
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
