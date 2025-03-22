import air from '../sit-tables/air.json';
import ean80 from '../sit-tables/ean80.json';

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  // Default to minimum depth of 10m
  const roundedDepth = depth < 10 ? 10 : Math.round(depth);
  
  // Convert dive time to minutes, round up if seconds > 0
  const diveTime = seconds > 0 ? minutes + 1 : minutes;

  // Choose the correct table
  const table = gasType === 'ean80' ? ean80 : air;

  // Check depth exists
  const depthTable = table[roundedDepth];
  if (!depthTable) {
    return 'Depth out of range';
  }

  // Sort available dive times numerically
  const diveTimeKeys = Object.keys(depthTable).map(Number).sort((a, b) => a - b);

  // Find nearest dive time equal or greater
  const matchedTime = diveTimeKeys.find(t => t >= diveTime);

  if (!matchedTime) {
    return 'Time too long for this depth';
  }

  const result = depthTable[matchedTime];

  if (!Array.isArray(result) || result.length !== 2) {
    return 'Invalid result format';
  }

  const [min, sec] = result;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
