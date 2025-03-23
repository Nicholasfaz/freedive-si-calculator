import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';
import Image from 'next/image';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
  };

  return (
    <div>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
      </Head>

      <main className="main">
        <div className="container">
          <div className="logo-wrapper">
            <Image src="/pfi-logo.png" alt="PFI Logo" width={160} height={60} className="logo" />
          </div>

          <h1 className="title">Surface Interval Calculator</h1>

          <div className="input-group">
            <input
              type="number"
              placeholder="Depth (m)"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="input depth"
            />
            <input
              type="number"
              placeholder="Min"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="input time"
            />
            <input
              type="number"
              placeholder="Sec"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="input time"
            />
          </div>

          <div className="dropdown-wrapper">
            <label htmlFor="gasType">Recovery Gas:</label>
            <select id="gasType" value={gasType} onChange={(e) => setGasType(e.target.value)}>
              <option value="air">Air</option>
              <option value="ean80">EAN 80</option>
            </select>
          </div>

          <button onClick={handleCalculate} className="button">
            Calculate
          </button>

          {result && (
            <div className="result-box">
              <strong>Surface Interval:</strong> {result}
            </div>
          )}

          {gasType === 'ean80' && (
            <p className="warning">
              * Must be off 80% for 2 minutes breathing air or low/bottom mix
            </p>
          )}

          <p className="disclaimer">
            This calculator is for educational purposes only. Do not use it to plan actual dives.
          </p>
        </div>

        <footer className="footer">
          <p>App creator: Nick Fazah IT 9870</p>
          <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/pfi-logo.png" alt="PFI Logo" width={100} height={40} className="footer-logo" />
          </a>
        </footer>

        <style jsx>{`
          .main {
            min-height: 100vh;
            background: linear-gradient(to bottom, #001f33, #000);
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .container {
            max-width: 400px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            text-align: center;
          }

          .logo-wrapper {
            margin-bottom: 20px;
          }

          .logo {
            max-width: 100%;
            height: auto;
          }

          .title {
            margin-bottom: 20px;
          }

          .input-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin-bottom: 15px;
          }

          .input {
            padding: 10px;
            border-radius: 8px;
            border: none;
            font-size: 1rem;
          }

          .depth {
            width: 100%;
          }

          .time {
            width: 45%;
          }

          .dropdown-wrapper {
            margin-bottom: 20px;
          }

          .button {
            padding: 12px 20px;
            background: #ec1c24;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 15px;
            transition: background 0.3s;
          }

          .button:hover {
            background: #d81a20;
          }

          .result-box {
            background: #fff;
            color: #000;
            padding: 15px;
            margin-top: 10px;
            border-radius: 8px;
            font-size: 1.2rem;
          }

          .warning {
            color: #ffa500;
            margin-top: 10px;
          }

          .disclaimer {
            font-size: 0.8rem;
            color: #ccc;
            margin-top: 10px;
          }

          .footer {
            margin-top: 30px;
            text-align: center;
          }

          .footer-logo {
            margin-top: 10px;
          }

          @media (max-width: 480px) {
            .input-group {
              flex-direction: column;
            }

            .time {
              width: 100%;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
