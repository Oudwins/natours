const User = require('../../models/usersModel');
const updateOne = require('../factory/updateOne');

// THIS IS A ADMIN ONLY ROUTE. User will be permanently deleted, please keep that in mind. PLEASE DONT USE THIS ROUTE TO UPDATE PASSWORDS
module.exports = updateOne(User);
