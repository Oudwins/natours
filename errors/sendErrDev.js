const renderError = require('./libErrors/renderError');

module.exports = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
      errName: err.name,
    });
  } else {
    // Rendered WEBSITE
    renderError(res, err.statusCode, err.message);
  }
};
