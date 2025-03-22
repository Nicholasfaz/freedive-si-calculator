
import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');
  const [warning, setWarning] = useState('');

  const handleCalculate = () => {
    setWarning('');
    const result = getSurfaceInterval({
      depth,
      minutes,
      seconds,
      gasType
    });

    if (gasType === 'ean80' && result && result !== 'Time too long for this depth') {
      setWarning('⚠️ Use caution: EAN 80% requires a minimum of 2 minutes before next dive!');
    }

    setSurfaceInterval(result);
  };

  const buttonStyle = (type) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: gasType === type ? '#EC1C24' : '#666',
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  });

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div style={{ background: 'linear-gradient(to bottom, #001f33, #000)', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', padding: 30, borderRadius: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(0,0,0,0.4)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <label style={{ display: 'block', marginBottom: 10, fontSize: 18 }}>Recovery Gas</label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
              <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <input type="number" placeholder="Depth (m)" value={depth} onChange={(e) => setDepth(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 5 }} />
            <input type="number" placeholder="Min" value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ width: '70px', padding: 10, borderRadius: 5 }} />
            <input type="number" placeholder="Sec" value={seconds} onChange={(e) => setSeconds(e.target.value)} style={{ width: '70px', padding: 10, borderRadius: 5 }} />
          </div>

          <button onClick={handleCalculate} style={{ width: '100%', padding: '12px 0', borderRadius: '8px', backgroundColor: '#EC1C24', color: 'white', fontWeight: 'bold', border: 'none', fontSize: 18 }}>Calculate</button>

          {warning && <p style={{ color: '#ffd700', textAlign: 'center', marginTop: 15 }}>{warning}</p>}

          <AnimatePresence>
            {surfaceInterval && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                style={{
                  marginTop: '30px',
                  padding: '20px',
                  backgroundColor: '#004466',
                  borderRadius: '12px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}
              >
                Surface Interval: {surfaceInterval}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 14, opacity: 0.7 }}>
          <p>
            <a href="https://performancefreediving.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
              <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '40px', marginBottom: '10px' }} />
            </a>
          </p>
          <p>App Creator: Nick Fazah</p>
        </div>
      </div>
    </>
  );
}
