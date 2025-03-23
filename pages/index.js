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
    <div style={styles.page}>
      <Head>
        <title>Freedive Surface Interval Calculator</title>
      </Head>

      <div style={styles.container}>
        <h1 style={styles.title}>Surface Interval Calculator</h1>

        <label style={styles.label}>Dive Depth (m):
          <input
            type="number"
            value={depth}
            onChange={e => setDepth(e.target.value)}
            style={styles.inputSmall}
          />
        </label>

        <div style={styles.timeRow}>
          <label style={styles.label}>Minutes:
            <input
              type="number"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              style={styles.inputTiny}
            />
          </label>

          <label style={styles.label}>Seconds:
            <input
              type="number"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              style={styles.inputTiny}
            />
          </label>
        </div>

        <div style={styles.gasToggle}>
          <button
            style={gasType === 'air' ? styles.activeButton : styles.button}
            onClick={() => setGasType('air')}
          >Air</button>
          <button
            style={gasType === 'ean80' ? styles.activeButton : styles.button}
            onClick={() => setGasType('ean80')}
          >80% O₂</button>
        </div>

        <button onClick={handleCalculate} style={styles.calculateButton}>Calculate</button>

        {surfaceInterval && (
          <div style={styles.resultBox}>
            <strong>Surface Interval:</strong> {surfaceInterval}
            {gasType === 'ean80' && (
              <div style={styles.warning}>
                Must be off 80% for 2 minutes breathing air or low/bottom mix
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p>Created by Nick Fazah (IT 9870) | Data by Performance Freediving International</p>
        <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer">
          <img src="/pfi-logo.png" alt="PFI Logo" style={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    background: 'linear-gradient(to bottom, #001f33, #000)',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px'
  },
  container: {
    background: '#222831',
    borderRadius: '12px',
    padding: '30px 20px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 0 25px rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  title: {
    textAlign: 'center',
    fontSize: '24px'
  },
  label: {
    fontSize: '16px'
  },
  inputSmall: {
    width: '50%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  inputTiny: {
    width: '100%',
    padding: '6px',
    marginTop: '5px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  timeRow: {
    display: 'flex',
    gap: '10px'
  },
  gasToggle: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#333',
    color: '#fff',
    border: '1px solid #666',
    cursor: 'pointer'
  },
  activeButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    background: '#00bfff',
    color: '#fff',
    border: '1px solid #0088cc',
    cursor: 'pointer'
  },
  calculateButton: {
    marginTop: '10px',
    padding: '12px 20px',
    width: '100%',
    background: 'linear-gradient(to right, #00bfff, #0066cc)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer'
  },
  resultBox: {
    marginTop: '20px',
    padding: '15px',
    background: '#004466',
    borderRadius: '10px',
    fontSize: '18px',
    textAlign: 'center'
  },
  warning: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#ffcc00'
  },
  footer: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#aaa'
  },
  logo: {
    height: '70px',
    marginTop: '10px'
  }
};
