import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  console.log('--- Surface Interval Calculation Start ---');
  console.log('Input:', { depth, minutes, seconds, gasType });

  // Handle edge case where seconds is 0
  if (seconds === 0) seconds = 0;

  // Round any depth below 10 up to 10 for safety
  const roundedDepth = depth < 10 ? 10 : Math.round(depth);
  console.log('Rounded Depth:', roundedDepth);

  const diveTime = minutes + seconds / 60;
  console.log('Converted Dive Time (decimal minutes):', diveTime);

  const table = gasType === 'ean80' ? ean80Table : airTable;
  const depthTable = table[roundedDepth.toString()];

  if (!depthTable) {
    console.log('No table data for this depth');
    return 'Depth out of range';
  }

  const diveTimeKeys = Object.keys(depthTable).map(Number).sort((a, b) => a - b);
  console.log('Available Dive Times for Depth:', diveTimeKeys);

  const matchedTime = diveTimeKeys.find(t => t >= diveTime);
  console.log('Matched Time Key:', matchedTime);

  if (!matchedTime) {
    console.log('Dive time exceeds all keys');
    return 'Time too long for this depth';
  }

  const result = depthTable[matchedTime.toString()];
  console.log('Result from Table:', result);

  if (!result || result.length !== 2) {
    console.log('Invalid format or missing result');
    return 'Invalid result format';
  }

  const [min, sec] = result;
  console.log('--- Surface Interval Calculation End ---');
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}