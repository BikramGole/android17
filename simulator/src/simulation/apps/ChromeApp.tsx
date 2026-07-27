import React, { useState } from 'react';

const BOOKMARKS = [
  { name: 'Google', url: 'https://google.com', icon: 'google' },
  { name: 'GitHub', url: 'https://github.com', icon: 'code' },
  { name: 'Android', url: 'https://developer.android.com', icon: 'android' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'play_circle' },
];

const SEARCH_SUGGESTIONS = [
  'Android 17 features',
  'Material You design',
  'Gemini Nano',
  'Jetpack Compose',
  'Modern Android development',
];

const ChromeApp: React.FC = () => {
  const [url, setUrl] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navStack, setNavStack] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    const q = query.trim();
    if (!q) return;
    const isUrl = q.startsWith('http://') || q.startsWith('https://') || q.includes('.');
    const finalUrl = isUrl
      ? (q.startsWith('http') ? q : 'https://' + q)
      : `https://www.google.com/search?q=${encodeURIComponent(q)}`;
    setNavStack(prev => [...prev, finalUrl]);
    setCurrentPage(finalUrl);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
    setUrl('');
    setShowSuggestions(false);
  };

  const goBack = () => {
    if (navStack.length <= 1) { setCurrentPage(null); setNavStack([]); return; }
    const newStack = navStack.slice(0, -1);
    setNavStack(newStack);
    setCurrentPage(newStack[newStack.length - 1]);
  };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0f0f1a', overflow: 'hidden',
    }}>
      <div style={{
        padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
        background: '#0f0f1a', borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div onClick={goBack} style={{ opacity: navStack.length > 0 ? 1 : 0.3, cursor: navStack.length > 0 ? 'pointer' : 'default' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)' }}>arrow_back</span>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.06)', borderRadius: 20,
            padding: '6px 12px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>search</span>
            <input
              value={url}
              onChange={e => { setUrl(e.target.value); setShowSuggestions(true); }}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(url); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={currentPage ? new URL(currentPage).hostname : 'Search or enter URL'}
              style={{
                flex: 1, border: 'none', background: 'transparent', outline: 'none',
                color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 400,
              }}
            />
            {loading && <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(61,220,132,0.3)', borderTopColor: '#3ddc84', animation: 'spin 0.6s linear infinite' }} />}
          </div>

          {showSuggestions && !currentPage && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
              background: '#1a1a2e', borderRadius: 12, padding: 8,
              border: '1px solid rgba(255,255,255,0.06)', zIndex: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              {SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().includes(url.toLowerCase())).map(s => (
                <div key={s} onClick={() => handleSearch(s)}
                  style={{ padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 8 }}
                  onMouseEnter={e => (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.background = 'transparent'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>history</span>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>more_vert</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {currentPage ? (
          <div style={{ padding: 16, textAlign: 'center' }}>
            {loading ? (
              <div style={{ padding: 60, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid rgba(61,220,132,0.2)', borderTopColor: '#3ddc84', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                Loading {new URL(currentPage).hostname}...
              </div>
            ) : (
              <div>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, margin: '0 auto 12px',
                  background: 'linear-gradient(135deg, #4285f4, #34a853, #fbbc04, #ea4335)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: '#fff', fontVariationSettings: "'FILL' 1" }}>travel_explore</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>
                  {new URL(currentPage).hostname}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 20, wordBreak: 'break-all' }}>
                  {currentPage}
                </div>
                <div style={{
                  padding: '12px 20px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'inline-block',
                  color: 'rgba(255,255,255,0.5)', fontSize: 12,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 6 }}>lock</span>
                  Connection secure
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: 20 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
              marginBottom: 24, paddingTop: 8,
            }}>
              {BOOKMARKS.map(b => (
                <div key={b.name} onClick={() => handleSearch(b.url)}
                  style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'rgba(255,255,255,0.06)', margin: '0 auto 6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>{b.icon}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{b.name}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 8, paddingLeft: 4 }}>
              TRENDING ON ANDROID
            </div>
            {['Android 17 Beta features', 'Gemini on-device AI', 'Material You 3.0', 'Compose multiplatform'].map((item, i) => (
              <div key={item} onClick={() => handleSearch(item)}
                style={{ padding: '10px 12px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => (e.target as HTMLElement).style.background = 'transparent'}
              >
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', width: 16 }}>{i + 1}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)' }}>trending_up</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChromeApp;
