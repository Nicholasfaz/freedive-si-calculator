import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);
  const [warning, setWarning] = useState('');

  const handleCalculate = () => {
    const input = {
      depth,
      minutes,
      seconds,
      gasType,
    };
    const result = getSurfaceInterval(input);
    setSurfaceInterval(result.interval);
    setWarning(result.warning || '');
  };

  const inputBoxStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  };

  const buttonStyle = (type) => ({
    flex: 1,
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: gasType === type ? '#EC1C24' : '#444',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold'
  });

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main
        style={{
          background: 'linear-gradient(to bottom, #001f33, #000)',
          color: '#fff',
          minHeight: '100vh',
          padding: '40px 20px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 30 }}>
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: 150, display: 'block', margin: '0 auto 20px' }} />
          <h1 style={{ textAlign: 'center' }}>Freedive Surface Interval Calculator</h1>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <input
              type="number"
              placeholder="Depth (m)"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              style={{ ...inputBoxStyle, flex: 1 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={{ ...inputBoxStyle, flex: 1 }}
            />
            <input
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              style={{ ...inputBoxStyle, flex: 1 }}
            />
          </div>

          <label style={{ textAlign: 'center', display: 'block', margin: '10px 0' }}>Recovery Gas</label>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
            <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
          </div>

          <AnimatePresence>
            {surfaceInterval && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: '#112233',
                  padding: 20,
                  borderRadius: 10,
                  marginTop: 20,
                  fontSize: 24,
                  textAlign: 'center'
                }}
              >
                Surface Interval: {surfaceInterval}
              </motion.div>
            )}
          </AnimatePresence>

          {warning && (
            <div style={{ color: '#ffcc00', fontSize: '14px', marginTop: '10px', textAlign: 'center' }}>
              {warning}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button
              onClick={handleCalculate}
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#EC1C24',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Calculate
            </button>
          </div>

          <div style={{ marginTop: 20, fontSize: 12, textAlign: 'center', color: '#aaa' }}>
            The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </div>

          <footer style={{ marginTop: 40, textAlign: 'center', fontSize: 12, color: '#888' }}>
            <p>
              <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#aaa' }}>
                Powered by PFI
              </a>
            </p>
            <p>App Creator: Nick Fazah, IT 9870</p>
          </footer>
        </div>
      </main>
    </>
  );
}
