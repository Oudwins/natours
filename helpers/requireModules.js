const otherInDir = (path, curFileName) => {
  const regex = /(\w+)\.js/;
  const imports = {};
  require('fs')
    .readdirSync(path)
    .filter((file) => regex.test(file))
    .forEach((file) => {
      imports[file] = require(`./${file}`);
    });
  return imports;
};

module.exports = {
  otherInDir,
};
