
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
    const input = {
      depth,
      minutes,
      seconds,
      gasType
    };
    const interval = getSurfaceInterval(input);
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
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: 150, marginBottom: 10 }} />
          </div>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>
          <div style={{ marginBottom: 20 }}>
            <label>Depth (m)</label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              placeholder="Enter depth in meters"
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 5,
                border: 'none',
                marginTop: 5
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Time (min:sec)</label>
            <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="min"
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 5,
                  border: 'none'
                }}
              />
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="sec"
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 5,
                  border: 'none'
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Recovery Gas</label>
            <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
              <button onClick={() => setGasType('air')} style={{
                flex: 1,
                padding: 10,
                backgroundColor: gasType === 'air' ? '#00aaff' : '#00334d',
                color: '#fff',
                border: 'none',
                borderRadius: 5
              }}>Air</button>
              <button onClick={() => setGasType('ean80')} style={{
                flex: 1,
                padding: 10,
                backgroundColor: gasType === 'ean80' ? '#00aaff' : '#00334d',
                color: '#fff',
                border: 'none',
                borderRadius: 5
              }}>EAN 80%</button>
            </div>
          </div>
          <button onClick={handleCalculate} style={{
            width: '100%',
            padding: 12,
            backgroundColor: '#EC1C24',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 5,
            marginTop: 10,
            fontSize: 16
          }}>Calculate</button>

          {result && (
            <div style={{
              marginTop: 20,
              padding: 15,
              background: '#004466',
              borderRadius: 8,
              textAlign: 'center',
              fontSize: 18
            }}>
              Surface Interval: {result}
              {gasType === 'ean80' && <div style={{ marginTop: 10, fontSize: 14, color: '#ffcc00' }}>
                Must be off 80% for 2 minutes breathing air or low/bottom mix.
              </div>}
            </div>
          )}

          <div style={{
            marginTop: 30,
            fontSize: 12,
            color: '#ccc',
            textAlign: 'center'
          }}>
            This calculator is for educational use only. Always consult a qualified instructor.
          </div>
        </div>

        <footer style={{ marginTop: 40, textAlign: 'center', fontSize: 14, color: '#aaa' }}>
          <div>
            Created by Nick Fazah – IT 9870 • <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00aaff' }}>Performance Freediving International</a>
          </div>
        </footer>
      </div>
    </>
  );
}
