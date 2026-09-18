import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Sparkles, Filter, X } from 'lucide-react';
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
  { label: 'All Ages', value: 'all' },
  { label: '0–12 Months', value: '0-12m' },
  { label: '1–3 Years', value: '1-3y' },
  { label: '3–5 Years', value: '3-5y' },
  { label: '6–8 Years', value: '6-8y' },
];

const SORT_OPTIONS = [
  { label: 'Featured & Trending', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Highest Rated (4.8+)', value: 'rating' },
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Age filter
      if (selectedAge !== 'all' && p.ageRange !== selectedAge) {
        return false;
      }
      // In stock
      if (onlyInStock && (!p.inStock || p.stock <= 0)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCat = p.categoryName.toLowerCase().includes(q);
        const matchDesc = p.shortDescription.toLowerCase().includes(q);
        const matchAge = p.ageLabel.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchDesc && !matchAge) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured/trending first
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="shop-catalog">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#EBE5DA] p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F4EFE6] text-[#0F3D9C] px-3 py-1 rounded-full text-xs font-headline font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Handpicked Catalog</span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1D1B18] tracking-tight">
              Explore All Toys &amp; Curated Collections
            </h1>
            <p className="font-body text-sm sm:text-base text-[#58554F] mt-1 max-w-2xl">
              Every toy is physical-store inspected in Lahore with zero sharp burrs, safe waterborne dyes, and quick Cash on Delivery nationwide.
            </p>
          </div>

          {/* Quick Search inside Shop */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#58554F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, wood, car..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-[#FBF9F4] border border-[#EBE5DA] rounded-full text-xs sm:text-sm font-body text-[#1D1B18] focus:border-[#0F3D9C] focus:bg-white outline-none transition-all"
              id="shop-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scrolling) */}
        <div className="mt-6 pt-6 border-t border-[#EBE5DA] flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-headline font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0F3D9C] text-white shadow-xs'
                : 'bg-[#F4EFE6] text-[#58554F] hover:bg-[#EBE5DA] hover:text-[#0F3D9C]'
            }`}
            id="cat-pill-all"
          >
            All Toys ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-headline font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0F3D9C] text-white shadow-xs'
                    : 'bg-[#F4EFE6] text-[#58554F] hover:bg-[#EBE5DA] hover:text-[#0F3D9C]'
                }`}
                id={`cat-pill-${cat.slug}`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#58554F]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Filters Bar & Product Grid */}
      <div className="space-y-6">
        {/* Controls Bar: Age Filter, Stock Toggle, Sorting & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#EBE5DA] shadow-xs">
          
          {/* Age Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-headline font-bold text-[#58554F] mr-1 hidden sm:inline">
              Filter by Age:
            </span>
            {AGE_FILTERS.map((age) => (
              <button
                key={age.value}
                onClick={() => setSelectedAge(age.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-headline font-bold transition-colors cursor-pointer ${
                  selectedAge === age.value
                    ? 'bg-[#C4291F] text-white shadow-xs'
                    : 'bg-[#FBF9F4] text-[#58554F] hover:bg-[#F4EFE6] border border-[#EBE5DA]'
                }`}
                id={`age-pill-${age.value}`}
              >
                {age.label}
              </button>
            ))}
          </div>

          {/* Right Side Controls: In Stock & Sorting */}
          <div className="flex items-center gap-3 ml-auto">
            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-headline font-bold text-[#1D1B18]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-[#0F3D9C] accent-[#0F3D9C] cursor-pointer"
                id="toggle-in-stock"
              />
              <span className="hidden sm:inline">In Stock Only</span>
              <span className="sm:hidden">In Stock</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#58554F]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FBF9F4] border border-[#EBE5DA] rounded-full px-3 py-1.5 text-xs font-headline font-bold text-[#1D1B18] outline-none cursor-pointer focus:border-[#0F3D9C]"
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

        {/* Results Counter & Active Tag Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="font-headline text-sm font-bold text-[#1D1B18]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'toy' : 'toys'}
            </span>
            <span className="text-xs text-[#58554F] font-body">
              • Cash on Delivery across Pakistan
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-headline font-bold text-[#C4291F] hover:underline flex items-center gap-1 cursor-pointer"
              id="btn-reset-filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isAdded={addedProductIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#EBE5DA] p-12 text-center my-8 shadow-xs">
            <div className="w-16 h-16 bg-[#F4EFE6] text-[#0F3D9C] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-xl font-bold text-[#1D1B18]">
              No toys found matching your criteria
            </h3>
            <p className="font-body text-sm text-[#58554F] mt-2 max-w-md mx-auto">
              Try adjusting your category or age group filter, or clear your search query to see all 18+ handpicked toys.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 bg-[#0F3D9C] hover:bg-[#0A2B70] text-white font-headline text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
            >
              Show All Toys
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
