/**
 * useTheme — Tema ve accent rengi DOM'a senkronize eden hook
 *
 * Zustand store'daki theme ve accentColor değerlerini
 * document.documentElement üzerindeki data-theme attribute ve
 * --accent CSS değişkenine yansıtır.
 */

import { useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

/**
 * Hex renk kodundan hover varyantı ve glow varyantı üretir
 */
function hexToVariants(hex: string) {
  // Basit yaklaşım: hover için biraz açık, glow için rgba
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const hoverR = Math.min(255, r + 30);
  const hoverG = Math.min(255, g + 30);
  const hoverB = Math.min(255, b + 30);

  return {
    hover: `rgb(${hoverR}, ${hoverG}, ${hoverB})`,
    glow: `rgba(${r}, ${g}, ${b}, 0.25)`,
  };
}

export function useTheme() {
  const theme = useSettingsStore((s) => s.theme);
  const accentColor = useSettingsStore((s) => s.accentColor);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const { hover, glow } = hexToVariants(accentColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    document.documentElement.style.setProperty('--accent-hover', hover);
    document.documentElement.style.setProperty('--accent-glow', glow);
  }, [accentColor]);
}
