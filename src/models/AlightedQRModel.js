const calculateFare = (bPrice, alightData) => {
  if (alightData) {
    // Only calculate the fare if alightData exists
    const fareAmount = Math.abs(bPrice - alightData.bPrice);
    return fareAmount;
  }
  return 0;
};

export { calculateFare };
