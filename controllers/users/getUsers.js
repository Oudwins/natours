const User = require('../../models/usersModel');
const getAll = require('../factory/getAll');

// THIS IS A ADMIN ONLY ROUTE.
module.exports = getAll(User);
