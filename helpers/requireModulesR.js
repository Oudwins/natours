/* eslint-disable */
const path = require('path');
const fs = require('fs');

module.exports = (curPath, type = 'directory', curFileName = 'index.js') => {
  const regex = type === 'directory' ? /(\w+)\.js/ : /(\w+)/;
  const imports = {};

  fs.readdirSync(curPath).forEach((file) => {
    const match = regex.exec(file);
    if (match && !(curFileName.localeCompare(file) === 0))
      imports[match[1]] = require(path.join(curPath, match[1]));
  });
  return imports;
};
