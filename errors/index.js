const sendErrDev = require('./sendErrDev');
const sendApiErrProd = require('./sendApiErrProd');
const sendRenderErrProd = require('./sendRenderErrProd');
const operationalLibErrChecker = require('./operationalLibErrs');

module.exports = (err, req, res, next) => {
  //defaults
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // RES

  if (process.env.NODE_ENV === 'development') {
    sendErrDev(err, req, res);
  } else {
    // Handling DB & other errors not made by us that need to provide meaningful information to user
    const appError = operationalLibErrChecker(err);

    //Res
    if (req.originalUrl.startsWith('/api')) {
      sendApiErrProd(appError, res);
    } else {
      // its on website not API
      sendRenderErrProd(appError, res);
    }
  }
  next();
};
