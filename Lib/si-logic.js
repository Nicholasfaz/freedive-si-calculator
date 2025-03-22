// lib/si-logic.js

// Helper function to convert time to total seconds
function timeToSeconds(min, sec) {
  return min * 60 + sec;
}

// Helper function to format back to MM:SS
export function formatMinutesToMMSS(minutes) {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Air surface interval table (depth in meters -> time in seconds -> SIT in minutes)
const airTable = {
  10: { 120: 2, 180: 3 },
  15: { 120: 2.5, 180: 4, 240: 6 },
  20: { 120: 3, 180: 5, 240: 7, 300: 10 },
  25: { 120: 4, 180: 6.5, 240: 8, 300: 11.5 },
  27: { 180: 7, 240: 9.5, 300: 13, 360: 15 },
  30: { 120: 5, 180: 8, 240: 10.5, 300: 14 },
  35: { 120: 5.5, 180: 9, 240: 11.5, 300: 15 },
  40: { 120: 6, 180: 10, 240: 13, 300: 16 },
  45: { 120: 6.5, 180: 11, 240: 14, 300: 17 },
  50: { 120: 7, 180: 12, 240: 15, 300: 18 },
  55: { 120: 8, 180: 13, 240: 16, 300: 19 },
  60: { 120: 9, 180: 14, 240: 17, 300: 20 },
  67: { 120: 10, 180: 15, 240: 18, 300: 21 },
  70: { 120: 11, 180: 16, 240: 19, 300: 22 },
  75: { 120: 12, 180: 17, 240: 20, 300: 23 },
  80: { 120: 13, 180: 18, 240: 21, 300: 24 }
};

// EAN80 surface interval table
const ean80Table = {
  10: { 120: 2, 180: 2.5 },
  15: { 120: 2.5, 180: 3, 240: 4 },
  20: { 120: 3, 180: 4.5, 240: 6 },
  25: { 120: 4, 180: 5.5, 240: 7 },
  27: { 180: 6, 240: 7.5, 300: 9.5 },
  30: { 120: 4.5, 180: 6.5, 240: 8.5, 300: 10.5 },
  35: { 120: 5, 180: 7.5, 240: 9.5, 300: 11.5 },
  40: { 120: 5.5, 180: 8.5, 240: 10.5, 300: 12.5 },
  45: { 120: 6, 180: 9.5, 240: 11.5, 300: 13.5 },
  50: { 120: 6.5, 180: 10.5, 240: 12.5, 300: 14.5 },
  55: { 120: 7, 180: 11.5, 240: 13.5, 300: 15.5 },
  60: { 120: 7.5, 180: 12.5, 240: 14.5, 300: 16.5 },
  67: { 120: 8, 180: 13.5, 240: 15.5, 300: 17.5 },
  70: { 120: 8.5, 180: 14.5, 240: 16.5, 300: 18.5 },
  75: { 120: 9, 180: 15.5, 240: 17.5, 300: 19.5 },
  80: { 120: 9.5, 180: 16.5, 240: 18.5, 300: 20.5 }
};

export function getSurfaceInterval(depth, min, sec, gas) {
  const table = gas === 'air' ? airTable : ean80Table;
  const times = table[depth];
  if (!times) return 'Depth out of range';

  const inputTime = timeToSeconds(min, sec);

  // Find the closest valid time greater than or equal to input
  const available = Object.keys(times)
    .map(t => parseInt(t))
    .filter(t => t >= inputTime)
    .sort((a, b) => a - b);

  const match = available[0];
  if (!match) return 'Dive time out of range';

  const sit = times[match];
  const formatted = formatMinutesToMMSS(sit);

  if (gas === 'ean80') {
    return `${formatted} ||| Must be off EAN 80 for 2 minutes before diving`;
  } else {
    return formatted;
  }
}
