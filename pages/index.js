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

  const handleSubmit = () => {
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #001f33, #000)', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>

      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', padding: 30, borderRadius: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Image
            src="/pfi-logo.png"
            alt="PFI Logo"
            width={100}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Freedive Surface Interval Calculator</h1>

        <div style={{ marginBottom: 15 }}>
          <label>Depth (meters)</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: 'none', marginTop: 5 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          <div style={{ flex: 1 }}>
            <label>Minutes</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: 'none', marginTop: 5 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Seconds</label>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 8, border: 'none', marginTop: 5 }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, textAlign: 'center' }}>Recovery Gas</label>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            <button
              onClick={() => setGasType('air')}
              style={{ padding: '10px 20px', borderRadius: 8, border: gasType === 'air' ? '2px solid #EC1C24' : 'none', background: gasType === 'air' ? '#fff' : '#333', color: gasType === 'air' ? '#000' : '#fff' }}
            >
              Air
            </button>
            <button
              onClick={() => setGasType('ean80')}
              style={{ padding: '10px 20px', borderRadius: 8, border: gasType === 'ean80' ? '2px solid #EC1C24' : 'none', background: gasType === 'ean80' ? '#fff' : '#333', color: gasType === 'ean80' ? '#000' : '#fff' }}
            >
              EAN 80%
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 15 }}>
          <button onClick={handleSubmit} style={{ padding: '12px 30px', backgroundColor: '#EC1C24', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: 8 }}>Calculate</button>
        </div>

        {result && (
          <div style={{ marginTop: 20, padding: 15, backgroundColor: '#fff', color: '#000', borderRadius: 8, textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold' }}>
            Surface Interval: {result}
          </div>
        )}

        {gasType === 'ean80' && (
          <div style={{ color: '#EC1C24', fontSize: 12, textAlign: 'center', marginTop: 10 }}>
            Must be off 80% for 2 minutes breathing air or low/bottom mix.
          </div>
        )}

        <div style={{ marginTop: 20, fontSize: 12, textAlign: 'center' }}>
          This calculator is intended for educational purposes only. Always dive conservatively.
        </div>
      </div>

      <footer style={{ textAlign: 'center', fontSize: 12, marginTop: 30 }}>
        <p>
          App creator: Nick Fazah, IT 9870 | <a href="https://www.performancefreediving.com" target="_blank" style={{ color: '#EC1C24' }}>Performance Freediving International</a>
        </p>
      </footer>
    </div>
  );
}
