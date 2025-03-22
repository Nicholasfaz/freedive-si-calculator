import React, { useState } from 'react';

// Lookup table: Air SI values [row = dive time, col = depth in ft]
const depthsFt = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80];
const diveTimes = ["0:30", "0:45", "1:00", "1:15", "1:30", "1:45", "2:00", "2:15", "2:30"];
const airTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2],
  [0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 4],
  [0, 0, 0, 0, 1, 2, 2, 4, 5, 6, 7],
  [0, 0, 0, 1, 2, 3, 4, 6, 7, 8, 9],
  [0, 0, 1, 2, 3, 4, 5, 7, 9, 10, 11],
  [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 13],
  [1, 2, 3, 4, 5, 6, 7, 10, 11, 13, 14],
];

function lookupSurfaceIntervalAir(depthMeters, minutes, seconds) {
  const totalSeconds = minutes * 60 + seconds;
  const maxDepthFt = Math.max(...depthsFt);
  const maxDiveTimeSec = 2 * 60 + 30;

  const depthFt = Math.ceil(depthMeters * 3.28084);
  const closestDepth = depthsFt.find(d => d >= depthFt);

  if (!closestDepth) return "Depth exceeds available table range";
  if (totalSeconds > maxDiveTimeSec) return "Dive time exceeds available table range";

  let timeStr = null;
  for (let t of diveTimes) {
    const [min, sec] = t.split(":").map(Number);
    const tableSeconds = min * 60 + sec;
    if (totalSeconds <= tableSeconds) {
      timeStr = t;
      break;
    }
  }

  if (!timeStr) return "Dive time exceeds available table range";
  const rowIndex = diveTimes.indexOf(timeStr);
  const colIndex = depthsFt.indexOf(closestDepth);
  const result = airTable[rowIndex][colIndex];
  return `${result} minute${result === 1 ? '' : 's'}`;
}

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const calculateSI = () => {
    const depthMeters = parseFloat(depth);
    const min = parseInt(minutes);
    const sec = parseInt(seconds);
    if (isNaN(depthMeters) || isNaN(min) || isNaN(sec)) {
      setSurfaceInterval('Please enter valid numbers.');
      return;
    }
    if (gasType === 'air') {
      const si = lookupSurfaceIntervalAir(depthMeters, min, sec);
      setSurfaceInterval(si);
    } else {
      setSurfaceInterval('EAN 80 table lookup not yet implemented.');
    }
  };

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
        <button onClick={() => setGasType('air')} style={{ marginRight: '10px' }}>
          Air
        </button>
        <button onClick={() => setGasType('ean80')}>
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
