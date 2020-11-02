/* PLEASE NOTE: this is a Constructor / Prototype pattern Function module only use with APIFeatures */
const replaceMongoOperators = require('./helpers/handleMongoOperators');

module.exports = () => {
  //1A) Filtering
  const queryObj = { ...this.queryString };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((field) => delete queryObj[field]);
  // 1B) Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = replaceMongoOperators(queryStr);
  this.query.find(JSON.parse(queryStr));
};
