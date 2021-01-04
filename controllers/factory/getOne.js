const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');
const handlePopulateOptions = require('./utils/handlePopulateOptions');

module.exports = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = handlePopulateOptions(query, populateOptions);
    }
    const doc = await query;
    // exit if doc is not found
    if (!doc) return next(new AppError('No document found with that ID', 404));

    // if doc is found send res
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
