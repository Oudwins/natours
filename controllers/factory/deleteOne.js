const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');

////////////////////////////////
module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    //checking for valid response from database
    if (!doc) return next(new AppError('No document found with that ID', 404));
    // response
    res.status(204).json({
      status: 'success',
      message: null,
    });
  });
