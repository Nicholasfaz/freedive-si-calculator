import React, { useState } from 'react';

const depthsM = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const diveTimesSec = [60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420];

// Air and EAN 80 surface interval tables (omitted here for brevity)

function formatMinutesToMMSS(minutesFloat) {
  const totalSeconds = Math.round(minutesFloat * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getSurfaceInterval(depthMeters, minutes, seconds, gasType) {
  const totalSeconds = minutes * 60 + seconds;
  const depthMatch = depthsM.find((d) => d >= depthMeters);
  const timeMatch = diveTimesSec.find((t) => totalSeconds <= t);
  if (!depthMatch || !timeMatch) return "Outside table range";

  const row = diveTimesSec.indexOf(timeMatch);
  const col = depthsM.indexOf(depthMatch);
  const table = gasType === 'air' ? airSurfaceIntervals : ean80SurfaceIntervals;
  const value = table[row][col];
  const formatted = value ? formatMinutesToMMSS(value) : "No data";
  return gasType === 'ean80' ? `${formatted} — Must be off EAN 80 for 2 minutes before diving` : formatted;
}

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

  const buttonStyle = (type) => ({
    marginRight: '10px',
    padding: '8px 16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: gasType === type ? '#444' : '#222',
    color: gasType === type ? '#fff' : '#aaa',
    fontWeight: gasType === type ? 'bold' : 'normal',
    cursor: 'pointer'
  });

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h1>Freedive Surface Interval Calculator</h1>
      <div>
        <label>Dive Depth (meters)</label>
        <input type="number" value={depth} onChange={e => setDepth(e.target.value)} />
      </div>
      <div>
        <label>Dive Time</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="number" placeholder="min" value={minutes} onChange={e => setMinutes(e.target.value)} />
          <input type="number" placeholder="sec" value={seconds} onChange={e => setSeconds(e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setGasType('air')} style={buttonStyle('air')}>
          Air
        </button>
        <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>
          EAN 80%
        </button>
      </div>
      <button style={{ marginTop: '20px' }} onClick={calculateSI}>
        Calculate
      </button>
      {surfaceInterval && (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          Surface Interval: {surfaceInterval}
        </div>
      )}
    </div>
  );
}
