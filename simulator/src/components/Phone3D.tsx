import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float, PresentationControls, Html, RoundedBox } from '@react-three/drei'
import { Typography } from '@mui/material'
import { motion } from 'framer-motion'

function PhoneModel() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      <RoundedBox args={[1.6, 3.2, 0.12]} radius={0.08}>
        <meshPhysicalMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} envMapIntensity={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.4, 2.8]} />
        <meshBasicMaterial color="#0a84ff" opacity={0.15} transparent />
      </mesh>
      <mesh position={[0, 1.35, 0.15]}>
        <circleGeometry args={[0.08, 16]} />
        <meshPhysicalMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.81, 0.4, 0]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshPhysicalMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

export default function Phone3D() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: '100%', height: 340, borderRadius: 16, overflow: 'hidden', background: 'radial-gradient(ellipse at center, #141428 0%, #0a0a0f 70%)' }}
    >
      <Canvas camera={{ position: [0, 0.5, 5], fov: 40 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, -2, 3]} intensity={0.4} color="#8ab4f8" />
        <pointLight position={[3, 2, -3]} intensity={0.3} color="#c084fc" />
        <PresentationControls snap polar={[0, 0]} azimuth={[-0.8, 0.8]}>
          <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
            <PhoneModel />
          </Float>
        </PresentationControls>
        <Html position={[0, -1.6, 0]} center>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.3)', fontSize: 10, textAlign: 'center', display: 'block' }}>
            Drag to rotate
          </Typography>
        </Html>
      </Canvas>
    </motion.div>
  )
}
