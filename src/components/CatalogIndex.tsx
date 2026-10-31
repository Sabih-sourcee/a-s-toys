import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { categoryPath, productPath } from '../lib/router';

interface CatalogIndexProps {
  onOpen: (path: string) => void;
}

export const CatalogIndex: React.FC<CatalogIndexProps> = ({ onOpen }) => {
  const open = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    onOpen(path);
  };

  const linkClass = 'text-[#5A6270] hover:text-[#E84A27]';

  return (
    <section className="border-t border-[#DCD7CC] pt-8" id="catalog-index">
      <h2 className="font-headline text-lg font-bold text-[#182232]">All toys</h2>
      <p className="mt-3 font-mono text-[11px] font-medium text-[#5A6270] tracking-[0.05em] uppercase">Categories</p>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <a
              href={categoryPath(category.slug)}
              onClick={(event) => open(event, categoryPath(category.slug))}
              className={linkClass}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[11px] font-medium text-[#5A6270] tracking-[0.05em] uppercase">Products</p>
      <ul className="mt-2 columns-1 sm:columns-2 gap-x-8 text-xs leading-5">
        {PRODUCTS.map((product) => (
          <li key={product.slug} className="break-inside-avoid">
            <a
              href={productPath(product.slug)}
              onClick={(event) => open(event, productPath(product.slug))}
              className={linkClass}
            >
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
