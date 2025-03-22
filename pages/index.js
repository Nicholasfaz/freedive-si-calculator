
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');
  const [warning, setWarning] = useState('');

  const handleCalculate = () => {
    const input = { depth, minutes, seconds, gasType };
    const result = getSurfaceInterval(input);
    setSurfaceInterval(result);
    setWarning(gasType === 'ean80' ? 'Must be off 80% for 2 minutes breathing air or low/bottom mix' : '');
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div style={{ fontFamily: 'Arial, sans-serif', background: 'linear-gradient(to bottom, #001f33, #000)', color: '#fff', minHeight: '100vh', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <main style={{ width: '100%', maxWidth: '500px' }}>
          <h1 style={{ textAlign: 'center' }}>Freedive Surface Interval Calculator</h1>
          <div style={{ margin: '20px 0' }}>
            <label>Depth (m)</label>
            <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <label>Minutes</label>
              <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Seconds</label>
              <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: 'none' }} />
            </div>
          </div>
          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <label><strong>Recovery Gas</strong></label>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => setGasType('air')} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '5px', backgroundColor: gasType === 'air' ? '#0070f3' : '#333', color: '#fff', border: 'none' }}>Air</button>
              <button onClick={() => setGasType('ean80')} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: gasType === 'ean80' ? '#0070f3' : '#333', color: '#fff', border: 'none' }}>EAN 80%</button>
            </div>
          </div>
          <button onClick={handleCalculate} style={{ width: '100%', padding: '15px', fontSize: '18px', borderRadius: '5px', backgroundColor: '#EC1C24', color: '#fff', border: 'none', marginBottom: '10px' }}>Calculate</button>

          {surfaceInterval && (
            <div style={{ background: '#112233', padding: '15px', borderRadius: '10px', fontSize: '20px', marginTop: '10px', textAlign: 'center' }}>
              <strong>Surface Interval:</strong> {surfaceInterval}
            </div>
          )}

          {warning && (
            <div style={{ background: '#ffaa00', color: '#000', padding: '10px', marginTop: '10px', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}>
              {warning}
            </div>
          )}

          <p style={{ fontSize: '12px', marginTop: '20px', textAlign: 'center' }}>
            The data provided by this app is still in testing and is for use by those certified in "Technical Freediving" by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </p>
        </main>
        <footer style={{ marginTop: 'auto', paddingTop: '30px', textAlign: 'center' }}>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: '100px', marginBottom: '10px' }} />
          </a>
          <div style={{ fontSize: '14px', color: '#ccc' }}>App Creator: Nick Fazah – IT 9870</div>
        </footer>
      </div>
    </>
  );
}
