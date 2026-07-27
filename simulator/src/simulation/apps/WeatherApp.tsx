import React, { useState } from 'react';

interface Forecast {
  day: string;
  icon: string;
  high: number;
  low: number;
  condition: string;
}

const CURRENT = {
  temp: 72,
  condition: 'Partly Cloudy',
  icon: 'partly_cloudy_day',
  location: 'San Francisco',
  high: 76,
  low: 58,
  humidity: 62,
  wind: 12,
  uv: 5,
};

const FORECAST: Forecast[] = [
  { day: 'Tue', icon: 'sunny', high: 78, low: 60, condition: 'Sunny' },
  { day: 'Wed', icon: 'cloud', high: 72, low: 57, condition: 'Cloudy' },
  { day: 'Thu', icon: 'rainy', high: 65, low: 52, condition: 'Rain' },
  { day: 'Fri', icon: 'partly_cloudy_day', high: 70, low: 55, condition: 'Partly Cloudy' },
  { day: 'Sat', icon: 'sunny', high: 80, low: 62, condition: 'Sunny' },
];

const HOURS = [
  { time: 'Now', temp: 72, icon: 'partly_cloudy_day' },
  { time: '1PM', temp: 74, icon: 'partly_cloudy_day' },
  { time: '2PM', temp: 75, icon: 'sunny' },
  { time: '3PM', temp: 76, icon: 'sunny' },
  { time: '4PM', temp: 75, icon: 'sunny' },
  { time: '5PM', temp: 73, icon: 'partly_cloudy_day' },
  { time: '6PM', temp: 70, icon: 'partly_cloudy_day' },
  { time: '7PM', temp: 67, icon: 'cloud' },
];

const WeatherApp: React.FC = () => {
  const [unit, _setUnit] = useState<'F' | 'C'>('F');

  const toC = (f: number) => Math.round((f - 32) * 5 / 9);
  const displayTemp = (f: number) => unit === 'F' ? `${f}°` : `${toC(f)}°`;

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0b1a33 0%, #162d50 50%, #1a3a5c 100%)',
      overflow: 'auto', color: 'rgba(255,255,255,0.9)',
    }}>
      <div style={{ padding: '16px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>{CURRENT.location}</div>
          <div style={{ fontSize: 48, fontWeight: 200, letterSpacing: -1 }}>{displayTemp(CURRENT.temp)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{CURRENT.condition}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
            H: {displayTemp(CURRENT.high)} L: {displayTemp(CURRENT.low)}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 4, overflow: 'auto', padding: '8px 16px 16px',
        WebkitOverflowScrolling: 'touch',
      }}>
        {HOURS.map((h, i) => (
          <div key={h.time} style={{
            flexShrink: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, padding: '8px 12px',
            borderRadius: 16,
            background: i === 0 ? 'rgba(255,255,255,0.06)' : 'transparent',
            minWidth: 56,
          }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{h.time}</div>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>{h.icon}</span>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{displayTemp(h.temp)}</div>
          </div>
        ))}
      </div>

      <div style={{
        margin: '0 16px 16px', padding: '12px 16px', borderRadius: 16,
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Humidity</div>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{CURRENT.humidity}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Wind</div>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{CURRENT.wind} mph</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>UV Index</div>
          <div style={{ fontSize: 16, fontWeight: 500 }}>{CURRENT.uv}</div>
        </div>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontWeight: 600, letterSpacing: 0.5 }}>7-DAY FORECAST</div>
        {FORECAST.map(f => (
          <div key={f.day} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)',
          }}>
            <div style={{ width: 40, fontSize: 13, fontWeight: 500 }}>{f.day}</div>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', width: 24 }}>{f.icon}</span>
            <div style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{f.condition}</div>
            <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>{displayTemp(f.high)}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>{displayTemp(f.low)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
