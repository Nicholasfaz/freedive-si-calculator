
import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');
  const [warning, setWarning] = useState('');

  const buttonStyle = (type) => ({
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: gasType === type ? '#EC1C24' : '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  });

  const handleCalculate = () => {
    setWarning('');
    const result = getSurfaceInterval({
      depth,
      minutes,
      seconds,
      gasType,
    });

    setSurfaceInterval(result);
    if (gasType === 'ean80') {
      setWarning("Must be off 80% for 2 minutes breathing air or low/bottom mix");
    }
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div style={{
        background: 'linear-gradient(to bottom, #001f33, #000)',
        color: '#fff',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
            Freedive Surface Interval Calculator
          </h1>

          <div style={{ marginBottom: 20 }}>
            <label>Dive Depth (m)</label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                marginTop: 10,
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: 20,
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1 }}>
              <label>Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  marginTop: 10,
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: 'none',
                  marginTop: 10,
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', textAlign: 'center' }}>Recovery Gas</label>
            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
              <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
            </div>
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
                  marginTop: '20px',
                  fontSize: '24px',
                  background: '#112233',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                Surface Interval: {surfaceInterval}
              </motion.div>
            )}
          </AnimatePresence>

          {warning && (
            <p style={{
              marginTop: '15px',
              fontSize: '14px',
              color: '#ffcc00',
              textAlign: 'center'
            }}>{warning}</p>
          )}

          <button
            onClick={handleCalculate}
            style={{
              marginTop: 30,
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#EC1C24',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Calculate
          </button>

          <p style={{
            fontSize: '12px',
            color: '#ccc',
            marginTop: 20,
            textAlign: 'center'
          }}>
            The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </p>
        </div>

        <footer style={{
          marginTop: 30,
          textAlign: 'center',
          fontSize: '14px',
          color: '#ccc'
        }}>
          <div>
            <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
              <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: 40, marginBottom: 10 }} />
            </a>
          </div>
          <p>App Creator: Nick Fazah – IT 9870</p>
        </footer>
      </div>
    </>
  );
}
