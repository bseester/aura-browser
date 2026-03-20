import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTabStore } from '../../store/useTabStore';

export default function ChromeMenuOverlay() {
  const [zoom, setZoom] = useState(100);

  const closeMenu = () => {
    window.electronAPI?.system?.closeChromeMenu();
  };

  const handleNewTab = () => {
    window.electronAPI?.tabs.create('about:blank');
    closeMenu();
  };

  const handleNewWindow = () => {
    window.electronAPI?.tabs.create('about:blank');
    closeMenu();
  };

  const handleNewIncognito = () => {
    window.electronAPI?.system?.newIncognitoWindow();
    closeMenu();
  };

  const handleHistory = () => {
    window.electronAPI?.sidebar?.togglePanel('history');
    closeMenu();
  };

  const handleDownloads = () => {
    window.electronAPI?.sidebar?.togglePanel('downloads');
    closeMenu();
  };

  const handleBookmarks = () => {
    window.electronAPI?.sidebar?.togglePanel('bookmarks');
    closeMenu();
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 10, 200);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 10, 50);
    setZoom(newZoom);
  };

  const handleZoomReset = () => setZoom(100);

  const handleFullScreen = () => {
    window.electronAPI?.window.maximize();
    closeMenu();
  };

  const handlePrint = () => {
    window.electronAPI?.nav.print();
    closeMenu();
  };

  const handleClearData = () => {
    window.electronAPI?.history?.clear();
    closeMenu();
  };

  const handleSettings = () => {
    window.electronAPI?.system?.navigateMainRouter('/settings');
    closeMenu();
  };

  const handleQuit = () => {
    window.electronAPI?.window.close();
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', padding: '4px' }}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="glass-strong"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 'var(--radius-md)',
            padding: '6px 0',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px var(--border-subtle)',
            overflowY: 'auto',
            background: 'rgba(23, 23, 23, 0.85)', // More transparent premium dark
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* ─── Profil Kartı ─── */}
          <div
            style={{
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '4px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
              }}
            >
              👤
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Kullanıcı
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Oturum açılmadı
              </span>
            </div>
          </div>

          <MenuItem icon="➕" label="Yeni Sekme" shortcut="Ctrl+T" onClick={handleNewTab} />
          <MenuItem icon="🪟" label="Yeni Pencere" shortcut="Ctrl+N" onClick={handleNewWindow} />
          <MenuItem icon="🕵️" label="Yeni Gizli Pencere" shortcut="Ctrl+Shift+N" onClick={handleNewIncognito} />

          <MenuDivider />

          <MenuItem icon="⭐" label="Yer İmleri" onClick={handleBookmarks} />
          <MenuItem icon="🕐" label="Geçmiş" shortcut="Ctrl+H" onClick={handleHistory} />
          <MenuItem icon="📥" label="İndirmeler" shortcut="Ctrl+J" onClick={handleDownloads} />
          <MenuItem icon="🔑" label="Şifreler" onClick={closeMenu} />

          <MenuDivider />

          {/* ─── Zoom Kontrolleri ─── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 12px',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '13px', marginRight: 'auto', color: 'var(--text-secondary)', paddingLeft: '4px' }}>
              🔍 Yakınlaştır
            </span>
            <ZoomButton label="−" onClick={handleZoomOut} />
            <span
              style={{
                fontSize: '12px',
                color: 'var(--text-primary)',
                minWidth: '40px',
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              {zoom}%
            </span>
            <ZoomButton label="+" onClick={handleZoomIn} />
            <motion.button
              onClick={handleFullScreen}
              whileHover={{ background: 'rgba(255,255,255,0.08)' }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                marginLeft: '4px',
              }}
              title="Tam Ekran"
            >
              ⛶
            </motion.button>
          </div>

          <MenuDivider />

          <MenuItem icon="🖨️" label="Yazdır" shortcut="Ctrl+P" onClick={handlePrint} />
          <MenuItem icon="🧹" label="Tarama Verilerini Sil" shortcut="Ctrl+Shift+Del" onClick={handleClearData} />

          <MenuDivider />

          <MenuItem icon="⚙️" label="Ayarlar" onClick={handleSettings} />
          <MenuItem icon="🚪" label="Çıkış" onClick={handleQuit} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ icon, label, shortcut, onClick, danger }: any) {
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

function ZoomButton({ label, onClick }: any) {
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
