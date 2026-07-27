import React from 'react';
import AppIcon from './AppIcon';
import { ALL_APPS, DOCK_APPS } from '../data/apps';

interface DockProps {
  onOpenApp: (id: string) => void;
}

const Dock: React.FC<DockProps> = ({ onOpenApp }) => {
  const dockApps = DOCK_APPS.map(id => ALL_APPS.find(a => a.id === id)).filter(Boolean);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 12, padding: '8px 20px',
      margin: '0 16px 12px', borderRadius: 28,
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      {dockApps.map((app, i) =>
        app ? (
          <React.Fragment key={app.id}>
            {i > 0 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.06)' }} />}
            <AppIcon app={app} size={50} onOpen={onOpenApp} showLabel={false} />
          </React.Fragment>
        ) : null
      )}
    </div>
  );
};

export default Dock;
