import React from 'react';
import AppIcon from './AppIcon';
import { ALL_APPS, DEFAULT_HOME_APPS } from '../data/apps';
import type { AppDefinition } from '../data/apps';

interface AppGridProps {
  onOpenApp: (id: string) => void;
  apps?: string[];
  columns?: number;
}

const AppGrid: React.FC<AppGridProps> = ({ onOpenApp, apps = DEFAULT_HOME_APPS, columns = 4 }) => {
  const appDefs: (AppDefinition | undefined)[] = apps.map(id => ALL_APPS.find(a => a.id === id));

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: 8,
    padding: '8px 12px',
    justifyItems: 'center',
  };

  return (
    <div style={gridStyle}>
      {appDefs.map((app, i) =>
        app ? (
          <AppIcon key={app.id} app={app} onOpen={onOpenApp} />
        ) : (
          <div key={i} style={{ width: 64 }} />
        )
      )}
    </div>
  );
};

export default AppGrid;
