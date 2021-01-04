const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');

module.exports = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // checking for response
    if (!doc) return next(new AppError('No document found with that ID', 404));
    // response
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
