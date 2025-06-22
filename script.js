let intervalId;
let isRunning = false;
let startTimestamp = 0;
let storedTime = 0;
let lapCount = 0;

function updateTime() {
  const now = Date.now();
  const elapsed = storedTime + (now - startTimestamp);
  const hrs = Math.floor(elapsed / 3600000);
  const mins = Math.floor((elapsed % 3600000) / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);

  document.getElementById('timeDisplay').textContent =
    `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
  return String(num).padStart(2, '0');
}

function handleStart() {
  if (isRunning) return;
  isRunning = true;
  startTimestamp = Date.now();
  intervalId = setInterval(updateTime, 1000);
}

function handlePause() {
  if (!isRunning) return;
  storedTime += Date.now() - startTimestamp;
  clearInterval(intervalId);
  isRunning = false;
}

function handleReset() {
  clearInterval(intervalId);
  isRunning = false;
  storedTime = 0;
  lapCount = 0;
  document.getElementById('timeDisplay').textContent = '00:00:00';
  document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  lapCount++;
  const lapTime = document.getElementById('timeDisplay').textContent;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${lapTime}`;
  document.getElementById('lapList').appendChild(li);
}
