import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';
import Image from 'next/image';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #001f33, #000)', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>

      <div style={{ maxWidth: 500, width: '100%', background: 'rgba(255,255,255,0.05)', padding: 30, borderRadius: '20px', boxShadow: '0 0 20px rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', marginTop: 20 }}>
        <Image src="/pfi-logo.png" alt="PFI Logo" width={120} height={80} style={{ display: 'block', margin: '0 auto 20px' }} />

        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

        <label style={{ fontWeight: 'bold' }}>Depth (m)</label>
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 20, borderRadius: 8, border: 'none', fontSize: 16 }}
        />

        <label style={{ fontWeight: 'bold' }}>Dive Time</label>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input
            type="number"
            placeholder="Min"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', fontSize: 16 }}
          />
          <input
            type="number"
            placeholder="Sec"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', fontSize: 16 }}
          />
        </div>

        <label style={{ fontWeight: 'bold' }}>Recovery Gas</label>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <button
            onClick={() => setGasType('air')}
            style={{ flex: 1, marginRight: 10, padding: 10, background: gasType === 'air' ? '#EC1C24' : '#ccc', color: '#fff', border: 'none', borderRadius: 8 }}>
            Air
          </button>
          <button
            onClick={() => setGasType('ean80')}
            style={{ flex: 1, padding: 10, background: gasType === 'ean80' ? '#EC1C24' : '#ccc', color: '#fff', border: 'none', borderRadius: 8 }}>
            EAN 80%
          </button>
        </div>

        <button
          onClick={handleCalculate}
          style={{ width: '100%', padding: 15, background: '#EC1C24', color: '#fff', fontWeight: 'bold', fontSize: 18, borderRadius: 10, border: 'none', marginBottom: 20 }}>
          Calculate
        </button>

        {result && (
          <div style={{ background: '#fff', color: '#001f33', padding: '15px 20px', borderRadius: 10, fontWeight: 'bold', fontSize: 20, textAlign: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
            Surface Interval: {result}
          </div>
        )}

        {gasType === 'ean80' && result && (
          <p style={{ marginTop: 15, color: '#FFD700', fontSize: 14, textAlign: 'center' }}>
            Must be off 80% for 2 minutes breathing air or low/bottom mix
          </p>
        )}

        <p style={{ fontSize: 12, color: '#ccc', marginTop: 30, textAlign: 'center' }}>
          * For educational use only. Not a substitute for professional training or tables.
        </p>
      </div>

      <footer style={{ marginTop: 40, textAlign: 'center', fontSize: 14, color: '#ccc' }}>
        <p>
          App Creator: Nick Fazah IT 9870 — <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Performance Freediving International</a>
        </p>
      </footer>
    </div>
  );
}
