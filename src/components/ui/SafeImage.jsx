import React, { useState } from 'react';
import { Beef, UtensilsCrossed, ChefHat, Sparkles } from 'lucide-react';

/**
 * SafeImage Component
 * Komponen gambar tangguh dengan state loading, graceful fallback saat offline/error,
 * dan rasio gambar yang konsisten.
 */
export default function SafeImage({
  src,
  alt = 'Gambar BeefChoice',
  aspectRatio = '16/10',
  height,
  width = '100%',
  style = {},
  className = '',
  category = 'recipe', // 'recipe' | 'cut' | 'hero'
  fallbackTitle = '',
  badge = null,
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFallbackIcon = () => {
    switch (category) {
      case 'cut':
        return <Beef size={36} color="var(--color-primary-red)" />;
      case 'hero':
        return <ChefHat size={48} color="var(--color-primary-red)" />;
      case 'recipe':
      default:
        return <UtensilsCrossed size={36} color="var(--color-primary-red)" />;
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: width,
        height: height || 'auto',
        aspectRatio: height ? undefined : aspectRatio,
        overflow: 'hidden',
        backgroundColor: '#1E2024',
        borderRadius: style.borderRadius || '0',
        ...style,
      }}
      className={`safe-image-container ${className}`}
    >
      {/* Background skeleton/glow saat loading */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #1C1E22 0%, #2A2D35 50%, #1C1E22 100%)',
            backgroundSize: '200% 100%',
            animation: 'pulse 1.8s ease-in-out infinite',
            zIndex: 1,
          }}
        />
      )}

      {/* Gambar Utama */}
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease, opacity 0.3s ease',
            opacity: isLoaded ? 1 : 0,
          }}
          className="safe-image-element"
        />
      ) : null}

      {/* Fallback Elegan jika Gambar Gagal Dimuat / Offline */}
      {hasError || !src ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1C1E24 0%, #2A1D20 100%)',
            color: '#FFFFFF',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'rgba(229, 72, 82, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              border: '1px solid rgba(229, 72, 82, 0.3)',
            }}
          >
            {getFallbackIcon()}
          </div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#F3F4F6',
              maxWidth: '85%',
              lineHeight: 1.3,
            }}
          >
            {fallbackTitle || alt}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--color-primary-red)',
              marginTop: '4px',
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}
          >
            BeefChoice Visual Preview
          </span>
        </div>
      ) : null}

      {/* Badge Opsional di sudut gambar */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 2,
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
}

