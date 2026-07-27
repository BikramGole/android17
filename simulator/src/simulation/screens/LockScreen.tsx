import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
  time: { hours: string; minutes: string; ampm: string };
  date: { day: number; weekday: string; month: string };
  charging: boolean;
  batteryLevel: number;
  notifications: { icon: string; title: string; text: string; time: string; color: string }[];
  onUnlock: () => void;
  onOpenShade: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ time, date, charging, batteryLevel, notifications, onUnlock, onOpenShade: _onOpenShade }) => {
  const [swiping, setSwiping] = useState(false);
  const [swipeY, setSwipeY] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setSwiping(true);
    setSwipeY(e.clientY);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!swiping) return;
    const diff = e.clientY - swipeY;
    if (diff < -30 && !charging) onUnlock();
  };

  const handlePointerUp = () => setSwiping(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'absolute', inset: 0, zIndex: 1000,
        display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
        padding: 24, cursor: 'default', userSelect: 'none',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 84, fontWeight: 200, letterSpacing: -2, color: 'rgba(255,255,255,0.95)', lineHeight: 1 }}>
            {time.hours}:{time.minutes}
          </div>
          <div style={{ fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.7)', marginTop: 4, letterSpacing: 1 }}>
            {date.weekday}, {date.month} {date.day}
          </div>
        </motion.div>

        {charging && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 24, display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(61,220,132,0.15)', padding: '10px 20px',
              borderRadius: 100, border: '1px solid rgba(61,220,132,0.3)',
              color: '#3ddc84', fontSize: 14, fontWeight: 500,
            }}
          >
            <span style={{ fontSize: 20 }}>⚡</span>
            <span>{Math.round(batteryLevel * 100)}% · Charging</span>
          </motion.div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <AnimatePresence>
          {notifications.slice(0, 3).map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              onClick={(e) => { e.stopPropagation(); onUnlock(); }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 16, padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: n.color + '33', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ color: n.color, fontSize: 22 }}>{n.icon.toLowerCase()}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.95)', marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.text}</div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>{n.time}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: swiping ? 10 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          paddingBottom: 20, color: 'rgba(255,255,255,0.4)',
        }}
      >
        <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', marginBottom: 8 }} />
        <span style={{ fontSize: 12 }}>Swipe up to unlock</span>
      </motion.div>
    </motion.div>
  );
};

export default LockScreen;
