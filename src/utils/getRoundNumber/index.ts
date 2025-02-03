const getRoundNumber = (value: number, decimalCount = 0) => {
  const decimalValue = Math.pow(10, decimalCount);
  return Math.round(value * decimalValue) / decimalValue;
};

export default getRoundNumber;
