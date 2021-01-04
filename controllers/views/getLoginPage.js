// const catchAsync = require('../../utilities/catchAsync');

module.exports = (req, res) => {
  res.status(200).render('loginPage', {
    title: `Sign In`,
  });
};
