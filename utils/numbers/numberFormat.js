export const formatNumber = (number) => {
  if (number > 999999999) return Math.round(number / 10000000) / 100 + "B";
  else if (number > 9999999) return Math.round(number / 10000) / 100 + "M";
  else if (number > 999999) return Math.round(number / 10000) / 100 + "M";
  else if (number > 99999) return Math.round(number / 1000) + "K";
  else if (number > 9999) return Math.round(number / 100) / 10 + "K";
  else if (number > 999)
    return Math.floor(number / 1000) + "," + number.toString().slice(1);
  else return number;
};
