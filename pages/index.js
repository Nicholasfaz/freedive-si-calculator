
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleCalculate = () => {
    const si = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(si);
    setShowWarning(gasType === 'ean80');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom, #001f33, #004466)',
      color: 'white',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <Head>
        <title>Freedive Surface Interval Calculator</title>
        <link rel="icon" href="/pfi-logo.png" />
      </Head>

      <main style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: '120px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Surface Interval Calculator</h1>
        <p style={{ fontStyle: 'italic', fontSize: '14px', marginBottom: '20px' }}>
          Based on depth, dive time, and recovery gas
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Depth (m)"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            style={{ flex: '1', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{ width: '100px', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            style={{ width: '100px', padding: '10px', fontSize: '16px', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setGasType('air')}
            style={{
              backgroundColor: gasType === 'air' ? '#ff3333' : '#ccc',
              color: gasType === 'air' ? 'white' : 'black',
              padding: '10px 20px',
              marginRight: '10px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            Air
          </button>
          <button
            onClick={() => setGasType('ean80')}
            style={{
              backgroundColor: gasType === 'ean80' ? '#ff3333' : '#ccc',
              color: gasType === 'ean80' ? 'white' : 'black',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            EAN80
          </button>
        </div>

        <button
          onClick={handleCalculate}
          style={{
            backgroundColor: '#ff3333',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Calculate
        </button>

        {result && (
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            Surface Interval: <span style={{ backgroundColor: '#fff', color: '#001f33', padding: '4px 8px', borderRadius: '6px' }}>{result}</span>
          </div>
        )}

        {showWarning && (
          <div style={{
            backgroundColor: '#ffffcc',
            color: '#333',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            Must be off 80% for 2 minutes breathing air or low/bottom mix.
          </div>
        )}

        <p style={{ fontSize: '12px', fontStyle: 'italic' }}>
          Surface intervals are calculated from dive completion time.
        </p>
        <footer style={{ marginTop: '40px', fontSize: '12px', opacity: 0.7 }}>
          App Creator: Nick Fazah | IT 9870 | <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>PFI</a>
        </footer>
      </main>
    </div>
  );
}
