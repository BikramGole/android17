import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { AppDefinition } from '../data/apps';

interface AppIconProps {
  app: AppDefinition;
  size?: number;
  onOpen: (id: string) => void;
  showLabel?: boolean;
}

const RIPPLE_DURATION = 600;

const AppIcon: React.FC<AppIconProps> = ({ app, size = 56, onOpen, showLabel = true }) => {
  const [pressing, setPressing] = useState(false);
  const [rippleId, setRippleId] = useState(0);

  const handleClick = useCallback((_e: React.MouseEvent | React.KeyboardEvent) => {
    const id = Date.now();
    setRippleId(id);
    setTimeout(() => setRippleId(0), RIPPLE_DURATION);
    onOpen(app.id);
  }, [app.id, onOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  }, [handleClick]);

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
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPressing(true)}
      onMouseLeave={() => setPressing(false)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${app.name}`}
      aria-description={app.description}
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
        {rippleId > 0 && (
          <span style={{
            position: 'absolute', left: '50%', top: '50%',
            width: 16, height: 16, borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: `ripple-effect ${RIPPLE_DURATION}ms ease-out`,
            pointerEvents: 'none',
          }} />
        )}
        <span className="material-symbols-outlined" style={{
          fontSize: iconSize, color: app.color,
          fontVariationSettings: "'FILL' 1, 'wght' 300",
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
          pointerEvents: 'none',
        }} aria-hidden="true">
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

export default React.memo(AppIcon);
