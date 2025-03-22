
import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

function roundDepth(depth) {
  if (depth < 10) return 10;
  return Math.round(depth / 5) * 5;
}

function roundUpTime(time, availableTimes) {
  for (const t of availableTimes) {
    if (t >= time) return t;
  }
  return null;
}

function formatTime(decimalMinutes) {
  const mins = Math.floor(decimalMinutes);
  const secs = Math.round((decimalMinutes - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getSurfaceInterval(input) {
  console.log('--- Surface Interval Calculation Start ---');
  console.log('Input:', input);

  const { depth, minutes, seconds, gasType } = input;
  if (depth == null || minutes == null || seconds == null || !gasType) {
    console.log('Missing input fields');
    return 'Invalid input';
  }

  const roundedDepth = roundDepth(Number(depth));
  console.log('Rounded Depth:', roundedDepth);

  const diveTimeDecimal = Number(minutes) + Number(seconds) / 60;
  console.log('Converted Dive Time (decimal minutes):', diveTimeDecimal);

  const table = gasType === 'ean80' ? ean80Table : airTable;
  const depthData = table[roundedDepth];

  if (!depthData) {
    console.log('No data for this depth');
    return 'Time too long for this depth';
  }

  const availableTimes = Object.keys(depthData).map(parseFloat).sort((a, b) => a - b);
  console.log('Available Dive Times for Depth:', availableTimes);

  const matchedTime = roundUpTime(diveTimeDecimal, availableTimes);
  console.log('Matched Time Key:', matchedTime);

  if (matchedTime == null) {
    console.log('Dive time exceeds all keys');
    return 'Time too long for this depth';
  }

  const surfaceInterval = depthData[matchedTime];
  console.log('Raw Surface Interval Result:', surfaceInterval);

  if (typeof surfaceInterval === 'string' && surfaceInterval.includes(':')) {
    return surfaceInterval;
  } else if (typeof surfaceInterval === 'number') {
    return formatTime(surfaceInterval);
  } else {
    console.log('Invalid result format');
    return 'Invalid result format';
  }
}
