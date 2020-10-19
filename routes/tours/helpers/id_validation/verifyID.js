const tours = require('../../../../preloads/tours');
module.exports = (idString) => {
  const id = parseInt(idString);
  return id > tours.length ? false : id;
};
