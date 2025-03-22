
import React, { useState } from 'react';
import Head from 'next/head';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const input = { depth, minutes, seconds, gasType };
    const result = getSurfaceInterval(input);
    if (typeof result === 'string' && result.includes('Surface Interval')) {
      setSurfaceInterval(result);
      setError('');
    } else {
      setError(result);
      setSurfaceInterval('');
    }
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.container}>
        <h1 style={styles.header}>Freedive Surface Interval Calculator</h1>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Dive Depth (m)</label>
          <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Dive Time</label>
          <div style={styles.row}>
            <input type="number" placeholder="min" value={minutes} onChange={(e) => setMinutes(e.target.value)} style={{ ...styles.input, marginRight: 10 }} />
            <input type="number" placeholder="sec" value={seconds} onChange={(e) => setSeconds(e.target.value)} style={styles.input} />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={{ ...styles.label, textAlign: 'center' }}>Recovery Gas</label>
          <div style={styles.row}>
            <button onClick={() => setGasType('air')} style={gasType === 'air' ? styles.activeButton : styles.button}>Air</button>
            <button onClick={() => setGasType('ean80')} style={gasType === 'ean80' ? styles.activeButton : styles.button}>EAN 80%</button>
          </div>
        </div>

        <button onClick={handleCalculate} style={styles.calculateButton}>Calculate</button>

        {surfaceInterval && (
          <div style={styles.resultBox}>
            <strong>Surface Interval:</strong> {surfaceInterval}
          </div>
        )}

        {gasType === 'ean80' && surfaceInterval && (
          <div style={styles.warning}>Must be off 80% for 2 minutes breathing air or low/bottom mix.</div>
        )}

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        <div style={styles.disclaimer}>
          The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
        </div>

        <footer style={styles.footer}>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={styles.logo} />
          </a>
          <p style={styles.creator}>App Creator: Nick Fazah</p>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    color: '#fff'
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff'
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: '100%',
    maxWidth: 100,
    borderRadius: 6,
    border: '1px solid #ccc'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    padding: '10px 20px',
    margin: '0 5px',
    border: '1px solid #aaa',
    borderRadius: 6,
    background: '#ddd',
    cursor: 'pointer'
  },
  activeButton: {
    padding: '10px 20px',
    margin: '0 5px',
    border: '1px solid #000',
    borderRadius: 6,
    background: '#66f',
    color: '#fff',
    cursor: 'pointer'
  },
  calculateButton: {
    marginTop: 20,
    padding: '12px 24px',
    fontSize: 16,
    backgroundColor: '#ec1c24',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer'
  },
  resultBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#112233',
    borderRadius: 8,
    color: '#fff',
    fontSize: 20
  },
  warning: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffcc00',
    color: '#000',
    borderRadius: 6
  },
  error: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4444',
    color: '#fff',
    borderRadius: 6
  },
  disclaimer: {
    marginTop: 40,
    fontSize: 12,
    color: '#ccc'
  },
  footer: {
    marginTop: 60,
    textAlign: 'center'
  },
  logo: {
    width: 100,
    marginBottom: 10
  },
  creator: {
    fontSize: 14,
    color: '#aaa'
  }
};
