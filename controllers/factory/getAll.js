const APIFeatures = require('../../utilities/api_features');
const catchAsync = require('../../utilities/catchAsync');
const handlePopulateOptions = require('./utils/handlePopulateOptions');

module.exports = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(req.filterObj || {}), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    if (populateOptions)
      features.query = handlePopulateOptions(features.query, populateOptions);
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
