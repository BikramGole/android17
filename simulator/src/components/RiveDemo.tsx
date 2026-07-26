import { useState } from 'react'
import { useRive } from 'rive-react'

export default function RiveDemo() {
  const [hasError, setHasError] = useState(false)

  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    artboard: 'default',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })

  if (hasError) {
    return (
      <div style={{ borderRadius: 16, background: 'radial-gradient(ellipse at center, #141428 0%, #0a0a0f 70%)', padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 13, margin: 0 }}>
          Rive animation placeholder — load a .riv file to activate
        </p>
      </div>
    )
  }

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', background: 'radial-gradient(ellipse at center, #141428 0%, #0a0a0f 70%)', position: 'relative', height: 320 }}>
      <RiveComponent
        onError={() => setHasError(true)}
        style={{ width: '100%', height: '100%' }}
      />
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 20, fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
        Rive — interactive vector animation
      </div>
    </div>
  )
}
