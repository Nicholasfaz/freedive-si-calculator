
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
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
  };

  const showWarning = gasType === 'ean80';

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #001f33, #000)',
      color: '#fff',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Head>
        <title>Freedive Surface Interval Calculator</title>
        <meta name="description" content="Calculate surface intervals based on depth and dive time." />
      </Head>

      <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: '150px', marginBottom: '20px' }} />

      <h1 style={{ fontSize: '2em', textAlign: 'center', marginBottom: '20px' }}>
        Freedive Surface Interval Calculator
      </h1>

      <div style={{
        backgroundColor: '#002b4d',
        borderRadius: '16px',
        padding: '30px 20px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)'
      }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>Depth (meters)</label>
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          placeholder="Enter depth"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label>Minutes</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="0"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>Seconds</label>
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="0"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        </div>

        <label style={{ display: 'block', marginBottom: '10px' }}>Recovery Gas</label>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button
            onClick={() => setGasType('air')}
            style={{
              flex: 1,
              backgroundColor: gasType === 'air' ? '#EC1C24' : '#666',
              color: '#fff',
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Air
          </button>
          <button
            onClick={() => setGasType('ean80')}
            style={{
              flex: 1,
              backgroundColor: gasType === 'ean80' ? '#EC1C24' : '#666',
              color: '#fff',
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            80%
          </button>
        </div>

        <button
          onClick={handleCalculate}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1em',
            backgroundColor: '#EC1C24',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Calculate
        </button>

        {result && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#004466',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '1.2em'
          }}>
            Surface Interval: {result}
          </div>
        )}

        {showWarning && (
          <div style={{
            marginTop: '10px',
            fontSize: '0.9em',
            color: '#ffcc00',
            textAlign: 'center'
          }}>
            Must be off 80% for 2 minutes breathing air or low/bottom mix.
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '0.8em', color: '#ccc', textAlign: 'center' }}>
          App created by Nick Fazah - IT 9870
        </div>
      </div>

      <footer style={{ marginTop: '40px', fontSize: '0.9em', color: '#aaa' }}>
        <a href="https://www.performancefreediving.com" style={{ color: '#fff' }} target="_blank" rel="noopener noreferrer">
          Performance Freediving International
        </a>
      </footer>
    </div>
  );
}
