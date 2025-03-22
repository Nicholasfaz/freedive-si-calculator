// Freedive Surface Interval Calculator (Full Code — Chunk 1: Imports & Tables)
import React, { useState } from 'react';

const depthsM = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const diveTimesSec = [60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420];

const airSurfaceIntervals = [
  [1.5,2.25,3.37,4.5,5.62,6.75,7.87,9,10.12,11.25,12.37,13.5,14.62,15.75,16.87],
  [1.75,2.5,3.62,4.75,5.87,7,8.12,9.25,10.37,11.5,12.62,13.75,14.87,16,17.12],
  [2,2.75,3.87,5,6.12,7.25,8.37,9.5,10.62,11.75,12.87,14,15.12,16.25,17.37],
  [2.25,3,4.12,5.25,6.37,7.5,8.62,9.75,10.87,12,13.12,14.25,15.37,16.5,17.62],
  [2,3.25,4.37,5.5,6.62,7.75,8.87,10,11.12,12.25,13.37,14.5,15.62,16.75,17.87],
  [2.25,3.5,4.62,5.75,6.87,8,9.12,10.25,11.37,12.5,13.62,14.75,15.87,17,18.12],
  [2.5,3.75,4.87,6,7.12,8.25,9.37,10.5,11.62,12.75,13.87,15,16.12,17.25,18.37],
  [2.75,4,5.12,6.25,7.37,8.5,9.62,10.75,11.87,13,14.12,15.25,16.37,17.5,18.62],
  [3,4.25,5.37,6.5,7.62,8.75,9.87,11,12.12,13.25,14.37,15.5,16.62,17.75,18.87],
  [3.25,4.5,5.62,6.75,7.87,9,10.12,11.25,12.37,13.5,14.62,15.75,16.87,18,19.12],
  [3.5,4.75,5.87,7,8.12,9.25,10.37,11.5,12.62,13.75,14.87,16,17.12,18.25,19.37],
  [3.75,5,6.12,7.25,8.37,9.5,10.62,11.75,12.87,14,15.12,16.25,17.37,18.5,19.62],
  [4,5.25,6.37,7.5,8.62,9.75,10.87,12,13.12,14.25,15.37,16.5,17.62,18.75,19.87],
  [4.25,5.5,6.62,7.75,8.87,10,11.12,12.25,13.37,14.5,15.62,16.75,17.87,19,20.12],
  [4.5,5.75,6.87,8,9.12,10.25,11.37,12.5,13.62,14.75,15.87,17,18.12,19.25,20.37],
  [4.75,6,7.12,8.25,9.37,10.5,11.62,12.75,13.87,15,16.12,17.25,18.37,19.5,20.62],
  [5,6.25,7.37,8.5,9.62,10.75,11.87,13,14.12,15.25,16.37,17.5,18.62,19.75,20.87],
  [5.25,6.5,7.62,8.75,9.87,11,12.12,13.25,14.37,15.5,16.62,17.75,18.87,20,21.12],
  [5.5,6.75,7.87,9,10.12,11.25,12.37,13.5,14.62,15.75,16.87,18,19.12,20.25,21.37],
  [5.75,7,8.12,9.25,10.37,11.5,12.62,13.75,14.87,16,17.12,18.25,19.37,20.5,21.62],
  [6,7.25,8.37,9.5,10.62,11.75,12.87,14,15.12,16.25,17.37,18.5,19.62,20.75,21.87],
  [6.25,7.5,8.62,9.75,10.87,12,13.12,14.25,15.37,16.5,17.62,18.75,19.87,21,22.12],
  [6.5,7.75,8.87,10,11.12,12.25,13.37,14.5,15.62,16.75,17.87,19,20.12,21.25,22.37],
  [6.75,8,9.12,10.25,11.37,12.5,13.62,14.75,15.87,17,18.12,19.25,20.37,21.5,22.62]
];
// Freedive Surface Interval Calculator (Chunk 2: EAN 80 table)

const ean80SurfaceIntervals = [
  [2.0,2.17,2.32,2.48,2.63,2.78,2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13],
  [2.17,2.33,2.48,2.63,2.78,2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28],
  [2.33,2.48,2.63,2.78,2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43],
  [2.48,2.63,2.78,2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58],
  [2.63,2.78,2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73],
  [2.78,2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88],
  [2.93,3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03],
  [3.08,3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18],
  [3.23,3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33],
  [3.38,3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48],
  [3.53,3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63],
  [3.68,3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78],
  [3.83,3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93],
  [3.98,4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08],
  [4.13,4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23],
  [4.28,4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38],
  [4.43,4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53],
  [4.58,4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68],
  [4.73,4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68,6.83],
  [4.88,5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68,6.83,6.98],
  [5.03,5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68,6.83,6.98,7.13],
  [5.18,5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68,6.83,6.98,7.13,7.28],
  [5.33,5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68,6.83,6.98,7.13,7.28,7.43],
  [5.48,5.63,5.78,5.93,6.08,6.23,6.38,6.53,6.68,6.83,6.98,7.13,7.28,7.43,7.58]
];
// Freedive Surface Interval Calculator (Chunk 3: Logic & Helpers)

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

  return gasType === 'ean80'
    ? `${formatted}|||Must be off Enriched Air Nitrox 80% for two full minutes before diving`
    : formatted;
}
// Freedive Surface Interval Calculator (Chunk 4: React Component UI)

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

  const buttonStyle = type => ({
    marginRight: '10px',
    padding: '8px 16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: gasType === type ? '#444' : '#222',
    color: gasType === type ? '#fff' : '#aaa',
    fontWeight: gasType === type ? 'bold' : 'normal',
    cursor: 'pointer'
  });

  const renderSurfaceInterval = () => {
    if (!surfaceInterval) return null;
    if (surfaceInterval.includes("|||")) {
      const [main, note] = surfaceInterval.split("|||");
      return (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          Surface Interval: {main}
          <br />
          <span style={{ color: 'yellow', fontWeight: 'bold' }}>{note}</span>
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: '20px', fontSize: '18px' }}>
          Surface Interval: {surfaceInterval}
        </div>
      );
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h1>Freedive Surface Interval Calculator</h1>
      <div>
        <label>Dive Depth (meters)</label>
        <input
          type="number"
          value={depth}
          onChange={e => setDepth(e.target.value)}
        />
      </div>
      <div>
        <label>Dive Time</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            placeholder="min"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="sec"
            value={seconds}
            onChange={e => setSeconds(e.target.value)}
          />
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
      {renderSurfaceInterval()}
    </div>
  );
}
