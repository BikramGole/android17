import React from 'react';

interface StatusBarProps {
  time: { hours: string; minutes: string; ampm: string };
  batteryLevel: number;
  charging: boolean;
  wifiOn: boolean;
  bluetoothOn: boolean;
  darkMode: boolean;
  invert?: boolean;
  onClick?: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ time, batteryLevel, charging, wifiOn, bluetoothOn, darkMode: _darkMode, invert, onClick }) => {
  const c = invert ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)';
  const cd = invert ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)';
  const fill = charging ? '#3ddc84' : c;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '4px 20px', height: 28, fontSize: 12, fontWeight: 600,
        color: c, zIndex: 100, flexShrink: 0,
        background: 'transparent',
        WebkitBackdropFilter: 'blur(0)',
        position: 'relative',
      }}
    >
      <span style={{ fontWeight: 600 }}>{time.hours}:{time.minutes}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {bluetoothOn && (
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: cd, fontVariationSettings: "'FILL' 1" }}>bluetooth</span>
        )}
        {wifiOn && (
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: cd, fontVariationSettings: "'FILL' 1" }}>wifi</span>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{
            position: 'relative', width: 22, height: 11,
            borderRadius: 3, border: `1.5px solid ${cd}`,
            display: 'flex', alignItems: 'center', padding: '1px',
          }}>
            <div style={{
              height: 7, width: `${Math.min(batteryLevel * 100, 100)}%`,
              borderRadius: 1.5, background: fill,
              transition: 'width 0.3s ease, background 0.3s ease',
            }} />
            {charging && (
              <span style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 8, color: '#050805', fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
