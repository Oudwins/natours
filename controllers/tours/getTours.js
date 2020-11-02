const Tour = require('../../models/toursModel');
const { filter } = require('../classes/api_features');
const APIFeatures = require('../classes/api_features/APIFeatures');

module.exports = async (req, res) => {
  try {
    //! BUILDING API FEATURES CLASS

    const API = new APIFeatures(Tour.find(), req.query);

    // BUILDING FEATURES
    API.prototype.filter = filter;
    console.log(API);
    console.log('---filter created---');
    API.filter();
    console.log('-------filter triggered--------');
    console.log(API.queryString);
    //!  BUILD QUERY
    /* //1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);
    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    // Add $ to operators
    queryStr = replaceMongoOperators(queryStr); */
    //! CREATE QUERY

    /* // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // 3) field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query.select('-__v');
    }

    // 4) Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    // checking if we skipping more tours than we have
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exits');
    } */
    // EXECUTE QUERY
    const tours = await API.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
