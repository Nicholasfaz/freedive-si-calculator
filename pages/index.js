
import Head from 'next/head';
import React, { useState } from 'react';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const calculateSI = () => {
    const d = parseFloat(depth);
    const m = parseInt(minutes);
    const s = parseInt(seconds);
    if (isNaN(d) || isNaN(m) || isNaN(s)) {
      setSurfaceInterval("Please enter valid numbers.");
      return;
    }
    const si = getSurfaceInterval(d, m, s, gasType);
    setSurfaceInterval(si);
  };

  const buttonStyle = (type) => ({
    marginRight: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: gasType === type ? '#007acc' : '#1f2a38',
    color: '#fff',
    fontWeight: gasType === type ? 'bold' : 'normal',
    boxShadow: gasType === type ? '0 0 10px #007acc' : 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <style>{`
          @media (max-width: 600px) {
            .container {
              padding: 20px 10px !important;
            }
            h1 {
              font-size: 22px !important;
            }
            input, button {
              font-size: 14px !important;
              padding: 8px !important;
            }
            .time-inputs {
              flex-direction: column !important;
            }
          }
        `}</style>
      </Head>
      <div
        className="container"
        style={{
          background: 'linear-gradient(to bottom, #001f33, #000)',
          color: '#fff',
          minHeight: '100vh',
          padding: '40px 20px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
          Freedive Surface Interval Calculator
        </h1>

        <div style={{ marginBottom: 20 }}>
          <label>Dive Depth (meters)</label>
          <input
            type="number"
            value={depth}
            onChange={e => setDepth(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Dive Time</label>
          <div
            className="time-inputs"
            style={{ display: 'flex', gap: '10px' }}
          >
            <input
              type="number"
              placeholder="min"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
            />
            <input
              type="number"
              placeholder="sec"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Recovery Gas</label>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
            <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
          </div>
        </div>

        <button
          onClick={calculateSI}
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#ec1c24',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 0 10px #ec1c24'
          }}
        >
          Calculate
        </button>

        {surfaceInterval && (
          <div style={{ marginTop: '20px', fontSize: '20px', background: '#112233', padding: '15px', borderRadius: '10px' }}>
            Surface Interval: <strong>{surfaceInterval}</strong>
          </div>
        )}
      </div>
    </>
  );
}
