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

  return (
    <section className="bg-[#F6F3EC] border-t border-[#DCD7CC]" id="catalog-index">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-headline text-[24px] sm:text-[28px] font-extrabold text-[#182232] tracking-[-0.03em]">
          All toys from A &amp; S Toys
        </h2>
        <h3 className="font-headline text-base font-bold text-[#182232] mt-6">Categories</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <a
                href={categoryPath(category.slug)}
                onClick={(event) => open(event, categoryPath(category.slug))}
                className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
        <h3 className="font-headline text-base font-bold text-[#182232] mt-8">Products</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {PRODUCTS.map((product) => (
            <li key={product.slug}>
              <a
                href={productPath(product.slug)}
                onClick={(event) => open(event, productPath(product.slug))}
                className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
              >
                {product.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
