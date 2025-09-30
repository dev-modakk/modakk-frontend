import { ComponentProps } from 'react';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type LogoVariant = 'default' | 'white' | 'dark' | 'brand';

export interface LogoProps extends Omit<ComponentProps<'img'>, 'src' | 'alt' | 'width' | 'height'> {
  size?: LogoSize;
  variant?: LogoVariant;
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  showFallback?: boolean;
  fallbackText?: string;
}
