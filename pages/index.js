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
