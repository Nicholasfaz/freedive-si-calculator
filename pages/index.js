
import Head from 'next/head'
import { useState } from 'react'
import { getSurfaceInterval } from '../lib/si-logic'

export default function Home() {
  const [depth, setDepth] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [gasType, setGasType] = useState('air')
  const [surfaceInterval, setSurfaceInterval] = useState('')
  const [error, setError] = useState('')

  const handleCalculate = () => {
    setError('')
    setSurfaceInterval('')
    const result = getSurfaceInterval({
      depth,
      minutes,
      seconds,
      gasType
    })
    if (result.error) {
      setError(result.error)
    } else {
      setSurfaceInterval(result.interval)
    }
  }

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          boxShadow: '0 0 20px rgba(0,0,0,0.4)'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label>Dive Depth (m)</label>
              <input
                type="number"
                value={depth}
                onChange={e => setDepth(e.target.value)}
                style={{ width: '100%', padding: 10, marginTop: 5 }}
              />
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ flex: 1 }}>
                <label>Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={e => setMinutes(e.target.value)}
                  style={{ width: '100%', padding: 10 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Seconds</label>
                <input
                  type="number"
                  value={seconds}
                  onChange={e => setSeconds(e.target.value)}
                  style={{ width: '100%', padding: 10 }}
                />
              </div>
            </div>

            <div>
              <label>Recovery Gas</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
                <button onClick={() => setGasType('air')} style={{
                  flex: 1,
                  padding: '10px',
                  background: gasType === 'air' ? '#1e90ff' : '#333',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}>Air</button>
                <button onClick={() => setGasType('ean80')} style={{
                  flex: 1,
                  padding: '10px',
                  background: gasType === 'ean80' ? '#1e90ff' : '#333',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '5px'
                }}>EAN 80%</button>
              </div>
            </div>

            <button onClick={handleCalculate} style={{
              padding: '12px',
              background: '#EC1C24',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              Calculate
            </button>

            {surfaceInterval && (
              <div style={{
                background: '#003366',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center',
                fontSize: '1.2rem',
                marginTop: '10px'
              }}>
                Surface Interval: {surfaceInterval}
              </div>
            )}

            {gasType === 'ean80' && (
              <div style={{ marginTop: 10, color: '#FFCC00', fontStyle: 'italic', fontSize: '0.9em' }}>
                Must be off 80% for 2 minutes breathing air or low/bottom mix
              </div>
            )}

            {error && (
              <div style={{ color: 'red', marginTop: 10 }}>{error}</div>
            )}
          </div>

          <p style={{ fontSize: '0.8em', marginTop: 20 }}>
            The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </p>
        </div>

        <footer style={{ textAlign: 'center', fontSize: '0.8em', marginTop: 20 }}>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ width: 60, marginBottom: 10 }} />
          </a>
          <p>App Creator: Nick Fazah IT 9870</p>
        </footer>
      </div>
    </>
  )
}
