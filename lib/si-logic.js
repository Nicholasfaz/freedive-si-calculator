// Surface Interval Logic — Updated to Match MM:SS Table Keys
import airTable from '../sit-tables/air.json';
import ean80Table from '../sit-tables/ean80.json';

function formatToNearestBracket(minutes, seconds) {
  // Round up to next full minute if seconds are not 0
  const totalMinutes = seconds > 0 ? minutes + 1 : minutes;
  return `${totalMinutes.toString().padStart(1, '0')}:00`;
}

function getSurfaceInterval(depth, minutes, seconds, gasType) {
  // Handle edge depths
  const roundedDepth = Math.max(10, Math.round(depth));
  const depthKey = roundedDepth.toString();
  const timeKey = formatToNearestBracket(minutes, seconds);

  const table = gasType === 'ean80' ? ean80Table : airTable;

  if (!table[depthKey]) {
    return 'Depth out of range';
  }

  const si = table[depthKey][timeKey];

  if (!si) {
    return 'Time too long for this depth';
  }

  if (gasType === 'ean80') {
    return `${si}|||You must be off EAN 80 for 2 minutes before diving.`;
  }

  return si;
}

export default getSurfaceInterval;
