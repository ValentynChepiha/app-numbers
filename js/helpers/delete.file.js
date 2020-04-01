const { unlinkSync } = require("fs");
const { FILE_NAME } = require("./constats");

module.exports = (filename) => {
  if (filename !== FILE_NAME) {
    unlinkSync(`data/${filename}`);
  }
};
