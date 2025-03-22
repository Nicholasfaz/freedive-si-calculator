
import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

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

  const formatResult = () => {
    if (!surfaceInterval) return null;

    if (surfaceInterval.includes("|||")) {
      const [main, note] = surfaceInterval.split("|||");
      return (
        <div className="result warning">
          <div>Surface Interval: <strong>{main}</strong></div>
          <div className="warning-text">⚠️ {note}</div>
        </div>
      );
    }

    return (
      <div className="result">
        Surface Interval: <strong>{surfaceInterval}</strong>
      </div>
    );
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

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>
      <div className="container">
        <div className="box">
          <h1>Freedive Surface Interval Calculator</h1>

          {formatResult()}

          <div className="input-group">
            <label>Dive Depth (meters)</label>
            <input
              type="number"
              value={depth}
              onChange={e => setDepth(e.target.value)}
              placeholder="e.g. 15"
            />
          </div>

          <div className="input-group">
            <label>Dive Time</label>
            <div className="time-inputs">
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

          <div className="input-group">
            <label>Recovery Gas</label>
            <div className="gas-buttons">
              <button onClick={() => setGasType('air')} style={buttonStyle('air')}>Air</button>
              <button onClick={() => setGasType('ean80')} style={buttonStyle('ean80')}>EAN 80%</button>
            </div>
          </div>

          <button className="calculate-button" onClick={calculateSI}>Calculate</button>

          <div className="disclaimer">
            The data provided by this app is still in testing and is for use by those certified in Technical Freediving by PFI only. Any use without training by an authorized and active PFI instructor could result in injury.
          </div>
        </div>

        <footer>
          <a href="https://www.tdisdi.com/pfi/" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" />
          </a>
          <p>Powered by Performance Freediving International</p>
        </footer>
      </div>

      <style jsx>{`
        .container {
          background: linear-gradient(to bottom, #001f33, #000);
          color: #fff;
          min-height: 100vh;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
        }
        .box {
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255,255,255,0.05);
          padding: 30px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 20px rgba(0,0,0,0.4);
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        input {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #333;
          background-color: #111;
          color: #fff;
        }
        .time-inputs {
          display: flex;
          gap: 10px;
        }
        .gas-buttons {
          margin-top: 10px;
        }
        .calculate-button {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background-color: #ec1c24;
          color: #fff;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px #ec1c24;
        }
        .disclaimer {
          margin-top: 20px;
          font-size: 12px;
          color: #ccc;
        }
        .result {
          margin-bottom: 20px;
          font-size: 20px;
          background: #112233;
          padding: 15px;
          border-radius: 10px;
        }
        .warning-text {
          color: yellow;
          font-weight: bold;
          margin-top: 10px;
        }
        footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px 0;
        }
        footer img {
          height: 40px;
          margin-bottom: 10px;
        }
        footer p {
          color: #ccc;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
