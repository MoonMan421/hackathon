
export const computePercentage = (chartData) => {

  // console.log("line", chartData.dataArray, chartData.dataArray[chartData.length - 1])
  const firstDataPoint = chartData[0][1]
  const lastDataPoint = chartData[chartData.length - 1][1]

  try {
    return (lastDataPoint - firstDataPoint) / firstDataPoint * 100
  } catch (exception) {
    logError("computePercentage", exception);
  }
  return 0;
}