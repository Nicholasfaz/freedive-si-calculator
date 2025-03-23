
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
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom, #001f33, #000)',
      color: '#fff',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Freedive Surface Interval Calculator</h1>
        
        <label>Depth (m)</label>
        <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <label>Minutes</label>
            <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
          </div>
          <div style={{ width: '48%' }}>
            <label>Seconds</label>
            <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
          </div>
        </div>

        <label>Recovery Gas</label>
        <select value={gasType} onChange={(e) => setGasType(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px' }}>
          <option value="air">Air</option>
          <option value="ean80">EAN80</option>
        </select>

        <button onClick={handleCalculate} style={{
          width: '100%',
          padding: '15px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#fff',
          background: 'linear-gradient(to right, #e60000, #cc0000)',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}>Calculate</button>

        {result && (
          <div style={{
            marginTop: '20px',
            padding: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '2px solid #fff',
            borderRadius: '10px',
            backgroundColor: '#002240'
          }}>
            Surface Interval: {result}
          </div>
        )}

        {gasType === 'ean80' && result && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            fontSize: '14px',
            textAlign: 'center',
            color: '#ffcc00'
          }}>
            Must be off 80% for 2 minutes breathing air or low/bottom mix
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center' }}>
          This calculator is intended for trained freediving professionals only. Always dive with a buddy and proper supervision.
        </div>
      </div>

      <footer style={{
        marginTop: '40px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#ccc'
      }}>
        <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '50px', marginBottom: '10px' }} />
        </a>
        <div>App Creator: Nick Fazah, IT 9870</div>
      </footer>
    </div>
  );
}
