const getDateRange = (endDate: Date, startDate: Date): Date[] => {
  const dates = [];
  let currentDate = endDate;
  while (currentDate >= startDate) {
    dates.push(currentDate);
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return dates;
};

export default getDateRange;
