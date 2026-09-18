import React from 'react';

type WaveVariant =
  | 'blue-on-ivory'
  | 'ivory-on-blue'
  | 'deep-on-ivory'
  | 'ivory-on-deep'
  | 'deep-on-primary';

interface WaveDividerProps {
  variant?: WaveVariant;
  className?: string;
  flip?: boolean;
}

const FILL: Record<WaveVariant, string> = {
  'blue-on-ivory': '#0F3D9C',
  'ivory-on-blue': '#FBF9F4',
  'deep-on-ivory': '#0A2B70',
  'ivory-on-deep': '#FBF9F4',
  'deep-on-primary': '#0A2B70',
};

const BG: Record<WaveVariant, string> = {
  'blue-on-ivory': '#FBF9F4',
  'ivory-on-blue': '#0F3D9C',
  'deep-on-ivory': '#FBF9F4',
  'ivory-on-deep': '#0A2B70',
  'deep-on-primary': '#0F3D9C',
};

/** Scalloped section divider — fill painted on contrasting bg to avoid 1px hairlines */
export const WaveDivider: React.FC<WaveDividerProps> = ({
  variant = 'blue-on-ivory',
  className = '',
  flip = false,
}) => {
  const bg = BG[variant];
  return (
    <div className={`leading-none -my-px ${className}`} style={{ backgroundColor: bg }} aria-hidden="true">
      <svg
        className={`block w-full h-6 sm:h-10 ${flip ? 'rotate-180' : ''}`}
        style={{ fill: FILL[variant] }}
        preserveAspectRatio="none"
        viewBox="0 0 1200 60"
      >
        <path d="M0,0 L1200,0 L1200,18 C1100,48 1000,8 900,28 C700,58 500,8 300,38 C150,58 50,28 0,40 Z" />
      </svg>
    </div>
  );
};
