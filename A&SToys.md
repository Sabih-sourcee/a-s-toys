# A & S Toys — Project Knowledge Base

> **Read this first** before exploring the repo. Keeps context cheap and consistent.

**Brand source of truth:** `C:\Users\PC\Downloads\AS_Toys_Brand_Guidelines.pdf` (v1.0, Sep 2026)

---

## What this is

Pakistan-focused **toy ecommerce storefront** for a Lahore walk-in shop going nationwide.

| | |
|---|---|
| **Brand** | A & S Toys Pakistan |
| **Tagline** | Pakistan's Joy Store |
| **Positioning** | 90+ varieties, real stock, fast delivery, fun to browse |
| **Location** | Main Market, Gulberg III, Lahore |
| **Claimed domain / email** | `astoys.pk` · `salam@astoys.pk` |
| **Stack** | React 19 + Vite 8 + Tailwind v4 + TypeScript SPA |

**Not production commerce yet** — UI + localStorage cart/orders + WhatsApp order channel. No backend.

---

## Brand system (PDF)

| Token | Value |
|---|---|
| Primary Blue | `#0F3D9C` |
| Deep Blue | `#0A2B70` |
| Toy Red | `#C4291F` |
| Amber Spark | `#F0A63A` |
| Ink | `#211F1C` |
| Warm Ivory | `#FBF9F4` |
| White | `#FFFFFF` |

- **Type:** Poppins Bold 700 (headlines + logo) · Nunito Sans (body, 16px+)
- **Logo:** wordmark `A & S Toys`, `&` in Amber; white on blue. Component: `BrandMark.tsx`
- **Headlines:** sentence case (not ALL CAPS)
- **Ratio:** ~60% blue / 30% ivory / 10% red·amber — dark bands use Deep Blue, **not black**
- **Elevation:** flat; soft shadow only on sticky cart bar + modals
- **Radius:** 8px inputs/buttons, 10–12px cards, full pills for CTAs/badges
- **Buttons:** `.btn-primary` / `.btn-secondary` / `.btn-urgency` / `.btn-on-dark` in `src/index.css`

---

## Homepage section map (Whimsy structure × A&S system)

```
Nav (ivory + Deep Blue trust strip)
→ Hero (Primary Blue, brand-forward, full-bleed image, scallop)
→ Categories (Deep Blue, circular cats)
→ Top playtime picks (Deep Blue, 6-up ProductCard dark)
→ Trust / Guarantees (Deep Blue, 4 icons)
→ For the youngest (ivory scalloped band)
→ Story teaser (Deep Blue split)
→ Most popular picks (Deep Blue, 4-up)
→ Newsletter (ivory scalloped band)
→ Footer (Deep Blue, large wordmark)
```

Waves: `WaveDivider.tsx` (`blue-on-ivory` | `ivory-on-blue` | `deep-on-ivory` | `ivory-on-deep` | `deep-on-primary`)

---

## Tech & structure

| Layer | Choice |
|---|---|
| UI | React 19 + TypeScript |
| Bundler | Vite 8 — scripts call `node ./node_modules/vite/bin/vite.js` (Windows `&` path safe) |
| CSS | Tailwind v4; tokens in `src/index.css` |
| Fonts | Poppins 700 + Nunito Sans (`index.html`) |
| Routing | View enum `'home' \| 'shop' \| 'about'` in `App.tsx` |
| Storage | `as_toys_cart` · `as_toys_orders` |

```
src/
├── App.tsx
├── index.css
├── types.ts
├── data/products.ts
└── components/
    ├── BrandMark.tsx, WaveDivider.tsx
    ├── Navbar.tsx, Footer.tsx, Hero.tsx
    ├── CategoryRow.tsx, ProductCard.tsx, ProductModal.tsx
    ├── ShopSection.tsx, ToddlersEarlyYears.tsx, Guarantees.tsx
    ├── StoryTeaser.tsx, Newsletter.tsx, AboutView.tsx
    ├── CartDrawer.tsx, CheckoutModal.tsx
    ├── OrderSuccessModal.tsx, OrderTrackerModal.tsx
```

---

## Commerce rules

| Rule | Value |
|---|---|
| Shipping | Rs. 250 · free ≥ Rs. 3,500 |
| Promos (cart) | WELCOME10 / PAKISTAN / LAHOREJOY = 10%; TOYLOVE = 15% |
| Payments UI | COD · JazzCash · EasyPaisa · bank (placeholders) |
| WhatsApp | `wa.me/923001234567` |

**Known gaps:** 12 products vs “90+” copy; promo discount may not flow into checkout; no real payments/backend.

---

## Agent conventions

1. Start here + brand PDF before grepping the whole tree.
2. Preserve Poppins / Deep Blue / ivory / sentence-case voice.
3. Catalog in `src/data/products.ts`; types in `src/types.ts`.
4. New home sections → `src/components/` + wire in `App.tsx`.
5. Do not introduce black page canvas or ALL CAPS headlines.

---

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

*Last updated: 2026-09-18 — Whimsy layout + PDF design system homepage.*
