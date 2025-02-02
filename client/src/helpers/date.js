export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = Array.from({ length: 31 }, (_, i) => i + 1);

const generateYears = (startYear) => {
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let i = currentYear; i >= startYear; i--) {
    years.push(i);
  }
  return years;
};

export const years = generateYears(1900);

// Format timeLeft into mm:ss format for display
export const formatTime = (seconds) => {
  const adjustedSeconds = Math.max(0, seconds - 3);
  const minutes = Math.floor(adjustedSeconds / 60);
  const remainingSeconds = adjustedSeconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
