const Booking = require('../../models/bookingsModel');
const getAll = require('../factory/getAll');

module.exports = getAll(Booking, ['tour']);
