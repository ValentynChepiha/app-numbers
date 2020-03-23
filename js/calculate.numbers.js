const fs = require("fs");
const util = require('util');

module.exports = async (datafile) => {
  let result = {min:null, max:null, average:null, median:null};
  let error = null;

  const readFile = util.promisify(fs.readFile);

  return await readFile(`data/${datafile}`)
    .then( fd => {
      const array = fd.toString().split("\n").map(el => Number(el)).sort((a, b) =>a-b );

      result.min = array[0];
      result.max = array[array.length-1];
      result.average = array.reduce( (sum, el) => sum +el, 0)/array.length;
      let ind = Math.ceil(array.length/2);
      result.median = (array.length %2 === 0) ? (array[ind]+array[ind+1])/2 : array[ind+1];

      return {result, error};
    })
    .catch( err => {return {result, error: err}} );
};



