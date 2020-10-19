const deleteHandler = require('./handle-delete');
const getHandler = require('./handle-get');
const patchHandler = require('./handle-patch');
const postHandler = require('./handle-post');

module.exports = {
  ...deleteHandler,
  ...getHandler,
  ...patchHandler,
  ...postHandler,
};
