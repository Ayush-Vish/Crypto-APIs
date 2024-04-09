export const getTimeInterval = function (date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const startUnix = Math.floor(start.getTime() / 1000);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const endUnix = Math.floor(end.getTime() / 1000);

  return {
    startDate: startUnix,
    endDate: endUnix,
  }
};
