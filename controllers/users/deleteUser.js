const User = require('../../models/usersModel');
const deleteOne = require('../factory/deleteOne');

// THIS IS A ADMIN ONLY ROUTE. User will be permanently deleted, please keep that in mind
module.exports = deleteOne(User);
