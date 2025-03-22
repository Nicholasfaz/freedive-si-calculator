import React, { useState } from 'react';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [diveTime, setDiveTime] = useState('');
  const [gasType, setGasType] = useState('air');
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const calculateSI = () => {
    const meters = parseFloat(depth);
    const t = parseFloat(diveTime);
    if (isNaN(meters) || isNaN(t)) {
      setSurfaceInterval('Please enter valid numbers.');
      return;
    }
    const feet = meters * 3.28084;
    const airRatio = feet * (8 / 80);
    const ean80Ratio = feet * (4 / 80);
    const ratio = gasType === 'air' ? airRatio : ean80Ratio;
    const si = ratio * t;
    setSurfaceInterval(`${si.toFixed(1)} minutes`);
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h1>Freedive Surface Interval Calculator</h1>
      <div>
        <label>Dive Depth (meters)</label>
        <input type="number" value={depth} onChange={e => setDepth(e.target.value)} />
      </div>
      <div>
        <label>Dive Time (minutes)</label>
        <input type="number" value={diveTime} onChange={e => setDiveTime(e.target.value)} />
      </div>
      <div>
        <button onClick={() => setGasType('air')}>Air</button>
        <button onClick={() => setGasType('ean80')}>EAN 80%</button>
      </div>
      <button onClick={calculateSI}>Calculate</button>
      {surfaceInterval && <div>Surface Interval: {surfaceInterval}</div>}
    </div>
  );
}
