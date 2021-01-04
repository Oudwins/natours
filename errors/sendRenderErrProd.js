const renderError = require('./libErrors/renderError');

module.exports = (err, res) => {
  // operational error, trusted, send message to client
  if (err.isOperational) {
    renderError(res, err.statusCode, err.message);
  } else {
    //1) log error
    console.log('-----------------');
    console.error(err);
    console.log('-----------------');
    //2) send generic message
    renderError(res, 500, 'Please try again later.');
  }
};
