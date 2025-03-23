
import air from '../sit-tables/air.json';
import ean80 from '../sit-tables/ean80.json';

export function getSurfaceInterval({ depth, minutes, seconds, gasType }) {
  console.log("--- Surface Interval Calculation Start ---");
  console.log("Input:", { depth, minutes, seconds, gasType });

  const min = Number(minutes) || 0;
  const sec = Number(seconds) || 0;
  const totalSeconds = min * 60 + sec;

  console.log("Total Dive Time (seconds):", totalSeconds);

  // Round up to the nearest 15-second increment
  const roundedSeconds = Math.ceil(totalSeconds / 15) * 15;
  const roundedMinutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  const timeKey = `${roundedMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;

  console.log("Time Key Rounded Up:", timeKey);

  // Lock in logic - only select from known tables
  const data = gasType === 'ean80' ? ean80 : air;
  const availableDepths = Object.keys(data).map(Number).sort((a, b) => a - b);
  const inputDepth = Math.max(10, Number(depth));

  const depthNum = availableDepths.find(d => d >= inputDepth);

  if (!depthNum) {
    console.log("No valid depth found for input:", inputDepth);
    return "No data for this depth";
  }

  console.log("Rounded Depth Key:", depthNum);

  const table = data[depthNum];
  if (!table) {
    console.log("No table found for depth:", depthNum);
    return "No data for this depth";
  }

  const result = table[timeKey];
  console.log("Surface Interval Result:", result || "Not found");

  return result || "Time too long for this depth";
}
