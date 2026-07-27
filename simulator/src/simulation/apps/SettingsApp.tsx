import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SettingItem {
  icon: string;
  label: string;
  type: 'toggle' | 'link' | 'info';
  value?: string;
  color?: string;
  description?: string;
}

const SETTINGS: SettingItem[] = [
  { icon: 'wifi', label: 'Wi‑Fi', type: 'toggle', value: 'Home Network', color: '#2196F3' },
  { icon: 'bluetooth', label: 'Bluetooth', type: 'toggle', value: 'On', color: '#2196F3' },
  { icon: 'signal_cellular_alt', label: 'SIM & network', type: 'link', value: 'T-Mobile', color: '#4CAF50' },
  { icon: 'notifications', label: 'Notifications', type: 'link', color: '#FF9800' },
  { icon: 'sound', label: 'Sound & vibration', type: 'link', color: '#E91E63' },
  { icon: 'display_settings', label: 'Display', type: 'link', value: 'Dark theme', color: '#9C27B0' },
  { icon: 'wallpaper', label: 'Wallpaper & style', type: 'link', color: '#00BCD4' },
  { icon: 'battery_full', label: 'Battery', type: 'link', value: '87%', color: '#4CAF50' },
  { icon: 'storage', label: 'Storage', type: 'link', value: '64 GB used', color: '#FF9800' },
  { icon: 'security', label: 'Security & privacy', type: 'link', color: '#607D8B' },
  { icon: 'location_on', label: 'Location', type: 'toggle', color: '#4CAF50' },
  { icon: 'gpp_good', label: 'Safety & emergency', type: 'link', color: '#E91E63' },
  { icon: 'apps', label: 'Apps', type: 'link', color: '#2196F3' },
  { icon: 'person', label: 'Accounts', type: 'link', color: '#FF9800' },
  { icon: 'system_update', label: 'System update', type: 'link', value: 'Android 17', color: '#4CAF50' },
  { icon: 'phone_android', label: 'About phone', type: 'link', value: 'Android 17', color: '#607D8B' },
];

const SettingsApp: React.FC = () => {
  const [toggles, setToggles] = useState<Record<string, boolean>>({ 'wifi': true, 'bluetooth': true, 'location': true });
  const [search, setSearch] = useState('');

  const filtered = search
    ? SETTINGS.filter(s => s.label.toLowerCase().includes(search.toLowerCase()))
    : SETTINGS;

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0f0f1a', overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: 12,
        background: '#0f0f1a', borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)' }}>arrow_back</span>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px 12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'rgba(255,255,255,0.3)' }}>search</span>
          <input
            placeholder="Search settings"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 13 }}
          />
        </div>
      </div>

      <div style={{ padding: '8px 0', flex: 1, overflow: 'auto' }}>
        {filtered.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 16px', cursor: 'pointer',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: (item.color || '#666') + '22',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: 18, color: item.color || 'rgba(255,255,255,0.6)',
                fontVariationSettings: "'FILL' 1",
              }}>
                {item.icon}
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: 1 }}>{item.label}</div>
              {item.value && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{item.value}</div>}
            </div>

            {item.type === 'toggle' ? (
              <div
                onClick={e => { e.stopPropagation(); setToggles(prev => ({ ...prev, [item.icon]: !prev[item.icon] })); }}
                style={{
                  width: 40, height: 22, borderRadius: 11, padding: 2,
                  background: toggles[item.icon] ? '#3ddc84' : 'rgba(255,255,255,0.12)',
                  transition: 'background 0.2s', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  transition: 'transform 0.2s',
                  transform: toggles[item.icon] ? 'translateX(18px)' : 'translateX(0)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }} />
              </div>
            ) : (
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'rgba(255,255,255,0.25)' }}>
                chevron_right
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SettingsApp;
