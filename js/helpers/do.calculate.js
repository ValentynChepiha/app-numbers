const calculateNumbers = require("./calculate.numbers");
const deleteFile = require("./delete.file");
const { RESULT, FILE_NAME, DIR_DATA } = require("./constats");

module.exports = async (req) => {
  const filename =
    req.file && req.file.filename ? req.file.filename : FILE_NAME;
  const { result, error } = await calculateNumbers(`${DIR_DATA}/${filename}`);

  deleteFile(filename);
  return { ...RESULT, ...result, error };
};
