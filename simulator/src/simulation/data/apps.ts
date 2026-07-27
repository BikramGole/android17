export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'system' | 'google' | 'social' | 'media' | 'tools' | 'games';
  component?: string;
  description?: string;
}

export const ALL_APPS: AppDefinition[] = [
  { id: 'phone', name: 'Phone', icon: 'Phone', color: '#4CAF50', category: 'system', description: 'Make calls' },
  { id: 'messages', name: 'Messages', icon: 'Message', color: '#2196F3', category: 'social', description: 'Chat with friends' },
  { id: 'contacts', name: 'Contacts', icon: 'Contacts', color: '#03A9F4', category: 'system', description: 'Your contacts' },
  { id: 'camera', name: 'Camera', icon: 'CameraAlt', color: '#FF5722', category: 'media', component: 'CameraApp', description: 'Capture moments' },
  { id: 'photos', name: 'Photos', icon: 'PhotoLibrary', color: '#FF9800', category: 'media', description: 'Your gallery' },
  { id: 'clock', name: 'Clock', icon: 'AccessTime', color: '#00BCD4', category: 'system', component: 'ClockApp', description: 'Alarms & timer' },
  { id: 'calculator', name: 'Calculator', icon: 'Calculate', color: '#607D8B', category: 'tools', component: 'CalculatorApp', description: 'Math calculations' },
  { id: 'calendar', name: 'Calendar', icon: 'CalendarMonth', color: '#E91E63', category: 'tools', description: 'Your schedule' },
  { id: 'weather', name: 'Weather', icon: 'WbSunny', color: '#03A9F4', category: 'system', component: 'WeatherApp', description: 'Forecast' },
  { id: 'maps', name: 'Maps', icon: 'Map', color: '#4CAF50', category: 'google', description: 'Navigate' },
  { id: 'chrome', name: 'Chrome', icon: 'TravelExplore', color: '#FFC107', category: 'google', component: 'ChromeApp', description: 'Browse the web' },
  { id: 'gmail', name: 'Gmail', icon: 'Mail', color: '#EA4335', category: 'google', description: 'Email' },
  { id: 'drive', name: 'Drive', icon: 'Cloud', color: '#FFC107', category: 'google', description: 'Cloud storage' },
  { id: 'youtube', name: 'YouTube', icon: 'PlayCircle', color: '#FF0000', category: 'google', description: 'Watch videos' },
  { id: 'gemini', name: 'Gemini', icon: 'AutoAwesome', color: '#8E44AD', category: 'google', component: 'GeminiApp', description: 'AI assistant' },
  { id: 'settings', name: 'Settings', icon: 'Settings', color: '#607D8B', category: 'system', component: 'SettingsApp', description: 'System settings' },
  { id: 'files', name: 'Files', icon: 'Folder', color: '#FF9800', category: 'system', description: 'File manager' },
  { id: 'playstore', name: 'Play Store', icon: 'Shop', color: '#4CAF50', category: 'google', description: 'Get apps' },
  { id: 'gallery', name: 'Gallery', icon: 'Collections', color: '#FF5722', category: 'media', component: 'GalleryApp', description: 'View photos' },
  { id: 'recorder', name: 'Recorder', icon: 'Mic', color: '#E91E63', category: 'tools', description: 'Record audio' },
  { id: 'wallet', name: 'Wallet', icon: 'AccountBalanceWallet', color: '#2196F3', category: 'google', description: 'Payments' },
  { id: 'news', name: 'News', icon: 'Newspaper', color: '#607D8B', category: 'google', description: 'Top stories' },
  { id: 'health', name: 'Health', icon: 'Favorite', color: '#4CAF50', category: 'system', description: 'Health tracking' },
  { id: 'game', name: 'Game Space', icon: 'SportsEsports', color: '#9C27B0', category: 'games', description: 'Gaming mode' },
];

export const DEFAULT_HOME_APPS = [
  'phone', 'messages', 'camera', 'photos', 'chrome', 'clock',
  'calendar', 'weather', 'calculator', 'maps', 'gmail', 'settings',
  'youtube', 'gemini', 'files', 'playstore', 'drive', 'gallery'
];

export const DOCK_APPS = ['phone', 'messages', 'chrome', 'camera'];
