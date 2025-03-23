
import { useState } from 'react';
import Head from 'next/head';
import { getSurfaceInterval } from '../si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const surfaceInterval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(surfaceInterval);
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
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)'
        }}>
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ maxWidth: '120px', display: 'block', margin: '0 auto 20px' }} />
          <h1 style={{ textAlign: 'center' }}>Surface Interval Calculator</h1>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <input
              type="number"
              placeholder="Depth (m)"
              value={depth}
              onChange={e => setDepth(e.target.value)}
              style={{ flex: '1 1 100%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: 'none' }}
            />
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              style={{ flex: '1 1 48%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: 'none' }}
            />
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              style={{ flex: '1 1 48%', padding: '10px', fontSize: '16px', borderRadius: '8px', border: 'none' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={() => setGasType('air')} style={{
              background: gasType === 'air' ? '#EC1C24' : '#444',
              color: '#fff',
              padding: '10px 15px',
              marginRight: '10px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Air</button>
            <button onClick={() => setGasType('ean80')} style={{
              background: gasType === 'ean80' ? '#EC1C24' : '#444',
              color: '#fff',
              padding: '10px 15px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>EAN80</button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button onClick={handleCalculate} style={{
              background: 'linear-gradient(to right, #EC1C24, #d81a20)',
              color: '#fff',
              padding: '12px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>Calculate</button>
          </div>

          {result && (
            <div style={{
              backgroundColor: '#222',
              padding: '15px',
              textAlign: 'center',
              fontSize: '24px',
              borderRadius: '12px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              Surface Interval: {result}
            </div>
          )}

          {gasType === 'ean80' && (
            <div style={{
              backgroundColor: '#EC1C24',
              padding: '10px',
              color: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Must be off 80% for 2 minutes breathing air or low/bottom mix.
            </div>
          )}

          <div style={{
            fontSize: '12px',
            color: '#aaa',
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            This calculator is for educational purposes only. Always follow proper training and safety protocols.
          </div>

          <div style={{
            fontSize: '14px',
            color: '#aaa',
            textAlign: 'center'
          }}>
            App Creator: Nick Fazah (IT 9870)
          </div>
        </div>
      </div>
    </>
  );
}
