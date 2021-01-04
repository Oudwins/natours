module.exports = (res, status, message) => {
  res.status(status).render('error', {
    title: 'Something Went Wrong',
    message: message,
  });
};
