const Review = require('../../models/reviewModel');
const createOne = require('../factory/createOne');
// this function uses the set tour id middleware.
module.exports = createOne(Review);
