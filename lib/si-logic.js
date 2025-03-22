import airTable from '../sitTables/air.json';
import ean80Table from '../sitTables/ean80.json';

function roundUpToNearest(value, validOptions) {
  return validOptions.find(option => option >= value);
}

function findClosestTimeBlock(depthData, diveTime) {
  const times = Object.keys(depthData).map(time => parseTime(time)).sort((a, b) => a - b);
  return times.find(time => time >= diveTime);
}

function parseTime(timeStr) {
  const [min, sec] = timeStr.split(':').map(Number);
  return min * 60 + sec;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function getSurfaceInterval(depth, min, sec, gas) {
  if (depth < 10) depth = 10;
  const totalTime = min * 60 + (isNaN(sec) ? 0 : sec);

  const table = gas === 'ean80' ? ean80Table : airTable;
  const depths = Object.keys(table).map(Number).sort((a, b) => a - b);
  const roundedDepth = roundUpToNearest(depth, depths);
  if (!roundedDepth || !table[roundedDepth]) return 'Depth out of range';

  const diveTime = totalTime;
  const depthTimes = table[roundedDepth];
  const closestTimeKey = Object.keys(depthTimes).find(t => parseTime(t) >= diveTime);
  if (!closestTimeKey) return 'No matching time';

  const interval = depthTimes[closestTimeKey];
  if (gas === 'ean80') {
    return `${interval}|||Must be off EAN 80 for 2 minutes before diving`;
  }
  return interval;
}
