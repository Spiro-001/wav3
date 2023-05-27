const daysInMonth = (month, year) => {
  year = parseInt(year);
  if (month === 2 && year % 4 === 0) return 29;
  else if (month === 2) return 28;
  if (month % 2 === 0) {
    return 30;
  } else {
    return 31;
  }
};

const validateDate = (month = 1, year = 0) => {
  return daysInMonth(month, year);
};

export default validateDate;
