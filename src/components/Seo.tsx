import { useEffect } from 'react';
import { config } from '../config';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: unknown;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeMeta(attr: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function absoluteImage(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  return `${config.siteUrl}${src.startsWith('/') ? src : `/${src}`}`;
}

export function Seo({ title, description, path, image, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', `${config.siteUrl}${path}`);
    if (image) upsertMeta('property', 'og:image', absoluteImage(image));
    else removeMeta('property', 'og:image');

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${config.siteUrl}${path}`;

    if (config.googleSiteVerification) {
      upsertMeta('name', 'google-site-verification', config.googleSiteVerification);
    }

    const id = 'page-jsonld';
    const existing = document.getElementById(id);
    if (jsonLd) {
      const script = existing ?? document.createElement('script');
      script.id = id;
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
      if (!existing) document.head.appendChild(script);
    } else {
      existing?.remove();
    }
  }, [title, description, path, image, jsonLd]);

  return null;
}
