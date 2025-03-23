import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    console.log("Sending to getSurfaceInterval:", { depth, minutes, seconds, gasType });
    const interval = getSurfaceInterval({
      depth: Number(depth),
      minutes: Number(minutes),
      seconds: Number(seconds),
      gasType
    });
    setResult(interval);
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #001f33, #000)',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>

      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Freedive Surface Interval Calculator</h1>

        <form onSubmit={handleCalculate}>
          <label>Depth (m):</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            required
            min="1"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label>Minutes:</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Seconds:</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          </div>

          <label style={{ marginTop: '10px', display: 'block' }}>Recovery Gas:</label>
          <select
            value={gasType}
            onChange={(e) => setGasType(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
          >
            <option value="air">Air</option>
            <option value="ean80">EAN80</option>
          </select>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#EC1C24',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Calculate
          </button>
        </form>

        {result && (
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            marginTop: '20px',
            padding: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            borderRadius: '8px'
          }}>
            Surface Interval: {result}
          </div>
        )}

        <p style={{ marginTop: '10px', fontSize: '12px', color: '#ccc', textAlign: 'center' }}>
          {gasType === 'ean80' && 'Must be off 80% for 2 minutes breathing air or low/bottom mix'}
        </p>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
          App created by Nick Fazah – IT 9870
        </p>

        <footer style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ maxWidth: '120px', height: 'auto' }} />
          </a>
        </footer>
      </div>
    </div>
  );
}
