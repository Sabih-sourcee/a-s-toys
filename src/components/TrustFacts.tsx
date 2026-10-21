import React from 'react';
import { config } from '../config';
import { whatsappHref } from '../lib/whatsapp';

function money(raw: string): string {
  if (/^\d+(\.\d+)?$/.test(raw.trim())) return `Rs. ${Number(raw).toLocaleString('en-PK')}`;
  return raw;
}

const FACTS = [
  ['Email', config.email],
  ['Address', config.address],
  ['7-day exchange', config.exchangePolicy],
  ['Delivery charges', money(config.deliveryCharges)],
  ['Free delivery over', config.freeShippingOver ? money(config.freeShippingOver) : ''],
  ['Courier', config.courier],
] as const;

export const TrustFacts: React.FC<{ className?: string }> = ({ className }) => (
  <ul className={className}>
    <li className="min-w-0 break-words">
      <span className="font-headline font-bold">Call: </span>
      <a href={`tel:${config.phoneTel}`} className="underline underline-offset-2 break-words">
        {config.phone}
      </a>
    </li>
    <li className="min-w-0 break-words">
      <span className="font-headline font-bold">WhatsApp: </span>
      <a href={whatsappHref() ?? `https://wa.me/${config.whatsappNumber}`} className="underline underline-offset-2 break-words" target="_blank" rel="noreferrer">
        {config.whatsappPhone}
      </a>
    </li>
    {FACTS.filter(([, value]) => value).map(([label, value]) => (
      <li key={label} className="min-w-0 break-words">
        <span className="font-headline font-bold">{label}: </span>
        <span className="break-words">{value}</span>
      </li>
    ))}
  </ul>
);
