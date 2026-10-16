import React from 'react';
import { config } from '../config';

const FACTS = [
  ['Phone', config.phone],
  ['Address', config.address],
  ['7-day exchange', config.exchangePolicy],
  ['Delivery charges', config.deliveryCharges],
  ['Courier', config.courier],
] as const;

export const TrustFacts: React.FC<{ className?: string }> = ({ className }) => (
  <ul className={className}>
    {FACTS.map(([label, value]) => (
      <li key={label}>
        <span className="font-headline font-bold">{label}: </span>
        <span>{value}</span>
      </li>
    ))}
  </ul>
);
