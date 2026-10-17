import { useEffect, useState } from 'react';

export type AppRoute =
  | { name: 'home' }
  | { name: 'shop' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'category'; slug: string }
  | { name: 'product'; slug: string }
  | { name: 'notfound' };

export function parseRoute(pathname: string): AppRoute {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { name: 'home' };
  if (path === '/shop') return { name: 'shop' };
  if (path === '/about') return { name: 'about' };
  if (path === '/contact') return { name: 'contact' };
  const category = path.match(/^\/category\/([^/]+)$/);
  if (category) return { name: 'category', slug: decodeURIComponent(category[1]) };
  const product = path.match(/^\/products\/([^/]+)$/);
  if (product) return { name: 'product', slug: decodeURIComponent(product[1]) };
  return { name: 'notfound' };
}

export function categoryPath(slug: string): string {
  return slug === 'all' ? '/shop' : `/category/${slug}`;
}

export function productPath(slug: string): string {
  return `/products/${slug}`;
}

export function useRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    const next = url.pathname + url.search;
    const current = window.location.pathname + window.location.search;
    if (next !== current) {
      window.history.pushState({}, '', next);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { pathname, route: parseRoute(pathname), navigate };
}
