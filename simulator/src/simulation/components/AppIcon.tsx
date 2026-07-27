import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { AppDefinition } from '../data/apps';

interface AppIconProps {
  app: AppDefinition;
  size?: number;
  onOpen: (id: string) => void;
  showLabel?: boolean;
}

const AppIcon: React.FC<AppIconProps> = ({ app, size = 56, onOpen, showLabel = true }) => {
  const [pressing, setPressing] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    onOpen(app.id);
  };

  const iconSize = size * 0.6;

  return (
    <motion.div
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', damping: 15, stiffness: 400 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 4, width: size + 16, cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent', position: 'relative',
      }}
      onClick={handleClick}
      onMouseEnter={() => setPressing(true)}
      onMouseLeave={() => setPressing(false)}
    >
      <div style={{
        width: size, height: size, borderRadius: size * 0.36,
        background: `linear-gradient(135deg, ${app.color}22, ${app.color}44)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 0.2s ease',
        transform: pressing ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: pressing ? `0 8px 24px ${app.color}33` : '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        {ripples.map(r => (
          <span key={r.id} style={{
            position: 'absolute', left: r.x - 8, top: r.y - 8,
            width: 16, height: 16, borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            transform: 'scale(0)', animation: 'ripple-effect 0.6s ease-out',
            pointerEvents: 'none',
          }} />
        ))}
        <span className="material-symbols-outlined" style={{
          fontSize: iconSize, color: app.color,
          fontVariationSettings: "'FILL' 1, 'wght' 300",
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
        }}>
          {app.icon.toLowerCase()}
        </span>
      </div>
      {showLabel && (
        <span style={{
          fontSize: 11, fontWeight: 500,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center', lineHeight: 1.2,
          maxWidth: size + 8, overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {app.name}
        </span>
      )}
    </motion.div>
  );
};

export default AppIcon;
