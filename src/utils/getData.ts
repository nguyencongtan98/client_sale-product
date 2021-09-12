export const getColor = (statusId: number): string => {
  let bgColor = "d";
  switch (statusId) {
    case 1:
      bgColor = "#6d24e3";
      break;
    case 2:
      bgColor = "#dbbd5a";
      break;
    case 3:
      bgColor = "#9fe09d";
      break;
    case 4:
      bgColor = "darkGray";
      break;
    case 5:
      bgColor = "6d24e3";
      break;
    default:
      break;
  }
  return bgColor;
};

export const dateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  let monthTmp = month.toString();
  let dayTmp = day.toString();

  if (month < 10) {
    monthTmp = "0".concat(month.toString()) as string;
  }

  if (day < 10) {
    dayTmp = "0".concat(day.toString()) as string;
  }

  return year + "-" + monthTmp + "-" + dayTmp;
};
