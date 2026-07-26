import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { DndContext, useDraggable } from '@dnd-kit/core'
import { useState } from 'react'

const apps = [
  { label: 'Messages', color: '#34b7f1' },
  { label: 'Photos', color: '#ea4335' },
  { label: 'Maps', color: '#34a853' },
  { label: 'Gmail', color: '#ea4335' },
  { label: 'Chrome', color: '#4285f4' },
  { label: 'YouTube', color: '#ff0000' },
  { label: 'Calendar', color: '#4285f4' },
  { label: 'Clock', color: '#fbbc04' },
  { label: 'Settings', color: '#5f6368' },
  { label: 'Files', color: '#4285f4' },
  { label: 'Play Store', color: '#34a853' },
  { label: 'Camera', color: '#5f6368' },
]

function AppIcon({ label, color, index }: { label: string; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
    >
      <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
        {label[0]}
      </Box>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,.7)', fontSize: 10 }}>{label}</Typography>
    </motion.div>
  )
}

function DraggableBubble({ id, color, label }: { id: string; color: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined

  return (
    <motion.div
      ref={setNodeRef}
      style={{ ...style, width: 48, height: 48, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', boxShadow: '0 4px 12px rgba(0,0,0,.3)', zIndex: 10, position: 'absolute' }}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.15 }}
    >
      <Typography sx={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{label[0]}</Typography>
    </motion.div>
  )
}

export default function HomeScreen() {
  const [bubbles] = useState([
    { id: 'bubble-1', color: '#34b7f1', label: 'Chat' },
    { id: 'bubble-2', color: '#4285f4', label: 'Docs' },
    { id: 'bubble-3', color: '#ea4335', label: 'Music' },
  ])

  return (
    <DndContext>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 20px 8px', color: 'rgba(255,255,255,.8)', fontSize: 14, fontWeight: 600 }}
        >
          <span>10:25</span>
          <span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0" y="0" width="14" height="10" rx="2" stroke="#ccc" strokeWidth="1" />
              <rect x="15" y="2" width="1" height="6" rx="0.5" fill="#ccc" />
            </svg>
          </span>
        </motion.div>

        <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, p: '12px 20px', alignContent: 'start' }}>
          {apps.map((a, i) => (
            <AppIcon key={a.label} label={a.label} color={a.color} index={i} />
          ))}
        </Box>

        <Box sx={{ position: 'absolute', bottom: 90, right: 14, width: 48, height: 140 }}>
          {bubbles.map((b, i) => (
            <Box key={b.id} sx={{ position: 'absolute', top: i * 54, left: 0 }}>
              <DraggableBubble id={b.id} color={b.color} label={b.label} />
            </Box>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16 }}
        >
          {[
            { path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', color: '#ff4081' },
            { path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z', color: '#ffeb3b' },
            { path: 'M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8l6 6-6 6h8V3zm-2 14h2v-2h-2v2zM9 3h2V1H9v2zM5 3h2V1H5v2z', color: '#42a5f5' },
          ].map((r, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
              whileHover={{ scale: 1.3 }}
              style={{ cursor: 'pointer' }}
            >
              <svg viewBox="0 0 24 24" fill={r.color} width="32" height="32">
                <path d={r.path} />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </DndContext>
  )
}
