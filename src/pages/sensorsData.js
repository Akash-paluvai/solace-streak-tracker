// simulator.js

let currentHeartRate = 70 + Math.floor(Math.random() * 10); // Start around 70–80
let currentSleepScore = 80 + Math.floor(Math.random() * 20); // 80–100

// Simulate continuous change
setInterval(() => {
  // Heart rate changes by -1, 0, or +1
  const change = Math.floor(Math.random() * 3) - 1;
  currentHeartRate += change;

  // Clamp between 50–110 bpm
  currentHeartRate = Math.max(50, Math.min(110, currentHeartRate));

  // Sleep score slightly changes
  currentSleepScore += Math.floor(Math.random() * 3) - 1;
  currentSleepScore = Math.max(60, Math.min(100, currentSleepScore));
}, 1000); // every 1 sec

// Export functions to get current values
export function getLatestHeartRate() {
  return currentHeartRate;
}

export function getLatestSleepScore() {
  return currentSleepScore;
}
