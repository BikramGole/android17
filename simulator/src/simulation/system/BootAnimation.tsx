import React from 'react';
import { motion } from 'framer-motion';

interface BootAnimationProps {
  progress: number;
}

const BOOT_PHASES = [
  { at: 0.15, label: 'Loading kernel...' },
  { at: 0.35, label: 'Starting services...' },
  { at: 0.55, label: 'Initializing system...' },
  { at: 0.75, label: 'Loading launcher...' },
  { at: 0.9, label: 'Almost ready...' },
];

const BootAnimation: React.FC<BootAnimationProps> = ({ progress }) => {
  const currentPhase = BOOT_PHASES.filter(p => progress >= p.at).pop();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#050805',
        color: '#f3f7f4',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ marginBottom: 32 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#3ddc84" strokeWidth="2" opacity={0.3} />
            <circle cx="24" cy="24" r="22" stroke="#3ddc84" strokeWidth="2"
              strokeDasharray={`${progress * 138}`} strokeDashoffset="0"
              strokeLinecap="round" transform="rotate(-90 24 24)"
              style={{ transition: 'stroke-dasharray 0.1s ease' }}
            />
            <text x="24" y="28" textAnchor="middle" fill="#3ddc84"
              fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
              {Math.round(progress * 100)}%
            </text>
          </svg>
        </div>

        <div style={{
          fontSize: 13, color: 'rgba(243,247,244,0.5)',
          fontFamily: "'Inter', sans-serif", fontWeight: 500,
          letterSpacing: 0.5, marginBottom: 48,
        }}>
          {currentPhase?.label || 'Starting Android 17...'}
        </div>

        <div style={{
          width: 200, height: 3, borderRadius: 2,
          background: 'rgba(61,220,132,0.15)',
          margin: '0 auto', overflow: 'hidden',
        }}>
          <motion.div
            style={{
              height: '100%', borderRadius: 2,
              background: 'linear-gradient(90deg, #3ddc84, #8ab4f8)',
            }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.3 ? 1 : 0 }}
        style={{
          position: 'absolute', bottom: 48,
          fontSize: 10, color: 'rgba(243,247,244,0.2)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Android 17 · Cinnamon Bun
      </motion.div>
    </motion.div>
  );
};

export default BootAnimation;
