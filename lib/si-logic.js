import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

export function getSurfaceInterval({ depth, minutes, seconds, gasType }) {
  console.log('--- Surface Interval Calculation Start ---');
  console.log('Input:', { depth, minutes, seconds, gasType });

  const table = gasType === 'ean80' ? ean80Table : airTable;
  const roundedDepth = Math.max(10, Math.ceil(depth / 5) * 5);
  console.log('Rounded Depth:', roundedDepth);

  const timeDecimal = minutes + (seconds || 0) / 60;
  console.log('Converted Dive Time (decimal minutes):', timeDecimal);

  const depthTable = table[roundedDepth];
  if (!depthTable) {
    console.log('No data for this depth');
    return 'Depth out of range';
  }

  const timeKeys = Object.keys(depthTable).map((key) => {
    if (key.includes(':')) {
      const [min, sec] = key.split(':').map(Number);
      return min + sec / 60;
    }
    return parseFloat(key);
  });

  console.log('Available Dive Times for Depth:', timeKeys);

  const matchedTimeKey = timeKeys.find(t => t >= timeDecimal);
  console.log('Matched Time Key:', matchedTimeKey);

  if (matchedTimeKey === undefined) {
    console.log('Dive time exceeds all keys');
    return 'Time too long for this depth';
  }

  const matchedKeyStr = Object.keys(depthTable).find((key) => {
    const keyTime = key.includes(':') 
      ? key.split(':').reduce((acc, val, i) => acc + Number(val) / (i === 0 ? 1 : 60), 0)
      : parseFloat(key);
    return Math.abs(keyTime - matchedTimeKey) < 0.01;
  });

  const result = depthTable[matchedKeyStr];
  console.log('Surface Interval Result:', result);

  if (!result) {
    return 'Invalid result format';
  }

  return result.includes('|||') ? result : `Surface Interval: ${result}`;
}