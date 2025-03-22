import airTable from '../sitTables/air.json';
import ean80Table from '../sitTables/ean80.json';

export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  // Round depth to nearest available
  let roundedDepth = Math.ceil(parseFloat(depth));

  // Round up to 10m if 0–9 entered
  if (roundedDepth < 10) {
    roundedDepth = 10;
  }

  // Format dive time to MM:SS
  const diveTime = formatDiveTime(minutes, seconds);

  // Select table
  const table = gasType === 'ean80' ? ean80Table : airTable;

  // If depth key doesn't exist
  if (!table[roundedDepth]) {
    return 'Depth out of range';
  }

  // If exact time exists
  if (table[roundedDepth][diveTime]) {
    return appendEanNotice(table[roundedDepth][diveTime], gasType);
  }

  // Find the next closest time greater than or equal
  const availableTimes = Object.keys(table[roundedDepth]);
  const greaterTime = availableTimes.find((t) => compareTime(t, diveTime) >= 0);

  if (greaterTime) {
    return appendEanNotice(table[roundedDepth][greaterTime], gasType);
  } else {
    return 'Dive time out of range';
  }
}

function formatDiveTime(min, sec) {
  const m = parseInt(min) || 0;
  const s = parseInt(sec) || 0;
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

function compareTime(a, b) {
  const [minA, secA] = a.split(':').map(Number);
  const [minB, secB] = b.split(':').map(Number);
  const totalA = minA * 60 + secA;
  const totalB = minB * 60 + secB;
  return totalA - totalB;
}

function appendEanNotice(timeStr, gasType) {
  if (gasType === 'ean80') {
    return `${timeStr}|||Must be off EAN 80 for 2 minutes before diving`;
  }
  return timeStr;
}
