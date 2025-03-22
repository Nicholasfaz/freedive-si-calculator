import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const result = getSurfaceInterval({
      depth,
      minutes,
      seconds,
      gasType,
    });
    if (result.error) {
      setSurfaceInterval('');
      setError(result.error);
    } else {
      setSurfaceInterval(result.interval);
    }
  };

  const buttonStyle = (type) => ({
    marginRight: 10,
    padding: '8px 16px',
    borderRadius: 10,
    border: '2px solid #fff',
    backgroundColor: gasType === type ? '#EC1C24' : 'transparent',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  });

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(to bottom, #001f33, #000);
            color: #fff;
          }
        `}</style>
      </Head>
      <div className="container" style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{ textAlign: 'center' }}>Freedive Surface Interval Calculator</h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 10 }}>
            <input
              type="number"
              placeholder="Depth (m)"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              style={{
                width: '40%',
                padding: 10,
                borderRadius: 5,
                border: 'none',
                fontSize: 16
              }}
            />
            <input
              type="number"
              placeholder="Min"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={{
                width: '25%',
                padding: 10,
                borderRadius: 5,
                border: 'none',
                fontSize: 16
              }}
            />
            <input
              type="number"
              placeholder="Sec"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              style={{
                width: '25%',
                padding: 10,
                borderRadius: 5,
                border: 'none',
                fontSize: 16
              }}
            />
          </div>

          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <label>Recovery Gas</label>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
              <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
            </div>
          </div>

          <button onClick={handleCalculate} style={{
            padding: '12px 30px',
            borderRadius: 10,
            backgroundColor: '#EC1C24',
            color: '#fff',
            border: 'none',
            fontSize: 18,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Calculate
          </button>

          {error && <div style={{ marginTop: 20, color: 'orange', fontWeight: 'bold' }}>{error}</div>}
          {surfaceInterval && (
            <div style={{ marginTop: 20, fontSize: 22, fontWeight: 'bold' }}>
              Surface Interval: {surfaceInterval}
            </div>
          )}

          <p style={{ marginTop: 30, fontSize: 12, color: '#ccc', maxWidth: 400, textAlign: 'center' }}>
            The data provided by this app is still in testing and is for use by those certified in "Technical Freediving by PFI" only. 
            Any use without training by an authorized and active PFI instructor could result in injury.
          </p>
        </div>

        <footer style={{
          marginTop: 40,
          textAlign: 'center',
          fontSize: 14,
          color: '#aaa',
        }}>
          <a href="https://performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: 80, marginBottom: 10 }} />
          </a>
          <div>App Creator: Nick Fazah</div>
        </footer>
      </div>
    </>
  );
}