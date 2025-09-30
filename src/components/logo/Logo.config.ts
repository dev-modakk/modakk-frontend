import { LogoSize, LogoVariant } from './Logo.types';

export const LOGO_SIZES: Record<LogoSize, { width: number; height: number; textSize: string }> = {
  xs: { width: 24, height: 24, textSize: 'text-xs' },
  sm: { width: 32, height: 32, textSize: 'text-sm' },
  md: { width: 40, height: 40, textSize: 'text-base' },
  lg: { width: 48, height: 48, textSize: 'text-lg' },
  xl: { width: 64, height: 64, textSize: 'text-xl' },
  xxl: { width: 80, height: 80, textSize: 'text-2xl' },
};

export const LOGO_VARIANTS: Record<LogoVariant, { className: string; filter?: string }> = {
  default: {
    className: 'text-gray-900 dark:text-white'
  },
  white: {
    className: 'text-white',
    filter: 'brightness(0) invert(1)'
  },
  dark: {
    className: 'text-gray-900',
    filter: 'brightness(0)'
  },
  brand: {
    className: 'text-blue-600 dark:text-blue-400'
  },
};

export const DEFAULT_LOGO_SOURCES: Record<string, string> = {
  default: '/assets/modakk-logo.png',
  white: '/assets/modakk-logo.png',
  dark: '/assets/modakk-logo.png',
  brand: '/assets/modakk-logo.png',
};

export const getLogoContainerClasses = (isClickable: boolean): string => {
  const baseClasses = 'inline-flex items-center justify-center';
  const interactiveClasses = isClickable
    ? 'cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded'
    : '';

  return `${baseClasses} ${interactiveClasses}`.trim();
};

export const isSvgSource = (src: string): boolean => {
  return src.toLowerCase().endsWith('.svg');
};

export const getImageOptimization = (priority: boolean, loading: 'lazy' | 'eager') => {
  return {
    priority,
    loading,
    placeholder: 'empty' as const,
    quality: 90,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  };
};
