import React from 'react';
import { config } from '../config';

function money(raw: string): string {
  if (/^\d+(\.\d+)?$/.test(raw.trim())) return `Rs. ${Number(raw).toLocaleString('en-PK')}`;
  return raw;
}

const FACTS = [
  ['Phone', config.phone],
  ['Email', config.email],
  ['Address', config.address],
  ['7-day exchange', config.exchangePolicy],
  ['Delivery charges', money(config.deliveryCharges)],
  ['Free delivery over', config.freeShippingOver ? money(config.freeShippingOver) : ''],
  ['Courier', config.courier],
] as const;

export const TrustFacts: React.FC<{ className?: string }> = ({ className }) => (
  <ul className={className}>
    {FACTS.filter(([, value]) => value).map(([label, value]) => (
      <li key={label}>
        <span className="font-headline font-bold">{label}: </span>
        <span>{value}</span>
      </li>
    ))}
  </ul>
);
