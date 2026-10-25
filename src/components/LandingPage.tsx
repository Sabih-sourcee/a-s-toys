import React from 'react';
import { LANDINGS, LandingPage as Landing, landingProducts } from '../data/landings';

interface LandingPageProps {
  page: Landing;
  onOpenProduct: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ page, onOpenProduct }) => {
  const products = landingProducts(page);
  return (
    <article className="max-w-3xl mx-auto min-w-0 px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#182232] tracking-[-0.03em]">
        {page.h1}
      </h1>
      <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#211F1C]">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">Questions</h2>
      <div className="mt-4 space-y-4">
        {page.faqs.map((faq) => (
          <section key={faq.question}>
            <h3 className="font-headline text-base font-bold text-[#182232]">{faq.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#211F1C]">{faq.answer}</p>
          </section>
        ))}
      </div>
      <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">Toys on this page</h2>
      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li key={product.slug}>
            <a
              href={`/products/${product.slug}`}
              onClick={(event) => {
                event.preventDefault();
                onOpenProduct(product.slug);
              }}
              className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
            >
              {product.title}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};

export function GuideLinks({ onOpen }: { onOpen: (path: string) => void }) {
  return (
    <section className="bg-[#F6F3EC] border-t border-[#DCD7CC]" id="toy-guides">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-headline text-[24px] sm:text-[28px] font-extrabold text-[#182232] tracking-[-0.03em]">
          Toy guides
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {LANDINGS.map((page) => (
            <li key={page.path}>
              <a
                href={page.path}
                onClick={(event) => {
                  event.preventDefault();
                  onOpen(page.path);
                }}
                className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
              >
                {page.navLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
