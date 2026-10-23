import { useEffect, useState } from 'react';

export type AppRoute =
  | { name: 'home' }
  | { name: 'shop' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'category'; slug: string }
  | { name: 'product'; slug: string }
  | { name: 'notfound' };

/** Address-bar path. Homepage stays "/"; every other path drops trailing slashes. */
export function canonicalPath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

export function parseRoute(pathname: string): AppRoute {
  const path = canonicalPath(pathname);
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
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return clean === 'all' ? '/shop' : `/category/${clean}`;
}

export function productPath(slug: string): string {
  return `/products/${slug.replace(/^\/+|\/+$/g, '')}`;
}

export function useRoute() {
  const [pathname, setPathname] = useState(() => canonicalPath(window.location.pathname));

  useEffect(() => {
    const sync = () => {
      const raw = window.location.pathname;
      const next = canonicalPath(raw);
      if (next !== raw) {
        const search = window.location.search;
        const hash = window.location.hash;
        window.history.replaceState(window.history.state, '', `${next}${search}${hash}`);
      }
      setPathname(next);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    const next = canonicalPath(url.pathname) + url.search;
    const current = canonicalPath(window.location.pathname) + window.location.search;
    if (next !== current) {
      window.history.pushState({}, '', next);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { pathname, route: parseRoute(pathname), navigate };
}
