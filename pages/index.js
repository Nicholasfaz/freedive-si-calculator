
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../si-logic';

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
      gasType,
    };
    const interval = getSurfaceInterval(input);
    setResult(interval);
  };

  return (
    <div>
      <Head>
        <title>Freedive SI Calculator</title>
        <meta name="description" content="Freedive Surface Interval Calculator by Nick Fazah" />
      </Head>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        color: '#fff',
        background: 'linear-gradient(to bottom, #001f33, #004466)',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img
            src="/pfi-logo.png"
            alt="Performance Freediving International"
            width="240"
            height="auto"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </div>

        <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>
          Freedive Surface Interval Calculator
        </h1>

        <label>Depth (m)</label>
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          placeholder="Depth"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
        />

        <label>Dive Time</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutes"
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            placeholder="Seconds"
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          />
        </div>

        <label>Recovery Gas</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setGasType('air')}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: gasType === 'air' ? '#EC1C24' : '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Air
          </button>
          <button
            onClick={() => setGasType('ean80')}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: gasType === 'ean80' ? '#EC1C24' : '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            80%
          </button>
        </div>

        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#EC1C24',
            color: '#fff',
            fontSize: '18px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Calculate Surface Interval
        </button>

        {result && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#00334d',
            borderRadius: '8px',
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Surface Interval: {result}
            {gasType === 'ean80' && (
              <div style={{ fontSize: '14px', marginTop: '8px' }}>
                Must be off 80% for 2 minutes breathing air or low/bottom mix
              </div>
            )}
          </div>
        )}

        <p style={{
          marginTop: '30px',
          fontSize: '12px',
          textAlign: 'center',
          color: '#ccc'
        }}>
          App created by Nick Fazah – IT 9870<br />
          Surface interval calculations provided for training and reference purposes only. Always dive responsibly.
        </p>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <a href="https://performancefreediving.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'underline' }}>
            performancefreediving.com
          </a>
        </div>
      </div>
    </div>
  );
}
