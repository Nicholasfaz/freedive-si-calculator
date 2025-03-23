import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const handleCalculate = () => {
    const result = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setSurfaceInterval(result);
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #001f33, #000)',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      <Head>
        <title>Freedive Surface Interval Calculator</title>
      </Head>

      <div style={{
        background: '#1e1e1e',
        borderRadius: '12px',
        padding: '30px 20px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h1 style={{ textAlign: 'center' }}>Surface Interval Calculator</h1>

        <label>
          Dive Depth (m):
          <input
            type="number"
            value={depth}
            onChange={e => setDepth(e.target.value)}
            style={inputStyle}
          />
        </label>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            Minutes:
            <input
              type="number"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              style={smallInputStyle}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            Seconds:
            <input
              type="number"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              style={smallInputStyle}
            />
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button
            style={gasType === 'air' ? activeButton : buttonStyle}
            onClick={() => setGasType('air')}
          >
            Air
          </button>
          <button
            style={gasType === 'ean80' ? activeButton : buttonStyle}
            onClick={() => setGasType('ean80')}
          >
            80% O2
          </button>
        </div>

        <button onClick={handleCalculate} style={calculateStyle}>
          Calculate
        </button>

        {surfaceInterval && (
          <div style={resultBox}>
            <strong>Surface Interval:</strong> {surfaceInterval}
            {gasType === 'ean80' && (
              <div style={{ marginTop: '10px', fontSize: '14px', color: '#ffcc00' }}>
                Must be off 80% for 2 minutes breathing air or low/bottom mix
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px', color: '#aaa' }}>
        <p>
          Created by Nick Fazah (IT 9870) | Data by Performance Freediving International
        </p>
        <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer">
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: '60px', marginTop: '10px' }} />
        </a>
      </footer>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const smallInputStyle = {
  width: '80px',
  padding: '8px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '8px',
  background: '#333',
  color: '#fff',
  border: '1px solid #666',
  cursor: 'pointer'
};

const activeButton = {
  ...buttonStyle,
  background: '#0066cc',
  borderColor: '#004c99'
};

const calculateStyle = {
  marginTop: '10px',
  padding: '12px 20px',
  width: '100%',
  background: 'linear-gradient(to right, #00bfff, #0066cc)',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '18px',
  cursor: 'pointer'
};

const resultBox = {
  marginTop: '20px',
  padding: '15px',
  background: '#004466',
  borderRadius: '10px',
  fontSize: '18px',
  textAlign: 'center'
};
