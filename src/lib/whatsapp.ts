import { config } from '../config';

export function whatsappHref(message?: string): string | null {
  if (!config.whatsappNumber) return null;
  const base = `https://wa.me/${config.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HELP_MESSAGE =
  'Assalam-o-Alaikum! I am browsing A & S Toys and would like help choosing a toy.';
