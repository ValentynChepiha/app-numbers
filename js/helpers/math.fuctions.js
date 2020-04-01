module.exports.getMedian = (array) => {
  let ind = Math.ceil(array.length / 2);
  return array.length % 2 === 0
    ? (array[ind] + array[ind + 1]) / 2
    : array[ind + 1];
};

module.exports.getAverage = (array) =>
  array.reduce((sum, el) => sum + el) / array.length;

module.exports.verifyIncrement = (element, arrayTemp, arrayResult) => {
  const dataArrTemp = [...arrayTemp];
  const dataArrResult = [...arrayResult];
  const lengthTmp = dataArrTemp.length;

  if (!lengthTmp || element > dataArrTemp[lengthTmp - 1]) {
    dataArrTemp.push(element);
    return [dataArrTemp, dataArrResult];
  }

  if (lengthTmp > dataArrResult.length) {
    dataArrResult.length = 0;
    dataArrResult.push(...dataArrTemp);
  }
  dataArrTemp.length = 0;
  return [dataArrTemp, dataArrResult];
};

module.exports.verifyDecrement = (element, arrayTemp, arrayResult) => {
  const dataArrTemp = [...arrayTemp];
  const dataArrResult = [...arrayResult];
  const lengthTmp = dataArrTemp.length;

  if (!lengthTmp || element < dataArrTemp[lengthTmp - 1]) {
    dataArrTemp.push(element);
    return [dataArrTemp, dataArrResult];
  }

  if (lengthTmp > dataArrResult.length) {
    dataArrResult.length = 0;
    dataArrResult.push(...dataArrTemp);
  }
  dataArrTemp.length = 0;
  return [dataArrTemp, dataArrResult];
};
