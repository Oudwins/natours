module.exports = (err, res) => {
  // operational error, trusted, send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or unknowni error: don't leak error details
  } else {
    //1) log error
    console.log('-----------------');
    console.error(err);
    console.log('-----------------');
    //2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};
