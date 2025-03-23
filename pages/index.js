import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from '../lib/si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const result = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(result);
  };

  return (
    <div>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
        <img
          src="/pfi-logo.png"
          alt="PFI Logo"
          className="w-48 mb-6 hover:scale-105 transition-transform duration-200"
          onClick={() => window.open('https://www.performancefreediving.com', '_blank')}
        />
        <div className="bg-white bg-opacity-5 p-6 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-center text-2xl font-semibold mb-6">Freedive Surface Interval Calculator</h1>

          <label className="block mb-2 font-semibold">Depth (m)</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="w-full p-2 mb-4 text-black rounded-lg"
            placeholder="Enter depth in meters"
          />

          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full p-2 text-black rounded-lg"
                placeholder="min"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="w-full p-2 text-black rounded-lg"
                placeholder="sec"
              />
            </div>
          </div>

          <label className="block mb-2 font-semibold">Recovery Gas</label>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setGasType('air')}
              className={`px-4 py-2 rounded-full font-semibold ${
                gasType === 'air' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Air
            </button>
            <button
              onClick={() => setGasType('ean80')}
              className={`px-4 py-2 rounded-full font-semibold ${
                gasType === 'ean80' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              EAN80
            </button>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-xl mb-4"
          >
            Calculate
          </button>

          {gasType === 'ean80' && (
            <p className="text-xs text-yellow-300 text-center mb-2">
              Must be off 80% for 2 minutes breathing air or low/bottom mix
            </p>
          )}

          {result && (
            <div className="mt-4 text-center bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-bold">Surface Interval:</h2>
              <p className="text-2xl text-green-300 font-mono mt-1">{result}</p>
            </div>
          )}

          <p className="text-xs text-center text-gray-400 mt-4">
            All times are approximate. Always follow proper freediving protocols.
          </p>

          <footer className="text-xs text-center text-gray-500 mt-6">
            App created by Nick Fazah, IT 9870 · <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer" className="underline">PFI</a>
          </footer>
        </div>
      </div>
    </div>
  );
}
