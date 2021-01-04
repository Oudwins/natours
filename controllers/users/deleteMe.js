const catchAsync = require('../../utilities/catchAsync');
const User = require('../../models/usersModel');

module.exports = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: 'success', data: null });
});
