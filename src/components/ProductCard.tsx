import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isAdded = false,
}) => {
  const isOutOfStock = !product.inStock || product.stock === 0;
  const isTopRated = Boolean(product.isTrending) || product.rating >= 4.7;

  return (
    <article
      className="w-full overflow-hidden rounded-2xl border border-[#EBE5DA] bg-[#FBF9F4] shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
      id={`product-card-${product.id}`}
    >
      {/* Image */}
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="relative h-56 sm:h-64 w-full overflow-hidden cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F3D9C] focus-visible:outline-offset-2"
      >
        <img
          src={product.image}
          alt={product.title}
          className={`h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ${isOutOfStock ? 'opacity-50' : ''}`}
          loading="lazy"
        />

        {/* Top-left tag badge */}
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[#FBF9F4]/85 backdrop-blur-sm px-2.5 py-1 text-[11px] font-body font-semibold text-[#211F1C]">
          {isOutOfStock ? 'Out of stock' : product.discountBadge || product.categoryName}
        </span>

        {/* Top-right rating badge */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#FBF9F4]/85 backdrop-blur-sm px-2.5 py-1 text-[11px] font-body font-semibold text-[#211F1C]">
          <Star className="w-3.5 h-3.5 fill-[#F0A63A] stroke-[#F0A63A]" />
          {product.rating.toFixed(1)}
        </span>
      </button>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3
            onClick={() => onQuickView(product)}
            className="font-headline text-lg font-bold leading-snug line-clamp-1 cursor-pointer text-[#211F1C] hover:text-[#0F3D9C] transition-colors"
            title={product.title}
          >
            {product.title}
          </h3>
          {isTopRated && (
            <span className="shrink-0 inline-flex items-center rounded-full border border-[#EBE5DA] px-2.5 py-0.5 text-[11px] font-body font-semibold text-[#58554F]">
              Top rated
            </span>
          )}
        </div>

        <div className="text-sm text-[#58554F]">
          <span>{product.ageLabel}</span> &bull; <span>{product.categoryName}</span>
        </div>

        <p className="text-sm text-[#58554F] leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex justify-between items-center pt-2">
          <p className="font-headline font-bold text-[#211F1C]">
            Rs. {product.price.toLocaleString()}
            {product.originalPrice && (
              <span className="ml-1.5 text-sm font-normal text-[#58554F] line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </p>

          {isOutOfStock ? (
            <button
              onClick={() => onQuickView(product)}
              disabled
              className="inline-flex items-center gap-1.5 text-sm font-headline font-bold px-4 py-2.5 rounded-full min-h-[44px] bg-[#58554F]/15 text-[#58554F] cursor-not-allowed shrink-0"
            >
              Notify me
            </button>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className={`group inline-flex items-center gap-1.5 text-sm font-headline font-bold px-4 py-2.5 rounded-full min-h-[44px] transition-colors cursor-pointer shrink-0 ${
                isAdded ? 'bg-[#258547] text-white' : 'bg-[#211F1C] hover:bg-[#0F3D9C] text-white'
              }`}
              id={`btn-add-${product.id}`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-2" />
                  Added
                </>
              ) : (
                <>
                  Add to cart
                  <ArrowRight className="w-4 h-4 stroke-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
