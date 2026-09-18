import React from 'react';

interface BrandMarkProps {
  /** on-dark gets an ivory plate so the logo stays legible on Deep Blue */
  tone?: 'on-light' | 'on-dark';
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer';
  showTagline?: boolean;
  className?: string;
}

const HEIGHT: Record<NonNullable<BrandMarkProps['size']>, string> = {
  sm: 'h-10',
  md: 'h-12 sm:h-14',
  lg: 'h-16 sm:h-20',
  hero: 'h-20 sm:h-24',
  footer: 'h-20 sm:h-28 lg:h-32',
};

/** A & S Toys logo mark — image from /images/logo.png */
export const BrandMark: React.FC<BrandMarkProps> = ({
  tone = 'on-light',
  size = 'md',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center ${
        tone === 'on-dark' ? 'bg-[#FBF9F4] rounded-lg px-2 py-1' : ''
      } ${className}`}
    >
      <img
        src="/images/logo.png"
        alt="A & S Toys"
        className={`${HEIGHT[size]} w-auto object-contain block`}
        decoding="async"
      />
    </span>
  );
};
