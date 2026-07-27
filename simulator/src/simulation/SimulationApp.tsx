import React, { useMemo, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSimulationState } from './hooks/useSimulationState';
import LockScreen from './screens/LockScreen';
import HomeScreen from './screens/HomeScreen';
import AppDrawer from './screens/AppDrawer';
import NotificationShade from './system/NotificationShade';
import { ALL_APPS } from './data/apps';

const CalculatorApp = lazy(() => import('./apps/CalculatorApp'));
const SettingsApp = lazy(() => import('./apps/SettingsApp'));
const CameraApp = lazy(() => import('./apps/CameraApp'));
const ClockApp = lazy(() => import('./apps/ClockApp'));
const ChromeApp = lazy(() => import('./apps/ChromeApp'));
const GeminiApp = lazy(() => import('./apps/GeminiApp'));
const WeatherApp = lazy(() => import('./apps/WeatherApp'));

const APP_COMPONENTS: Record<string, React.LazyExoticComponent<React.FC>> = {
  calculator: CalculatorApp,
  settings: SettingsApp,
  camera: CameraApp,
  clock: ClockApp,
  chrome: ChromeApp,
  gemini: GeminiApp,
  weather: WeatherApp,
};

const AppView: React.FC<{ appId: string; onClose: () => void }> = ({ appId, onClose }) => {
  const app = ALL_APPS.find(a => a.id === appId);
  const Comp = APP_COMPONENTS[appId];

  return (
    <motion.div
      key={appId}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        background: '#0a0a0f', zIndex: 200,
        borderRadius: 0, overflow: 'hidden',
      }}
    >
      {Comp ? (
        <Suspense fallback={
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            Loading...
          </div>
        }>
          <Comp />
        </Suspense>
      ) : (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 40, textAlign: 'center',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: (app?.color || '#666') + '33',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: 36, color: app?.color || '#666',
              fontVariationSettings: "'FILL' 1",
            }}>
              {app?.icon.toLowerCase() || 'apps'}
            </span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>
            {app?.name || appId}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
            Interactive demo coming soon
          </div>
          <div
            onClick={onClose}
            style={{
              padding: '10px 28px', borderRadius: 24,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.7)', fontSize: 14, cursor: 'pointer',
            }}
          >
            Close
          </div>
        </div>
      )}
    </motion.div>
  );
};

const SimulationApp: React.FC = () => {
  const sim = useSimulationState();

  const qsTiles = useMemo(() => [
    { id: 'wifi', label: 'Wi‑Fi', icon: 'wifi', active: sim.wifiOn, toggle: sim.toggleWifi },
    { id: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth', active: sim.bluetoothOn, toggle: sim.toggleBluetooth },
    { id: 'dnd', label: 'DND', icon: 'do_not_disturb', active: sim.dndOn, toggle: sim.toggleDnd },
    { id: 'flashlight', label: 'Flashlight', icon: 'flashlight_on', active: sim.flashlightOn, toggle: sim.toggleFlashlight },
    { id: 'airplane', label: 'Airplane', icon: 'airplanemode_active', active: sim.airplaneMode, toggle: sim.toggleAirplane },
    { id: 'location', label: 'Location', icon: 'location_on', active: sim.locationOn, toggle: sim.toggleLocation },
    { id: 'darkmode', label: 'Dark mode', icon: 'dark_mode', active: sim.darkMode, toggle: sim.toggleDarkMode },
    { id: 'battery', label: 'Battery', icon: 'battery_full', active: true, toggle: () => {} },
  ], [sim.wifiOn, sim.bluetoothOn, sim.dndOn, sim.flashlightOn, sim.airplaneMode, sim.locationOn, sim.darkMode]);

  return (
    <div
      style={{
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
        fontFamily: "'Inter', 'Google Sans', system-ui, -apple-system, sans-serif",
        background: '#050508',
      }}
    >
      <div
        onPointerDown={e => sim.handleTouchStart(e.clientY)}
        onPointerUp={e => sim.handleTouchEnd(e.clientY)}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <AnimatePresence mode="wait">
          {sim.locked ? (
            <LockScreen
              key="lock"
              time={sim.time}
              date={sim.date}
              charging={sim.charging}
              batteryLevel={sim.batteryLevel}
              notifications={sim.notifications}
              onUnlock={sim.unlock}
              onOpenShade={sim.openShade}
            />
          ) : (
            <HomeScreen
              key="home"
              onOpenApp={sim.openApp}
              onOpenDrawer={sim.toggleDrawer}
              onOpenShade={sim.openShade}
              onBack={sim.goBack}
              onHome={sim.goHome}
              time={sim.time}
              batteryLevel={sim.batteryLevel}
              charging={sim.charging}
              wifiOn={sim.wifiOn}
              bluetoothOn={sim.bluetoothOn}
              darkMode={sim.darkMode}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sim.openedApp && (
            <AppView
              key={sim.openedApp}
              appId={sim.openedApp}
              onClose={sim.closeApp}
            />
          )}
        </AnimatePresence>

        <AppDrawer
          open={sim.drawerOpen}
          onClose={() => sim.toggleDrawer()}
          onOpenApp={sim.openApp}
        />

        <NotificationShade
          open={sim.notificationShade}
          onClose={sim.closeShade}
          tiles={qsTiles}
          brightness={sim.brightness}
          volume={sim.volume}
          onBrightnessChange={sim.setBrightness}
          onVolumeChange={sim.setVolume}
          notifications={sim.notifications}
          darkMode={sim.darkMode}
        />
      </div>

      <style>{`
        @keyframes ripple-effect {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(20); opacity: 0; }
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; border: none;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #fff; border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SimulationApp;
