
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const data = {
      depth,
      minutes,
      seconds,
      gasType
    };
    const interval = getSurfaceInterval(data);
    setResult(interval);
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={{
        background: 'linear-gradient(to bottom, #001f33, #000)',
        color: '#fff',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          padding: 20,
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)'
        }}>
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: '100px', margin: '0 auto 20px', display: 'block' }} />
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>
          <label>Depth (m)</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Enter depth"
            style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 8, border: 'none' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Min"
                style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 8, border: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="Sec"
                style={{ width: '100%', padding: 10, marginBottom: 10, borderRadius: 8, border: 'none' }}
              />
            </div>
          </div>
          <label>Recovery Gas</label>
          <select
            value={gasType}
            onChange={(e) => setGasType(e.target.value)}
            style={{ width: '100%', padding: 10, marginBottom: 20, borderRadius: 8, border: 'none' }}
          >
            <option value="air">Air</option>
            <option value="ean80">EAN 80</option>
          </select>
          <button
            onClick={handleCalculate}
            style={{
              width: '100%',
              padding: 15,
              background: 'linear-gradient(to right, #EC1C24, #d81a20)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Calculate
          </button>
          {result && (
            <div style={{
              marginTop: 20,
              padding: 15,
              background: '#0a2c47',
              borderRadius: 10,
              textAlign: 'center',
              fontSize: '1.5em',
              fontWeight: 'bold'
            }}>
              Surface Interval: {result}
            </div>
          )}
          {gasType === 'ean80' && result && (
            <p style={{ marginTop: 10, color: '#ffc107' }}>
              Must be off 80% for 2 minutes breathing air or low/bottom mix.
            </p>
          )}
          <p style={{ fontSize: '0.85em', color: '#aaa', marginTop: 15 }}>
            This calculator is for reference only. Always dive within your training limits.
          </p>
        </div>
        <footer style={{ marginTop: 30, textAlign: 'center', fontSize: '0.9em', color: '#ccc' }}>
          <p>App Creator: Nick Fazah, IT 9870</p>
          <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7' }}>
            Performance Freediving International
          </a>
        </footer>
      </div>
    </>
  );
}
