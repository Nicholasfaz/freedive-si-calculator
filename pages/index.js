
import React, { useState } from 'react';
import Head from 'next/head';
import { getSurfaceInterval } from '../lib/si-logic';

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
    cursor: 'pointer'
  });

  const renderSurfaceInterval = () => {
    if (!surfaceInterval) return null;
    if (surfaceInterval.includes("|||")) {
      const [main, note] = surfaceInterval.split("|||");
      return (
        <div style={resultBoxStyle}>
          <div>Surface Interval: <strong>{main}</strong></div>
          <div style={{ color: 'yellow', fontWeight: 'bold', marginTop: '10px' }}>⚠️ {note}</div>
        </div>
      );
    } else {
      return (
        <div style={resultBoxStyle}>
          Surface Interval: <strong>{surfaceInterval}</strong>
        </div>
      );
    }
  };

  const resultBoxStyle = {
    marginBottom: '20px',
    fontSize: '20px',
    background: '#112233',
    padding: '15px',
    borderRadius: '10px'
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div style={{
        background: 'linear-gradient(to bottom, #001f33, #000)',
        color: '#fff',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

          {renderSurfaceInterval()}

          <div style={{ marginBottom: 20 }}>
            <label>Dive Depth (meters)</label>
            <input
              type="number"
              value={depth}
              onChange={e => setDepth(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 6,
                border: '1px solid #333',
                backgroundColor: '#111',
                color: '#fff'
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label>Dive Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                placeholder="min"
                value={minutes}
                onChange={e => setMinutes(e.target.value)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #333',
                  backgroundColor: '#111',
                  color: '#fff'
                }}
              />
              <input
                type="number"
                placeholder="sec"
                value={seconds}
                onChange={e => setSeconds(e.target.value)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #333',
                  backgroundColor: '#111',
                  color: '#fff'
                }}
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
            }}>
            Calculate
          </button>

          <div style={{ marginTop: 20, fontSize: 12, color: '#ccc' }}>
            The data provided by this app is still in testing and is for use by those certified in <strong>Technical Freediving by PFI only</strong>. Any use without training by an authorized and active PFI instructor could result in injury.
          </div>
        </div>

        <div style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          background: '#0d1a26',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
          borderTop: '1px solid #1a2e40',
          fontSize: '14px',
          zIndex: 999
        }}>
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '30px', verticalAlign: 'middle', marginRight: '10px' }} />
          Powered by <a href="https://www.tdisdi.com/pfi/" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfff', textDecoration: 'underline' }}>
            Performance Freediving International
          </a>
        </div>
      </div>
    </>
  );
}
