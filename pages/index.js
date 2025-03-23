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
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #001f33, #004466)',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>

      <main style={{ maxWidth: '500px', margin: '0 auto' }}>
        <img 
          src="/pfi-logo.png" 
          alt="PFI Logo" 
          style={{ maxWidth: '150px', display: 'block', margin: '0 auto 20px', objectFit: 'contain' }} 
          onClick={() => window.open('https://www.performancefreediving.com/', '_blank')}
        />

        <h1 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '30px' }}>
          Freedive Surface Interval Calculator
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Depth (m)"
            style={{ flex: '1 1 100px', padding: '10px', fontSize: '1rem', borderRadius: '10px', border: 'none' }}
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Min"
            style={{ flex: '1 1 70px', padding: '10px', fontSize: '1rem', borderRadius: '10px', border: 'none' }}
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            placeholder="Sec"
            style={{ flex: '1 1 70px', padding: '10px', fontSize: '1rem', borderRadius: '10px', border: 'none' }}
          />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button 
            onClick={() => setGasType('air')} 
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              borderRadius: '10px',
              border: gasType === 'air' ? '2px solid #EC1C24' : '1px solid #ccc',
              background: gasType === 'air' ? '#EC1C24' : '#333',
              color: '#fff'
            }}>
            Air
          </button>
          <button 
            onClick={() => setGasType('ean80')} 
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: gasType === 'ean80' ? '2px solid #EC1C24' : '1px solid #ccc',
              background: gasType === 'ean80' ? '#EC1C24' : '#333',
              color: '#fff'
            }}>
            80%
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleCalculate}
            style={{
              background: 'linear-gradient(to right, #EC1C24, #d81a20)',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)'
            }}>
            Calculate
          </button>
        </div>

        {result && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#002b45',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            boxShadow: '0 0 8px rgba(0,0,0,0.2)'
          }}>
            Surface Interval: {result}
          </div>
        )}

        {gasType === 'ean80' && (
          <div style={{ marginTop: '15px', backgroundColor: '#444', padding: '10px', borderRadius: '10px', textAlign: 'center', color: 'yellow' }}>
            Must be off 80% for 2 minutes breathing air or low/bottom mix.
          </div>
        )}

        <div style={{ marginTop: '40px', fontSize: '0.85rem', color: '#bbb', textAlign: 'center' }}>
          This calculator is for training guidance only. Always dive within your limits.
        </div>

        <footer style={{
          marginTop: '30px',
          fontSize: '0.8rem',
          color: '#888',
          textAlign: 'center'
        }}>
          App Creator: Nick Fazah — IT 9870
        </footer>
      </main>
    </div>
  );
}
