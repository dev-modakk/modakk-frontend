'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LogoProps } from './Logo.types';
import {
  LOGO_SIZES,
  LOGO_VARIANTS,
  DEFAULT_LOGO_SOURCES,
  getLogoContainerClasses,
  getImageOptimization
} from './Logo.config';

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'default',
  src,
  alt = 'Modakk Logo',
  width,
  height,
  className = '',
  clickable = false,
  onClick,
  loading = 'lazy',
  priority = false,
  showFallback = true,
  fallbackText = 'Modakk',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeConfig = LOGO_SIZES[size];
  const variantConfig = LOGO_VARIANTS[variant];

  const logoSrc = src || DEFAULT_LOGO_SOURCES[variant] || DEFAULT_LOGO_SOURCES.default || '';

  const logoWidth = width ?? sizeConfig.width;
  const logoHeight = height ?? sizeConfig.height;

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const containerClasses = getLogoContainerClasses(clickable || !!onClick);
  const finalClassName = `${containerClasses} ${className}`.trim();

  const imageOptimization = getImageOptimization(priority, loading);

  const FallbackLogo = () => {
    if (!showFallback) return null;

    return (
      <div
        className={`inline-flex items-center justify-center font-bold ${variantConfig.className} ${sizeConfig.textSize}`}
        style={{
          width: logoWidth,
          height: logoHeight,
          minWidth: logoWidth,
          minHeight: logoHeight,
        }}
        role="img"
        aria-label={alt}
      >
        {fallbackText}
      </div>
    );
  };

  const LoadingPlaceholder = () => (
    <div
      className={`inline-flex items-center justify-center bg-gray-200 animate-pulse rounded ${className}`}
      style={{
        width: logoWidth,
        height: logoHeight,
        minWidth: logoWidth,
        minHeight: logoHeight,
      }}
      aria-label="Loading logo"
    />
  );

  const LogoImage = () => {
    if (imageError && showFallback) {
      return <FallbackLogo />;
    }

    if (imageLoading && priority) {
      return <LoadingPlaceholder />;
    }

    return (
      <Image
        src={logoSrc}
        alt={alt}
        width={typeof logoWidth === 'number' ? logoWidth : parseInt(logoWidth.toString())}
        height={typeof logoHeight === 'number' ? logoHeight : parseInt(logoHeight.toString())}
        className={`object-contain ${className}`}
        style={{
          filter: variantConfig.filter,
          width: logoWidth,
          height: logoHeight,
          minWidth: logoWidth,
          minHeight: logoHeight,
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...imageOptimization}
        {...props}
      />
    );
  };

  if (clickable && !onClick) {
    return (
      <Link href="/" className={finalClassName} aria-label="Go to homepage">
        <LogoImage />
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={finalClassName}
        onClick={handleClick}
        aria-label={alt}
      >
        <LogoImage />
      </button>
    );
  }

  return (
    <div className={finalClassName}>
      <LogoImage />
    </div>
  );
};
