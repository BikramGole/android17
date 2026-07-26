import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'

import '@material/web/button/filled-button.js'
import '@material/web/button/outlined-button.js'
import '@material/web/icon/icon.js'
import '@material/web/switch/switch.js'
import { MdFilledButton, MdOutlinedButton, MdIcon, MdSwitch } from './components/MaterialWeb'
import AndroidApp from './android/AndroidApp'
import Phone3D from './components/Phone3D'
import RiveDemo from './components/RiveDemo'
import CalculatorApp from './components/CalculatorApp'

gsap.registerPlugin(ScrollTrigger)

const libs = [
  { name: 'androidInReact', desc: 'Full Android UI simulation by blueedgetechno' },
  { name: 'react-device-frameset', desc: 'Pixel phone shell' },
  { name: 'Motion', desc: 'Spring physics, layout animations' },
  { name: 'Three.js + r3f', desc: 'Interactive 3D phone model' },
  { name: 'Material Web', desc: 'Material 3 buttons, switches, icons' },
  { name: 'Rive', desc: 'Interactive vector animation' },
  { name: 'GSAP + ScrollTrigger', desc: 'Timeline scroll animations' },
  { name: 'Material Icons', desc: 'Google Material symbols' },
  { name: 'Calculator', desc: 'Inline PWA-style calculator app' },
]

export default function App() {
  const heroRef = useRef(null)
  const tlRef = useRef<GSAPTimeline | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      })
      .from('.gsap-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.gsap-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.gsap-phone', { scale: 0.85, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.3')
      .from('.gsap-libs li', { y: 16, opacity: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: "'Inter', system-ui, sans-serif", overflow: 'hidden' }}>
      <div ref={heroRef} style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
        <h1 className="gsap-title" style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, margin: 0, background: 'linear-gradient(135deg, #8ab4f8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Android 17 Simulator
        </h1>
        <p className="gsap-subtitle" style={{ color: 'rgba(255,255,255,.5)', margin: '8px 0 48px', maxWidth: 500, fontSize: 15, lineHeight: 1.5 }}>
          Built with 9 open-source libraries. Each pixel, spring, and drag interaction comes from the repos listed below.
        </p>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="gsap-phone" style={{ flexShrink: 0 }}>
            <DeviceFrameset device="Nexus 5" landscape={false} width={300}>
              <div style={{ width: '100%', height: '100%', background: '#121212', overflow: 'hidden', borderRadius: '0 0 2px 2px' }}>
                <AndroidApp />
              </div>
            </DeviceFrameset>
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px', color: 'rgba(255,255,255,.8)' }}>
              Libraries used
            </h3>
            <ul className="gsap-libs" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {libs.map((l) => (
                <li key={l.name} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8ab4f8', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.85)' }}>{l.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>{l.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              <MdFilledButton onClick={() => window.location.href = '/'}>Visit main site</MdFilledButton>
              <MdOutlinedButton onClick={() => window.open('https://github.com/bikramgole/andriod17', '_blank')}>
                <MdIcon slot="icon">code</MdIcon>
                Source
              </MdOutlinedButton>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator app section */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px', color: 'rgba(255,255,255,.8)' }}>
            Calculator App
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, margin: '0 0 24px' }}>
            Inline PWA-style calculator inside the phone frame. Try the Material Web switch below.
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <DeviceFrameset device="Nexus 5" landscape={false} width={300}>
              <div style={{ width: '100%', height: '100%', background: '#1a1a2e', overflow: 'hidden', borderRadius: '0 0 2px 2px' }}>
                <CalculatorApp />
              </div>
            </DeviceFrameset>
            <div style={{ flex: 1, minWidth: 200, paddingTop: 8 }}>
              <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, lineHeight: 1.6 }}>
                Built from scratch, styled like a real Android calculator. Uses Material Web <code style={{ color: '#8ab4f8' }}>{'<md-switch>'}</code> and <code style={{ color: '#8ab4f8' }}>{'<md-icon>'}</code> components below.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
                <MdSwitch selected style={{ '--md-switch-selected-track-color': '#8ab4f8' } as React.CSSProperties} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>Dark mode (Material Web switch)</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <MdIcon style={{ color: '#8ab4f8' }}>favorite</MdIcon>
                <MdIcon style={{ color: '#fbbc04' }}>star</MdIcon>
                <MdIcon style={{ color: '#34a853' }}>check_circle</MdIcon>
                <MdIcon style={{ color: '#ea4335' }}>delete</MdIcon>
                <MdIcon style={{ color: '#4285f4' }}>settings</MdIcon>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rive section */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px', color: 'rgba(255,255,255,.8)' }}>
            Rive Animation
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, margin: '0 0 24px' }}>
            Interactive vector animation powered by Rive. Click/tap to toggle state.
          </p>
          <RiveDemo />
        </motion.div>
      </div>

      {/* 3D Phone section */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 4px', color: 'rgba(255,255,255,.8)' }}>
            3D Phone Model
          </h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, margin: '0 0 24px' }}>
            Three.js + @react-three/fiber + drei. Drag to rotate.
          </p>
          <Phone3D />
        </motion.div>
      </div>
    </div>
  )
}
