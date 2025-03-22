
// Utility: Convert total seconds into mm:ss format
function formatMinutesToMMSS(totalSeconds) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Sample table (expand this as needed)
const surfaceIntervalTable = {
  air: {
    67: {
      "2:45": "18:45"
    }
  },
  ean80: {
    67: {
      "2:45": "4:53"
    }
  }
};

function getSurfaceInterval(depth, min, sec, gasType) {
  const roundedDepth = Math.ceil(depth);
  const formattedTime = formatMinutesToMMSS(min * 60 + sec);
  const table = surfaceIntervalTable[gasType] || {};
  const depthRow = table[roundedDepth];

  if (!depthRow) return "Depth out of range.";
  const result = depthRow[formattedTime];
  if (!result) return "No matching time found for that depth.";

  return gasType === 'ean80' ? result + "|||Must be off EAN 80 for 2 minutes before diving" : result;
}


// Freedive Surface Interval Calculator — Dark UI Upgrade with PFI Branding + Slide-In Animation
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logic functions will be inserted above this line

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const calculateSI = () => {
    const d = parseFloat(depth);
    const m = parseInt(minutes);
    const s = parseInt(seconds);
    if (isNaN(d) || isNaN(m) || isNaN(s)) {
      setSurfaceInterval("Please enter valid numbers.");
      return;
    }
    const si = getSurfaceInterval(d, m, s, gasType);
    setSurfaceInterval(si);
  };

  const resetFields = () => {
    setDepth('');
    setMinutes('');
    setSeconds('');
    setSurfaceInterval(null);
  };

  const buttonStyle = (type) => ({
    marginRight: '10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: gasType === type ? '#007acc' : '#1f2a38',
    color: '#fff',
    fontWeight: gasType === type ? 'bold' : 'normal',
    boxShadow: gasType === type ? '0 0 10px #007acc' : 'none',
    cursor: 'pointer'
  });

  const renderSurfaceInterval = () => (
    <AnimatePresence>
      {surfaceInterval && (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: '20px', fontSize: '20px', background: '#112233', padding: '15px', borderRadius: '10px' }}
        >
          {surfaceInterval.includes("|||") ? (
            <>
              <div>Surface Interval: <strong>{surfaceInterval.split("|||")[0]}</strong></div>
              <div style={{ color: 'yellow', fontWeight: 'bold', marginTop: '10px' }}>⚠️ {surfaceInterval.split("|||")[1]}</div>
            </>
          ) : (
            <>Surface Interval: <strong>{surfaceInterval}</strong></>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div style={{ background: 'linear-gradient(to bottom, #001f33, #000)', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', padding: 30, borderRadius: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(0,0,0,0.4)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Freedive Surface Interval Calculator</h1>

        <div style={{ marginBottom: 20 }}>
          <label>Dive Depth (meters)</label>
          <input
            type="number"
            value={depth}
            onChange={e => setDepth(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Dive Time</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              placeholder="min"
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
            />
            <input
              type="number"
              placeholder="sec"
              value={seconds}
              onChange={e => setSeconds(e.target.value)}
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Gas Type</label>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
            <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
          </div>
        </div>

        <button
          onClick={calculateSI}
          style={{ width: '100%', padding: 12, borderRadius: 8, backgroundColor: '#ec1c24', color: '#fff', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', border: 'none', boxShadow: '0 0 10px #ec1c24', marginBottom: '10px' }}>
          Calculate
        </button>

        <div style={{ fontSize: '12px', marginBottom: '15px', color: '#ccc', lineHeight: 1.5 }}>
          The data provided by this app is still in testing and is for use by those certified in <strong>Technical Freediving by PFI</strong> only. Any use without training by an authorized and active PFI instructor could result in injury.
        </div>

        <button
          onClick={resetFields}
          style={{ width: '100%', padding: 10, borderRadius: 8, backgroundColor: '#555', color: '#fff', fontSize: '14px', cursor: 'pointer', border: 'none' }}>
          Reset
        </button>

        {renderSurfaceInterval()}
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#0d1a26',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        borderTop: '1px solid #1a2e40',
        fontSize: '14px',
        zIndex: 999
      }}>
        Powered by <a href="https://www.tdisdi.com/pfi/" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfff', textDecoration: 'underline' }}>
          Performance Freediving International
        </a>
      </div>
    </div>
  );
}
