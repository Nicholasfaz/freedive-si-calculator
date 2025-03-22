import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

function roundUpToNearestBracket(value, brackets) {
  const sorted = Object.keys(brackets)
    .map(v => parseInt(v))
    .sort((a, b) => a - b);
  for (const val of sorted) {
    if (value <= val) return val;
  }
  return null;
}

export function getSurfaceInterval(depth, minutes, seconds, gas) {
  const table = gas === 'ean80' ? ean80Table : airTable;
  if (depth >= 0 && depth < 10) depth = 10;

  const timeMin = minutes + (seconds > 0 ? 1 : 0); // round up if any seconds present
  const depthKey = roundUpToNearestBracket(depth, table);
  if (!depthKey) return "Depth is out of range";

  const timeKey = roundUpToNearestBracket(timeMin, table[depthKey]);
  if (!timeKey) return "Time is too long for this depth";

  const result = table[depthKey][timeKey];
  if (typeof result === 'string' && result.includes("|||")) {
    return result;
  } else if (typeof result === 'string') {
    return result;
  } else {
    return "Invalid result format";
  }
}
