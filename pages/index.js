
import React, { useState } from 'react';
import Head from 'next/head';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');

  const calculate = () => {
    const d = parseFloat(depth);
    const m = parseInt(minutes);
    const s = parseInt(seconds);
    if (isNaN(d) || isNaN(m) || isNaN(s)) {
      setSurfaceInterval("Please enter valid numbers.");
      return;
    }
    setSurfaceInterval(getSurfaceInterval(d, m, s, gasType));
  };

  const buttonStyle = (active) => ({
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: active ? '#EC1C24' : '#1f2a38',
    color: '#fff',
    fontWeight: active ? 'bold' : 'normal',
    border: 'none',
    boxShadow: active ? '0 0 10px #EC1C24' : 'none',
    cursor: 'pointer',
    transition: '0.3s'
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#000', color: '#fff', minHeight: '100vh', padding: '40px 20px' }}>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div style={{ maxWidth: 500, margin: '0 auto', background: '#111', borderRadius: 12, padding: 30, boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Freedive Surface Interval Calculator</h1>

        <label>Dive Depth (meters)</label>
        <input type="number" value={depth} onChange={e => setDepth(e.target.value)} style={{ width: '100%', padding: 10, marginBottom: 20, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }} />

        <label>Dive Time</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: 20 }}>
          <input type="number" placeholder="min" value={minutes} onChange={e => setMinutes(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }} />
          <input type="number" placeholder="sec" value={seconds} onChange={e => setSeconds(e.target.value)} style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }} />
        </div>

        <label>Recovery Gas</label>
        <div>
          <button onClick={() => setGasType('air')} style={buttonStyle(gasType === 'air')}>Air</button>
          <button onClick={() => setGasType('ean80')} style={buttonStyle(gasType === 'ean80')}>EAN 80%</button>
        </div>

        <button onClick={calculate} style={{ width: '100%', padding: 12, marginTop: 20, borderRadius: 8, backgroundColor: '#EC1C24', color: '#fff', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', border: 'none', boxShadow: '0 0 10px #EC1C24' }}>
          Calculate
        </button>

        {surfaceInterval && (
          <div style={{ marginTop: 20, fontSize: 20, background: '#112233', padding: 15, borderRadius: 10 }}>
            Surface Interval: <strong>{surfaceInterval}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
