
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');

  const handleCalculate = () => {
    const result = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setSurfaceInterval(result);
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #001f33, #000)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px'
      }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <h1 style={{ textAlign: 'center' }}>Freedive Surface Interval Calculator</h1>
          <div style={{
            backgroundColor: '#112233',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(0,0,0,0.4)'
          }}>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Dive Depth (meters)</label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                style={{
                  padding: '8px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: 'none',
                  width: '100%',
                  maxWidth: '200px',
                  textAlign: 'center'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Dive Time</label>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    width: '80px',
                    textAlign: 'center'
                  }}
                />
                <input
                  type="number"
                  placeholder="Sec"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    width: '80px',
                    textAlign: 'center'
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 20, textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>Recovery Gas</label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={() => setGasType('air')} style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  background: gasType === 'air' ? '#EC1C24' : '#555',
                  color: '#fff',
                  border: 'none'
                }}>Air</button>
                <button onClick={() => setGasType('ean80')} style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  background: gasType === 'ean80' ? '#EC1C24' : '#555',
                  color: '#fff',
                  border: 'none'
                }}>EAN 80%</button>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button onClick={handleCalculate} style={{
                padding: '12px 24px',
                background: 'linear-gradient(to right, #EC1C24, #d81a20)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}>Calculate</button>
            </div>
            {surfaceInterval && (
              <div style={{
                marginTop: '20px',
                backgroundColor: '#fff',
                color: '#000',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                Surface Interval: {surfaceInterval}
              </div>
            )}
            {gasType === 'ean80' && (
              <p style={{ marginTop: '15px', fontSize: '14px', color: '#ffcc00', textAlign: 'center' }}>
                Must be off 80% for 2 minutes breathing air or low/bottom mix.
              </p>
            )}
            <p style={{
              marginTop: '15px',
              fontSize: '12px',
              textAlign: 'center',
              color: '#aaa'
            }}>
              The data provided by this app is still in testing and is for use by those certified in "Technical Freediving by PFI" only. Any use without training by an authorized and active PFI instructor could result in injury.
            </p>
          </div>
        </div>
        <footer style={{
          textAlign: 'center',
          marginTop: '30px'
        }}>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '60px', marginBottom: '10px' }} />
          </a>
          <p style={{ fontSize: '12px', color: '#ccc' }}>App Creator: Nick Fazah - IT 9870</p>
        </footer>
      </div>
    </>
  );
}
