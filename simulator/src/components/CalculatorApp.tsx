import { useState } from 'react'

const buttons = [
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '÷', value: '/' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '×', value: '*' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '−', value: '-' },
  { label: '0', value: '0' },
  { label: '.', value: '.' },
  { label: '=', value: '=' },
  { label: '+', value: '+' },
]

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')

  function handleClick(val: string) {
    if (val === '=') {
      try {
        const result = Function(`"use strict"; return (${expression})`)()
        setDisplay(String(result))
        setExpression(String(result))
      } catch {
        setDisplay('Error')
      }
    } else {
      const next = expression + val
      setExpression(next)
      setDisplay(next)
    }
  }

  function clear() {
    setDisplay('0')
    setExpression('')
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0d0d1a' }}>
      <div style={{ padding: '20px 16px 12px', textAlign: 'right' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', minHeight: 14, wordBreak: 'break-all' }}>{expression}</div>
        <div style={{ fontSize: 28, fontWeight: 300, color: '#fff', marginTop: 4, wordBreak: 'break-all' }}>{display}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, padding: '8px 8px 16px', flex: 1 }}>
        <button
          onClick={clear}
          style={{ gridColumn: 'span 2', background: 'rgba(255,255,255,.08)', borderRadius: 10, border: 'none', color: '#ff6b6b', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          AC
        </button>
        {buttons.map((b) => (
          <button
            key={b.label}
            onClick={() => handleClick(b.value)}
            style={{
              background: ['÷', '×', '−', '+'].includes(b.label)
                ? 'rgba(138, 180, 248, .15)'
                : b.label === '='
                  ? 'linear-gradient(135deg, #8ab4f8, #c084fc)'
                  : 'rgba(255,255,255,.06)',
              borderRadius: 10,
              border: 'none',
              color: b.label === '=' ? '#000' : ['÷', '×', '−', '+'].includes(b.label) ? '#8ab4f8' : 'rgba(255,255,255,.8)',
              fontSize: b.label === '=' ? 18 : 15,
              fontWeight: b.label === '=' ? 700 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: b.label === '0' ? '2/1' : '1',
              transition: 'background 0.15s',
            }}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  )
}
