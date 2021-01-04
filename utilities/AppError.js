module.exports = class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;
    // make this not appear in stack trace
    Error.captureStackTrace(this, this.constructor);
  }
};
