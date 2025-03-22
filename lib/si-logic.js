// lib/si-logic.js

import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

export function formatMinutesToMMSS(minutes) {
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  const table = gasType === 'ean80' ? ean80Table : airTable;
  const diveTime = minutes + seconds / 60;

  // Edge case: round depth < 10 up to 10m
  const roundedDepth = Math.max(10, Math.ceil(depth));
  const availableDepths = Object.keys(table).map(d => parseInt(d)).sort((a, b) => a - b);
  const closestDepth = availableDepths.find(d => d >= roundedDepth);

  if (!closestDepth) return "Depth out of range.";

  const timeTable = table[closestDepth];
  const availableTimes = Object.keys(timeTable)
    .map(t => parseFloat(t))
    .sort((a, b) => a - b);
  const closestTime = availableTimes.find(t => t >= diveTime);

  if (!closestTime) return "Time too long for this depth.";

  const sitValue = timeTable[closestTime.toFixed(2)];
  if (!sitValue) return "Surface interval not found.";

  const formatted = formatMinutesToMMSS(sitValue);
  const note = gasType === 'ean80' ? "Must be off EAN 80 for 2 minutes before diving." : null;
  return note ? `${formatted}|||${note}` : formatted;
}
