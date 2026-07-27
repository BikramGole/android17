import { useState, useCallback, useRef, useEffect } from 'react';

export type ScreenState = 'lock' | 'home' | 'app' | 'drawer' | 'recents';

export interface SimulationState {
  screen: ScreenState;
  locked: boolean;
  openedApp: string | null;
  drawerOpen: boolean;
  notificationShade: boolean;
  brightness: number;
  volume: number;
  darkMode: boolean;
  batteryLevel: number;
  charging: boolean;
  wifiOn: boolean;
  bluetoothOn: boolean;
  dndOn: boolean;
  flashlightOn: boolean;
  airplaneMode: boolean;
  locationOn: boolean;
  time: { hours: string; minutes: string; ampm: string };
  date: { day: number; weekday: string; month: string };
  notifications: NotificationData[];
}

export interface NotificationData {
  id: string;
  app: string;
  icon: string;
  title: string;
  text: string;
  time: string;
  color: string;
  expanded?: boolean;
}

function pad(n: number): string { return n < 10 ? '0' + n : '' + n; }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getTime() {
  const now = new Date();
  const h = now.getHours();
  return {
    hours: pad(h % 12 || 12),
    minutes: pad(now.getMinutes()),
    ampm: h >= 12 ? 'PM' : 'AM',
  };
}

function getDate() {
  const now = new Date();
  return {
    day: now.getDate(),
    weekday: DAYS[now.getDay()],
    month: MONTHS[now.getMonth()],
  };
}

const SAMPLE_NOTIFICATIONS: NotificationData[] = [
  { id: 'n1', app: 'Messages', icon: 'Message', title: 'Alex Johnson', text: 'Hey! Are we still on for lunch today?', time: '2m ago', color: '#2196F3' },
  { id: 'n2', app: 'Gmail', icon: 'Mail', title: 'Sarah Chen', text: 'Updated project timeline attached', time: '15m ago', color: '#EA4335' },
  { id: 'n3', app: 'Calendar', icon: 'CalendarMonth', title: 'Team Meeting', text: 'Android 17 sync in 30 mins', time: '28m ago', color: '#E91E63' },
  { id: 'n4', app: 'Gemini', icon: 'AutoAwesome', title: 'Daily briefing ready', text: 'Your personalized news and weather summary', time: '1h ago', color: '#8E44AD' },
  { id: 'n5', app: 'Updates', icon: 'SystemUpdate', title: 'System update available', text: 'Android 17 security patch (July 2026)', time: '3h ago', color: '#4CAF50' },
];

export function useSimulationState() {
  const [screen, setScreen] = useState<ScreenState>('lock');
  const [locked, setLocked] = useState(true);
  const [openedApp, setOpenedApp] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationShade, setNotificationShade] = useState(false);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(65);
  const [darkMode, setDarkMode] = useState(false);
  const [batteryLevel] = useState(0.87);
  const [charging] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [dndOn, setDndOn] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [locationOn, setLocationOn] = useState(true);
  const [time, setTime] = useState(getTime);
  const [date] = useState(getDate);
  const [notifications] = useState(SAMPLE_NOTIFICATIONS);
  const [booted, setBooted] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime), 1000);
    return () => clearInterval(timer);
  }, []);

  const boot = useCallback(() => setBooted(true), []);

  const unlock = useCallback(() => {
    setLocked(false);
    setScreen('home');
  }, []);

  const openApp = useCallback((appId: string) => {
    setOpenedApp(appId);
    setScreen('app');
    setDrawerOpen(false);
  }, []);

  const closeApp = useCallback(() => {
    setOpenedApp(null);
    setScreen('home');
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const openShade = useCallback(() => setNotificationShade(true), []);
  const closeShade = useCallback(() => setNotificationShade(false), []);

  const toggleWifi = useCallback(() => setWifiOn(prev => !prev), []);
  const toggleBluetooth = useCallback(() => setBluetoothOn(prev => !prev), []);
  const toggleDnd = useCallback(() => setDndOn(prev => !prev), []);
  const toggleFlashlight = useCallback(() => setFlashlightOn(prev => !prev), []);
  const toggleAirplane = useCallback(() => setAirplaneMode(prev => { if (!prev) { setWifiOn(false); setBluetoothOn(false); } return !prev; }), []);
  const toggleLocation = useCallback(() => setLocationOn(prev => !prev), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  const goBack = useCallback(() => {
    if (openedApp) { closeApp(); return; }
    if (drawerOpen) { setDrawerOpen(false); return; }
  }, [openedApp, drawerOpen, closeApp]);

  const goHome = useCallback(() => {
    setOpenedApp(null);
    setScreen('home');
    setDrawerOpen(false);
  }, []);

  const handleTouchStart = useCallback((y: number) => { touchStartY.current = y; }, []);
  const handleTouchEnd = useCallback((y: number) => {
    const dy = y - touchStartY.current;
    if (Math.abs(dy) < 50) return;
    if (dy < -80 && screen === 'lock') { unlock(); return; }
    if (dy < -80 && screen === 'home') { openShade(); return; }
    if (dy > 80 && notificationShade) { closeShade(); return; }
    if (dy > 80 && screen === 'home' && !openedApp) { toggleDrawer(); return; }
  }, [screen, notificationShade, openedApp, unlock, openShade, closeShade, toggleDrawer]);

  return {
    screen, locked, openedApp, drawerOpen, notificationShade,
    brightness, volume, darkMode, batteryLevel, charging,
    wifiOn, bluetoothOn, dndOn, flashlightOn, airplaneMode, locationOn,
    time, date, notifications, booted,
    boot, unlock, openApp, closeApp, toggleDrawer,
    openShade, closeShade,
    toggleWifi, toggleBluetooth, toggleDnd, toggleFlashlight,
    toggleAirplane, toggleLocation, toggleDarkMode,
    setBrightness, setVolume,
    goBack, goHome,
    handleTouchStart, handleTouchEnd,
  };
}

export type SimulationStateType = ReturnType<typeof useSimulationState>;
