import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MODES = ['Photo', 'Video', 'Portrait', 'Pro'];

const CameraApp: React.FC = () => {
  const [mode, setMode] = useState('Photo');
  const [captured, setCaptured] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [flash, setFlash] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch {
        // Camera not available, show fallback
      }
    }
    startCamera();
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
  }, []);

  const handleCapture = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 200);
  };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#000', position: 'relative', overflow: 'hidden',
    }}>
      <video ref={videoRef} autoPlay playsInline muted
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transform: `scale(${zoom})`,
          transition: 'transform 0.3s ease',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 10, display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px', paddingTop: 28,
      }}>
        <div style={{ width: 40 }} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[1, 2, 3].map(z => (
            <div key={z} onClick={() => setZoom(z)}
              style={{
                padding: '4px 10px', borderRadius: 12, cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                background: zoom === z ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'rgba(255,255,255,0.8)',
                border: zoom === z ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
              }}
            >{z}x</div>
          ))}
        </div>
        <div onClick={() => setFlash(!flash)}
          style={{ cursor: 'pointer', opacity: flash ? 1 : 0.5, width: 40, textAlign: 'right' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#fff' }}>
            {flash ? 'flash_on' : 'flash_off'}
          </span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{
        position: 'relative', zIndex: 10, display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 16,
        paddingBottom: 40,
      }}>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          {MODES.map(m => (
            <div key={m} onClick={() => setMode(m)}
              style={{
                fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: '4px 0',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.5)',
                borderBottom: mode === m ? '2px solid #fff' : '2px solid transparent',
                letterSpacing: 0.5,
              }}
            >{m}</div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ width: 40 }} />
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={handleCapture}
            style={{
              width: 68, height: 68, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '3px solid rgba(255,255,255,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'transform 0.2s',
              transform: captured ? 'scale(0.85)' : 'scale(1)',
            }}
          >
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: '#fff',
            }} />
          </motion.div>
          <div style={{ width: 40, textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>
              switch_camera
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraApp;
