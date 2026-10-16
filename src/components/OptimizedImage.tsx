import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fallbackTitle?: string;
  fallbackCategory?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  fallbackTitle,
  fallbackCategory,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Normalize legacy /src/assets/images/ paths to public /images/
  const resolvedSrc = src.replace('/src/assets/images/', '/images/');

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-900 text-white text-center select-none ${className}`}
        style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-6 h-6 text-neutral-400 mb-2 opacity-70" />
        {fallbackCategory && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-1">
            {fallbackCategory}
          </span>
        )}
        <p className="text-xs sm:text-sm font-serif-editorial font-semibold text-neutral-200 line-clamp-2 max-w-xs">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-neutral-200 animate-pulse z-10"
          aria-hidden="true"
        />
      )}

      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

interface AvatarImageProps {
  src: string;
  name: string;
  className?: string;
  size?: number;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  name,
  className = '',
  size = 40,
}) => {
  const [hasError, setHasError] = useState(false);

  // Generate 2-letter initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (hasError || !src) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center justify-center shrink-0 border border-neutral-300 ${className}`}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`rounded-full object-cover shrink-0 border border-neutral-200 ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
