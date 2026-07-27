import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          role="alert"
          style={{
            padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.7)',
            background: '#0a0a0f', borderRadius: 12,
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#ef5350', marginBottom: 12, display: 'block' }}>
            error
          </span>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>Something went wrong</h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function LoadingFallback({ label = 'Loading...' }: { label?: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 80, color: 'rgba(255,255,255,0.3)', fontSize: 13,
        flexDirection: 'column', gap: 12,
      }}
    >
      <div
        style={{
          width: 24, height: 24, borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.1)',
          borderTopColor: '#3ddc84',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {label}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
