const { readFile } = require("fs");
const util = require("util");
const { RESULT } = require("./constats");
const mathFuncs = require("./math.fuctions");

module.exports = async (datafile) => {
  let error = null;

  const readFileAsync = util.promisify(readFile);

  return await readFileAsync(datafile)
    .then((fd) => {
      const array = fd
        .toString()
        .split("\n")
        .map((el) => Number(el));

      let incArray = [];
      let decArray = [];
      let incTmpArr = [];
      let decTmpArr = [];

      array.forEach((el) => {
        [incTmpArr, incArray] = mathFuncs.verifyIncrement(
          el,
          incTmpArr,
          incArray
        );

        [decTmpArr, decArray] = mathFuncs.verifyDecrement(
          el,
          decTmpArr,
          decArray
        );
      });

      array.sort((a, b) => a - b);

      RESULT.min = array[0];
      RESULT.max = array[array.length - 1];
      RESULT.average = mathFuncs.getAverage(array);
      RESULT.median = mathFuncs.getMedian(array);
      RESULT.incnumbers = incArray.join(" ");
      RESULT.decnumbers = decArray.join(" ");

      return { RESULT, error };
    })
    .catch((err) => {
      return { RESULT, error: err };
    });
};
