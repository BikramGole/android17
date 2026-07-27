import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AppGrid from '../components/AppGrid';
import Dock from '../components/Dock';
import StatusBar from '../components/StatusBar';
import NavigationBar from '../components/NavigationBar';

interface HomeScreenProps {
  onOpenApp: (id: string) => void;
  onOpenDrawer: () => void;
  onOpenShade: () => void;
  onBack: () => void;
  onHome: () => void;
  time: { hours: string; minutes: string; ampm: string };
  batteryLevel: number;
  charging: boolean;
  wifiOn: boolean;
  bluetoothOn: boolean;
  darkMode: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenApp, onOpenDrawer, onOpenShade,
  onBack, onHome, time, batteryLevel, charging,
  wifiOn, bluetoothOn, darkMode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(10,10,26,0.95), rgba(5,5,15,0.98))',
      }}
    >
      <StatusBar
        time={time}
        batteryLevel={batteryLevel}
        charging={charging}
        wifiOn={wifiOn}
        bluetoothOn={bluetoothOn}
        darkMode={darkMode}
        onClick={onOpenShade}
      />

      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
        onPointerDown={e => {
          if (e.clientY > 100) return;
          const diff = e.clientY;
          if (diff < 30) onOpenShade();
        }}
      >
        <div style={{ paddingTop: 8 }}>
          <SearchBar />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AppGrid onOpenApp={onOpenApp} />
        </div>
      </div>

      <Dock onOpenApp={onOpenApp} />

      <div
        style={{
          display: 'flex', justifyContent: 'center', padding: '4px 0',
          cursor: 'pointer', opacity: 0.5,
        }}
        onClick={onOpenDrawer}
      >
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </motion.div>
      </div>

      <NavigationBar onBack={onBack} onHome={onHome} />
    </motion.div>
  );
};

export default HomeScreen;
