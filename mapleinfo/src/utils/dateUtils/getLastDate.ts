const getLastDate = (dates: number) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour <= 9) {
    const twoDayAgo = new Date(currentDate);
    twoDayAgo.setDate(twoDayAgo.getDate() - dates);
    return twoDayAgo.toISOString().split("T")[0];
  } else {
    const oneDayAgo = new Date(currentDate);
    oneDayAgo.setDate(oneDayAgo.getDate() - dates - 1);
    return oneDayAgo.toISOString().split("T")[0];
  }
};

export default getLastDate;
