import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  // Round depths below 10 up to 10
  if (depth < 10) depth = 10;

  // Safety guard for gas type
  const table = gasType === 'ean80' ? ean80Table : airTable;

  // Convert time to total seconds
  const timeInSec = minutes * 60 + (isNaN(seconds) ? 0 : seconds);

  // Look up the appropriate depth
  const timeTable = table[depth];
  if (!timeTable) return "Depth out of range.";

  // Find the first matching or higher time
  const availableTimes = Object.keys(timeTable).map(k => parseInt(k)).sort((a, b) => a - b);
  const timeKey = availableTimes.find(t => t >= timeInSec);
  if (timeKey === undefined) return "Time too long for this depth.";

  const interval = timeTable[timeKey];
  if (interval === undefined) return "No matching interval found.";

  const result = formatMinutesToMMSS(interval);

  // Add EAN80 warning if applicable
  if (gasType === 'ean80') {
    return `${result}|||Must be off EAN 80 for 2 minutes before diving`;
  }

  return result;
}

export function formatMinutesToMMSS(minutes) {
  const totalSeconds = Math.round(minutes * 60);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
