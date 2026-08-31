import React, { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  decay: number;
}

// 1. Standard mode spark colors (natural sparkler mix)
const DEFAULT_SPARK_COLORS = [
  '#ffffff', // White hot
  '#fffbeb', // Light cream
  '#fef08a', // Pale gold
  '#fde047', // Radiant gold
  '#fbbf24', // Amber gold
  '#f59e0b', // Amber 500
];

// 2. Clickable Card / Interactive Element theme colors (100% High-Saturation Theme Gold & Amber)
const THEME_SPARK_COLORS = [
  '#ffc83b', // Vibrant Theme Yellow-Gold
  '#fbbf24', // Golden Amber
  '#f59e0b', // Primary Theme Amber
  '#f59e0b', // Repeated for higher probability
  '#d97706', // Rich Deep Amber
  '#f97316', // Orange Ember
  '#ea580c', // Fiery Ember
  '#ffffff', // Spark core flash
];

// 3. Hero Avatar Block ultra-energetic golden burst colors
const AVATAR_SPARK_COLORS = [
  '#ffffff',
  '#ffc83b',
  '#fbbf24',
  '#f59e0b',
  '#ffd166',
  '#ffb703',
];

export const CursorSpotlight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // High performance cursor tracking variables
    let mouseX = -500;
    let mouseY = -500;
    let lastX = -500;
    let lastY = -500;
    let isMouseDown = false;
    let isMoving = false;
    let isVisible = false;
    let moveTimeout: NodeJS.Timeout | number = 0;

    // Interaction target states
    let isHoveringClickableCard = false;
    let isHoveringHeroAvatar = false;

    const sparks: Spark[] = [];
    const MAX_SPARKS = 70; // Cap for silky 60/120 FPS performance

    const addSpark = (
      ox: number,
      oy: number,
      baseSpeed: number,
      spreadAngle: number,
      angleOffset = 0,
      overridePalette?: string[]
    ) => {
      if (sparks.length >= MAX_SPARKS) {
        sparks.shift();
      }

      const angle = angleOffset + (Math.random() - 0.5) * spreadAngle;
      const speed = baseSpeed * (0.6 + Math.random() * 0.8);
      const maxLife = Math.floor(Math.random() * 18 + 12);

      // Select active palette
      const palette = overridePalette || (
        isHoveringHeroAvatar 
          ? AVATAR_SPARK_COLORS 
          : isHoveringClickableCard 
          ? THEME_SPARK_COLORS 
          : DEFAULT_SPARK_COLORS
      );

      const color = Math.random() < 0.2 
        ? '#ffffff' 
        : palette[Math.floor(Math.random() * palette.length)];

      sparks.push({
        x: ox,
        y: oy,
        prevX: ox,
        prevY: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() * 2.2 + 1.2,
        alpha: 1,
        life: maxLife,
        maxLife,
        decay: Math.random() * 0.03 + 0.94,
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
      isMoving = true;

      // Check target element underneath cursor for context-aware color shifting
      const target = e.target as HTMLElement | null;
      if (target) {
        isHoveringHeroAvatar = !!target.closest('[data-hero-avatar="true"]');
        isHoveringClickableCard = isHoveringHeroAvatar || !!target.closest(
          '[data-clickable-card="true"], a, button, [role="button"], .cursor-pointer, input, textarea, [data-interactive="true"]'
        );
      }

      clearTimeout(moveTimeout as any);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 50);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isMouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;

      // Click burst: intense theme sparkle burst on click
      const burstCount = isHoveringHeroAvatar ? 36 : isHoveringClickableCard ? 28 : 20;
      const burstPalette = (isHoveringClickableCard || isHoveringHeroAvatar) ? THEME_SPARK_COLORS : DEFAULT_SPARK_COLORS;
      for (let i = 0; i < burstCount; i++) {
        addSpark(mouseX, mouseY, Math.random() * 7 + 3.5, Math.PI * 2, 0, burstPalette);
      }
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    const handlePointerLeave = () => {
      isVisible = false;
      mouseX = -500;
      mouseY = -500;
      isHoveringClickableCard = false;
      isHoveringHeroAvatar = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isVisible && mouseX > 0 && mouseY > 0) {
        const dx = mouseX - lastX;
        const dy = mouseY - lastY;
        const speed = Math.hypot(dx, dy);
        lastX = mouseX;
        lastY = mouseY;

        // 1. Continuous Sparkler Emission (呲花生成)
        // Extra sizzle when hovering over clickable cards or hero avatar!
        const baseCount = isMouseDown 
          ? 4 
          : isHoveringHeroAvatar 
          ? 3 
          : isHoveringClickableCard 
          ? 2 
          : isMoving 
          ? Math.min(4, Math.floor(speed / 4) + 1) 
          : 1;

        for (let i = 0; i < baseCount; i++) {
          if (isMoving && speed > 2) {
            const moveAngle = Math.atan2(dy, dx);
            addSpark(
              mouseX - dx * Math.random() * 0.35,
              mouseY - dy * Math.random() * 0.35,
              (isHoveringClickableCard ? 1.2 : 1) * (Math.random() * 4.5 + 2),
              Math.PI * 1.3,
              moveAngle + Math.PI
            );
          } else {
            addSpark(
              mouseX, 
              mouseY, 
              (isHoveringHeroAvatar ? 1.4 : isHoveringClickableCard ? 1.2 : 1) * (Math.random() * 3.8 + 1.4), 
              Math.PI * 2
            );
          }
        }

        // Draw Burning Tip (Sparkler Core) with lighter composite
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        const isThemeActive = isHoveringClickableCard || isHoveringHeroAvatar;

        // Dynamic Glow Halo (Theme Amber Glow when over clickable card/avatar)
        const haloRadius = isMouseDown 
          ? 34 
          : isHoveringHeroAvatar 
          ? 36 
          : isHoveringClickableCard 
          ? 30 
          : isMoving 
          ? 22 
          : 18;

        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, haloRadius);
        
        if (isThemeActive) {
          // Vibrant Theme Amber / Gold Halo
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          grad.addColorStop(0.25, 'rgba(255, 200, 59, 0.9)'); // #ffc83b theme bright
          grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.55)'); // #f59e0b theme amber
          grad.addColorStop(0.8, 'rgba(217, 119, 6, 0.2)');
          grad.addColorStop(1, 'transparent');
        } else {
          // Neutral Soft Golden Sparkler Halo
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
          grad.addColorStop(0.3, 'rgba(251, 191, 36, 0.45)');
          grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.12)');
          grad.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4-point Spark Star on tip (Color adapts to theme color on clickable card)
        const tipSize = isMouseDown ? 9 : isThemeActive ? 7.5 : 5.5;
        ctx.strokeStyle = isThemeActive ? 'rgba(255, 200, 59, 0.95)' : 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = isThemeActive ? 1.6 : 1.2;
        ctx.beginPath();
        ctx.moveTo(mouseX - tipSize, mouseY);
        ctx.lineTo(mouseX + tipSize, mouseY);
        ctx.moveTo(mouseX, mouseY - tipSize);
        ctx.lineTo(mouseX, mouseY + tipSize);
        ctx.stroke();

        // Secondary diagonal glint for clickable cards / avatar
        if (isThemeActive) {
          const diagSize = tipSize * 0.6;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouseX - diagSize, mouseY - diagSize);
          ctx.lineTo(mouseX + diagSize, mouseY + diagSize);
          ctx.moveTo(mouseX - diagSize, mouseY + diagSize);
          ctx.lineTo(mouseX + diagSize, mouseY - diagSize);
          ctx.stroke();
        }

        // White-hot center dot with theme amber halo
        ctx.fillStyle = isThemeActive ? '#ffffff' : '#ffffff';
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, isThemeActive ? 2.2 : 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 2. Render and update active sparks
      if (sparks.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = sparks.length - 1; i >= 0; i--) {
          const p = sparks[i];
          p.life -= 1;

          if (p.life <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          // Physics update
          p.prevX = p.x;
          p.prevY = p.y;
          p.vx *= p.decay;
          p.vy *= p.decay;
          p.vy += 0.08; // Gravity

          p.x += p.vx;
          p.y += p.vy;

          const lifeRatio = p.life / p.maxLife;
          const alpha = lifeRatio * 0.95;

          // Glowing streak line
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(0.7, p.size * lifeRatio);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Spark head point
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.4, 0.8 * lifeRatio), 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handlePointerLeave);
      clearTimeout(moveTimeout as any);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
    </div>
  );
};
