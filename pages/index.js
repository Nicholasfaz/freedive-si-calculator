import Head from 'next/head';
import { useState } from 'react';
import { getSurfaceInterval } from './si-logic';

export default function Home() {
  const [depth, setDepth] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [gasType, setGasType] = useState('air');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const surfaceInterval = getSurfaceInterval({ depth, minutes, seconds, gasType });
    setResult(surfaceInterval);
  };

  return (
    <>
      <Head>
        <title>PFI Technical Freediving SIT Calc</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer">
              <img src="/pfi-logo.png" alt="PFI Logo" className="h-14 object-contain" />
            </a>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Freedive Surface Interval Calculator</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              className="p-2 rounded bg-slate-800 placeholder-gray-400 text-white"
              type="number"
              placeholder="Depth (m)"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
            <input
              className="p-2 rounded bg-slate-800 placeholder-gray-400 text-white"
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
            <input
              className="p-2 rounded bg-slate-800 placeholder-gray-400 text-white"
              type="number"
              placeholder="Seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
            <div className="flex space-x-2 col-span-2 justify-center">
              <button
                className={`flex-1 p-2 rounded text-white font-semibold ${gasType === 'air' ? 'bg-blue-600' : 'bg-slate-700'}`}
                onClick={() => setGasType('air')}
              >
                Air
              </button>
              <button
                className={`flex-1 p-2 rounded text-white font-semibold ${gasType === 'ean80' ? 'bg-blue-600' : 'bg-slate-700'}`}
                onClick={() => setGasType('ean80')}
              >
                EAN80
              </button>
            </div>
          </div>
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 transition"
            onClick={handleCalculate}
          >
            Calculate
          </button>
          {result && (
            <div className="bg-slate-800 rounded text-center py-4 text-lg font-semibold">
              Surface Interval: {result}
            </div>
          )}
          {gasType === 'ean80' && (
            <p className="text-yellow-400 text-sm text-center mt-4 font-medium">
              Must be off 80% for 2 minutes breathing air or low/bottom mix
            </p>
          )}
          <p className="text-xs text-gray-400 text-center mt-6">
            For training reference only. Always consult a qualified instructor. App Creator: Nick Fazah IT 9870
          </p>
        </div>
        <footer className="text-sm text-gray-500 mt-6 text-center">
          <a href="https://www.performancefreediving.com/" target="_blank" rel="noopener noreferrer">
            © 2025 Performance Freediving International
          </a>
        </footer>
      </div>
    </>
  );
}
