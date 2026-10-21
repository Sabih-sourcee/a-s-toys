import React from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../types';
import { productPath } from '../lib/router';

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
  const ageStamp = product.ageLabel
    ? product.ageLabel.replace(/^Ages?\s*/i, 'AGE ')
    : null;
  const materialHint = product.materials
    ? product.materials.split(/[,;\s]+/)[0].trim().slice(0, 18).toUpperCase()
    : null;
  const stampLabel = isOutOfStock
    ? 'OUT'
    : ageStamp || product.categoryName.toUpperCase();
  const href = productPath(product.slug);
  const open = (event: React.MouseEvent) => {
    event.preventDefault();
    onQuickView(product);
  };

  return (
    <article className="group w-full flex flex-col" id={`product-card-${product.id}`}>
      <a
        href={href}
        onClick={open}
        className="relative aspect-square w-full overflow-hidden bg-[#EAE5D9] cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#182232] focus-visible:outline-offset-2"
      >
        <img
          src={product.image}
          alt={product.title}
          className={`h-full w-full object-cover wide:object-contain wide:p-5 ${isOutOfStock ? 'opacity-45' : ''}`}
          loading="lazy"
        />

        <span className="spec-stamp absolute top-2.5 left-2.5 z-10">
          {stampLabel}
          {materialHint && !isOutOfStock && ageStamp && (
            <>
              <span aria-hidden="true">|</span>
              {materialHint}
            </>
          )}
        </span>

        {!isOutOfStock && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }
            }}
            aria-label={isAdded ? `${product.title} added to bag` : `Add ${product.title} to bag`}
            className={`absolute bottom-2.5 right-2.5 inline-flex items-center justify-center w-10 h-10 rounded-[6px] border-[1.5px] border-[#182232] transition-all cursor-pointer wide:opacity-0 wide:translate-y-1 wide:group-hover:opacity-100 wide:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#182232] focus-visible:outline-offset-2 ${
              isAdded
                ? 'bg-[#182232] text-[#F6F3EC] shadow-[0px_2px_0px_#182232]'
                : 'bg-[#E84A27] text-[#F6F3EC] shadow-[0px_3px_0px_#182232] hover:translate-y-[2px] hover:shadow-[0px_1px_0px_#182232]'
            }`}
          >
            {isAdded ? (
              <Check aria-hidden="true" className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus aria-hidden="true" className="w-4 h-4 stroke-[2.5]" />
            )}
          </span>
        )}
      </a>

      <div className="pt-2 px-0.5 sm:pt-3 sm:px-1 flex flex-col gap-1 wide:gap-1.5">
        <h3 className="text-xs sm:text-[13px] font-headline font-bold uppercase tracking-wide leading-snug line-clamp-2 min-h-[2.2em] text-[#182232]" title={product.title}>
          <a href={href} onClick={open} className="hover:text-[#E84A27] transition-colors">
            {product.title}
          </a>
        </h3>

        <p className="text-sm font-headline font-bold text-[#E84A27]">
          {isOutOfStock ? (
            <span className="font-medium text-[#5A6270]">Out of stock</span>
          ) : (
            <>
              Rs. {product.price.toLocaleString()}
              {product.originalPrice && (
                <span className="ml-1.5 text-xs font-body font-normal line-through text-[#5A6270]">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </>
          )}
        </p>
      </div>
    </article>
  );
};
