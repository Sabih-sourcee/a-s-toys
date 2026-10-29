# A & S Toys (usmanitoys.com)

React + Vite online store for A & S Toys, based in Karachi, with nationwide delivery. Orders go to a Google Sheet through a Google Apps Script web app. There is no walk-in shop, no shop server, and no WooCommerce.

The live site was checked against this repo on 16 Oct 2026 (same page title, product names, and Vite bundle).

## What Sabih fills in

Copy `.env.example` to `.env`, then rebuild. The phone and WhatsApp number stay blank until set. Shipping and courier already have defaults. `VITE_SHOP_ADDRESS` is optional and stays hidden when empty.

| Variable | Purpose |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Digits only, country code, no `+`. Used everywhere `wa.me` is linked. |
| `VITE_ORDER_ENDPOINT` | Apps Script web app URL ending in `/exec`. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Search Console meta tag content only. |
| `VITE_SHOP_PHONE` | Footer, About, and JazzCash / EasyPaisa number. Default `TODO: phone`. |
| `VITE_SHOP_EMAIL` | Footer. Default `salam@astoys.pk`. |
| `VITE_SHOP_ADDRESS` | Optional. Hidden in the footer, About page, and checkout when empty. |
| `VITE_EXCHANGE_POLICY` | Footer and About. Default `7-day replacement for transit damage`. |
| `VITE_DELIVERY_CHARGES` | Checkout fee. Default `250`. A value starting with TODO adds no fee. |
| `VITE_COURIER` | Cart, checkout, and order screens. Default `TCS/Leopards`. |
| `VITE_FREE_SHIPPING_OVER` | Subtotal for free delivery. Default `3500`. |
| `VITE_SITE_URL` | Canonical URLs and the sitemap. Default `https://usmanitoys.com`. |

New orders email **bookspower218@gmail.com**. That address is set in `google-apps-script/Code.gs`.

## Add products

Edit `src/data/products.ts` only. The schema is in the comment at the top of that file. After adding products, run `npm run build` so `/products/:slug`, `/category/:slug`, and `sitemap.xml` are regenerated.

## Product photos

Product photos live in `public/images/products/`. `<slug>-1.webp` is the card image. Later files are the gallery. Most grids are `NN_4angles.png` or `NN_4angles.webp`: quadrant 1 is top-left, 2 is top-right, 3 is bottom-left, and 4 is bottom-right. `layouts` in `scripts/grid-slugs.json` can set `3-centre-bottom`, which also accepts `NN_3angles.*` and writes three files: top-left, top-right, and a square centred on the bottom half. The product page only renders the photos that exist, and it hides the thumbnail row when a product has a single photo. The grids themselves are not committed.

```bash
node scripts/split-grids.mjs /path/to/grids
```

Numbers map to slugs in `scripts/grid-slugs.json`. The script writes about 800×800 WebP files, each under 120 KB. Only the numbers present in that directory are rewritten. Products 12, 14, and 20 are provisional: when replacement grids arrive, rerun the same command on a directory that contains those files.

## Apps Script (orders + email)

1. Create a Google Sheet.
2. Extensions → Apps Script. Replace the default file with `google-apps-script/Code.gs`.
3. Save. Run `saveOrder` once from the editor and allow MailApp and Sheets access (it will fail without data; the permission prompt is the point). Or deploy and place a test order.
4. Deploy → New deployment → Web app.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the URL that ends in `/exec` into `VITE_ORDER_ENDPOINT`.
6. Rebuild and upload. A successful order appends a row (name, phone, city, address, items, total, and the chosen payment method) and emails Sabih. The customer sees a success or error message. The cart is cleared only after a saved order.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 . Product URLs such as `/products/building-blocks-play-set` and `/category/pretend-play` work on refresh.

## Deploy to Hostinger

The site is a static build. Do not start a Node server for it.

```bash
npm install
npm run build
```

`dist/` contains `index.html`, `assets/`, prerendered `products/`, `category/`, `shop/`, `about/`, `sitemap.xml`, `robots.txt`, and `.htaccess`.

1. hPanel → Websites → usmanitoys.com → File Manager.
2. Open `public_html` (the domain document root).
3. Upload the **contents** of `dist/`, including hidden `.htaccess`.
4. `.htaccess` sends unknown paths to `index.html`, so a direct open of a client route still loads the React app. Prerendered routes also have HTML content for search engines.

Uploading replaces the live site. Confirm the Sheet URL and WhatsApp number in `.env` before the build you upload.

## Checks

```bash
npm run lint
npm run build
```
