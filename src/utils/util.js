export const numberToString = (num) => {
  if (num < 1000) {
    return num.toString();
  }
  return `${(Math.round(num / 100) / 10).toString()}k`;
};
