import React, { useState } from 'react';
import { motion } from 'framer-motion';

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '⌫', '='],
];

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleButton = (btn: string) => {
    if (btn === 'C') { setDisplay('0'); setMemory(null); setOperator(null); setNewNumber(true); return; }
    if (btn === '±') { setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev); return; }
    if (btn === '%') { setDisplay(prev => String(Number(prev) / 100)); return; }
    if (btn === '⌫') { setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0'); return; }

    if (['+', '−', '×', '÷'].includes(btn)) {
      if (operator && !newNumber) {
        const result = calculate(Number(memory), Number(display), operator);
        setDisplay(String(result));
        setMemory(result);
      } else {
        setMemory(Number(display));
      }
      setOperator(btn);
      setNewNumber(true);
      return;
    }

    if (btn === '=') {
      if (operator && memory !== null) {
        const result = calculate(memory, Number(display), operator);
        setDisplay(String(result));
        setMemory(null);
        setOperator(null);
      }
      setNewNumber(true);
      return;
    }

    if (btn === '.') {
      if (display.includes('.')) return;
      if (newNumber) { setDisplay('0.'); setNewNumber(false); return; }
      setDisplay(prev => prev + '.');
      return;
    }

    if (newNumber) {
      setDisplay(btn);
      setNewNumber(false);
    } else {
      setDisplay(prev => prev.length < 12 ? prev + btn : prev);
    }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const isOperator = (b: string) => ['+', '−', '×', '÷', '='].includes(b);
  const isClear = (b: string) => ['C'].includes(b);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0a0a0f',
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        padding: '16px 20px 8px',
      }}>
        <motion.div
          key={display}
          initial={{ scale: 1.05, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ fontSize: 48, fontWeight: 200, color: 'rgba(255,255,255,0.95)', letterSpacing: -1, lineHeight: 1 }}
        >
          {display}
        </motion.div>
      </div>

      <div style={{ padding: '8px 12px 16px' }}>
        {buttons.map(row => (
          <div key={row[0]} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {row.map(btn => {
              const op = isOperator(btn);
              const clr = isClear(btn);
              return (
                <motion.div
                  key={btn}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleButton(btn)}
                  style={{
                    flex: btn === '0' ? 2 : 1,
                    height: btn === '0' ? 56 : 56,
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, fontWeight: btn === '=' ? 500 : 350,
                    cursor: 'pointer', userSelect: 'none',
                    background: clr ? 'rgba(244,67,54,0.15)' : op ? 'rgba(61,220,132,0.15)' : 'rgba(255,255,255,0.04)',
                    color: clr ? '#ef5350' : op ? '#3ddc84' : 'rgba(255,255,255,0.85)',
                    border: clr ? '1px solid rgba(244,67,54,0.2)' : op ? '1px solid rgba(61,220,132,0.2)' : '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  {btn}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorApp;
