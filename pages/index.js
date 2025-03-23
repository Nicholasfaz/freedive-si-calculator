
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');
  const [warning, setWarning] = useState('');

  const handleCalculate = () => {
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
    if (gasType === 'ean80') {
      setWarning('Must be off 80% for 2 minutes breathing air or low/bottom mix');
    } else {
      setWarning('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: '200px', marginBottom: '1rem' }} />
      <h1>Freedive Surface Interval Calculator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input type="number" placeholder="Depth (m)" value={depth} onChange={(e) => setDepth(e.target.value)} style={{ padding: '0.5rem', marginRight: '0.5rem' }} />
        <input type="number" placeholder="Min" value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ padding: '0.5rem', marginRight: '0.5rem', width: '80px' }} />
        <input type="number" placeholder="Sec" value={seconds} onChange={(e) => setSeconds(e.target.value)} style={{ padding: '0.5rem', width: '80px' }} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setGasType('air')} style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', backgroundColor: gasType === 'air' ? '#0070f3' : '#ccc', color: '#fff', border: 'none' }}>Air</button>
        <button onClick={() => setGasType('ean80')} style={{ padding: '0.5rem 1rem', backgroundColor: gasType === 'ean80' ? '#0070f3' : '#ccc', color: '#fff', border: 'none' }}>EAN80</button>
      </div>
      <button onClick={handleCalculate} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Calculate
      </button>
      {result && (
        <div style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Surface Interval: {result}
        </div>
      )}
      {warning && (
        <div style={{ marginTop: '1rem', color: 'red', fontWeight: 'bold' }}>
          {warning}
        </div>
      )}
      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>
        <div>App Creator: Nick Fazah – IT 9870</div>
        <div>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">Powered by PFI</a>
        </div>
      </footer>
    </div>
  );
}
