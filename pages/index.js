import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');

  const handleCalculate = () => {
    const result = getSurfaceInterval({
      depth,
      minutes,
      seconds,
      gasType,
    });
    setSurfaceInterval(result);
  };

  return (
    <>
      <Head>
        <title>Freedive SI Calculator</title>
        <meta name="description" content="Freedive Surface Interval Calculator by Nick Fazah IT 9870" />
      </Head>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Freedive SI Calculator</h1>
          <div style={styles.row}>
            <input
              type="number"
              placeholder="Depth (m)"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.row}>
            <input
              type="number"
              placeholder="Min"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={{ ...styles.input, width: '80px', marginRight: '10px' }}
            />
            <input
              type="number"
              placeholder="Sec"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              style={{ ...styles.input, width: '80px' }}
            />
          </div>
          <div style={styles.row}>
            <button
              onClick={() => setGasType('air')}
              style={{
                ...styles.button,
                backgroundColor: gasType === 'air' ? '#1e90ff' : '#333',
              }}
            >
              Air
            </button>
            <button
              onClick={() => setGasType('ean80')}
              style={{
                ...styles.button,
                backgroundColor: gasType === 'ean80' ? '#1e90ff' : '#333',
              }}
            >
              80%
            </button>
          </div>
          <button onClick={handleCalculate} style={styles.calculate}>
            Calculate
          </button>

          {gasType === 'ean80' && (
            <p style={styles.warning}>
              Must be off 80% for 2 minutes breathing air or low/bottom mix
            </p>
          )}

          <div style={styles.result}>
            Surface Interval: {surfaceInterval}
          </div>

          <footer style={styles.footer}>
            <p>App creator: Nick Fazah IT 9870</p>
            <a href="https://performancefreediving.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/pfi-logo.png"
                alt="PFI Logo"
                style={{ height: 60, marginTop: 10 }}
              />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #000814, #001f3f)',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#111',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  row: {
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#222',
    color: '#fff',
  },
  button: {
    padding: '10px 20px',
    margin: '0 5px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
  },
  calculate: {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#ec1c24',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  result: {
    marginTop: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  warning: {
    marginTop: '10px',
    color: '#ffcc00',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  footer: {
    marginTop: '30px',
    fontSize: '14px',
    color: '#aaa',
  },
};
