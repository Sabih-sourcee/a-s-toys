import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { LANDINGS, landingJsonLd, landingProducts } from '../src/data/landings';
import { ABOUT_FEATURED_SLUGS, CATEGORIES, PRODUCTS, relatedProducts } from '../src/data/products';
import { config } from '../src/config';
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  HOME_DESCRIPTION,
  HOME_TITLE,
  RETURN_POLICY_DESCRIPTION,
  RETURN_POLICY_PATH,
  RETURN_POLICY_TITLE,
  absolutePageUrl,
  canonicalPath,
  categoryDescription,
  categoryTitle,
  organizationJsonLd,
  productDescription,
  productJsonLd,
  productPhotoAlt,
  productTitle,
} from '../src/lib/seo';

const env = loadEnv('production', process.cwd(), '');
const siteUrl = (env.VITE_SITE_URL || 'https://usmanitoys.com').replace(/\/$/, '');
const verification = env.VITE_GOOGLE_SITE_VERIFICATION || '';
const phone = env.VITE_SHOP_PHONE || config.phone;
const phoneTel = config.phoneTel;
const whatsappPhone = config.whatsappPhone;
const whatsappUrl = `https://wa.me/${config.whatsappNumber}`;
const address = env.VITE_SHOP_ADDRESS || 'TODO: shop address';
const exchangePolicy = env.VITE_EXCHANGE_POLICY || 'TODO: 7-day exchange policy';
const deliveryCharges = env.VITE_DELIVERY_CHARGES || 'TODO: delivery charges';
const courier = env.VITE_COURIER || 'TODO: courier';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (char) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char
  ));
}

