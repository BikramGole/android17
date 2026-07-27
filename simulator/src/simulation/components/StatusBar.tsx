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

const StatusBar: React.FC<StatusBarProps> = ({ time, batteryLevel, charging, wifiOn, bluetoothOn, invert, onClick }) => {
  const c = invert ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)';
  const cd = invert ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)';
  const fill = charging ? '#3ddc84' : c;

  return (
    <div
      onClick={onClick}
      role="status"
      aria-label={`Status bar, ${time.hours}:${time.minutes}, battery ${Math.round(batteryLevel * 100)}%`}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '4px 20px', height: 28, fontSize: 12, fontWeight: 600,
        color: c, zIndex: 100, flexShrink: 0,
        background: 'transparent',
        position: 'relative',
      }}
    >
      <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{time.hours}:{time.minutes}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }} role="list" aria-label="Status indicators">
        {bluetoothOn && (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 14, color: cd, fontVariationSettings: "'FILL' 1" }}
            aria-label="Bluetooth on"
            role="listitem"
          >
            bluetooth
          </span>
        )}
        {wifiOn && (
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 15, color: cd, fontVariationSettings: "'FILL' 1" }}
            aria-label="Wi-Fi connected"
            role="listitem"
          >
            wifi
          </span>
        )}

        <div
          style={{
            position: 'relative', width: 22, height: 11,
            borderRadius: 3, border: `1.5px solid ${cd}`,
            display: 'flex', alignItems: 'center', padding: '1px',
          }}
          role="img"
          aria-label={`Battery ${Math.round(batteryLevel * 100)}%${charging ? ', charging' : ''}`}
        >
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
              <span className="material-symbols-outlined" style={{ fontSize: 8, color: '#050805', fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                bolt
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
