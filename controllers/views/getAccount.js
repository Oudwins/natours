module.exports = (req, res, next) => {
  // 1

  // 2) build template
  /*   if (!tour[0]) {
    return next(new AppError('There is no tour with that name', 404));
  } */
  // 3) render template using the data from step 1
  res.status(200).render('account', {
    title: `Your Account`,
  });
};
