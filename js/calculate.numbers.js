const fs = require("fs");
const util = require('util');

module.exports = async (datafile) => {
  let result = {min:null, max:null, average:null, median:null, incnumbers:null, decnumbers: null};
  let error = null;

  const readFile = util.promisify(fs.readFile);

  return await readFile(`data/${datafile}`)
    .then( fd => {
      let array = fd.toString().split("\n").map(el => Number(el));
      let incArray = [];
      let decArray = [];
      let incTmpArr = [];
      let decTmpArr = [];

      array.forEach(el => {
        if(!incTmpArr.length || el>incTmpArr[incTmpArr.length-1]){
          incTmpArr.push(el);
        } else {
          if(incTmpArr.length >1 && incTmpArr.length > incArray.length){
            incArray.length = 0;
            incArray.push(...incTmpArr);
          }
          incTmpArr.length = 0;
        }

        if(!decTmpArr.length || el<decTmpArr[decTmpArr.length-1]){
          decTmpArr.push(el);
        } else {
          if(decTmpArr.length>1 && decTmpArr.length > decArray.length){
            decArray.length = 0;
            decArray.push(...decTmpArr);
          }
          decTmpArr.length = 0;
        }
      });

      array.sort((a, b) =>a-b );
      result.min = array[0];
      result.max = array[array.length-1];
      result.average = array.reduce( (sum, el) => sum+el)/array.length;
      let ind = Math.ceil(array.length/2);
      result.median = (array.length %2 === 0) ? (array[ind]+array[ind+1])/2 : array[ind+1];

      result.incnumbers = incArray.join(' ');
      result.decnumbers = decArray.join(' ');

      console.log('incnumbers :: ',result.incnumbers);
      console.log('decnumbers :: ',result.decnumbers);

      return {result, error};
    })
    .catch( err => {return {result, error: err}} );
};



