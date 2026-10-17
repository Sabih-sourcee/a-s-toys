import React from 'react';
import { whatsappHref } from '../lib/whatsapp';

interface WhatsAppLinkProps {
  message?: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export const WhatsAppLink: React.FC<WhatsAppLinkProps> = ({ message, className, id, children }) => {
  const href = whatsappHref(message);
  if (!href) {
    return (
      <span className={className} id={id} title="WhatsApp number missing">
        {children}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} id={id}>
      {children}
    </a>
  );
};
