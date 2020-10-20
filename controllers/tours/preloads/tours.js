const fs = require('fs');
const path = require('path');
module.exports = (() => {
  let newpath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'dev-data',
    'data',
    'tours-simple.json'
  );
  return JSON.parse(fs.readFileSync(newpath));
})();
