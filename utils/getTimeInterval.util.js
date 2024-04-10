export const getTimeInterval = function (dateString) {
  const [day, month, year] = dateString.split('-').map(Number);

  const inputDate = new Date(year, month - 1, day);

  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date input");
  }

  const start = new Date(inputDate);
  start.setHours(0, 0, 0, 0);
  const startUnix = Math.floor(start.getTime() / 1000);

  const end = new Date(inputDate);
  end.setHours(23, 59, 59, 999);
  const endUnix = Math.floor(end.getTime() / 1000);

  return {
    startDate: startUnix,
    endDate: endUnix,
  };
};
