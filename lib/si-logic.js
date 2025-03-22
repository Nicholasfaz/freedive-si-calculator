import air from '../sit-tables/air.json';
import ean80 from '../sit-tables/ean80.json';

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  // Round depths below 10 up to 10
  const roundedDepth = depth < 10 ? 10 : Math.round(depth);
  const diveTime = minutes + (seconds > 0 ? 1 : 0); // Round up if seconds > 0

  const table = gasType === 'ean80' ? ean80 : air;

  // Check if depth exists
  if (!table[roundedDepth]) {
    return 'Depth out of range';
  }

  const times = Object.keys(table[roundedDepth]).map(Number).sort((a, b) => a - b);

  const nearestTime = times.find(t => t >= diveTime);

  if (!nearestTime) {
    return 'Time too long for this depth';
  }

  const result = table[roundedDepth][nearestTime];

  if (!result) {
    return 'Invalid result format';
  }

  if (typeof result === 'string') return result;

  const [min, sec] = result;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
