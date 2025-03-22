// Freedive Surface Interval Calculator (Full Code — Chunk 1: Imports & Tables)
import React, { useState } from 'react';

const depthsM = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const diveTimesSec = [60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345, 360, 375, 390, 405, 420];

const airSurfaceIntervals = [
  [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
  [1.25, 1.87, 2.5, 3.12, 3.75, 4.37, 5.0, 5.62, 6.25, 6.87, 7.5, 8.12, 8.75, 9.37, 10.0],
  [1.5, 2.25, 3.0, 3.75, 4.5, 5.25, 6.0, 6.75, 7.5, 8.25, 9.0, 9.75, 10.5, 11.25, 12.0],
  [1.75, 2.62, 3.5, 4.37, 5.25, 6.12, 7.0, 7.87, 8.75, 9.62, 10.5, 11.37, 12.25, 13.12, 14.0],
  [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0],
  [2.25, 3.37, 4.5, 5.62, 6.75, 7.87, 9.0, 10.12, 11.25, 12.37, 13.5, 14.62, 15.75, 16.87, 18.0],
  [2.5, 3.75, 5.0, 6.25, 7.5, 8.75, 10.0, 11.25, 12.5, 13.75, 15.0, 16.25, 17.5, 18.75, 20.0],
  [2.75, 4.12, 5.5, 6.87, 8.25, 9.62, 11.0, 12.37, 13.75, 15.12, 16.5, 17.87, 19.25, 20.62, 22.0],
  [3.0, 4.5, 6.0, 7.5, 9.0, 10.5, 12.0, 13.5, 15.0, 16.5, 18.0, 19.5, 21.0, 22.5, 24.0],
  [3.25, 4.87, 6.5, 8.12, 9.75, 11.37, 13.0, 14.62, 16.25, 17.87, 19.5, 21.12, 22.75, 24.37, 26.0],
  [3.5, 5.25, 7.0, 8.75, 10.5, 12.25, 14.0, 15.75, 17.5, 19.25, 21.0, 22.75, 24.5, 26.25, 28.0],
  [3.75, 5.62, 7.5, 9.37, 11.25, 13.12, 15.0, 16.87, 18.75, 20.62, 22.5, 24.37, 26.25, 28.12, 30.0],
  [4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 22.0, 24.0, 26.0, 28.0, 30.0, 32.0],
  [4.25, 6.37, 8.5, 10.62, 12.75, 14.87, 17.0, 19.12, 21.25, 23.37, 25.5, 27.62, 29.75, 31.87, 34.0],
  [4.5, 6.75, 9.0, 11.25, 13.5, 15.75, 18.0, 20.25, 22.5, 24.75, 27.0, 29.25, 31.5, 33.75, 36.0],
  [4.75, 7.12, 9.5, 11.87, 14.25, 16.62, 19.0, 21.37, 23.75, 26.12, 28.5, 30.87, 33.25, 35.62, 38.0],
  [5.0, 7.5, 10.0, 12.5, 15.0, 17.5, 20.0, 22.5, 25.0, 27.5, 30.0, 32.5, 35.0, 37.5, 40.0],
  [5.25, 7.87, 10.5, 13.12, 15.75, 18.37, 21.0, 23.62, 26.25, 28.87, 31.5, 34.12, 36.75, 39.37, 42.0],
  [5.5, 8.25, 11.0, 13.75, 16.5, 19.25, 22.0, 24.75, 27.5, 30.25, 33.0, 35.75, 38.5, 41.25, 44.0],
  [5.75, 8.62, 11.5, 14.37, 17.25, 20.12, 23.0, 25.87, 28.75, 31.62, 34.5, 37.37, 40.25, 43.12, 46.0],
  [6.0, 9.0, 12.0, 15.0, 18.0, 21.0, 24.0, 27.0, 30.0, 33.0, 36.0, 39.0, 42.0, 45.0, 48.0],
  [6.25, 9.37, 12.5, 15.62, 18.75, 21.87, 25.0, 28.12, 31.25, 34.37, 37.5, 40.62, 43.75, 46.87, 50.0],
  [6.5, 9.75, 13.0, 16.25, 19.5, 22.75, 26.0, 29.25, 32.5, 35.75, 39.0, 42.25, 45.5, 48.75, 52.0],
  [6.75, 10.12, 13.5, 16.87, 20.25, 23.62, 27.0, 30.37, 33.75, 37.12, 40.5, 43.87, 47.25, 50.62, 54.0],
  [7.0, 10.5, 14.0, 17.5, 21.0, 24.5, 28.0, 31.5, 35.0, 38.5, 42.0, 45.5, 49.0, 52.5, 56.0]
];

// Freedive Surface Interval Calculator (Chunk 2: EAN 80 table)

const ean80SurfaceIntervals = [
  [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0],
  [0.62, 0.93, 1.25, 1.55, 1.87, 2.18, 2.5, 2.8, 3.12, 3.43, 3.75, 4.05, 4.37, 4.68, 5.0],
  [0.75, 1.12, 1.5, 1.87, 2.25, 2.62, 3.0, 3.37, 3.75, 4.12, 4.5, 4.87, 5.25, 5.62, 6.0],
  [0.87, 1.3, 1.75, 2.18, 2.62, 3.05, 3.5, 3.93, 4.37, 4.8, 5.25, 5.68, 6.12, 6.55, 7.0],
  [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0],
  [1.12, 1.68, 2.25, 2.8, 3.37, 3.93, 4.5, 5.05, 5.62, 6.18, 6.75, 7.3, 7.87, 8.43, 9.0],
  [1.25, 1.87, 2.5, 3.12, 3.75, 4.37, 5.0, 5.62, 6.25, 6.87, 7.5, 8.12, 8.75, 9.37, 10.0],
  [1.37, 2.05, 2.75, 3.43, 4.12, 4.8, 5.5, 6.18, 6.87, 7.55, 8.25, 8.93, 9.62, 10.3, 11.0],
  [1.5, 2.25, 3.0, 3.75, 4.5, 5.25, 6.0, 6.75, 7.5, 8.25, 9.0, 9.75, 10.5, 11.25, 12.0],
  [1.62, 2.43, 3.25, 4.05, 4.87, 5.68, 6.5, 7.3, 8.12, 8.93, 9.75, 10.55, 11.37, 12.18, 13.0],
  [1.75, 2.62, 3.5, 4.37, 5.25, 6.12, 7.0, 7.87, 8.75, 9.62, 10.5, 11.37, 12.25, 13.12, 14.0],
  [1.87, 2.8, 3.75, 4.68, 5.62, 6.55, 7.5, 8.43, 9.37, 10.3, 11.25, 12.18, 13.12, 14.05, 15.0],
  [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0],
  [2.12, 3.18, 4.25, 5.3, 6.37, 7.43, 8.5, 9.55, 10.62, 11.68, 12.75, 13.8, 14.87, 15.93, 17.0],
  [2.25, 3.37, 4.5, 5.62, 6.75, 7.87, 9.0, 10.12, 11.25, 12.37, 13.5, 14.62, 15.75, 16.87, 18.0],
  [2.37, 3.55, 4.75, 5.93, 7.12, 8.3, 9.5, 10.68, 11.87, 13.05, 14.25, 15.43, 16.62, 17.8, 19.0],
  [2.5, 3.75, 5.0, 6.25, 7.5, 8.75, 10.0, 11.25, 12.5, 13.75, 15.0, 16.25, 17.5, 18.75, 20.0],
  [2.62, 3.93, 5.25, 6.55, 7.87, 9.18, 10.5, 11.8, 13.12, 14.43, 15.75, 17.05, 18.37, 19.68, 21.0],
  [2.75, 4.12, 5.5, 6.87, 8.25, 9.62, 11.0, 12.37, 13.75, 15.12, 16.5, 17.87, 19.25, 20.62, 22.0],
  [2.87, 4.3, 5.75, 7.18, 8.62, 10.05, 11.5, 12.93, 14.37, 15.8, 17.25, 18.68, 20.12, 21.55, 23.0],
  [3.0, 4.5, 6.0, 7.5, 9.0, 10.5, 12.0, 13.5, 15.0, 16.5, 18.0, 19.5, 21.0, 22.5, 24.0],
  [3.12, 4.68, 6.25, 7.8, 9.37, 10.93, 12.5, 14.05, 15.62, 17.18, 18.75, 20.3, 21.87, 23.43, 25.0],
  [3.25, 4.87, 6.5, 8.12, 9.75, 11.37, 13.0, 14.62, 16.25, 17.87, 19.5, 21.12, 22.75, 24.37, 26.0],
  [3.37, 5.05, 6.75, 8.43, 10.12, 11.8, 13.5, 15.18, 16.87, 18.55, 20.25, 21.93, 23.62, 25.3, 27.0],
  [3.5, 5.25, 7.0, 8.75, 10.5, 12.25, 14.0, 15.75, 17.5, 19.25, 21.0, 22.75, 24.5, 26.25, 28.0]
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
