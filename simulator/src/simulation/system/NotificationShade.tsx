import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QSTile {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  toggle: () => void;
}

interface Notification {
  id: string;
  app: string;
  icon: string;
  title: string;
  text: string;
  time: string;
  color: string;
}

interface NotificationShadeProps {
  open: boolean;
  onClose: () => void;
  tiles: QSTile[];
  brightness: number;
  volume: number;
  onBrightnessChange: (v: number) => void;
  onVolumeChange: (v: number) => void;
  notifications: Notification[];
  darkMode: boolean;
}

const TILE_SIZE = 82;

const QSTile: React.FC<{ tile: QSTile }> = ({ tile }) => (
  <div
    onClick={tile.toggle}
    style={{
      width: TILE_SIZE, height: TILE_SIZE,
      borderRadius: 16,
      background: tile.active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 4, cursor: 'pointer',
      transition: 'background 0.2s, transform 0.15s',
    }}
    onMouseEnter={e => { if (tile.active) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
    onMouseLeave={e => { (e.target as HTMLElement).style.background = tile.active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'; }}
  >
    <span className="material-symbols-outlined" style={{
      fontSize: 24, color: tile.active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
      fontVariationSettings: "'FILL' 1, 'wght' 400",
    }}>
      {tile.icon}
    </span>
    <span style={{ fontSize: 10, color: tile.active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
      {tile.label}
    </span>
  </div>
);

const sliderStyles: React.CSSProperties = {
  width: '100%', height: 4, borderRadius: 2, appearance: 'none',
  outline: 'none', cursor: 'pointer',
  background: 'rgba(255,255,255,0.1)',
};

const NotificationShade: React.FC<NotificationShadeProps> = ({
  open, onClose, tiles, brightness, volume,
  onBrightnessChange, onVolumeChange, notifications, darkMode,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
          style={{
            position: 'absolute', inset: 0, zIndex: 900,
            display: 'flex', flexDirection: 'column',
            background: darkMode
              ? 'linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 100%)'
              : 'linear-gradient(180deg, #e8eaed 0%, #f0f2f5 100%)',
            color: darkMode ? 'rgba(255,255,255,0.9)' : '#1a1a1a',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingTop: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.5 }}>QUICK SETTINGS</span>
              <div
                onClick={onClose}
                style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(4, ${TILE_SIZE}px)`, gap: 8, justifyContent: 'center', marginBottom: 16 }}>
              {tiles.map(tile => <QSTile key={tile.id} tile={tile} />)}
            </div>

            <div style={{ marginBottom: 20, padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, opacity: 0.5 }}>brightness_medium</span>
                <span style={{ fontSize: 11, opacity: 0.5, flex: 1 }}>Brightness</span>
                <span style={{ fontSize: 11, opacity: 0.5 }}>{brightness}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={brightness}
                onChange={e => onBrightnessChange(Number(e.target.value))}
                style={{ ...sliderStyles, background: `linear-gradient(to right, rgba(61,220,132,0.6) 0%, rgba(61,220,132,0.6) ${brightness}%, rgba(255,255,255,0.1) ${brightness}%)` }}
              />
            </div>

            <div style={{ marginBottom: 20, padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, opacity: 0.5 }}>volume_up</span>
                <span style={{ fontSize: 11, opacity: 0.5, flex: 1 }}>Volume</span>
                <span style={{ fontSize: 11, opacity: 0.5 }}>{volume}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={volume}
                onChange={e => onVolumeChange(Number(e.target.value))}
                style={{ ...sliderStyles, background: `linear-gradient(to right, rgba(66,133,244,0.6) 0%, rgba(66,133,244,0.6) ${volume}%, rgba(255,255,255,0.1) ${volume}%)` }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.4, letterSpacing: 0.5 }}>NOTIFICATIONS</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {notifications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, opacity: 0.3 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, marginBottom: 8, display: 'block' }}>notifications_off</span>
                <span style={{ fontSize: 13 }}>No notifications</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {notifications.map(n => (
                  <motion.div
                    key={n.id}
                    layout
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: 16, padding: '14px 16px',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                      boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: n.color + '26', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span className="material-symbols-outlined" style={{ color: n.color, fontSize: 22, fontVariationSettings: "'FILL' 1" }}>
                          {n.icon.toLowerCase()}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{n.app}</span>
                          <span style={{ fontSize: 11, opacity: 0.4 }}>{n.time}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{n.title}</div>
                        <div style={{ fontSize: 12, opacity: 0.6, lineHeight: 1.4 }}>{n.text}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationShade;
