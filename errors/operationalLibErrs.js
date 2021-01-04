const handleCastErrDB = require('./libErrors/handleDB/castError');
const handleDuplicateFieldsDB = require('./libErrors/handleDB/duplicateFields');
const handleValidationErrMongoose = require('./libErrors/handleMongoose/validationErr');
const handleInvalidJWT = require('./libErrors/handleJWT/invalidSignature');
const handleJWTExpired = require('./libErrors/handleJWT/tokenExpiredError');

module.exports = (err) => {
  let error = null;
  switch (err) {
    case err.name === 'CastError':
      error = handleCastErrDB(err);
      break;
    case err.code === 11000:
      error = handleDuplicateFieldsDB(err);
      break;
    case err.name === 'ValidationError':
      error = handleValidationErrMongoose(err);
      break;
    case err.name === 'JsonWebTokenError':
      error = handleInvalidJWT();
      break;
    case err.name === 'TokenExpiredError':
      error = handleJWTExpired();
      break;
    default:
      error = err;
  }
  return error;
};
