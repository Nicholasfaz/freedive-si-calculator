import { airTable } from './sitTables/airTable';
import { ean80Table } from './sitTables/ean80Table';

// Format minutes and seconds into MM:SS
export function formatMinutesToMMSS(minutes) {
  const min = Math.floor(minutes);
  const sec = Math.round((minutes - min) * 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Main logic to get surface interval
export function getSurfaceInterval(depth, min, sec, gasType) {
  // Round up depth if under 10m to use 10m row
  const roundedDepth = depth < 10 ? 10 : Math.ceil(depth);
  const totalSeconds = min * 60 + sec;

  // Convert to dive time key used in tables
  const timeKey = findClosestTimeKey(gasType === 'air' ? airTable : ean80Table, roundedDepth, totalSeconds);
  if (!timeKey) return "No matching time found for depth";

  const table = gasType === 'air' ? airTable : ean80Table;
  const interval = table[roundedDepth]?.[timeKey];

  if (!interval) return "Depth out of range";

  const formatted = formatMinutesToMMSS(interval);
  return gasType === 'ean80'
    ? `${formatted}|||Must be off EAN 80 for 2 minutes before diving`
    : formatted;
}

// Find the closest matching dive time key in seconds
function findClosestTimeKey(table, depth, inputSeconds) {
  const depthRow = table[depth];
  if (!depthRow) return null;

  const keys = Object.keys(depthRow)
    .map(k => parseTimeKey(k))
    .sort((a, b) => a - b);

  for (let i = 0; i < keys.length; i++) {
    if (inputSeconds <= keys[i]) {
      return formatTimeKey(keys[i]);
    }
  }

  return null;
}

// Convert "m:ss" or "mm:ss" → seconds
function parseTimeKey(key) {
  const [min, sec] = key.split(':').map(Number);
  return min * 60 + sec;
}

// Convert seconds → "m:ss"
function formatTimeKey(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
