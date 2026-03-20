/**
 * ChromeMenu — Chrome tarzı ⋮ ana menü dropdown'u
 *
 * Profil durumu, yeni sekme/pencere, şifreler, geçmiş,
 * indirmeler, yer imleri, zoom kontrolleri, ayarlar ve çıkış.
 */

import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function ChromeMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const rect = menuRef.current?.getBoundingClientRect();
    if (rect) {
      const x = window.screenX + rect.right - 280;
      const y = window.screenY + rect.bottom + 4;
      window.electronAPI?.system?.toggleChromeMenu({ x, y });
    }
  };

  return (
    <div ref={menuRef} style={{ position: 'relative' }} className="no-drag">
      {/* ⋮ Butonu */}
      <motion.button
        onClick={handleClick}
        whileHover={{ background: 'rgba(255,255,255,0.08)' }}
        whileTap={{ scale: 0.92 }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          padding: 0,
          flexShrink: 0,
        }}
        title="Ana Menü"
      >
        ⋮
      </motion.button>
    </div>
  );
}

/* ─── Yardımcı Alt Bileşenler ─── */

function MenuItem({
  icon,
  label,
  shortcut,
  onClick,
  danger,
}: {
  icon: string;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ background: 'rgba(255,255,255,0.06)' }}
      style={{
        width: '100%',
        padding: '8px 16px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '13px',
        color: danger ? 'var(--danger)' : 'var(--text-primary)',
        textAlign: 'left',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <span style={{ fontSize: '14px', width: '20px', textAlign: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {shortcut && (
        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}
        >
          {shortcut}
        </span>
      )}
    </motion.button>
  );
}

function MenuDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'var(--border-subtle)',
        margin: '4px 12px',
      }}
    />
  );
}

function ZoomButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ background: 'rgba(255,255,255,0.1)' }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: '28px',
        height: '28px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        background: 'transparent',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 600,
      }}
    >
      {label}
    </motion.button>
  );
}


