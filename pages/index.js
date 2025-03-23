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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">
      <Head>
        <title>Freedive Surface Interval Calculator</title>
        <meta name="description" content="Freedive Surface Interval Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <img
          src="/pfi.png"
          alt="Performance Freediving International"
          className="mx-auto mb-6 w-48 h-auto"
        />

        <h1 className="text-3xl font-bold mb-4">Surface Interval Calculator</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Depth (m)"
            className="p-2 rounded-md text-black text-center text-sm"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutes"
            className="p-2 rounded-md text-black text-center text-sm"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            placeholder="Seconds"
            className="p-2 rounded-md text-black text-center text-sm"
          />
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setGasType('air')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                gasType === 'air' ? 'bg-red-600' : 'bg-gray-600'
              }`}
            >
              Air
            </button>
            <button
              onClick={() => setGasType('ean80')}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                gasType === 'ean80' ? 'bg-red-600' : 'bg-gray-600'
              }`}
            >
              80%
            </button>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition mb-4"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4 text-lg font-semibold text-white bg-black bg-opacity-20 p-4 rounded">
            Surface Interval: {result}
          </div>
        )}

        {gasType === 'ean80' && (
          <div className="mt-2 text-xs text-red-400 italic">
            Must be off 80% for 2 minutes breathing air or low/bottom mix
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400">
          This calculator is intended for freediving recovery only. Do not use for scuba or technical diving.
        </p>

        <footer className="mt-6 text-xs text-gray-500">
          App Creator: Nick Fazah — IT 9870
        </footer>
      </main>
    </div>
  );
}
