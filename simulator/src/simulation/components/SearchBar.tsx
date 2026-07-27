import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div style={{
      margin: '8px 16px', padding: '10px 16px',
      borderRadius: 24, display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.06)',
      cursor: 'text',
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)', fontVariationSettings: "'FILL' 0" }}>
        search
      </span>
      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', flex: 1 }}>
        Search apps &amp; more
      </span>
      <span style={{
        fontSize: 10, color: 'rgba(255,255,255,0.25)',
        background: 'rgba(255,255,255,0.06)', padding: '2px 6px',
        borderRadius: 4, fontWeight: 500, letterSpacing: 0.5,
      }}>
        G
      </span>
    </div>
  );
};

export default SearchBar;
