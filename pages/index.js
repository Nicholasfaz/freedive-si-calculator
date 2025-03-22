
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const calculate = () => {
    const si = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(si ? `Surface Interval: ${si}` : 'Surface Interval: Time too long for this depth');
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ 
        background: 'linear-gradient(to bottom, #001f33, #000)', 
        color: '#fff', 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '500px',
          background: 'rgba(255,255,255,0.05)', 
          padding: '30px', 
          borderRadius: '20px', 
          backdropFilter: 'blur(10px)', 
          boxShadow: '0 0 20px rgba(0,0,0,0.4)' 
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Freedive Surface Interval Calculator</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>Dive Depth (m)</label>
            <input value={depth} onChange={e => setDepth(e.target.value)} type="number" placeholder="Depth" style={inputStyle} />

            <label>Dive Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input value={minutes} onChange={e => setMinutes(e.target.value)} type="number" placeholder="Min" style={{ ...inputStyle, flex: 1 }} />
              <input value={seconds} onChange={e => setSeconds(e.target.value)} type="number" placeholder="Sec" style={{ ...inputStyle, flex: 1 }} />
            </div>

            <label>Recovery Gas</label>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setGasType('air')} style={buttonStyle(gasType === 'air')}>Air</button>
              <button onClick={() => setGasType('ean80')} style={buttonStyle(gasType === 'ean80')}>EAN 80%</button>
            </div>

            <button onClick={calculate} style={{ ...inputStyle, background: '#EC1C24', color: '#fff', fontWeight: 'bold' }}>Calculate</button>
            {result && <div style={{ marginTop: '20px', fontSize: '18px', textAlign: 'center' }}>{result}</div>}
          </div>
          <div style={{ marginTop: '20px', fontSize: '12px', color: '#ccc', textAlign: 'center' }}>
            The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </div>
        </div>
        <footer style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#ccc' }}>
          <a href="https://performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '40px', marginBottom: '10px' }} />
          </a>
          <div>App Creator: Nick Fazah</div>
        </footer>
      </div>
    </>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box'
};

const buttonStyle = (active) => ({
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  fontSize: '16px',
  background: active ? '#EC1C24' : '#444',
  color: '#fff',
  cursor: 'pointer'
});
