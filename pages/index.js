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
    const interval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(interval);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
      <Head>
        <title>Freedive SI Calculator</title>
      </Head>
      <main className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <a href="https://www.performancefreediving.com" target="_blank" rel="noopener noreferrer">
            <img src="/pfi-logo.png" alt="PFI Logo" className="w-32 h-auto" />
          </a>
        </div>
        <h1 className="text-xl font-bold text-center mb-4">Freedive Surface Interval Calculator</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            placeholder="Depth (m)"
            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <input
              type="number"
              placeholder="Sec"
              className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${gasType === 'air' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setGasType('air')}
          >
            Air
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${gasType === 'ean80' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setGasType('ean80')}
          >
            80%
          </button>
        </div>

        <button
          className="w-full py-2 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-400"
          onClick={handleCalculate}
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">Surface Interval:</h2>
            <p className="text-2xl font-bold text-red-400 mt-1">{result}</p>
            {gasType === 'ean80' && (
              <p className="text-sm text-yellow-300 mt-2 font-semibold">
                Must be off 80% for 2 minutes breathing air or low/bottom mix.
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-center text-gray-400 mt-6">
          This calculator is intended for educational purposes only. Always dive safely and consult with a certified instructor.
        </p>
        <p className="text-xs text-center text-gray-400 mt-1">
          App Creator: Nick Fazah – IT 9870
        </p>
      </main>
    </div>
  );
}
