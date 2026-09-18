import React from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isAdded?: boolean;
  /** light = ivory page; dark = deep-blue band */
  variant?: 'light' | 'dark';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isAdded = false,
  variant = 'light',
}) => {
  const isOutOfStock = !product.inStock || product.stock === 0;
  const isDark = variant === 'dark';

  const badgeClass =
    product.badgeType === 'sale' || product.originalPrice
      ? 'bg-[#F0A63A] text-[#211F1C]'
      : product.badgeType === 'new'
      ? 'bg-[#C4291F] text-white'
      : 'bg-[#C4291F] text-white';

  return (
    <article
      className="flex flex-col group"
      id={`product-card-${product.id}`}
    >
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className={`relative aspect-square rounded-xl overflow-hidden p-3 mb-3 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          isDark
            ? 'bg-[#FBF9F4] focus-visible:outline-white'
            : 'bg-white border border-[#EBE5DA] focus-visible:outline-[#0F3D9C]'
        } ${isOutOfStock ? 'opacity-60' : ''}`}
      >
        {product.discountBadge && !isOutOfStock && (
          <span
            className={`absolute top-2.5 left-2.5 text-[10px] font-headline font-bold px-2 py-0.5 rounded-full z-10 ${badgeClass}`}
          >
            {product.discountBadge}
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-2.5 left-2.5 text-[10px] font-headline font-bold px-2 py-0.5 rounded-full z-10 bg-[#58554F] text-white">
            Out of stock
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </button>

      <h3
        onClick={() => onQuickView(product)}
        className={`font-headline text-sm sm:text-base font-bold leading-snug line-clamp-2 min-h-[2.5rem] cursor-pointer ${
          isDark ? 'text-white hover:text-[#F0A63A]' : 'text-[#211F1C] hover:text-[#0F3D9C]'
        }`}
        title={product.title}
      >
        {product.title}
      </h3>

      <div className="mt-1.5 flex items-baseline gap-2 flex-wrap">
        <span
          className={`font-headline text-base font-bold ${
            isDark ? 'text-[#F0A63A]' : product.originalPrice ? 'text-[#C4291F]' : 'text-[#0F3D9C]'
          }`}
        >
          Rs. {product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span
            className={`text-xs line-through ${isDark ? 'text-[#DBE4FA]/70' : 'text-[#58554F]'}`}
          >
            Rs. {product.originalPrice.toLocaleString()}
          </span>
        )}
      </div>

      <div className="mt-3">
        {isOutOfStock ? (
          <button
            onClick={() => onQuickView(product)}
            disabled
            className="w-full text-xs font-headline font-bold px-3 py-2.5 rounded-full min-h-[44px] bg-[#58554F]/30 text-[#58554F] cursor-not-allowed"
          >
            Out of stock
          </button>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full text-xs font-headline font-bold px-3 py-2.5 rounded-full min-h-[44px] transition-colors flex items-center justify-center gap-1 cursor-pointer ${
              isAdded
                ? 'bg-[#258547] text-white'
                : isDark
                ? 'bg-white text-[#0F3D9C] hover:bg-[#FBF9F4]'
                : 'bg-[#0F3D9C] hover:bg-[#0A2B70] text-white'
            }`}
            id={`btn-add-${product.id}`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-2" />
                Added
              </>
            ) : (
              <>
                Add to cart
                <Plus className="w-3.5 h-3.5 stroke-2" />
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
};
