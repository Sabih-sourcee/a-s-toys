import React from 'react';
import { LANDINGS, LandingPage as Landing, landingProducts, pricesCheckedLabel } from '../data/landings';
import { categorySummaries, findProduct, rupees } from '../lib/money';
import { productPhotoAlt } from '../lib/seo';

interface LandingPageProps {
  page: Landing;
  onOpenProduct: (slug: string) => void;
  onOpen?: (path: string) => void;
}

function openLink(event: React.MouseEvent<HTMLAnchorElement>, path: string, onOpen?: (path: string) => void) {
  if (!onOpen) return;
  event.preventDefault();
  onOpen(path);
}

export const LandingPage: React.FC<LandingPageProps> = ({ page, onOpenProduct, onOpen }) => {
  const products = landingProducts(page);
  const crumbs = page.breadcrumb ?? [
    { name: 'Home', path: '/' },
    { name: page.h1, path: page.path },
  ];
  const related = (page.related ?? [])
    .map((path) => LANDINGS.find((item) => item.path === path))
    .filter((item): item is Landing => Boolean(item));

  return (
    <article className="max-w-3xl mx-auto min-w-0 px-4 sm:px-6 py-10 sm:py-14">
      <nav className="text-xs text-[#5A6270] mb-4" aria-label="Breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={crumb.path}>
            {index > 0 ? ' / ' : ''}
            <a href={crumb.path} onClick={(event) => openLink(event, crumb.path, onOpen)} className="hover:text-[#E84A27]">
              {crumb.name}
            </a>
          </span>
        ))}
      </nav>
      <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#182232] tracking-[-0.03em]">
        {page.h1}
      </h1>
      {page.intro ? (
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#211F1C]">{page.intro}</p>
      ) : null}
      {page.updated ? (
        <p className="mt-2 text-xs font-mono uppercase tracking-[0.05em] text-[#5A6270]">{pricesCheckedLabel(page.updated)}</p>
      ) : null}
      {page.paragraphs.length > 0 ? (
        <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#211F1C]">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {page.sections?.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-headline text-2xl font-bold text-[#182232]">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="mt-3 text-sm sm:text-base leading-relaxed text-[#211F1C]">{paragraph}</p>
          ))}
          {section.list ? (
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm leading-relaxed">
              {section.list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
          {section.table ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-[#DCD7CC]">
                <caption className="text-left text-xs text-[#5A6270] mb-2">{section.table.caption}</caption>
                <thead className="bg-[#EDE8DD]">
                  <tr>
                    {section.table.columns.map((column) => (
                      <th key={column} className="text-left p-2 font-headline">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row.join('|')}>
                      {row.map((cell) => (
                        <td key={cell} className="p-2 border-t border-[#DCD7CC] align-top">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {section.priceTable ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-[#DCD7CC]">
                <caption className="text-left text-xs text-[#5A6270] mb-2">A &amp; S Toys prices from the catalog</caption>
                <thead className="bg-[#EDE8DD]">
                  <tr>
                    <th className="text-left p-2 font-headline">Product</th>
                    <th className="text-left p-2 font-headline">Price</th>
                    <th className="text-left p-2 font-headline">Page</th>
                  </tr>
                </thead>
                <tbody>
                  {section.priceTable.map((slug) => {
                    const product = findProduct(slug);
                    return (
                      <tr key={slug}>
                        <td className="p-2 border-t border-[#DCD7CC]">{product.title}</td>
                        <td className="p-2 border-t border-[#DCD7CC]">{rupees(product.price)}</td>
                        <td className="p-2 border-t border-[#DCD7CC]">
                          <a
                            href={`/products/${product.slug}`}
                            onClick={(event) => {
                              event.preventDefault();
                              onOpenProduct(product.slug);
                            }}
                            className="font-headline font-bold text-[#0F3D9C] hover:text-[#E84A27]"
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
          {section.productSlugs?.map((slug) => {
            const product = findProduct(slug);
            return (
              <figure key={slug} className="mt-4 flex gap-3 items-center">
                <img src={product.image} alt={productPhotoAlt(product, 0)} className="w-20 h-20 object-contain bg-[#F4EFE6] rounded" />
                <figcaption className="text-sm">
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
                  <span className="block text-[#211F1C]">{rupees(product.price)}</span>
                </figcaption>
              </figure>
            );
          })}
          {section.categoryCards ? (
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {categorySummaries().map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  onClick={(event) => openLink(event, card.href, onOpen)}
                  className="border border-[#DCD7CC] rounded-[6px] p-3 hover:border-[#182232]"
                >
                  <span className="block font-headline font-bold text-[#182232]">{card.name}</span>
                  <span className="block text-sm text-[#5A6270] mt-1">{card.count} {card.count === 1 ? 'toy' : 'toys'}, from {rupees(card.cheapest)}</span>
                </a>
              ))}
            </div>
          ) : null}
          {section.links ? (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(event) => openLink(event, link.href, link.href.startsWith('/products/') ? (ePath) => onOpenProduct(ePath.replace('/products/', '')) : onOpen)} className="text-[#0F3D9C] hover:text-[#E84A27]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      <h2 className="font-headline text-2xl font-bold text-[#182232] mt-10">Questions</h2>
      <div className="mt-4 space-y-4">
        {page.faqs.map((faq) => (
          <section key={faq.question}>
            <h3 className="font-headline text-base font-bold text-[#182232]">{faq.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#211F1C]">{faq.answer}</p>
          </section>
        ))}
      </div>
      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-headline text-2xl font-bold text-[#182232]">Related guides</h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {related.map((item) => (
              <li key={item.path}>
                <a href={item.path} onClick={(event) => openLink(event, item.path, onOpen)} className="text-[#0F3D9C] hover:text-[#E84A27]">
                  {item.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
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

export function GuideLinks({ onOpen, hubOnly = false }: { onOpen: (path: string) => void; hubOnly?: boolean }) {
  const pages = (hubOnly
    ? LANDINGS.filter((page) => page.updated || page.path === '/water-dispenser-toys-pakistan')
    : LANDINGS
  ).filter((page) => page.path !== '/toys-for-kids-pakistan');
  return (
    <section className="border-t border-[#DCD7CC] pt-8" id="toy-guides">
      <h2 className="font-headline text-lg font-bold text-[#182232]">Toy guides</h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {pages.map((page) => (
          <li key={page.path}>
            <a
              href={page.path}
              onClick={(event) => {
                event.preventDefault();
                onOpen(page.path);
              }}
              className="text-[#5A6270] hover:text-[#E84A27]"
            >
              {page.navLabel}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
