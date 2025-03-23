
import air from '../sit-tables/air.json';
import ean80 from '../sit-tables/ean80.json';

export function getSurfaceInterval({ depth, minutes, seconds, gasType }) {
  console.log("--- Surface Interval Calculation Start ---");
  console.log("Input:", { depth, minutes, seconds, gasType });

  const depthNum = Math.max(10, Math.ceil(Number(depth))); // Ensure at least 10m
  const min = Number(minutes) || 0;
  const sec = Number(seconds) || 0;
  const totalSeconds = min * 60 + sec;

  console.log("Rounded Depth:", depthNum);
  console.log("Total Dive Time (seconds):", totalSeconds);

  // Round up to the nearest 15-second increment
  const roundedSeconds = Math.ceil(totalSeconds / 15) * 15;
  const roundedMinutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;
  const timeKey = \`\${roundedMinutes}:\${remainingSeconds.toString().padStart(2, '0')}\`;

  console.log("Time Key Rounded Up:", timeKey);

  const data = gasType === 'ean80' ? ean80 : air;

  // Get the next available depth key that is >= depthNum
  const availableDepths = Object.keys(data).map(Number).sort((a, b) => a - b);
  const nextAvailableDepth = availableDepths.find(d => d >= depthNum);

  if (!nextAvailableDepth) {
    console.log("No suitable depth found in table");
    return "No data for this depth";
  }

  console.log("Using table for depth:", nextAvailableDepth);
  const table = data[nextAvailableDepth];

  const result = table[timeKey];
  console.log("Surface Interval Result:", result || "Not found");
  return result || "Time too long for this depth";
}
