'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc = '/icons/icon-192x192.png'
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px' // Load image 50px before it comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
    }
    onError?.();
  };

  // Generate blur placeholder for better UX
  const generateBlurDataURL = (w: number, h: number): string => {
    if (blurDataURL) return blurDataURL;

    // Create a simple gray blur placeholder
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, w, h);
    }

    return canvas.toDataURL();
  };

  // Common image props
  const imageProps = {
    src: imgSrc,
    alt,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    className: `transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    } ${className}`,
    ...(fill ? {} : { width, height }),
    ...(fill && { fill: true }),
    ...(objectFit && { style: { objectFit, objectPosition } }),
    ...(sizes && { sizes }),
    ...(placeholder === 'blur' && width && height && {
      placeholder: 'blur' as const,
      blurDataURL: generateBlurDataURL(width, height)
    }),
    priority
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}
      style={!fill && width && height ? { width, height } : undefined}
    >
      {/* Loading placeholder */}
      {isLoading && !hasError && (
        <div
          className={`absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center ${
            fill ? 'w-full h-full' : ''
          }`}
          style={!fill && width && height ? { width, height } : undefined}
        >
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && imgSrc === fallbackSrc && (
        <div
          className={`absolute inset-0 bg-zinc-800 flex items-center justify-center ${
            fill ? 'w-full h-full' : ''
          }`}
          style={!fill && width && height ? { width, height } : undefined}
        >
          <div className="text-gray-400 text-center p-4">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs">Image not available</p>
          </div>
        </div>
      )}

      {/* Actual image - only render when visible (lazy loading) */}
      {isVisible && !hasError && (
        <Image {...imageProps} />
      )}
    </div>
  );
}

// Specialized components for common use cases
export function CurrencyFlagImage({
  flag,
  currencyCode,
  size = 24,
  className = ''
}: {
  flag: string;
  currencyCode: string;
  size?: number;
  className?: string;
}) {
  // For emoji flags, we'll use a simple span instead of an image
  if (flag.length <= 4) {
    return (
      <span
        className={`inline-block text-${size === 24 ? 'xl' : size === 16 ? 'base' : 'lg'} ${className}`}
        role="img"
        aria-label={`${currencyCode} flag`}
        title={currencyCode}
      >
        {flag}
      </span>
    );
  }

  // For actual image flags
  return (
    <OptimizedImage
      src={flag}
      alt={`${currencyCode} flag`}
      width={size}
      height={size}
      className={`rounded-sm ${className}`}
      loading="lazy"
    />
  );
}

export function LogoImage({
  size = 'medium',
  className = ''
}: {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}) {
  const dimensions = {
    small: 32,
    medium: 48,
    large: 64
  };

  const dim = dimensions[size];

  return (
    <OptimizedImage
      src="/icons/icon-192x192.png"
      alt="Currency Exchange Calculator Logo"
      width={dim}
      height={dim}
      className={className}
      priority
      quality={90}
    />
  );
}

export function OGImage({
  className = ''
}: {
  className?: string;
}) {
  return (
    <OptimizedImage
      src="/icons/og-image.png"
      alt="Currency Exchange Calculator Preview"
      width={1200}
      height={630}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
      quality={85}
      placeholder="blur"
    />
  );
}

// Utility for generating responsive image sizes
export const generateImageSizes = (
  breakpoints: { mobile?: number; tablet?: number; desktop?: number } = {}
): string => {
  const {
    mobile = 100,
    tablet = 50,
    desktop = 33
  } = breakpoints;

  return `(max-width: 768px) ${mobile}vw, (max-width: 1200px) ${tablet}vw, ${desktop}vw`;
};

// Hook for image preloading
export function useImagePreload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src]);

  return isLoaded;
}
