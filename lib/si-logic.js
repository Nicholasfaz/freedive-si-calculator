// si-logic.js — Conservative Upward Rounding for PFI SIT Calculator

import air from '../sit-tables/air.json';
import ean80 from '../sit-tables/ean80.json';

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  if (depth < 10) depth = 10; // Round up any shallow depth to 10m
  const roundedDepth = findNearestDepth(depth, gasType);

  const table = gasType === 'air' ? air : ean80;
  const depthKey = String(roundedDepth);
  if (!table[depthKey]) return 'Depth out of range';

  const totalSeconds = minutes * 60 + (isNaN(seconds) ? 0 : seconds);
  const diveTimeKeys = Object.keys(table[depthKey]);

  // Find the next available time bracket at or above the input time
  let nextBracket = null;
  for (const key of diveTimeKeys) {
    const [m, s] = key.split(':').map(Number);
    const keySeconds = m * 60 + s;
    if (totalSeconds <= keySeconds) {
      nextBracket = key;
      break;
    }
  }

  if (!nextBracket) return 'Time too long for this depth';

  const result = table[depthKey][nextBracket];

  if (typeof result === 'string') {
    if (result.includes('|||')) {
      const [main, note] = result.split('|||');
      return `${main}|||${note}`;
    }
    return result;
  }

  return 'Invalid result format';
}

function findNearestDepth(depth, gasType) {
  const table = gasType === 'air' ? air : ean80;
  const availableDepths = Object.keys(table).map(Number).sort((a, b) => a - b);

  for (const d of availableDepths) {
    if (depth <= d) return d;
  }

  return availableDepths[availableDepths.length - 1]; // Max depth fallback
}

export function formatMinutesToMMSS(minutesFloat) {
  const mins = Math.floor(minutesFloat);
  const secs = Math.round((minutesFloat - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
