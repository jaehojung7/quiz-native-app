const timeConversion = (start, end) => {
  const difference = end - start;
  const minutes = Math.floor(difference / 1000 / 60);
  const seconds = Math.floor((difference - minutes * 60 * 1000) / 1000);
  const record = { minutes: minutes, seconds: seconds };
  return record;
};
module.exports = timeConversion;
