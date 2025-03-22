
import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function formatMinutesToMMSS(minutes) {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return padZero(mins) + ':' + padZero(secs);
}

function roundUpToAvailableTime(table, depth, minutes) {
  const availableTimes = Object.keys(table[depth] || {}).map(Number);
  if (!availableTimes.length) return null;
  const rounded = availableTimes.find(time => time >= minutes);
  return rounded || null;
}

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  if (depth < 10) depth = 10;
  if (seconds === 0) seconds = 0;

  const table = gasType === 'ean80' ? ean80Table : airTable;

  const roundedDepth = Object.keys(table)
    .map(Number)
    .reduce((prev, curr) => Math.abs(curr - depth) < Math.abs(prev - depth) ? curr : prev);

  const totalMinutes = minutes + (seconds / 60);
  const roundedTime = roundUpToAvailableTime(table, roundedDepth, totalMinutes);

  if (!roundedTime) return "Time too long for this depth";

  const result = table[roundedDepth][roundedTime];
  if (!result || typeof result !== 'string' || !result.includes(':')) {
    return "Invalid result";
  }

  return result;
}
