import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
  time: { hours: string; minutes: string; ampm: string };
  date: { day: number; weekday: string; month: string };
  charging: boolean;
  batteryLevel: number;
  notifications: { icon: string; title: string; text: string; time: string; color: string }[];
  onUnlock: () => void;
  onOpenShade: (e: React.PointerEvent) => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ time, date, charging, batteryLevel, notifications, onUnlock }) => {
  const [swiping, setSwiping] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const startY = React.useRef(0);
  const [tapSequence, setTapSequence] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setSwiping(true);
    startY.current = e.clientY;
    setTapSequence(prev => {
      const next = prev + 1;
      if (next >= 5) { onUnlock(); return 0; }
      setTimeout(() => setTapSequence(0), 2000);
      return next;
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!swiping) return;
    const diff = e.clientY - startY.current;
    setSwipeProgress(Math.max(0, Math.min(1, -diff / 200)));
    if (diff < -120) onUnlock();
  };

  const handlePointerUp = () => {
    setSwiping(false);
    setSwipeProgress(0);
  };

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
        background: 'linear-gradient(160deg, #0d0d2b 0%, #1a1a3e 40%, #16213e 100%)',
        cursor: 'default', userSelect: 'none', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(61,220,132,0.3) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        transform: `translateY(${-swipeProgress * 40}px)`,
        transition: swiping ? 'none' : 'transform 0.3s ease',
        marginTop: -40,
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontSize: 84, fontWeight: 200, letterSpacing: -2,
            color: 'rgba(255,255,255,0.95)', lineHeight: 1,
            fontFamily: "'Inter', 'Google Sans', sans-serif",
            fontVariantNumeric: 'tabular-nums',
          }}>
            {time.hours}:{time.minutes}
          </div>
          <div style={{
            fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.6)',
            marginTop: 6, letterSpacing: 0.5,
          }}>
            {date.weekday}, {date.month} {date.day}
          </div>
        </motion.div>

        {tapSequence > 0 && tapSequence < 5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 16, color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: 1 }}>
            {5 - tapSequence} taps remaining
          </motion.div>
        )}

        {charging && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: 24, display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(61,220,132,0.12)',
              padding: '8px 18px', borderRadius: 100,
              border: '1px solid rgba(61,220,132,0.2)',
              color: '#3ddc84', fontSize: 13, fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#3ddc84">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
            <span>{Math.round(batteryLevel * 100)}%</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span style={{ opacity: 0.7 }}>Charging</span>
          </motion.div>
        )}
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        marginBottom: 24, padding: '0 20px',
      }}>
        <AnimatePresence>
          {notifications.slice(0, 3).map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: 0.1 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => { e.stopPropagation(); onUnlock(); }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                borderRadius: 16, padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: n.color + '26', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ color: n.color, fontSize: 22, fontVariationSettings: "'FILL' 1" }}>{n.icon.toLowerCase()}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.95)', marginBottom: 2 }}>{n.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.text}</div>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>{n.time}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{ y: swiping ? 8 : 0, opacity: swiping ? 0.3 : 0.6 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          paddingBottom: 24, color: 'rgba(255,255,255,0.6)',
        }}
      >
        <div style={{
          width: 120, height: 4, borderRadius: 2,
          background: swipeProgress > 0
            ? `linear-gradient(90deg, #3ddc84 ${swipeProgress * 100}%, rgba(255,255,255,0.12) ${swipeProgress * 100}%)`
            : 'rgba(255,255,255,0.12)',
          marginBottom: 8, transition: 'background 0.1s',
        }} />
        <span style={{ fontSize: 11, opacity: 0.5 }}>Swipe up to unlock</span>
      </motion.div>
    </motion.div>
  );
};

export default LockScreen;
