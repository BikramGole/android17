import React from 'react';

interface NavigationBarProps {
  onBack: () => void;
  onHome: () => void;
  onRecents?: () => void;
  darkMode?: boolean;
  hasApp?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onBack, onHome, hasApp }) => {
  const c = 'rgba(255,255,255,0.6)';
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 48, padding: '6px 0', height: 36, flexShrink: 0,
      background: 'transparent',
    }}>
      <div onClick={onBack} style={{
        width: 24, height: 24, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        cursor: hasApp ? 'pointer' : 'default',
        opacity: hasApp ? 1 : 0.3,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
      <div onClick={onHome} style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: 48, height: 32, borderRadius: 16, border: `2px solid ${c}`, opacity: 0.4 }} />
      </div>
      <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </div>
    </div>
  );
};

export default NavigationBar;
