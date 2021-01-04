const Tour = require('../../models/toursModel');
const getOne = require('../factory/getOne');

module.exports = getOne(Tour, ['reviews']);
