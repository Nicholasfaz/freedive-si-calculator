
import React, { useState } from 'react';
import Head from 'next/head';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState('');

  const handleCalculate = () => {
    console.log('Sending to getSurfaceInterval:', {
      depth,
      minutes,
      seconds,
      gasType,
    });

    const result = getSurfaceInterval({
      depth: parseFloat(depth),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
      gasType,
    });

    setSurfaceInterval(result);
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
      }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
            Freedive Surface Interval Calculator
          </h1>

          <div style={{ marginBottom: 20 }}>
            <label>Dive Depth (meters)</label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label>Dive Time</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                style={{ flex: 1, padding: '10px' }}
              />
              <input
                type="number"
                placeholder="Seconds"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                style={{ flex: 1, padding: '10px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label>Recovery Gas</label>
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setGasType('air')}
                style={{
                  padding: '10px 20px',
                  marginRight: '10px',
                  backgroundColor: gasType === 'air' ? '#EC1C24' : '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Air
              </button>
              <button
                onClick={() => setGasType('ean80')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: gasType === 'ean80' ? '#EC1C24' : '#444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                EAN 80%
              </button>
            </div>
          </div>

          {surfaceInterval && (
            <div style={{
              marginBottom: '20px',
              fontSize: '20px',
              background: '#112233',
              padding: '15px',
              borderRadius: '10px'
            }}>
              {surfaceInterval.includes("|||") ? (
                <>
                  <div>Surface Interval: <strong>{surfaceInterval.split("|||")[0]}</strong></div>
                  <div style={{ color: 'yellow', fontWeight: 'bold', marginTop: '10px' }}>
                    ⚠️ {surfaceInterval.split("|||")[1]}
                  </div>
                </>
              ) : (
                <div>Surface Interval: <strong>{surfaceInterval}</strong></div>
              )}
            </div>
          )}

          <button
            onClick={handleCalculate}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#EC1C24',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '16px',
              marginTop: '10px',
            }}
          >
            Calculate
          </button>

          <div style={{
            marginTop: '30px',
            fontSize: '12px',
            color: '#ccc',
            textAlign: 'center',
          }}>
            The data provided by this app is still in testing and is for use by those certified in
            <strong> Technical Freediving by PFI only</strong>. Any use without training by an
            authorized and active PFI instructor could result in injury.
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: '120px' }} />
        </div>
      </div>
    </>
  );
}
