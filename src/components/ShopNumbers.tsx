import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { config } from '../config';

interface ShopNumbersProps {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}

/** Call line and WhatsApp line. The tel: href is never the WhatsApp number. */
export const ShopNumbers: React.FC<ShopNumbersProps> = ({
  className = '',
  linkClassName = '',
  iconClassName = 'text-[#E84A27]',
}) => {
  return (
    <ul className={`min-w-0 space-y-2.5 text-sm ${className}`}>
      <li className="flex min-w-0 items-start gap-2">
        <Phone aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${iconClassName}`} />
        <a href={`tel:${config.phoneTel}`} className={`min-w-0 break-words ${linkClassName}`}>
          <span className="font-headline font-bold">Call </span>
          {config.phone}
        </a>
      </li>
      <li className="flex min-w-0 items-start gap-2">
        <MessageCircle aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${iconClassName}`} />
        <a
          href={`https://wa.me/${config.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className={`min-w-0 break-words ${linkClassName}`}
        >
          <span className="font-headline font-bold">WhatsApp </span>
          {config.whatsappPhone}
        </a>
      </li>
    </ul>
  );
};
