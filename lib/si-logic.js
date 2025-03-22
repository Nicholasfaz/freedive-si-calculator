
export function getSurfaceInterval(depth, minutes, seconds, gasType) {
  const diveTime = minutes + (seconds / 60);
  if (depth < 10) depth = 10;

  let table;
  try {
    table = require(`../sit-tables/${gasType}.json`);
  } catch {
    return "Invalid gas type.";
  }

  if (!table[depth]) {
    return "Depth out of range.";
  }

  const times = Object.keys(table[depth]).map(Number).sort((a, b) => a - b);
  const diveTimeRounded = times.find(t => t >= diveTime);
  if (!diveTimeRounded) {
    return "Time too long for this depth.";
  }

  const surfaceTime = table[depth][diveTimeRounded];
  const minutesSI = Math.floor(surfaceTime);
  const secondsSI = Math.round((surfaceTime - minutesSI) * 60);
  const pad = (n) => n.toString().padStart(2, '0');
  return `${pad(minutesSI)}:${pad(secondsSI)}`;
}
