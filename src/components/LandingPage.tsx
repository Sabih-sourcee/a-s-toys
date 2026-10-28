import React from 'react';
import {
  LANDINGS,
  LandingPage as Landing,
  landingMoreLinks,
  landingProducts,
  splitLandingText,
} from '../data/landings';

interface LandingPageProps {
  page: Landing;
  onOpenProduct: (slug: string) => void;
  onOpenPath: (path: string) => void;
}

function openLink(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onOpenProduct: (slug: string) => void,
  onOpenPath: (path: string) => void,
) {
  event.preventDefault();
  const product = href.match(/^\/products\/([^/]+)$/);
  if (product) onOpenProduct(product[1]);
  else onOpenPath(href);
}

function InlineText({
  text,
  onOpenProduct,
  onOpenPath,
}: {
  text: string;
  onOpenProduct: (slug: string) => void;
  onOpenPath: (path: string) => void;
}) {
  return (
    <>
      {splitLandingText(text).map((part, index) =>
        part.type === 'text' ? (
          <React.Fragment key={index}>{part.value}</React.Fragment>
        ) : (
          <a
            key={index}
            href={part.href}
            onClick={(event) => openLink(event, part.href, onOpenProduct, onOpenPath)}
            className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
          >
            {part.label}
          </a>
        ),
      )}
    </>
  );
}

export const LandingPage: React.FC<LandingPageProps> = ({ page, onOpenProduct, onOpenPath }) => {
  const products = landingProducts(page);
  const more = landingMoreLinks(page);
  return (
    <article className="max-w-3xl mx-auto min-w-0 px-4 sm:px-6 py-10 sm:py-14">
      <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#182232] tracking-[-0.03em]">
        {page.h1}
      </h1>
      <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#211F1C]">
        {page.blocks.map((block) =>
          block.kind === 'h2' ? (
            <h2 key={block.text} className="font-headline text-2xl font-bold text-[#182232] pt-4">
              {block.text}
            </h2>
          ) : (
            <p key={block.text.slice(0, 48)}>
              <InlineText text={block.text} onOpenProduct={onOpenProduct} onOpenPath={onOpenPath} />
            </p>
          ),
        )}
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
              onClick={(event) => openLink(event, `/products/${product.slug}`, onOpenProduct, onOpenPath)}
              className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
            >
              {product.title}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">More from A &amp; S Toys</h2>
      <ul className="mt-4 space-y-2">
        {more.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(event) => openLink(event, link.href, onOpenProduct, onOpenPath)}
              className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
            >
              {link.anchor}
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
                {page.homeAnchor}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
