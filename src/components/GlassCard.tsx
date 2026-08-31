import React, { useRef, useState, useCallback } from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number; // max degrees of tilt, e.g. 5 to 8
  glowColor?: string; // spotlight color
  spotlightRadius?: number; // spotlight radius in px
  enableTilt?: boolean;
  enableSpotlight?: boolean;
  enableGlint?: boolean;
  interactiveScale?: number;
  isClickable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  tiltIntensity = 6,
  glowColor = 'rgba(245, 158, 11, 0.18)',
  spotlightRadius = 320,
  enableTilt = true,
  enableSpotlight = true,
  enableGlint = true,
  interactiveScale = 1.015,
  isClickable,
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localPos, setLocalPos] = useState({ x: 0, y: 0, px: 0.5, py: 0.5 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const hasClickAction = !!onClick || isClickable || className.includes('cursor-pointer');

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      if (onMouseEnter) onMouseEnter(e);
    },
    [onMouseEnter]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = Math.max(0, Math.min(1, x / rect.width));
      const py = Math.max(0, Math.min(1, y / rect.height));

      setLocalPos({ x, y, px, py });

      if (enableTilt) {
        const rotateY = (px - 0.5) * 2 * tiltIntensity;
        const rotateX = -(py - 0.5) * 2 * tiltIntensity;
        setTilt({ rotateX, rotateY });
      }

      if (onMouseMove) onMouseMove(e);
    },
    [enableTilt, tiltIntensity, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      setTilt({ rotateX: 0, rotateY: 0 });
      if (onMouseLeave) onMouseLeave(e);
    },
    [onMouseLeave]
  );

  return (
    <div
      ref={cardRef}
      data-glass-card="true"
      data-clickable-card={hasClickAction ? 'true' : undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/80 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 ${
        isHovered
          ? 'shadow-[0_20px_45px_rgb(0,0,0,0.10)] border-white/95 bg-white/92 z-10'
          : 'hover:border-zinc-300/80'
      } ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) scale3d(${interactiveScale}, ${interactiveScale}, 1) translateY(-3px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)',
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease'
          : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease, background-color 0.35s ease',
        willChange: isHovered ? 'transform' : 'auto',
        ...style,
      }}
      {...props}
    >
      {/* 1. Dynamic Cursor Spotlight (Inside active hovered card only) */}
      {enableSpotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl overflow-hidden transition-opacity duration-200"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${localPos.x}px ${localPos.y}px, ${glowColor}, rgba(255,255,255,0.3) 35%, transparent 75%)`,
          }}
        />
      )}

      {/* 2. Dynamic Specular Glint */}
      {enableGlint && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200"
          style={{
            background: `linear-gradient(${115 + localPos.px * 40}deg, rgba(255, 255, 255, 0.4) 0%, rgba(245, 158, 11, 0.06) 40%, transparent 75%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* 3. Card Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-auto">
        {children}
      </div>
    </div>
  );
};
