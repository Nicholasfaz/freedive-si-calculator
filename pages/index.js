
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
    const depthNum = parseFloat(depth);
    const minNum = parseInt(minutes, 10);
    const secNum = parseInt(seconds, 10);

    if (isNaN(depthNum) || isNaN(minNum) || isNaN(secNum)) {
      setSurfaceInterval("Please enter valid numbers.");
      return;
    }

    const si = getSurfaceInterval(depthNum, minNum, secNum, gasType);
    setSurfaceInterval(si);
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
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

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
              <button onClick={() => setGasType('air')} style={{ marginRight: '10px' }}>Air</button>
              <button onClick={() => setGasType('ean80')}>EAN 80%</button>
            </div>
          </div>

          {surfaceInterval && (
            <div style={{
              marginBottom: '20px',
              fontSize: '20px',
              background: '#112233',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
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

          <p style={{
            fontSize: '12px',
            color: '#ccc',
            marginTop: '15px',
            textAlign: 'center'
          }}>
            The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </p>
        </div>

        <div style={{
          marginTop: '40px',
          width: '100%',
          background: '#0d1a26',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
          fontSize: '14px',
          borderTop: '1px solid #1a2e40'
        }}>
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '40px', marginBottom: '5px' }} />
          <div>
            Powered by <a href="https://www.tdisdi.com/pfi/" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfff' }}>
              Performance Freediving International
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
