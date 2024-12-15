const timeUnits = {
  seconds: (value) => value,
  hours: (value) => value * 3600,
  days: (value) => value * 86400,
  weeks: (value) => value * 604800
};

function formatTime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

module.exports = {
  timeUnits,
  formatTime
};