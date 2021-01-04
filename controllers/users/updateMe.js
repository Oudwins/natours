const catchAsync = require('../../utilities/catchAsync');
const filterObj = require('../../utilities/filterObj');
const User = require('../../models/usersModel');

module.exports = catchAsync(async (req, res, next) => {
  //1. update user document
  const mutableFields = ['name', 'email'];
  const filteredFields = filterObj(req.body, mutableFields);
  // This changes the photo field in our user object in the database so we can find the new image
  if (req.file) filteredFields.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(req.user.id, filteredFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
