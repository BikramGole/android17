import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '../components/AppIcon';
import { ALL_APPS } from '../data/apps';
import type { AppDefinition } from '../data/apps';

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All apps' },
  { id: 'google', label: 'Google' },
  { id: 'system', label: 'System' },
  { id: 'media', label: 'Media' },
  { id: 'tools', label: 'Tools' },
  { id: 'social', label: 'Social' },
  { id: 'games', label: 'Games' },
];

const AppDrawer: React.FC<AppDrawerProps> = ({ open, onClose, onOpenApp }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filteredApps = useMemo(() => {
    let apps: AppDefinition[] = ALL_APPS;
    if (category !== 'all') apps = apps.filter(a => a.category === category);
    if (search) {
      const q = search.toLowerCase();
      apps = apps.filter(a => a.name.toLowerCase().includes(q) || a.id.includes(q));
    }
    return apps;
  }, [search, category]);

  const rows: AppDefinition[][] = [];
  for (let i = 0; i < filteredApps.length; i += 4) {
    rows.push(filteredApps.slice(i, i + 4));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 250, mass: 0.8 }}
          style={{
            position: 'absolute', inset: 0, zIndex: 800,
            display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(180deg, rgba(15,15,30,0.98), rgba(10,10,20,0.99))',
            backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)', borderRadius: 12,
              padding: '10px 14px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>search</span>
              <input
                autoFocus
                placeholder="Search apps..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  outline: 'none', color: 'rgba(255,255,255,0.9)',
                  fontSize: 14, fontWeight: 400,
                }}
              />
              {search && (
                <span onClick={() => setSearch('')} style={{ cursor: 'pointer', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                </span>
              )}
            </div>
            <div onClick={onClose} style={{ cursor: 'pointer', padding: 8, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>close</span>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: 4, padding: '4px 16px 12px',
            overflow: 'auto', flexShrink: 0,
          }}>
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                style={{
                  padding: '6px 14px', borderRadius: 20,
                  fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: category === cat.id ? 'rgba(61,220,132,0.2)' : 'rgba(255,255,255,0.05)',
                  color: category === cat.id ? '#3ddc84' : 'rgba(255,255,255,0.6)',
                  border: category === cat.id ? '1px solid rgba(61,220,132,0.3)' : '1px solid transparent',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {cat.label}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '4px 12px 80px' }}>
            {rows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025, duration: 0.2 }}
                style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 4, justifyItems: 'center', marginBottom: 8,
                }}
              >
                {row.map(app => (
                  <AppIcon key={app.id} app={app} size={54} onOpen={onOpenApp} />
                ))}
              </motion.div>
            ))}
            {filteredApps.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                No apps found
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDrawer;
