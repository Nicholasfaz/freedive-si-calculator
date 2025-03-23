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
    const si = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(si);
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Freedive Surface Interval Calculator</title>
      </Head>
      <div style={styles.card}>
        <h1 style={styles.title}>Surface Interval Calculator</h1>
        <div style={styles.inputRow}>
          <input
            type="number"
            placeholder="Depth (m)"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputRow}>
          <input
            type="number"
            placeholder="Min"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={styles.inputSmall}
          />
          <input
            type="number"
            placeholder="Sec"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            style={styles.inputSmall}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button
            onClick={() => setGasType('air')}
            style={{ ...styles.button, backgroundColor: gasType === 'air' ? '#0070f3' : '#333' }}
          >
            Air
          </button>
          <button
            onClick={() => setGasType('ean80')}
            style={{ ...styles.button, backgroundColor: gasType === 'ean80' ? '#0070f3' : '#333' }}
          >
            80%
          </button>
        </div>
        <button onClick={handleCalculate} style={styles.calculateButton}>
          Calculate
        </button>
        <div style={styles.result}>
          <strong>Surface Interval:</strong> {result}
        </div>
        <p style={styles.warning}>
          {gasType === 'ean80' && 'Must be off 80% for 2 minutes breathing air or low/bottom mix'}
        </p>
        <p style={styles.disclaimer}>
          * This tool is for educational use only. Always dive with proper training and supervision.
        </p>
        <footer style={styles.footer}>
          <a href="https://performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={styles.logo} />
          </a>
          <p>App Creator: Nick Fazah — IT 9870</p>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to bottom, #001f33, #000)',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  card: {
    backgroundColor: '#1c2735',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '80%',
  },
  inputSmall: {
    padding: '10px',
    fontSize: '16px',
    width: '48%',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  button: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  calculateButton: {
    marginTop: '10px',
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: '#ec1c24',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
  },
  warning: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#f0c040',
  },
  disclaimer: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#aaa',
  },
  footer: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#ccc',
  },
  logo: {
    height: '40px',
    marginBottom: '10px',
  },
};