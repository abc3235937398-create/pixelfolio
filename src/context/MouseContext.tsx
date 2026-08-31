import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

interface MouseState {
  x: number;
  y: number;
  normalizedX: number; // 0 to 1 across viewport
  normalizedY: number; // 0 to 1 across viewport
  isHoveringCard: boolean;
  isHoveringButton: boolean;
  isMouseDown: boolean;
  activeCardId: string | null;
  cursorMode: 'default' | 'card' | 'button' | 'link' | 'text';
}

interface MouseContextType {
  mouseState: MouseState;
  setCursorMode: (mode: 'default' | 'card' | 'button' | 'link' | 'text') => void;
  setActiveCardId: (id: string | null) => void;
}

const defaultState: MouseState = {
  x: -500,
  y: -500,
  normalizedX: 0.5,
  normalizedY: 0.5,
  isHoveringCard: false,
  isHoveringButton: false,
  isMouseDown: false,
  activeCardId: null,
  cursorMode: 'default',
};

const MouseContext = createContext<MouseContextType>({
  mouseState: defaultState,
  setCursorMode: () => {},
  setActiveCardId: () => {},
});

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mouseState, setMouseState] = useState<MouseState>(defaultState);
  const rafId = useRef<number | null>(null);
  const latestPos = useRef({ x: -500, y: -500 });
  const isDownRef = useRef(false);
  const activeModeRef = useRef<'default' | 'card' | 'button' | 'link' | 'text'>('default');
  const activeCardIdRef = useRef<string | null>(null);

  const setCursorMode = useCallback((mode: 'default' | 'card' | 'button' | 'link' | 'text') => {
    activeModeRef.current = mode;
    setMouseState((prev) => ({
      ...prev,
      cursorMode: mode,
      isHoveringButton: mode === 'button' || mode === 'link',
      isHoveringCard: mode === 'card',
    }));
  }, []);

  const setActiveCardId = useCallback((id: string | null) => {
    activeCardIdRef.current = id;
    setMouseState((prev) => ({ ...prev, activeCardId: id }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestPos.current = { x: e.clientX, y: e.clientY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          const vw = window.innerWidth || 1920;
          const vh = window.innerHeight || 1080;
          const nx = Math.max(0, Math.min(1, latestPos.current.x / vw));
          const ny = Math.max(0, Math.min(1, latestPos.current.y / vh));

          // Set CSS custom properties on document for high performance styling
          document.documentElement.style.setProperty('--global-mouse-x', `${latestPos.current.x}px`);
          document.documentElement.style.setProperty('--global-mouse-y', `${latestPos.current.y}px`);
          document.documentElement.style.setProperty('--global-mouse-nx', `${nx}`);
          document.documentElement.style.setProperty('--global-mouse-ny', `${ny}`);

          setMouseState({
            x: latestPos.current.x,
            y: latestPos.current.y,
            normalizedX: nx,
            normalizedY: ny,
            isHoveringCard: activeModeRef.current === 'card',
            isHoveringButton: activeModeRef.current === 'button' || activeModeRef.current === 'link',
            isMouseDown: isDownRef.current,
            activeCardId: activeCardIdRef.current,
            cursorMode: activeModeRef.current,
          });

          rafId.current = null;
        });
      }
    };

    const handleMouseDown = () => {
      isDownRef.current = true;
      setMouseState((prev) => ({ ...prev, isMouseDown: true }));
    };

    const handleMouseUp = () => {
      isDownRef.current = false;
      setMouseState((prev) => ({ ...prev, isMouseDown: false }));
    };

    // Detect elements dynamically if desired
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveBtn = target.closest('button, a, input, textarea, select, [role="button"]');
      if (interactiveBtn) {
        setCursorMode('button');
      } else {
        const cardElem = target.closest('[data-glass-card]');
        if (cardElem) {
          setCursorMode('card');
        } else {
          setCursorMode('default');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [setCursorMode]);

  return (
    <MouseContext.Provider value={{ mouseState, setCursorMode, setActiveCardId }}>
      {children}
    </MouseContext.Provider>
  );
};

export const useGlobalMouse = () => useContext(MouseContext);