function render(opts: { title: string; description: string; urlPath: string; body: string; image?: string; jsonLd?: unknown }): string {
  const canonicalHref = absolutePageUrl(siteUrl, opts.urlPath);
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(opts.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(opts.description)}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(opts.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(opts.description)}" />`
  );

  const image = opts.image
    ? (opts.image.startsWith('http') ? opts.image : `${siteUrl}${opts.image.startsWith('/') ? opts.image : `/${opts.image}`}`)
    : '';
  const head = [
    `<link rel="canonical" href="${esc(canonicalHref)}" />`,
    `<meta property="og:url" content="${esc(canonicalHref)}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : '',
    verification ? `<meta name="google-site-verification" content="${esc(verification)}" />` : '',
    `<script type="application/ld+json">${JSON.stringify(organizationJsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
    opts.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(opts.jsonLd).replace(/</g, '\\u003c')}</script>`
      : '',
  ].filter(Boolean).join('\n    ');

  html = html.replace('</head>', `    ${head}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${opts.body}</div>`);
  return html;
}

function writePage(urlPath: string, html: string) {
  const canon = canonicalPath(urlPath);
  const rel = canon === '/' ? 'index.html' : path.join(canon.replace(/^\//, ''), 'index.html');
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function productList(products: typeof PRODUCTS): string {
  return `<ul>${products.map((product) => (
    `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a> — Rs. ${product.price.toLocaleString('en-PK')} PKR</li>`
  )).join('')}</ul>`;
}

function namedLinks(items: { href: string; name: string }[]): string {
  return `<ul>${items.map((item) => `<li><a href="${esc(item.href)}">${esc(item.name)}</a></li>`).join('')}</ul>`;
}

const catalogIndex = `<section><h2>All toys from A &amp; S Toys</h2><h3>Categories</h3>${namedLinks(CATEGORIES.map((category) => ({ href: `/category/${category.slug}`, name: category.name })))}<h3>Products</h3>${namedLinks(PRODUCTS.map((product) => ({ href: `/products/${product.slug}`, name: product.title })))}</section>`;

const aboutFeatured = ABOUT_FEATURED_SLUGS.map((slug) => {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) throw new Error(`Missing about-page product: ${slug}`);
  return product;
});

const trust = `<ul>
  <li>Call: <a href="tel:${esc(phoneTel)}">${esc(phone)}</a></li>
  <li>WhatsApp: <a href="${esc(whatsappUrl)}">${esc(whatsappPhone)}</a></li>
  <li>Address: ${esc(address)}</li>
  <li>7-day exchange: ${esc(exchangePolicy)}</li>
  <li>Delivery charges: ${esc(deliveryCharges)}</li>
  <li>Courier: ${esc(courier)}</li>
</ul>`;

writePage('/', render({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  urlPath: '/',
  body: `<main><h1>${esc(HOME_TITLE)}</h1><p>${esc(HOME_DESCRIPTION)}</p>${catalogIndex}<p><a href="/about">About A &amp; S Toys</a></p><h2>Toy guides</h2><ul>${LANDINGS.map((page) => `<li><a href="${esc(page.path)}">${esc(page.navLabel)}</a></li>`).join('')}</ul>${trust}</main>`,
}));

writePage('/shop', render({
  title: `All Toys Price in Pakistan | A&S Toys`,
  description: 'All toy prices in Pakistan from A&S Toys. Cash on delivery, JazzCash, EasyPaisa, or bank transfer. Delivery takes 2-5 business days.',
  urlPath: '/shop',
  body: `<main><h1>All Toys Price in Pakistan</h1>${productList(PRODUCTS)}</main>`,
}));

writePage('/about', render({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  urlPath: '/about',
  body: `<main><h1>A &amp; S Toys Shop</h1><p>A &amp; S Toys is an online toy shop in Karachi with delivery across Pakistan. Shop prices are from Rs 300. Payment is cash on delivery, JazzCash, EasyPaisa, or bank transfer. Delivery takes 2-5 business days.</p><p><a href="/shop">Shop all toys</a></p><ul>${aboutFeatured.map((product) => `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a></li>`).join('')}</ul>${trust}</main>`,
}));

writePage(RETURN_POLICY_PATH, render({
  title: RETURN_POLICY_TITLE,
  description: RETURN_POLICY_DESCRIPTION,
  urlPath: RETURN_POLICY_PATH,
  body: `<main><h1>Return &amp; Replacement Policy</h1><p>A &amp; S Toys offers a 7-day replacement, counted from delivery, for items damaged in transit.</p><h2>How to claim</h2><p>Contact us via <a href="/contact">usmanitoys.com</a> or WhatsApp at ${esc(whatsappPhone)} with photos of the item, and we send a replacement at no cost.</p><h2>Change of mind</h2><p>No returns for change of mind.</p><h2>Payment</h2><p>Payment is cash on delivery, JazzCash, EasyPaisa, or bank transfer.</p><h2>Shipping</h2><p>Delivery is Rs ${esc(Number(deliveryCharges).toLocaleString('en-PK'))} across Pakistan, and it is free on orders of Rs ${esc(Number(config.freeShippingOver).toLocaleString('en-PK'))} or more. Delivery takes 2-5 business days via TCS or Leopards.</p></main>`,
}));

for (const category of CATEGORIES) {
  const items = PRODUCTS.filter((product) => product.category === category.slug);
  writePage(`/category/${category.slug}`, render({
    title: categoryTitle(category.name),
    description: categoryDescription(category.name, category.description),
    urlPath: `/category/${category.slug}`,
    body: `<main><h1>${esc(category.name)} Price in Pakistan</h1><p>${esc(category.description)}</p>${productList(items)}</main>`,
  }));
}

for (const page of LANDINGS) {
  const linked = landingProducts(page);
  writePage(page.path, render({
    title: page.title,
    description: page.description,
    urlPath: page.path,
    jsonLd: landingJsonLd(page, siteUrl),
    body: `<main><h1>${esc(page.h1)}</h1>${page.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}<h2>Questions</h2>${page.faqs.map((faq) => `<section><h3>${esc(faq.question)}</h3><p>${esc(faq.answer)}</p></section>`).join('')}<h2>Toys on this page</h2><ul>${linked.map((product) => `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a></li>`).join('')}</ul></main>`,
  }));
}

for (const product of PRODUCTS) {
  writePage(`/products/${product.slug}`, render({
    title: productTitle(product),
    description: productDescription(product),
    urlPath: `/products/${product.slug}`,
    image: product.image,
    jsonLd: productJsonLd(product, siteUrl),
    body: `<article><h1>${esc(product.title)} Price in Pakistan</h1><p>Rs. ${product.price.toLocaleString('en-PK')} PKR</p><img src="${esc(product.image)}" alt="${esc(productPhotoAlt(product.title, 0))}" />${product.galleryImages.map((src, index) => `<img src="${esc(src)}" alt="${esc(productPhotoAlt(product.title, index + 1))}" />`).join('')}<p>${esc(product.shortDescription)}</p><p>${esc(product.fullDescription)}</p><p><a href="/category/${esc(product.category)}">${esc(product.categoryName)}</a></p><h2>Related toys</h2>${namedLinks(relatedProducts(product).map((item) => ({ href: `/products/${item.slug}`, name: item.title })))}</article>`,
  }));
}

const urls = [
  '/',
  '/shop',
  '/about',
  RETURN_POLICY_PATH,
  ...CATEGORIES.map((category) => `/category/${category.slug}`),
  ...LANDINGS.map((page) => page.path),
  ...PRODUCTS.map((product) => `/products/${product.slug}`),
];

const notFound = render({
  title: 'Page not found | A&S Toys',
  description: 'That page is not on A&S Toys.',
  urlPath: '/404.html',
  body: '<main><h1>Page not found</h1><p><a href="/">Back home</a></p></main>',
}).replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
fs.writeFileSync(path.join(dist, '404.html'), notFound);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((urlPath) => `  <url><loc>${absolutePageUrl(siteUrl, urlPath)}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

const htaccess = path.resolve('public/.htaccess');
if (fs.existsSync(htaccess)) {
  fs.copyFileSync(htaccess, path.join(dist, '.htaccess'));
}

console.log(`Prerendered ${urls.length} routes, 404.html, sitemap.xml, robots.txt, .htaccess`);
