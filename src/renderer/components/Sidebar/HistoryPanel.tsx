/**
 * HistoryPanel — Tarayıcı geçmişini listeleyen yan panel
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HistoryPanel() {
  const [history, setHistory] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState<'all' | 'today' | 'yesterday' | 'week'>('all');

  useEffect(() => {
    // IPC üzerinden geçmişi yükle
    window.electronAPI?.history?.get?.()
      ?.then((data: any[]) => {
        setHistory(data || []);
      })
      ?.catch((err: any) => {
        setHistory([{ id: -1, title: 'Yükleme Hatası', url: err.message || 'Bilinmeyen hata' }]);
      });
  }, []);

  const handleOpen = (url: string) => {
    window.electronAPI?.nav.go(url);
  };

  const clearHistory = () => {
    window.electronAPI?.history?.clear?.();
    setHistory([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <input 
          type="text" 
          placeholder="🔍 Geçmişte ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}
        />
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              color: 'var(--danger)',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '11px',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Temizle
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['all', 'today', 'yesterday', 'week'].map((filter) => (
          <button 
            key={filter} 
            onClick={() => setQuickFilter(filter as any)}
            style={{
              padding: '5px 10px',
              fontSize: '11px',
              borderRadius: '20px',
              border: '1px solid var(--border-subtle)',
              background: quickFilter === filter ? 'var(--accent)' : 'rgba(255,255,255,0.03)',
              color: quickFilter === filter ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
          >
            {filter === 'all' && 'Tümü'}
            {filter === 'today' && 'Bugün'}
            {filter === 'yesterday' && 'Dün'}
            {filter === 'week' && 'Bu Hafta'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1 }}>
        {history.filter(item => {
          const matchQuery = (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) || (item.url && item.url.toLowerCase().includes(searchQuery.toLowerCase()));
          
          const itemDate = new Date(item.last_visited_at);
          const today = new Date();
          const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
          
          let matchDate = true;
          if (quickFilter === 'today') matchDate = itemDate.toDateString() === today.toDateString();
          else if (quickFilter === 'yesterday') matchDate = itemDate.toDateString() === yesterday.toDateString();
          else if (quickFilter === 'week') {
            const weekAgo = new Date(); weekAgo.setDate(today.getDate() - 7);
            matchDate = itemDate >= weekAgo;
          }

          return matchQuery && matchDate;
        }).length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
            {history.length === 0 ? 'Geçmiş kaydı yok.' : 'Eşleşen kayıt bulunamadı.'}
          </div>
        ) : (
          history.filter(item => {
            const matchQuery = (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) || (item.url && item.url.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchDate = !selectedDate || item.last_visited_at?.startsWith(selectedDate);
            return matchQuery && matchDate;
          }).map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleOpen(item.url)}
              whileHover={{ background: 'rgba(255,255,255,0.08)' }}
              style={{
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title || item.url}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', opacity: 0.8 }}>
                {item.url}
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {new Date(item.last_visited_at).toLocaleString('tr-TR')}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
