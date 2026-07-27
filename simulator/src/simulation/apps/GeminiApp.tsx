import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'gemini';
  text: string;
}

const SUGGESTIONS = [
  'Summarize Android 17 features',
  'What is Gemini Nano?',
  'Explain Generational GC',
  'Tell me about Material You',
  'What are AppFunctions?',
];

const RESPONSES: Record<string, string> = {
  'summarize android 17 features': 'Android 17 "Cinnamon Bun" introduces AI-first capabilities with Gemini Nano, a full privacy dashboard, AppFunctions for AI-agent interoperability, Generational GC for 2x faster garbage collection, adaptive layouts, Desktop Mode, Gaming Mode, and VVC/H.266 media support.',
  'what is gemini nano': 'Gemini Nano is Google\'s most efficient on-device AI model, running directly on Android 17 devices. It powers smart replies, summarization, transcription, and contextual suggestions — all without sending data to the cloud. It integrates with AppFunctions for AI-to-app communication.',
  'explain generational gc': 'Generational Garbage Collection in Android 17 categorizes heap memory into young and old generations. Most objects die young, so the GC scans only the young generation most of the time. This reduces GC pauses by up to 2x and improves app startup time, scrolling smoothness, and battery life.',
  'tell me about material you': 'Material You (Material Design 3) in Android 17 adds expressive color extraction, dynamic theming from wallpapers, adaptive layouts for any screen size, updated motion system with spring animations, and new components like navigation bar, search bar, and bottom sheet.',
  'what are appfunctions': 'AppFunctions is a framework in Android 17 that lets apps declare semantic capabilities — like "book a ride" or "order food" — that on-device AI agents can discover and invoke. Functions are defined in the manifest with input/output schemas. Users approve each call through privacy prompts.',
};

const WELCOME = "Hi! I'm Gemini, your on-device AI assistant. I can help you with Android 17 features, development questions, and more. What would you like to know?";

const GeminiApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{ role: 'gemini', text: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const lower = text.toLowerCase().replace(/[?.!]/g, '');
      let reply = '';
      for (const [key, val] of Object.entries(RESPONSES)) {
        if (lower.includes(key)) { reply = val; break; }
      }
      if (!reply) reply = "That's a great question! While I'm a simulation, you can explore the Android 17 website for detailed information about this feature. Try asking me about Gemini Nano, Generational GC, or Material You!";
      setMessages(prev => [...prev, { role: 'gemini', text: reply }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0a0a1a 0%, #0f0f20 100%)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'linear-gradient(135deg, #8E44AD, #3498DB)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#fff', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Gemini</div>
          <div style={{ fontSize: 11, color: '#3ddc84' }}>● On-device AI</div>
        </div>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>more_vert</span>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px' }}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: 'flex', gap: 10, marginBottom: 16,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'gemini' && (
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #8E44AD44, #3498DB44)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                marginTop: 4,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#8E44AD', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
            )}
            <div style={{
              maxWidth: '80%', padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'rgba(61,220,132,0.15)' : 'rgba(255,255,255,0.04)',
              border: msg.role === 'user' ? '1px solid rgba(61,220,132,0.15)' : '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #8E44AD44, #3498DB44)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#8E44AD', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div style={{ padding: '10px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)',
                    animation: `geminiBounce 1s ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {SUGGESTIONS.map(s => (
              <div key={s} onClick={() => handleSend(s)}
                style={{
                  padding: '6px 12px', borderRadius: 14, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: 12, color: 'rgba(255,255,255,0.6)',
                }}
                onMouseEnter={e => (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
              >
                {s}
              </div>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '8px 12px 16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)', borderRadius: 24,
          padding: '4px 4px 4px 16px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(input); }}
            placeholder="Ask Gemini..."
            style={{
              flex: 1, border: 'none', background: 'transparent', outline: 'none',
              color: 'rgba(255,255,255,0.7)', fontSize: 13, padding: '8px 0',
            }}
          />
          <div
            onClick={() => handleSend(input)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: input.trim() ? '#3ddc84' : 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: 18, color: input.trim() ? '#050805' : 'rgba(255,255,255,0.3)',
              fontVariationSettings: "'FILL' 1",
            }}>send</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes geminiBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GeminiApp;
