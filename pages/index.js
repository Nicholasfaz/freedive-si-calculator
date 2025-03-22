
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval, formatMinutesToMMSS } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const handleCalculate = () => {
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
    padding: '10px 20px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: gasType === type ? '#007acc' : '#444',
    color: '#fff',
    fontWeight: gasType === type ? 'bold' : 'normal',
    boxShadow: gasType === type ? '0 0 8px #007acc' : 'none',
    cursor: 'pointer'
  });

  const containerStyle = {
    background: 'linear-gradient(to bottom, #001f33, #000)',
    color: '#fff',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '500px',
    background: 'rgba(255,255,255,0.05)',
    padding: 30,
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 20px rgba(0,0,0,0.4)'
  };

  const inputStyle = {
    width: '100%',
    padding: 10,
    borderRadius: 6,
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#fff',
    marginBottom: '10px'
  };

  const inputGroupStyle = {
    display: 'flex',
    gap: '10px'
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
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

          {surfaceInterval && (
            <div style={resultBoxStyle}>
              {surfaceInterval.includes("|||") ? (
                <>
                  <div>Surface Interval: <strong>{surfaceInterval.split("|||")[0]}</strong></div>
                  <div style={{ color: 'yellow', fontWeight: 'bold', marginTop: '10px' }}>⚠️ {surfaceInterval.split("|||")[1]}</div>
                </>
              ) : (
                <>Surface Interval: <strong>{surfaceInterval}</strong></>
              )}
            </div>
          )}

          <label>Dive Depth (meters)</label>
          <input
            type="number"
            value={depth}
            onChange={e => setDepth(e.target.value)}
            style={inputStyle}
          />

          <label>Dive Time</label>
          <div style={inputGroupStyle}>
            <input
              type="number"
              placeholder="min"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type="number"
              placeholder="sec"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>

          <label>Recovery Gas</label>
          <div style={{ marginBottom: 20 }}>
            <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
            <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
          </div>

          <button
            onClick={handleCalculate}
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

          <div style={{ marginTop: '20px', fontSize: '12px', color: '#ccc' }}>
            The data provided by this app is still in testing and is for use by those certified in <strong>Technical Freediving by PFI</strong> only.
            Any use without training by an authorized and active PFI instructor could result in injury.
          </div>
        </div>
      </div>
    </>
  );
}
