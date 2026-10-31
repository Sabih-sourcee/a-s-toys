import React, { useEffect, useState } from 'react';
import { Check, MessageCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { WhatsAppLink } from './WhatsAppLink';
import { config } from '../config';
import { productPhotoAlt } from '../lib/seo';
import { relatedProducts } from '../data/products';
import { productPath } from '../lib/router';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
  onOpenProduct: (slug: string) => void;
  isAdded?: boolean;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart, onBack, onOpenProduct, isAdded }) => {
  const related = relatedProducts(product);
  const [quantity, setQuantity] = useState(1);
  const photos = [product.image, ...product.galleryImages.filter((src) => src && src !== product.image)];
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
    setQuantity(1);
  }, [product.slug]);
  const photoIndex = active >= 0 && active < photos.length ? active : 0;
  const out = !product.inStock || product.stock <= 0;
  const message =
    `Assalam-o-Alaikum! I want to order ${product.title} (Rs. ${product.price.toLocaleString('en-PK')}) from A & S Toys. Payment: COD.`;

  return (
    <article className="max-w-5xl mx-auto min-w-0 px-4 sm:px-6 py-8 sm:py-12" id="product-page">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-headline font-bold text-[#0F3D9C] mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to shop
      </button>

      <div className="grid min-w-0 grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl border border-[#EBE5DA] p-5 sm:p-8">
        <div>
          <img
            src={photos[photoIndex]}
            alt={productPhotoAlt(product, photoIndex)}
            className="w-full aspect-square object-contain rounded-xl bg-[#F4EFE6]"
          />
          {photos.length > 1 && (
            <div className="mt-3 flex w-full min-w-0 max-w-full gap-2 overflow-x-auto" role="group" aria-label={`Photos of ${product.title}`}>
              {photos.map((src, index) => {
                const selected = index === photoIndex;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={selected}
                    aria-label={`Show photo ${index + 1} of ${photos.length}`}
                    className={`w-16 h-16 rounded-lg border p-1 bg-[#F4EFE6] shrink-0 overflow-hidden cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#182232] focus-visible:outline-offset-2 ${
                      selected
                        ? 'border-[#182232] ring-2 ring-[#182232]/20'
                        : 'border-[#EBE5DA] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-contain" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-headline font-bold text-[#0F3D9C]">
            {product.categoryName}
            {product.ageLabel ? ` · ${product.ageLabel}` : ''}
          </p>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#211F1C] mt-2">
            {product.title}
          </h1>
          <p className="font-headline text-2xl font-bold text-[#0F3D9C] mt-3">
            Rs. {product.price.toLocaleString('en-PK')}
            <span className="ml-2 text-sm font-body font-semibold text-[#58554F]">PKR</span>
            {product.originalPrice ? (
              <span className="ml-2 text-sm font-normal text-[#58554F] line-through">
                Rs. {product.originalPrice.toLocaleString('en-PK')}
              </span>
            ) : null}
          </p>
          <p className="text-sm text-[#58554F] mt-4 leading-relaxed">{product.fullDescription}</p>
          {product.features.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-[#211F1C] list-disc list-inside">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
          <p className="text-xs text-[#58554F] mt-4">
            {product.materials}
            {product.dimensions ? ` · ${product.dimensions}` : ''}
            {product.safetyNotes ? ` · ${product.safetyNotes}` : ''}
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-stretch gap-3">
              <div className="inline-flex items-center border-[1.5px] border-[#182232] rounded-[6px] bg-[#F6F3EC] shadow-[0px_3px_0px_#182232] shrink-0">
                <button
                  type="button"
                  className="w-11 h-11 font-bold cursor-pointer text-[#182232] hover:bg-[#EDE8DD] rounded-l-[5px]"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-headline font-bold" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="w-11 h-11 font-bold cursor-pointer text-[#182232] hover:bg-[#EDE8DD] rounded-r-[5px]"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                disabled={out}
                onClick={() => onAddToCart(product, quantity)}
                className={`flex-1 btn-primary inline-flex items-center justify-center gap-2 px-5 py-0 disabled:opacity-50 cursor-pointer ${
                  isAdded ? '!bg-[#182232]' : ''
                }`}
                id="product-add-to-cart"
              >
                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                {out
                  ? 'Out of stock'
                  : isAdded
                    ? 'Added'
                    : `Add to cart · Rs. ${(product.price * quantity).toLocaleString('en-PK')}`}
              </button>
            </div>

            <WhatsAppLink
              message={message}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-headline text-sm font-bold px-4 py-3 rounded-[6px] border-[1.5px] border-[#182232] shadow-[0px_3px_0px_#182232]"
              id="product-whatsapp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="min-w-0 break-words">WhatsApp {config.whatsappPhone}</span>
            </WhatsAppLink>
          </div>
          <p className="text-xs text-[#58554F] mt-3">Payment on the website is cash on delivery.</p>
        </div>
      </div>

      <section className="mt-8" aria-labelledby="related-toys">
        <h2 id="related-toys" className="font-headline text-xl font-bold text-[#182232]">
          Related toys
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug}>
              <a
                href={productPath(item.slug)}
                onClick={(event) => {
                  event.preventDefault();
                  onOpenProduct(item.slug);
                }}
                className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
