
import Head from 'next/head'
import { useState } from 'react'
import { getSurfaceInterval } from '../lib/si-logic'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [depth, setDepth] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [gasType, setGasType] = useState('air')
  const [surfaceInterval, setSurfaceInterval] = useState('')
  const [warning, setWarning] = useState('')

  const handleCalculate = () => {
    const result = getSurfaceInterval({ depth, minutes, seconds, gasType })
    setSurfaceInterval(result)

    if (gasType === 'ean80') {
      setWarning('Must be off 80% for 2 minutes breathing air or low/bottom mix.')
    } else {
      setWarning('')
    }
  }

  const buttonStyle = (type) => ({
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: gasType === type ? '#EC1C24' : '#444',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  })

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap');
          body {
            margin: 0;
            font-family: 'Titillium Web', sans-serif;
          }
        `}</style>
      </Head>
      <div style={{
        background: 'linear-gradient(to bottom, #001f33, #000)',
        color: '#fff',
        minHeight: '100vh',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <main style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.05)',
          padding: 30,
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0,0,0,0.4)'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

          <label>Dive Depth (meters)</label>
          <input
            type="number"
            value={depth}
            onChange={e => setDepth(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 5, border: 'none', marginBottom: 20 }}
          />

          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: 20
          }}>
            <div style={{ flex: 1 }}>
              <label>Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={e => setMinutes(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 5, border: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={e => setSeconds(e.target.value)}
                style={{ width: '100%', padding: 10, borderRadius: 5, border: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <label>Recovery Gas</label>
            <div style={{ marginTop: 10 }}>
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
                  fontSize: '20px',
                  background: '#112233',
                  padding: '15px',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}
              >
                Surface Interval: {surfaceInterval}
              </motion.div>
            )}
          </AnimatePresence>

          {warning && (
            <div style={{
              backgroundColor: '#cc0000',
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              color: '#fff',
              textAlign: 'center'
            }}>{warning}</div>
          )}

          <div style={{
            fontSize: '12px',
            marginTop: 20,
            textAlign: 'center',
            color: '#aaa'
          }}>
            The data provided by this app is still in testing and is for use by those certified in "Technical Freediving by PFI" only. Any use without training by an authorized and active PFI instructor could result in injury.
          </div>

          <button
            onClick={handleCalculate}
            style={{
              width: '100%',
              padding: '15px',
              marginTop: 30,
              backgroundColor: '#EC1C24',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            Calculate
          </button>
        </main>

        <footer style={{
          textAlign: 'center',
          marginTop: 40,
          paddingTop: 20
        }}>
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" style={{ height: 50, marginBottom: 10 }} />
          </a>
          <p style={{ color: '#aaa', fontSize: '14px' }}>App Creator: Nick Fazah (IT 9870)</p>
        </footer>
      </div>
    </>
  )
}
