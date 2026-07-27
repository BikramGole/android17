import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Tab = 'alarm' | 'timer' | 'stopwatch';

const ClockApp: React.FC = () => {
  const [tab, setTab] = useState<Tab>('alarm');
  const [time, setTime] = useState(new Date());
  const [swRunning, setSwRunning] = useState(false);
  const [swTime, setSwTime] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(0);
  const swRef = useRef(0);
  const timerRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (swRunning) {
      const start = Date.now() - swTime;
      swRef.current = window.setInterval(() => {
        setSwTime(Date.now() - start);
      }, 10);
    } else {
      clearInterval(swRef.current);
    }
    return () => clearInterval(swRef.current);
  }, [swRunning, swTime]);

  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setTimerRemaining(prev => {
          if (prev <= 1) { setTimerRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerRemaining]);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatSw = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const formatCountdown = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimerRemaining(timerMinutes * 60 + timerSeconds);
    setTimerRunning(true);
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'alarm', label: 'Alarm', icon: 'alarm' },
    { id: 'timer', label: 'Timer', icon: 'timer' },
    { id: 'stopwatch', label: 'Stopwatch', icon: 'stopwatch' },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0a0a12', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 0,
        padding: '8px 16px', background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, padding: '10px 0', cursor: 'pointer',
              borderBottom: tab === t.id ? '2px solid #3ddc84' : '2px solid transparent',
              color: tab === t.id ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: 500, transition: 'color 0.2s',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>
              {t.icon}
            </span>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        {tab === 'alarm' && (
          <motion.div key="alarm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 72, fontWeight: 200, color: 'rgba(255,255,255,0.95)', letterSpacing: -2, marginBottom: 8 }}>
              {formatTime(time)}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 24px', borderRadius: 16,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#3ddc84', fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>07:00 AM</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Weekdays</div>
              </div>
              <div style={{
                width: 40, height: 22, borderRadius: 11, padding: 2, marginLeft: 'auto',
                background: '#3ddc84', cursor: 'pointer', flexShrink: 0,
              }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', transform: 'translateX(18px)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'stopwatch' && (
          <motion.div key="sw" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 56, fontWeight: 200, color: 'rgba(255,255,255,0.95)', letterSpacing: -1, fontVariantNumeric: 'tabular-nums', marginBottom: 40 }}>
              {formatSw(swTime)}
            </div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              {!swRunning ? (
                <div onClick={() => setSwRunning(true)}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(61,220,132,0.15)', border: '2px solid rgba(61,220,132,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#3ddc84', fontSize: 14, fontWeight: 600 }}
                >Start</div>
              ) : (
                <div onClick={() => setSwRunning(false)}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(244,67,54,0.15)', border: '2px solid rgba(244,67,54,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef5350', fontSize: 14, fontWeight: 600 }}
                >Stop</div>
              )}
              <div onClick={() => { setSwTime(0); setSwRunning(false); }}
                style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}
              >Reset</div>
            </div>
          </motion.div>
        )}

        {tab === 'timer' && (
          <motion.div key="timer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 56, fontWeight: 200, color: timerRunning && timerRemaining <= 10 ? '#ef5350' : 'rgba(255,255,255,0.95)', letterSpacing: -1, fontVariantNumeric: 'tabular-nums', marginBottom: 24 }}>
              {timerRunning ? formatCountdown(timerRemaining) : `${timerMinutes.toString().padStart(2,'0')}:${timerSeconds.toString().padStart(2,'0')}`}
            </div>
            {!timerRunning ? (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
                <div onClick={() => setTimerMinutes(prev => Math.min(prev + 1, 99))}
                  style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                  <span className="material-symbols-outlined">add</span>
                </div>
                <div onClick={() => { if (timerMinutes > 0 || timerSeconds > 0) { if (timerSeconds === 0) setTimerMinutes(prev => Math.max(prev - 1, 0)); else setTimerSeconds(0); } }}
                  style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                  <span className="material-symbols-outlined">remove</span>
                </div>
              </div>
            ) : null}
            {!timerRunning ? (
              <div onClick={startTimer}
                style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto', background: 'rgba(61,220,132,0.15)', border: '2px solid rgba(61,220,132,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#3ddc84', fontSize: 14, fontWeight: 600 }}
              >Start</div>
            ) : (
              <div onClick={() => { setTimerRunning(false); setTimerRemaining(0); }}
                style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto', background: 'rgba(244,67,54,0.15)', border: '2px solid rgba(244,67,54,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef5350', fontSize: 14, fontWeight: 600 }}
              >Cancel</div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClockApp;
